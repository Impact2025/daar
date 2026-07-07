'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  Search, Star, StarOff, Download, ExternalLink, Mail, Phone,
  MapPin, Zap, Loader2, Trash2, CheckCircle2, RefreshCw,
  Database, TrendingUp, Settings2, ChevronDown, ChevronUp, Building2,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Card, CardContent, CardHeader } from '@/components/ui';
import { DEFAULT_SCORING_CONTEXT } from '@/lib/lead-machine/scorer';
import type { SearchResult, ProspectLead } from '@/lib/lead-machine/types';

// ── Preset queries (DAAR domein: welzijn / vrijwilligers / sociaal domein) ──
const QUERY_PRESETS = [
  { label: 'Welzijnsorg. Amsterdam', query: 'welzijnsorganisaties Amsterdam' },
  { label: 'Vrijwilligers NL', query: 'vrijwilligersorganisaties Nederland' },
  { label: 'Stichtingen Utrecht', query: 'stichtingen welzijn Utrecht' },
  { label: 'Buurtorg. Rotterdam', query: 'buurtorganisaties Rotterdam' },
  { label: 'Gemeenten sociaal', query: 'gemeenten sociaal domein' },
  { label: 'Jeugdwerk NL', query: 'jeugdwerk organisaties Nederland' },
];

function ScoreBadge({ score }: { score?: number }) {
  if (score == null) return <Badge variant="default">–</Badge>;
  if (score >= 8) return <Badge variant="success">{score}/10</Badge>;
  if (score >= 5) return <Badge variant="warning">{score}/10</Badge>;
  return <Badge variant="danger">{score}/10</Badge>;
}

const STATUS_LABELS: Record<string, string> = {
  NEW: 'Nieuw', CONTACTED: 'Contact gelegd', QUALIFIED: 'Gekwalificeerd',
  CONVERTED: 'Klant', ARCHIVED: 'Gearchiveerd',
};
const STATUS_BADGE: Record<string, 'default' | 'info' | 'warning' | 'success' | 'danger'> = {
  NEW: 'default', CONTACTED: 'info', QUALIFIED: 'warning', CONVERTED: 'success', ARCHIVED: 'default',
};
function StatusBadge({ status }: { status: string }) {
  return <Badge variant={STATUS_BADGE[status] ?? 'default'}>{STATUS_LABELS[status] ?? status}</Badge>;
}

const LOAD_STEPS = [
  'Organisaties zoeken via het web…',
  'Websites bezoeken voor contactgegevens…',
  'AI-score berekenen per organisatie…',
  'Resultaten sorteren op relevantie…',
];

// ── Search form ────────────────────────────────────────────────────────────
interface SearchFormProps { onResults: (results: SearchResult[]) => void; }

