import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { createHash, timingSafeEqual } from 'crypto'
import { prisma } from '@/lib/prisma'
import { generateSlug, calculateReadingTime, stripHtml } from '@/lib/utils'
import type { ArticleType } from '@prisma/client'

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/publish — headless publicatie-endpoint voor Agent OS.
//
// Agent OS stuurt een POST met `Authorization: Bearer <PUBLISH_API_KEY>` en JSON:
//   { title, content (HTML), slug?, excerpt?, seoTitle?, seoDescription?,
//     tags?: string[], keywords?, source?, category?, type? }
//
// Het artikel landt in het bestaande Prisma `Article`-model (Neon Postgres),
// status PUBLISHED — dus dit gaat direct live. Agent OS zet zelf alleen
// door de Wachtrij goedgekeurde content door, dus dat is de bedoeling.
//
// Env die gezet moet zijn (Vercel productie + .env.local):
//   PUBLISH_API_KEY        = dezelfde waarde als DAAR_PUBLISH_KEY in Agent OS
//   PUBLISH_AUTHOR_EMAIL   = (optioneel) e-mail van de auteur die de posts krijgt
// ─────────────────────────────────────────────────────────────────────────────

function isAuthorized(request: NextRequest): boolean {
  const key = process.env.PUBLISH_API_KEY
  const auth = request.headers.get('authorization')
  if (!key || !auth?.startsWith('Bearer ')) return false
  const provided = auth.slice(7)
  const a = createHash('sha256').update(provided).digest()
  const b = createHash('sha256').update(key).digest()
  return timingSafeEqual(a, b)
}

function toStringArray(v: unknown): string[] {
  if (Array.isArray(v)) return v.map((x) => String(x).trim()).filter(Boolean)
  if (typeof v === 'string') {
    return v
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
  }
  return []
}

function resolveType(category?: string, type?: string): ArticleType {
  const t = (type || '').toUpperCase()
  if (t === 'KENNISBANK' || t === 'BLOG') return t as ArticleType
  const c = (category || '').toLowerCase()
  if (c === 'kennisbank' || c === 'kb') return 'KENNISBANK'
  return 'BLOG'
}

// Zoek (of maak eenmalig) de auteur waaronder headless-publicaties vallen.
async function resolveAuthorId(): Promise<string> {
  const email = process.env.PUBLISH_AUTHOR_EMAIL?.trim()
  if (email) {
    const byEmail = await prisma.author.findUnique({ where: { email } })
    if (byEmail) return byEmail.id
  }
  const first = await prisma.author.findFirst({ orderBy: { createdAt: 'asc' } })
  if (first) return first.id
  // Geen enkele auteur in de database: maak een neutrale redactie-auteur aan.
  const created = await prisma.author.create({
    data: {
      name: 'Team DAAR',
      email: email || 'redactie@daar.nl',
      role: 'Redactie',
    },
  })
  return created.id
}

export async function POST(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = (await request.json()) as {
      title?: string
      content?: string
      slug?: string
      excerpt?: string
      seoTitle?: string
      seoDescription?: string
      tags?: string[] | string
      keywords?: string[] | string
      source?: string
      category?: string
      type?: string
    }

    const title = body.title?.trim()
    const content = body.content?.trim()
    if (!title || !content) {
      return NextResponse.json(
        { error: 'title en content zijn verplicht' },
        { status: 400 }
      )
    }

    const type = resolveType(body.category, body.type)
    const slug =
      (body.slug?.trim() && generateSlug(body.slug)) || generateSlug(title)
    if (!slug) {
      return NextResponse.json(
        { error: 'kon geen geldige slug afleiden uit slug/title' },
        { status: 400 }
      )
    }

    const contentPlain = stripHtml(content)
    const readingTime = calculateReadingTime(contentPlain)
    const excerpt = (
      body.excerpt?.trim() ||
      body.seoDescription?.trim() ||
      contentPlain.slice(0, 200)
    ).slice(0, 500)
    const metaTitle = (body.seoTitle?.trim() || title).slice(0, 60)
    const metaDescription = (
      body.seoDescription?.trim() ||
      excerpt ||
      ''
    ).slice(0, 160)

    const authorId = await resolveAuthorId()

    // Upsert op slug — hergebruikte titels overschrijven het bestaande artikel
    // i.p.v. een unieke-constraint-fout te geven.
    const existing = await prisma.article.findUnique({ where: { slug } })
    const commonData = {
      title,
      content,
      contentPlain,
      excerpt,
      metaTitle,
      metaDescription,
      type,
      status: 'PUBLISHED' as const,
      readingTime,
    }

    let article
    if (existing) {
      article = await prisma.article.update({
        where: { slug },
        data: {
          ...commonData,
          publishedAt: existing.publishedAt ?? new Date(),
        },
      })
    } else {
      article = await prisma.article.create({
        data: {
          ...commonData,
          slug,
          authorId,
          publishedAt: new Date(),
        },
      })
    }

    // Tags zijn niet-kritisch: een mislukte tag-koppeling mag de publicatie
    // niet laten falen.
    const tagNames = toStringArray(body.tags).length
      ? toStringArray(body.tags)
      : toStringArray(body.keywords)
    if (tagNames.length) {
      try {
        for (const name of tagNames.slice(0, 8)) {
          const tagSlug = generateSlug(name)
          if (!tagSlug) continue
          const tag = await prisma.tag.upsert({
            where: { slug: tagSlug },
            update: {},
            create: { name, slug: tagSlug },
          })
          await prisma.tagsOnArticles.upsert({
            where: { articleId_tagId: { articleId: article.id, tagId: tag.id } },
            update: {},
            create: { articleId: article.id, tagId: tag.id },
          })
        }
      } catch (tagErr) {
        console.error('[publish] tag-koppeling mislukt (niet kritisch):', tagErr)
      }
    }

    const path = type === 'KENNISBANK' ? 'kennisbank' : 'blog'
    const url = `https://daar.nl/${path}/${slug}`
    revalidatePath(`/${path}`)
    revalidatePath(`/${path}/${slug}`)
    revalidatePath('/sitemap.xml')

    return NextResponse.json(
      {
        success: true,
        slug,
        url,
        type,
        source: body.source || 'agent-os',
        action: existing ? 'updated' : 'created',
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('[publish] error:', error)
    return NextResponse.json(
      { error: 'Publiceren mislukt', detail: String(error).slice(0, 300) },
      { status: 500 }
    )
  }
}
