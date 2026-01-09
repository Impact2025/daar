'use client'

import { useState, useEffect } from 'react'
import {
  Users,
  Mail,
  Phone,
  Building2,
  MessageSquare,
  Calendar,
  ClipboardCheck,
  FileText,
  Filter,
  Search,
  ChevronDown,
  ExternalLink,
  Loader2,
  UserPlus,
  TrendingUp,
  Clock
} from 'lucide-react'
import { Button, Input, Card, CardContent, CardHeader, Badge } from '@/components/ui'

interface Lead {
  id: string
  name: string | null
  email: string | null
  phone: string | null
  organization: string | null
  source: string
  interest: string | null
  notes: string | null
  status: string
  createdAt: string
  updatedAt: string
  chatSession?: { id: string; messageCount: number } | null
  bookings?: { id: string; startTime: string }[]
  quizResults?: { id: string; totalScore: number; profileId: string }[]
}

const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
  NEW: { label: 'Nieuw', color: 'text-blue-700', bg: 'bg-blue-100' },
  CONTACTED: { label: 'Gecontacteerd', color: 'text-yellow-700', bg: 'bg-yellow-100' },
  QUALIFIED: { label: 'Gekwalificeerd', color: 'text-purple-700', bg: 'bg-purple-100' },
  CONVERTED: { label: 'Geconverteerd', color: 'text-green-700', bg: 'bg-green-100' },
  ARCHIVED: { label: 'Gearchiveerd', color: 'text-gray-700', bg: 'bg-gray-100' },
}