function SearchForm({ onResults }: SearchFormProps) {
  const [query, setQuery] = useState('');
  const [maxResults, setMaxResults] = useState('10');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [scoringContext, setScoringContext] = useState(DEFAULT_SCORING_CONTEXT);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!loading) return;
    const interval = setInterval(() => setStep((s) => (s + 1) % LOAD_STEPS.length), 4000);
    return () => clearInterval(interval);
  }, [loading]);

  const handleSearch = async (searchQuery = query) => {
    if (!searchQuery.trim()) return;
    setLoading(true);
    setStep(0);
    try {
      const res = await fetch('/api/admin/lead-machine/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: searchQuery.trim(), maxResults: Number(maxResults), scoringContext }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Onbekende fout');
      onResults(data.results ?? []);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Zoeken mislukt');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader><h3 className="font-semibold text-daar-navy">Zoekopdracht</h3></CardHeader>
      <CardContent className="space-y-4">
        <Input
          placeholder="bijv. welzijnsorganisaties Amsterdam"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && !loading && handleSearch()}
        />

        <div>
          <p className="text-xs text-gray-500 mb-2">Snelle zoekopdrachten</p>
          <div className="flex flex-wrap gap-1.5">
            {QUERY_PRESETS.map((p) => (
              <button
                key={p.query}
                onClick={() => { setQuery(p.query); handleSearch(p.query); }}
                disabled={loading}
                className="px-2.5 py-1 text-xs bg-gray-100 hover:bg-brandGreen hover:text-white rounded-full transition-colors disabled:opacity-50"
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-daar-blue mb-1.5 block">Aantal resultaten</label>
          <select
            value={maxResults}
            onChange={(e) => setMaxResults(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brandGreen"
          >
            <option value="10">10 organisaties (~15s)</option>
            <option value="20">20 organisaties (~25s)</option>
            <option value="30">30 organisaties (~40s)</option>
          </select>
        </div>

        <div>
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-daar-navy"
          >
            <Settings2 size={13} />
            Scoring-context aanpassen
            {showAdvanced ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
          </button>
          {showAdvanced && (
            <textarea
              className="mt-2 w-full text-xs rounded-md border border-gray-200 p-2.5 text-gray-700 resize-y min-h-28 focus:outline-none focus:ring-2 focus:ring-brandGreen"
              value={scoringContext}
              onChange={(e) => setScoringContext(e.target.value)}
              placeholder="Beschrijf je ideale klant voor de AI-scoring…"
            />
          )}
        </div>

        <Button
          onClick={() => handleSearch()}
          disabled={loading || !query.trim()}
          className="w-full"
        >
          {loading ? (
            <><Loader2 size={16} className="mr-2 animate-spin" />{LOAD_STEPS[step]}</>
          ) : (
            <><Zap size={16} className="mr-2" />Analyseren</>
          )}
        </Button>

        {loading && (
          <p className="text-xs text-gray-400 text-center">
            Websites worden live bezocht — dit duurt ~15–40 seconden
          </p>
        )}
      </CardContent>
    </Card>
  );
}

// ── Results table ──────────────────────────────────────────────────────────
interface ResultsTableProps { results: SearchResult[]; onSaved: () => void; }

function ResultsTable({ results, onSaved }: ResultsTableProps) {
  const [saving, setSaving] = useState<Set<string>>(new Set());
  const [saved, setSaved] = useState<Set<string>>(
    new Set(results.filter((r) => r.alreadySaved).map((r) => r.kvkNumber)),
  );
  const [expanded, setExpanded] = useState<string | null>(null);

  const saveLead = async (r: SearchResult) => {
    setSaving((s) => new Set(s).add(r.kvkNumber));
    try {
      const res = await fetch('/api/admin/lead-machine/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: r.name, website: r.website, email: r.email, phone: r.phone,
          aiScore: r.aiScore, aiRationale: r.aiRationale, sbiDescription: r.sbiDescription,
        }),
      });
      if (!res.ok) throw new Error();
      setSaved((s) => new Set(s).add(r.kvkNumber));
      onSaved();
    } catch {
      alert('Opslaan mislukt');
    } finally {
      setSaving((s) => { const n = new Set(s); n.delete(r.kvkNumber); return n; });
    }
  };

  const saveHighScoring = async () => {
    const toSave = results.filter((r) => !saved.has(r.kvkNumber) && (r.aiScore ?? 0) >= 6);
    for (const r of toSave) await saveLead(r);
  };

  if (results.length === 0) return null;

  const withEmail = results.filter((r) => r.email).length;
  const avgScore = (results.reduce((sum, r) => sum + (r.aiScore ?? 0), 0) / results.length).toFixed(1);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
        <span className="text-gray-600"><strong>{results.length}</strong> gevonden</span>
        <span className="text-gray-600"><strong>{withEmail}</strong> met e-mail</span>
        <span className="text-gray-600">Gem. score <strong>{avgScore}</strong></span>
        <div className="ml-auto flex gap-2">
          <Button size="sm" variant="outline" onClick={saveHighScoring}>
            <Database size={14} className="mr-1.5" />Sla score ≥ 6 op
          </Button>
          <a
            href="/api/admin/lead-machine/export" download
            className="inline-flex items-center px-3 py-1.5 text-sm border-2 border-brandGreen text-brandGreen hover:bg-brandGreen hover:text-white rounded-lg transition-colors"
          >
            <Download size={14} className="mr-1.5" />CSV
          </a>
        </div>
      </div>

      <div className="rounded-lg border bg-white overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 text-left text-gray-600">
              <th className="px-4 py-3 w-16">Score</th>
              <th className="px-4 py-3">Organisatie</th>
              <th className="px-4 py-3 hidden lg:table-cell">Contact</th>
              <th className="px-4 py-3 hidden md:table-cell w-28">Website</th>
              <th className="px-4 py-3 w-24 text-right">Actie</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {results.map((r) => (
              <>
                <tr
                  key={r.kvkNumber}
                  className="cursor-pointer hover:bg-gray-50"
                  onClick={() => setExpanded(expanded === r.kvkNumber ? null : r.kvkNumber)}
                >
                  <td className="px-4 py-3"><ScoreBadge score={r.aiScore} /></td>
                  <td className="px-4 py-3">
                    <div className="font-medium text-daar-navy leading-tight">{r.name}</div>
                    {r.sbiDescription && (
                      <div className="text-xs text-gray-400 mt-0.5 line-clamp-1">{r.sbiDescription}</div>
                    )}
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell">
                    {r.email ? (
                      <a href={`mailto:${r.email}`} className="text-brandGreen hover:underline text-sm" onClick={(e) => e.stopPropagation()}>{r.email}</a>
                    ) : r.phone ? (
                      <a href={`tel:${r.phone}`} className="text-gray-600 text-sm" onClick={(e) => e.stopPropagation()}>{r.phone}</a>
                    ) : (
                      <span className="text-gray-300 text-sm">–</span>
                    )}
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    {r.website && (
                      <a href={r.website.startsWith('http') ? r.website : `https://${r.website}`}
                        target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-1 text-xs text-gray-500 hover:text-daar-navy truncate max-w-[110px]"
                        onClick={(e) => e.stopPropagation()}>
                        <ExternalLink size={12} className="shrink-0" />
                        {r.website.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                      </a>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    {saved.has(r.kvkNumber) ? (
                      <span className="text-xs text-brandGreenHover flex items-center justify-end gap-1">
                        <CheckCircle2 size={13} />Opgeslagen
                      </span>
                    ) : (
                      <Button size="sm" variant="outline" className="h-7 text-xs"
                        disabled={saving.has(r.kvkNumber)}
                        onClick={(e) => { e.stopPropagation(); saveLead(r); }}>
                        {saving.has(r.kvkNumber) ? <Loader2 size={12} className="animate-spin" /> : 'Opslaan'}
                      </Button>
                    )}
                  </td>
                </tr>
                {expanded === r.kvkNumber && (
                  <tr key={`${r.kvkNumber}-exp`} className="bg-lightGreen">
                    <td colSpan={5} className="py-3 px-4">
                      <div className="space-y-2 text-sm">
                        {r.aiRationale && <p className="text-gray-600 italic">{r.aiRationale}</p>}
                        {r.sbiDescription && <p className="text-gray-500 text-xs">{r.sbiDescription}</p>}
                        <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                          {r.email && <span className="flex items-center gap-1"><Mail size={11} />{r.email}</span>}
                          {r.phone && <span className="flex items-center gap-1"><Phone size={11} />{r.phone}</span>}
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── Saved leads ────────────────────────────────────────────────────────────
function SavedLeads() {
  const [leads, setLeads] = useState<ProspectLead[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    try {
      const qs = new URLSearchParams({ limit: '50' });
      if (search) qs.set('search', search);
      if (statusFilter !== 'all') qs.set('status', statusFilter);
      const res = await fetch(`/api/admin/lead-machine/leads?${qs}`);
      const data = await res.json();
      setLeads(data.leads ?? []);
      setTotal(data.total ?? 0);
    } catch {
      alert('Laden mislukt');
    } finally {
      setLoading(false);
    }
  }, [search, statusFilter]);

  useEffect(() => { fetchLeads(); }, [fetchLeads]);

  const updateStatus = async (id: string, status: string) => {
    await fetch('/api/admin/lead-machine/leads', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    });
    setLeads((prev) => prev.map((l) => l.id === id ? { ...l, status: status as ProspectLead['status'] } : l));
  };

  const toggleStar = async (lead: ProspectLead) => {
    await fetch('/api/admin/lead-machine/leads', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: lead.id, starred: !lead.starred }),
    });
    setLeads((prev) => prev.map((l) => l.id === lead.id ? { ...l, starred: !l.starred } : l));
  };

  const deleteLead = async () => {
    if (!deleteId) return;
    await fetch(`/api/admin/lead-machine/leads?id=${deleteId}`, { method: 'DELETE' });
    setLeads((prev) => prev.filter((l) => l.id !== deleteId));
    setTotal((t) => t - 1);
    setDeleteId(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-3 flex-wrap">
        <div className="relative flex-1 min-w-48">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <Input placeholder="Zoeken op naam, stad, e-mail…" className="pl-8" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brandGreen w-44"
        >
          <option value="all">Alle statussen</option>
          {Object.entries(STATUS_LABELS).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
        </select>
        <Button variant="outline" size="sm" onClick={fetchLeads}><RefreshCw size={15} /></Button>
        <a
          href={`/api/admin/lead-machine/export${statusFilter !== 'all' ? `?status=${statusFilter}` : ''}`} download
          className="inline-flex items-center px-3 py-1.5 text-sm border-2 border-brandGreen text-brandGreen hover:bg-brandGreen hover:text-white rounded-lg transition-colors"
        >
          <Download size={14} className="mr-1.5" />CSV
        </a>
      </div>

      <p className="text-sm text-gray-500">{total} opgeslagen leads</p>

      {loading ? (
        <div className="flex justify-center py-12"><Loader2 size={24} className="animate-spin text-gray-400" /></div>
      ) : leads.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <TrendingUp size={40} className="mx-auto mb-3 opacity-30" />
          <p className="font-medium">Nog geen leads opgeslagen</p>
          <p className="text-sm mt-1">Zoek organisaties en sla de beste op.</p>
        </div>
      ) : (
        <div className="rounded-lg border bg-white overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left text-gray-600">
                <th className="px-4 py-3 w-10"></th>
                <th className="px-4 py-3 w-16">Score</th>
                <th className="px-4 py-3">Organisatie</th>
                <th className="px-4 py-3 hidden md:table-cell">Contact</th>
                <th className="px-4 py-3 w-40">Status</th>
                <th className="px-4 py-3 w-10"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {leads.map((lead) => (
                <tr key={lead.id}>
                  <td className="px-4 py-3">
                    <button onClick={() => toggleStar(lead)} className="text-gray-400 hover:text-amber-500 transition-colors">
                      {lead.starred ? <Star size={16} className="fill-amber-400 text-amber-400" /> : <StarOff size={16} />}
                    </button>
                  </td>
                  <td className="px-4 py-3"><ScoreBadge score={lead.aiScore ?? undefined} /></td>
                  <td className="px-4 py-3">
                    <div className="font-medium text-daar-navy">{lead.name}</div>
                    <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
                      {lead.city && <span className="flex items-center gap-0.5"><MapPin size={10} />{lead.city}</span>}
                      {lead.website && (
                        <a href={lead.website.startsWith('http') ? lead.website : `https://${lead.website}`}
                          target="_blank" rel="noopener noreferrer"
                          className="flex items-center gap-0.5 hover:text-daar-navy">
                          <ExternalLink size={10} />
                          {lead.website.replace(/^https?:\/\//, '').replace(/\/$/, '').split('/')[0]}
                        </a>
                      )}
                    </div>
                    {lead.aiRationale && <p className="text-xs text-gray-400 mt-1 italic">{lead.aiRationale}</p>}
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <div className="space-y-1">
                      {lead.email && (
                        <a href={`mailto:${lead.email}`} className="flex items-center gap-1.5 text-xs text-brandGreen hover:underline"><Mail size={12} />{lead.email}</a>
                      )}
                      {lead.phone && (
                        <a href={`tel:${lead.phone}`} className="flex items-center gap-1.5 text-xs text-gray-600"><Phone size={12} />{lead.phone}</a>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={lead.status}
                      onChange={(e) => updateStatus(lead.id, e.target.value)}
                      className="text-xs border border-gray-200 rounded-lg px-2 py-1 bg-white focus:outline-none focus:ring-2 focus:ring-brandGreen"
                    >
                      {Object.entries(STATUS_LABELS).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <button onClick={() => setDeleteId(lead.id)} className="text-gray-300 hover:text-red-500 transition-colors">
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {deleteId && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={() => setDeleteId(null)}>
          <div className="bg-white rounded-xl p-6 max-w-sm w-full" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-semibold text-daar-navy mb-2">Lead verwijderen?</h3>
            <p className="text-sm text-gray-500 mb-4">Deze actie kan niet ongedaan worden gemaakt.</p>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" size="sm" onClick={() => setDeleteId(null)}>Annuleren</Button>
              <Button variant="danger" size="sm" onClick={deleteLead}>Verwijderen</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Page ────────────────────────────────────────────────────────────────────
export default function LeadMachinePage() {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [activeTab, setActiveTab] = useState<'search' | 'saved'>('search');
  const [savedCount, setSavedCount] = useState(0);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-daar-navy">Lead Machine</h1>
        <p className="text-gray-500 mt-1">
          Zoek organisaties via het web, haal contactgegevens op en scoor ze automatisch met AI.
          Afgestemd op welzijns- en vrijwilligersorganisaties.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab('search')}
          className={`flex items-center gap-1.5 px-4 py-2.5 font-medium text-sm border-b-2 transition-colors ${activeTab === 'search' ? 'border-brandGreen text-daar-navy' : 'border-transparent text-gray-500 hover:text-daar-navy'}`}
        >
          <Search size={14} />Zoeken
          {results.length > 0 && <span className="ml-1.5 bg-brandGreen/10 text-brandGreenHover text-xs px-1.5 py-0.5 rounded-full">{results.length}</span>}
        </button>
        <button
          onClick={() => setActiveTab('saved')}
          className={`flex items-center gap-1.5 px-4 py-2.5 font-medium text-sm border-b-2 transition-colors ${activeTab === 'saved' ? 'border-brandGreen text-daar-navy' : 'border-transparent text-gray-500 hover:text-daar-navy'}`}
        >
          <Database size={14} />Opgeslagen
          {savedCount > 0 && <span className="ml-1.5 bg-green-100 text-green-700 text-xs px-1.5 py-0.5 rounded-full">+{savedCount}</span>}
        </button>
      </div>

      {activeTab === 'search' ? (
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6 items-start">
          <SearchForm onResults={(r) => { setResults(r); }} />
          <div>
            {results.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-gray-400 border-2 border-dashed rounded-lg">
                <Search size={36} className="mb-3 opacity-20" />
                <p className="font-medium">Vul een zoekopdracht in en klik Analyseren</p>
                <p className="text-sm mt-1">Resultaten verschijnen hier, gesorteerd op AI-score</p>
              </div>
            ) : (
              <ResultsTable results={results} onSaved={() => setSavedCount((c) => c + 1)} />
            )}
          </div>
        </div>
      ) : (
        <SavedLeads key={savedCount} />
      )}
    </div>
  );
}
