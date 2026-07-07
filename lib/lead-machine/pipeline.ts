// Shared lead-search pipeline — used by the on-demand search route.
// Discover organizations → scrape contact info → AI-score → flag already-saved.
import { discoverOrganizations } from './discovery';
import { scrapeMany } from './scraper';
import { scoreMany, DEFAULT_SCORING_CONTEXT } from './scorer';
import { prisma } from '@/lib/prisma';
import type { SearchResult, ProspectLead } from './types';

export interface RunSearchOptions {
  query: string;
  maxResults?: number;
  scoringContext?: string;
}

// Kaal hostname (zonder www) — dé identiteit van een web-discovered lead.
function hostnameOf(url: string | null | undefined): string | null {
  if (!url) return null;
  try {
    return new URL(url.startsWith('http') ? url : `https://${url}`)
      .hostname.replace(/^www\./, '').toLowerCase();
  } catch {
    return null;
  }
}

export function mapLead(r: {
  id: string;
  name: string;
  tradeName?: string | null;
  kvkNumber?: string | null;
  website?: string | null;
  email?: string | null;
  phone?: string | null;
  contactPerson?: string | null;
  sbiCode?: string | null;
  sbiDescription?: string | null;
  city?: string | null;
  postalCode?: string | null;
  address?: string | null;
  aiScore?: number | null;
  aiRationale?: string | null;
  status: string;
  starred: boolean;
  notes?: string | null;
  customerId?: string | null;
  scrapedAt?: Date | null;
  scoredAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}): ProspectLead {
  return {
    id: r.id,
    name: r.name,
    tradeName: r.tradeName ?? null,
    kvkNumber: r.kvkNumber ?? null,
    website: r.website ?? null,
    email: r.email ?? null,
    phone: r.phone ?? null,
    contactPerson: r.contactPerson ?? null,
    sbiCode: r.sbiCode ?? null,
    sbiDescription: r.sbiDescription ?? null,
    city: r.city ?? null,
    postalCode: r.postalCode ?? null,
    address: r.address ?? null,
    aiScore: r.aiScore != null ? Number(r.aiScore) : null,
    aiRationale: r.aiRationale ?? null,
    status: r.status as ProspectLead['status'],
    starred: r.starred,
    notes: r.notes ?? null,
    customerId: r.customerId ?? null,
    scrapedAt: r.scrapedAt ? r.scrapedAt.toISOString() : null,
    scoredAt: r.scoredAt ? r.scoredAt.toISOString() : null,
    createdAt: r.createdAt.toISOString(),
    updatedAt: r.updatedAt.toISOString(),
  };
}

export async function runLeadSearch({
  query,
  maxResults = 10,
  scoringContext = DEFAULT_SCORING_CONTEXT,
}: RunSearchOptions): Promise<SearchResult[]> {
  const limit = Math.min(Math.max(Number(maxResults) || 10, 1), 30);

  // 1 — Discover organizations via Brave / DuckDuckGo
  const discovered = await discoverOrganizations(query.trim(), limit);
  if (discovered.length === 0) return [];

  // 2 — Scrape contact info from each website
  const contactMap = await scrapeMany(
    discovered.map((d) => ({ kvkNumber: d.domain, website: d.url })),
    5,
  );

  // 3 — AI score all organizations
  const scores = await scoreMany(
    discovered.map((d) => ({ name: d.name, domain: d.domain, snippet: d.snippet })),
    scoringContext,
    5,
  );

  // 4 — Check which domains are already saved
  const domains = discovered.map((d) => d.domain);
  const saved = await prisma.prospectLead.findMany({
    where: { website: { not: null } },
    select: { website: true },
  });
  const savedDomains = new Set(
    saved
      .map((r) => hostnameOf(r.website))
      .filter((d): d is string => Boolean(d)),
  );

  // 5 — Assemble + sort by score desc
  const results: SearchResult[] = discovered.map((d, i) => {
    const contact = contactMap.get(d.domain) ?? {};
    const score = scores[i];
    return {
      kvkNumber: d.domain, // reuse kvkNumber field as unique key
      name: d.name,
      website: d.url,
      email: contact.email,
      phone: contact.phone,
      aiScore: score.score ?? undefined,
      aiRationale: score.rationale,
      alreadySaved: savedDomains.has(d.domain),
      sbiDescription: d.snippet?.slice(0, 150),
    };
  });

  results.sort((a, b) => (b.aiScore ?? 0) - (a.aiScore ?? 0));
  return results;
}

// Persist a search result as a prospect lead (idempotent on website domain when no KVK).
// Returns the lead id if inserted/updated, or null if skipped.
export async function saveSearchResult(r: SearchResult): Promise<string | null> {
  if (!r.name) return null;
  const now = new Date();

  try {
    const domain = r.website ? hostnameOf(r.website) : null;

    const existing = domain
      ? await prisma.prospectLead.findFirst({
          where: { website: { contains: domain, mode: 'insensitive' } },
        })
      : null;

    if (existing) {
      const updated = await prisma.prospectLead.update({
        where: { id: existing.id },
        data: {
          email: r.email ?? existing.email,
          phone: r.phone ?? existing.phone,
          aiScore: r.aiScore ?? existing.aiScore,
          aiRationale: r.aiRationale ?? existing.aiRationale,
          sbiDescription: r.sbiDescription ?? existing.sbiDescription,
          updatedAt: now,
        },
      });
      return updated.id;
    }

    const created = await prisma.prospectLead.create({
      data: {
        name: r.name,
        website: r.website ?? null,
        email: r.email ?? null,
        phone: r.phone ?? null,
        aiScore: r.aiScore ?? null,
        aiRationale: r.aiRationale ?? null,
        sbiDescription: r.sbiDescription ?? null,
        scrapedAt: r.email || r.phone ? now : null,
        scoredAt: r.aiScore != null ? now : null,
      },
    });
    return created.id;
  } catch (error) {
    console.error('saveSearchResult error:', error);
    return null;
  }
}