const sourceConfig: Record<string, { label: string; icon: React.ElementType }> = {
  CHAT: { label: 'Chat', icon: MessageSquare },
  CONTACT_FORM: { label: 'Contactformulier', icon: FileText },
  NEWSLETTER: { label: 'Nieuwsbrief', icon: Mail },
  DEMO_REQUEST: { label: 'Demo aanvraag', icon: Calendar },
  QUIZ: { label: 'VrijwilligersCheck', icon: ClipboardCheck },
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('ALL')
  const [sourceFilter, setSourceFilter] = useState<string>('ALL')
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [updatingStatus, setUpdatingStatus] = useState(false)

  // Stats
  const [stats, setStats] = useState({
    total: 0,
    new: 0,
    thisMonth: 0,
    converted: 0
  })

  useEffect(() => {
    loadLeads()
  }, [])

  async function loadLeads() {
    try {
      const res = await fetch('/api/leads')
      const data = await res.json()
      if (data.success) {
        setLeads(data.data)
        calculateStats(data.data)
      }
    } catch (err) {
      setError('Kon leads niet laden')
    } finally {
      setLoading(false)
    }
  }

  function calculateStats(leadsData: Lead[]) {
    const now = new Date()
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)

    setStats({
      total: leadsData.length,
      new: leadsData.filter(l => l.status === 'NEW').length,
      thisMonth: leadsData.filter(l => new Date(l.createdAt) >= startOfMonth).length,
      converted: leadsData.filter(l => l.status === 'CONVERTED').length,
    })
  }

  async function updateLeadStatus(leadId: string, newStatus: string) {
    setUpdatingStatus(true)
    try {
      const res = await fetch(`/api/leads/${leadId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      })
      const data = await res.json()
      if (data.success) {
        await loadLeads()
        if (selectedLead?.id === leadId) {
          setSelectedLead({ ...selectedLead, status: newStatus })
        }
      }
    } catch (err) {
      setError('Kon status niet bijwerken')
    } finally {
      setUpdatingStatus(false)
    }
  }

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = !searchQuery ||
      lead.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.organization?.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === 'ALL' || lead.status === statusFilter
    const matchesSource = sourceFilter === 'ALL' || lead.source === sourceFilter

    return matchesSearch && matchesStatus && matchesSource
  })

  function formatDate(date: string) {
    return new Date(date).toLocaleDateString('nl-NL', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  }

  function formatTimeAgo(date: string) {
    const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000)
    if (seconds < 60) return 'Zojuist'
    const minutes = Math.floor(seconds / 60)
    if (minutes < 60) return `${minutes}m geleden`
    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `${hours}u geleden`
    const days = Math.floor(hours / 24)
    if (days < 7) return `${days}d geleden`
    return formatDate(date)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-brandGreen" />
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-navy">Leads</h1>
          <p className="text-gray-500">Beheer en volg je leads op</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-navy">{stats.total}</p>
                <p className="text-sm text-gray-500">Totaal leads</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <UserPlus className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-navy">{stats.new}</p>
                <p className="text-sm text-gray-500">Nieuwe leads</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Clock className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-navy">{stats.thisMonth}</p>
                <p className="text-sm text-gray-500">Deze maand</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-100 rounded-lg">
                <TrendingUp className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-navy">{stats.converted}</p>
                <p className="text-sm text-gray-500">Geconverteerd</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Leads list */}
        <div className="lg:col-span-2">
          {/* Filters */}
          <Card className="mb-4">
            <CardContent className="p-4">
              <div className="flex flex-wrap gap-4">
                <div className="flex-1 min-w-[200px]">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Zoek op naam, email of organisatie..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brandGreen focus:border-transparent text-sm"
                    />
                  </div>
                </div>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brandGreen text-sm"
                >
                  <option value="ALL">Alle statussen</option>
                  {Object.entries(statusConfig).map(([key, { label }]) => (
                    <option key={key} value={key}>{label}</option>
                  ))}
                </select>

                <select
                  value={sourceFilter}
                  onChange={(e) => setSourceFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brandGreen text-sm"
                >
                  <option value="ALL">Alle bronnen</option>
                  {Object.entries(sourceConfig).map(([key, { label }]) => (
                    <option key={key} value={key}>{label}</option>
                  ))}
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Leads table */}
          <Card>
            <CardContent className="p-0">
              {filteredLeads.length > 0 ? (
                <div className="divide-y divide-gray-100">
                  {filteredLeads.map((lead) => {
                    const SourceIcon = sourceConfig[lead.source]?.icon || FileText
                    const status = statusConfig[lead.status] || statusConfig.NEW

                    return (
                      <div
                        key={lead.id}
                        onClick={() => setSelectedLead(lead)}
                        className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                          selectedLead?.id === lead.id ? 'bg-brandGreen/5 border-l-2 border-brandGreen' : ''
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                            {lead.name ? (
                              <span className="font-medium text-navy">
                                {lead.name.charAt(0).toUpperCase()}
                              </span>
                            ) : (
                              <Users className="w-5 h-5 text-gray-400" />
                            )}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-medium text-navy truncate">
                                {lead.name || 'Onbekend'}
                              </h3>
                              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${status.bg} ${status.color}`}>
                                {status.label}
                              </span>
                            </div>

                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              {lead.email && (
                                <span className="flex items-center gap-1 truncate">
                                  <Mail className="w-3 h-3" />
                                  {lead.email}
                                </span>
                              )}
                              {lead.organization && (
                                <span className="flex items-center gap-1 truncate">
                                  <Building2 className="w-3 h-3" />
                                  {lead.organization}
                                </span>
                              )}
                            </div>

                            <div className="flex items-center gap-3 mt-2">
                              <span className="flex items-center gap-1 text-xs text-gray-400">
                                <SourceIcon className="w-3 h-3" />
                                {sourceConfig[lead.source]?.label || lead.source}
                              </span>
                              <span className="text-xs text-gray-400">
                                {formatTimeAgo(lead.createdAt)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">
                    {searchQuery || statusFilter !== 'ALL' || sourceFilter !== 'ALL'
                      ? 'Geen leads gevonden met deze filters'
                      : 'Nog geen leads'}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Lead detail */}
        <div>
          {selectedLead ? (
            <Card className="sticky top-24">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-navy">Lead details</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusConfig[selectedLead.status]?.bg} ${statusConfig[selectedLead.status]?.color}`}>
                    {statusConfig[selectedLead.status]?.label}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Contact info */}
                <div className="space-y-3">
                  {selectedLead.name && (
                    <div className="flex items-center gap-3">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span className="text-navy font-medium">{selectedLead.name}</span>
                    </div>
                  )}
                  {selectedLead.email && (
                    <a
                      href={`mailto:${selectedLead.email}`}
                      className="flex items-center gap-3 text-gray-600 hover:text-brandGreen"
                    >
                      <Mail className="w-4 h-4 text-gray-400" />
                      {selectedLead.email}
                    </a>
                  )}
                  {selectedLead.phone && (
                    <a
                      href={`tel:${selectedLead.phone}`}
                      className="flex items-center gap-3 text-gray-600 hover:text-brandGreen"
                    >
                      <Phone className="w-4 h-4 text-gray-400" />
                      {selectedLead.phone}
                    </a>
                  )}
                  {selectedLead.organization && (
                    <div className="flex items-center gap-3">
                      <Building2 className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">{selectedLead.organization}</span>
                    </div>
                  )}
                </div>

                <hr className="border-gray-200" />

                {/* Interest */}
                {selectedLead.interest && (
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Interesse</p>
                    <p className="text-sm text-navy">{selectedLead.interest}</p>
                  </div>
                )}

                {/* Notes */}
                {selectedLead.notes && (
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Notities</p>
                    <p className="text-sm text-gray-600">{selectedLead.notes}</p>
                  </div>
                )}

                {/* Related data */}
                <div className="space-y-2">
                  {selectedLead.chatSession && (
                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-600 flex items-center gap-2">
                        <MessageSquare className="w-4 h-4" />
                        {selectedLead.chatSession.messageCount} berichten
                      </span>
                      <a href={`/admin/chat?session=${selectedLead.chatSession.id}`} className="text-brandGreen text-sm hover:underline">
                        Bekijk
                      </a>
                    </div>
                  )}

                  {selectedLead.quizResults && selectedLead.quizResults.length > 0 && (
                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-600 flex items-center gap-2">
                        <ClipboardCheck className="w-4 h-4" />
                        Quiz: {selectedLead.quizResults[0].totalScore}%
                      </span>
                    </div>
                  )}

                  {selectedLead.bookings && selectedLead.bookings.length > 0 && (
                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-600 flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {selectedLead.bookings.length} afspraak(en)
                      </span>
                    </div>
                  )}
                </div>

                <hr className="border-gray-200" />

                {/* Status update */}
                <div>
                  <p className="text-xs text-gray-500 mb-2">Status wijzigen</p>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(statusConfig).map(([key, { label }]) => (
                      <button
                        key={key}
                        onClick={() => updateLeadStatus(selectedLead.id, key)}
                        disabled={updatingStatus || selectedLead.status === key}
                        className={`px-3 py-2 text-xs font-medium rounded-lg transition-colors ${
                          selectedLead.status === key
                            ? 'bg-brandGreen text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        } disabled:opacity-50`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Meta */}
                <div className="pt-2 border-t border-gray-200">
                  <p className="text-xs text-gray-400">
                    Aangemaakt: {formatDate(selectedLead.createdAt)}
                  </p>
                  <p className="text-xs text-gray-400">
                    Bijgewerkt: {formatDate(selectedLead.updatedAt)}
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
                <Users className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                <p className="text-sm text-gray-500">
                  Selecteer een lead om de details te bekijken
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
