'use client'

import { useState, useEffect } from 'react'
import {
  TrendingUp,
  TrendingDown,
  Target,
  Clock,
  ChevronRight,
  Filter,
  LayoutGrid,
  List,
  GripVertical,
  Building2,
  Calendar,
  User,
  Trophy,
  XCircle,
  ArrowUpRight,
  Sparkles
} from 'lucide-react'
import { format, differenceInDays } from 'date-fns'
import { nl } from 'date-fns/locale'
import Link from 'next/link'
import { TeamMemberBadge } from '@/components/crm'
import type { DealWithRelations, TeamMember, DealStage } from '@/types'

const stages: { id: DealStage; label: string; color: string; bgColor: string; textColor: string; probability: number }[] = [
  { id: 'QUALIFICATION', label: 'Kwalificatie', color: 'from-blue-500 to-blue-600', bgColor: 'bg-blue-50', textColor: 'text-blue-700', probability: 10 },
  { id: 'NEEDS_ANALYSIS', label: 'Analyse', color: 'from-indigo-500 to-indigo-600', bgColor: 'bg-indigo-50', textColor: 'text-indigo-700', probability: 25 },
  { id: 'PROPOSAL', label: 'Offerte', color: 'from-purple-500 to-purple-600', bgColor: 'bg-purple-50', textColor: 'text-purple-700', probability: 50 },
  { id: 'NEGOTIATION', label: 'Onderhandeling', color: 'from-amber-500 to-amber-600', bgColor: 'bg-amber-50', textColor: 'text-amber-700', probability: 75 },
]

export default function PipelinePage() {
  const [deals, setDeals] = useState<DealWithRelations[]>([])
  const [team, setTeam] = useState<TeamMember[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [ownerFilter, setOwnerFilter] = useState('')
  const [draggedDeal, setDraggedDeal] = useState<string | null>(null)
  const [dragOverStage, setDragOverStage] = useState<DealStage | null>(null)
  const [viewMode, setViewMode] = useState<'board' | 'list'>('board')
  const [mobileStage, setMobileStage] = useState<DealStage>('QUALIFICATION')

  useEffect(() => {
    fetchTeam()
    fetchDeals()
  }, [ownerFilter])

  const fetchTeam = async () => {
    const res = await fetch('/api/crm/team')
    const data = await res.json()
    setTeam(data)
  }

  const fetchDeals = async () => {
    setIsLoading(true)
    const params = new URLSearchParams({ isOpen: 'true' })
    if (ownerFilter) params.set('ownerId', ownerFilter)
    const res = await fetch(`/api/crm/deals?${params}`)
    const data = await res.json()
    setDeals(data.data || [])
    setIsLoading(false)
  }

  const handleDragStart = (e: React.DragEvent, dealId: string) => {
    setDraggedDeal(dealId)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e: React.DragEvent, stage: DealStage) => {
    e.preventDefault()
    setDragOverStage(stage)
  }

  const handleDragLeave = () => {
    setDragOverStage(null)
  }

  const handleDrop = async (e: React.DragEvent, newStage: DealStage) => {
    e.preventDefault()
    setDragOverStage(null)
    if (!draggedDeal) return

    const deal = deals.find((d) => d.id === draggedDeal)
    if (!deal || deal.stage === newStage) {
      setDraggedDeal(null)
      return
    }

    setDeals((prev) =>
      prev.map((d) => (d.id === draggedDeal ? { ...d, stage: newStage } : d))
    )

    await fetch(`/api/crm/deals/${draggedDeal}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ stage: newStage, performedById: deal.ownerId }),
    })

    setDraggedDeal(null)
    fetchDeals()
  }

  const getDealsByStage = (stage: DealStage) => deals.filter((d) => d.stage === stage)
  const getStageValue = (stage: DealStage) => getDealsByStage(stage).reduce((sum, d) => sum + Number(d.value || 0), 0)
  const totalPipelineValue = deals.reduce((sum, d) => sum + Number(d.value || 0), 0)
  const weightedValue = deals.reduce((sum, d) => sum + Number(d.value || 0) * (d.probability / 100), 0)
  const avgDealSize = deals.length > 0 ? totalPipelineValue / deals.length : 0

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(value)

  const formatCompact = (value: number) => {
    if (value >= 1000000) return `€${(value / 1000000).toFixed(1)}M`
    if (value >= 1000) return `€${(value / 1000).toFixed(0)}K`
    return formatCurrency(value)
  }

  // Calculate pipeline health metrics
  const dealsCloseThisMonth = deals.filter(d => {
    if (!d.expectedCloseDate) return false
    const closeDate = new Date(d.expectedCloseDate)
    const now = new Date()
    return closeDate.getMonth() === now.getMonth() && closeDate.getFullYear() === now.getFullYear()
  })
  const thisMonthValue = dealsCloseThisMonth.reduce((sum, d) => sum + Number(d.value || 0), 0)

  return (
    <div className="min-h-screen">
      {/* Premium Header */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 -mx-6 -mt-6 px-6 pt-6 pb-8 mb-6 rounded-b-3xl lg:rounded-b-[2.5rem]">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <span className="text-amber-400 text-sm font-medium">Sales Pipeline</span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold text-white">
              {formatCurrency(totalPipelineValue)}
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              {deals.length} actieve deals • {formatCurrency(weightedValue)} gewogen waarde
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* View Toggle - Hidden on mobile */}
            <div className="hidden lg:flex items-center bg-slate-700/50 rounded-xl p-1">
              <button
                onClick={() => setViewMode('board')}
                className={`p-2 rounded-lg transition-all ${viewMode === 'board' ? 'bg-white text-slate-900' : 'text-slate-400 hover:text-white'}`}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white text-slate-900' : 'text-slate-400 hover:text-white'}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            {/* Filter */}
            <div className="relative">
              <select
                value={ownerFilter}
                onChange={(e) => setOwnerFilter(e.target.value)}
                className="appearance-none bg-slate-700/50 text-white pl-4 pr-10 py-2.5 rounded-xl border border-slate-600 focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm"
              >
                <option value="">Alle teamleden</option>
                {team.map((member) => (
                  <option key={member.id} value={member.id}>{member.name}</option>
                ))}
              </select>
              <Filter className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
            <div className="flex items-center justify-between mb-2">
              <Target className="w-5 h-5 text-emerald-400" />
              <span className="text-xs text-emerald-400 font-medium flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> +12%
              </span>
            </div>
            <p className="text-xl lg:text-2xl font-bold text-white">{formatCompact(weightedValue)}</p>
            <p className="text-slate-400 text-xs mt-1">Verwachte omzet</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
            <div className="flex items-center justify-between mb-2">
              <Clock className="w-5 h-5 text-blue-400" />
            </div>
            <p className="text-xl lg:text-2xl font-bold text-white">{formatCompact(thisMonthValue)}</p>
            <p className="text-slate-400 text-xs mt-1">Sluit deze maand</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
            <div className="flex items-center justify-between mb-2">
              <ArrowUpRight className="w-5 h-5 text-purple-400" />
            </div>
            <p className="text-xl lg:text-2xl font-bold text-white">{formatCompact(avgDealSize)}</p>
            <p className="text-slate-400 text-xs mt-1">Gem. dealgrootte</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
            <div className="flex items-center justify-between mb-2">
              <Trophy className="w-5 h-5 text-amber-400" />
            </div>
            <p className="text-xl lg:text-2xl font-bold text-white">{deals.length}</p>
            <p className="text-slate-400 text-xs mt-1">Actieve deals</p>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-4 border-slate-200 border-t-emerald-500 rounded-full animate-spin" />
        </div>
      ) : (
        <>
          {/* Mobile Stage Selector */}
          <div className="lg:hidden mb-4 overflow-x-auto pb-2 -mx-2 px-2">
            <div className="flex gap-2">
              {stages.map((stage) => (
                <button
                  key={stage.id}
                  onClick={() => setMobileStage(stage.id)}
                  className={`flex-shrink-0 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    mobileStage === stage.id
                      ? `bg-gradient-to-r ${stage.color} text-white shadow-lg`
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {stage.label}
                  <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                    mobileStage === stage.id ? 'bg-white/20' : 'bg-slate-200'
                  }`}>
                    {getDealsByStage(stage.id).length}
                  </span>
                </button>
              ))}
              <button
                onClick={() => setMobileStage('WON' as DealStage)}
                className={`flex-shrink-0 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  mobileStage === ('WON' as DealStage)
                    ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg'
                    : 'bg-slate-100 text-slate-600'
                }`}
              >
                <Trophy className="w-4 h-4 inline mr-1" /> Gewonnen
              </button>
              <button
                onClick={() => setMobileStage('LOST' as DealStage)}
                className={`flex-shrink-0 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  mobileStage === ('LOST' as DealStage)
                    ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg'
                    : 'bg-slate-100 text-slate-600'
                }`}
              >
                <XCircle className="w-4 h-4 inline mr-1" /> Verloren
              </button>
            </div>
          </div>

          {/* Mobile Deal List */}
          <div className="lg:hidden space-y-3">
            {getDealsByStage(mobileStage).length === 0 ? (
              <div className="text-center py-12 bg-slate-50 rounded-2xl">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-slate-400" />
                </div>
                <p className="text-slate-500 font-medium">Geen deals in deze fase</p>
                <p className="text-slate-400 text-sm mt-1">Sleep deals hierheen of maak een nieuwe aan</p>
              </div>
            ) : (
              getDealsByStage(mobileStage).map((deal) => (
                <MobileDealCard key={deal.id} deal={deal} />
              ))
            )}
          </div>

          {/* Desktop Board View */}
          <div className="hidden lg:block">
            {viewMode === 'board' ? (
              <div className="space-y-6">
                {/* Main Pipeline Columns - Grid that fits */}
                <div className="grid grid-cols-4 gap-4">
                  {stages.map((stage) => (
                    <div
                      key={stage.id}
                      className={`transition-all duration-200 ${
                        dragOverStage === stage.id ? 'scale-[1.01]' : ''
                      }`}
                      onDragOver={(e) => handleDragOver(e, stage.id)}
                      onDragLeave={handleDragLeave}
                      onDrop={(e) => handleDrop(e, stage.id)}
                    >
                      {/* Column Header */}
                      <div className={`rounded-2xl p-3 mb-3 ${stage.bgColor} border-2 ${
                        dragOverStage === stage.id ? 'border-dashed border-slate-400' : 'border-transparent'
                      }`}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className={`w-2.5 h-2.5 rounded-full bg-gradient-to-r ${stage.color}`} />
                            <div>
                              <h3 className={`font-semibold text-sm ${stage.textColor}`}>{stage.label}</h3>
                              <p className="text-xs text-slate-500">{stage.probability}%</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className={`text-lg font-bold ${stage.textColor}`}>{getDealsByStage(stage.id).length}</p>
                            <p className="text-xs text-slate-500">{formatCompact(getStageValue(stage.id))}</p>
                          </div>
                        </div>
                      </div>

                      {/* Cards */}
                      <div className="space-y-2 min-h-[300px]">
                        {getDealsByStage(stage.id).map((deal) => (
                          <div
                            key={deal.id}
                            draggable
                            onDragStart={(e) => handleDragStart(e, deal.id)}
                            className={`transition-all duration-200 ${
                              draggedDeal === deal.id ? 'opacity-50 scale-95' : ''
                            }`}
                          >
                            <DesktopDealCard deal={deal} />
                          </div>
                        ))}
                        {getDealsByStage(stage.id).length === 0 && (
                          <div className={`border-2 border-dashed rounded-xl p-4 text-center ${
                            dragOverStage === stage.id
                              ? 'border-emerald-400 bg-emerald-50'
                              : 'border-slate-200'
                          }`}>
                            <p className="text-xs text-slate-400">Sleep deals hierheen</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Won/Lost Row */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Won Column */}
                  <div
                    className={`transition-all duration-200 ${
                      dragOverStage === ('WON' as DealStage) ? 'scale-[1.01]' : ''
                    }`}
                    onDragOver={(e) => handleDragOver(e, 'WON' as DealStage)}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleDrop(e, 'WON' as DealStage)}
                  >
                    <div className={`rounded-2xl p-4 bg-emerald-50 border-2 flex items-center justify-between ${
                      dragOverStage === ('WON' as DealStage) ? 'border-dashed border-emerald-400' : 'border-transparent'
                    }`}>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center">
                          <Trophy className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-emerald-700">Gewonnen</h3>
                          <p className="text-xs text-emerald-600">Sleep hier om deal te winnen</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-emerald-600">100%</p>
                      </div>
                    </div>
                  </div>

                  {/* Lost Column */}
                  <div
                    className={`transition-all duration-200 ${
                      dragOverStage === ('LOST' as DealStage) ? 'scale-[1.01]' : ''
                    }`}
                    onDragOver={(e) => handleDragOver(e, 'LOST' as DealStage)}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleDrop(e, 'LOST' as DealStage)}
                  >
                    <div className={`rounded-2xl p-4 bg-red-50 border-2 flex items-center justify-between ${
                      dragOverStage === ('LOST' as DealStage) ? 'border-dashed border-red-400' : 'border-transparent'
                    }`}>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center">
                          <XCircle className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-red-700">Verloren</h3>
                          <p className="text-xs text-red-600">Sleep hier als deal verloren is</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-red-600">0%</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* List View */
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                <table className="w-full">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Deal</th>
                      <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Klant</th>
                      <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Fase</th>
                      <th className="text-right px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Waarde</th>
                      <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Eigenaar</th>
                      <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Sluitdatum</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {deals.map((deal) => {
                      const stage = stages.find(s => s.id === deal.stage)
                      return (
                        <tr key={deal.id} className="hover:bg-slate-50 transition-colors">
                          <td className="px-6 py-4">
                            <Link href={`/admin/crm/deals/${deal.id}`} className="font-medium text-slate-900 hover:text-emerald-600">
                              {deal.name}
                            </Link>
                          </td>
                          <td className="px-6 py-4 text-slate-600">{deal.customer?.companyName}</td>
                          <td className="px-6 py-4">
                            {stage && (
                              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${stage.bgColor} ${stage.textColor}`}>
                                <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${stage.color}`} />
                                {stage.label}
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4 text-right font-semibold text-slate-900">
                            {formatCurrency(Number(deal.value || 0))}
                          </td>
                          <td className="px-6 py-4">
                            <TeamMemberBadge
                              name={deal.owner?.name || ''}
                              avatar={deal.owner?.avatar}
                              color={deal.owner?.color}
                              size="sm"
                            />
                          </td>
                          <td className="px-6 py-4 text-slate-500">
                            {deal.expectedCloseDate
                              ? format(new Date(deal.expectedCloseDate), 'd MMM yyyy', { locale: nl })
                              : '-'
                            }
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}

// Mobile Deal Card Component
function MobileDealCard({ deal }: { deal: DealWithRelations }) {
  const value = Number(deal.value || 0)
  const formattedValue = new Intl.NumberFormat('nl-NL', {
    style: 'currency',
    currency: deal.currency || 'EUR',
    maximumFractionDigits: 0
  }).format(value)

  const daysUntilClose = deal.expectedCloseDate
    ? differenceInDays(new Date(deal.expectedCloseDate), new Date())
    : null

  return (
    <Link href={`/admin/crm/deals/${deal.id}`}>
      <div className="bg-white rounded-2xl border border-slate-200 p-4 hover:shadow-lg hover:border-emerald-300 transition-all active:scale-[0.98]">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-slate-900 truncate">{deal.name}</h4>
            <div className="flex items-center gap-1.5 text-sm text-slate-500 mt-0.5">
              <Building2 className="w-3.5 h-3.5" />
              <span className="truncate">{deal.customer?.companyName}</span>
            </div>
          </div>
          <div className="text-right ml-3">
            <p className="text-lg font-bold text-emerald-600">{formattedValue}</p>
            <p className="text-xs text-slate-400">{deal.probability}% kans</p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <TeamMemberBadge
              name={deal.owner?.name || ''}
              avatar={deal.owner?.avatar}
              color={deal.owner?.color}
              size="sm"
              showName={false}
            />
            <span className="text-sm text-slate-600">{deal.owner?.name}</span>
          </div>
          {daysUntilClose !== null && (
            <div className={`flex items-center gap-1.5 text-sm ${
              daysUntilClose < 0 ? 'text-red-500' :
              daysUntilClose <= 7 ? 'text-amber-500' : 'text-slate-500'
            }`}>
              <Calendar className="w-3.5 h-3.5" />
              {daysUntilClose < 0
                ? `${Math.abs(daysUntilClose)}d te laat`
                : daysUntilClose === 0
                  ? 'Vandaag'
                  : `${daysUntilClose}d`
              }
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}

// Desktop Deal Card Component - Compact version
function DesktopDealCard({ deal }: { deal: DealWithRelations }) {
  const value = Number(deal.value || 0)
  const formattedValue = value >= 1000
    ? `€${(value / 1000).toFixed(0)}K`
    : new Intl.NumberFormat('nl-NL', { style: 'currency', currency: deal.currency || 'EUR', maximumFractionDigits: 0 }).format(value)

  const daysUntilClose = deal.expectedCloseDate
    ? differenceInDays(new Date(deal.expectedCloseDate), new Date())
    : null

  return (
    <Link href={`/admin/crm/deals/${deal.id}`}>
      <div className="bg-white rounded-lg border border-slate-200 p-3 hover:shadow-md hover:border-emerald-300 transition-all cursor-grab active:cursor-grabbing group">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h4 className="font-medium text-sm text-slate-900 line-clamp-1 group-hover:text-emerald-600 transition-colors">
            {deal.name}
          </h4>
          <span className="text-sm font-bold text-emerald-600 whitespace-nowrap">
            {formattedValue}
          </span>
        </div>

        <div className="flex items-center gap-1 text-xs text-slate-500 mb-2">
          <Building2 className="w-3 h-3 flex-shrink-0" />
          <span className="truncate">{deal.customer?.companyName}</span>
        </div>

        <div className="flex items-center justify-between">
          <TeamMemberBadge
            name={deal.owner?.name || ''}
            avatar={deal.owner?.avatar}
            color={deal.owner?.color}
            size="sm"
            showName={false}
          />
          <div className="flex items-center gap-2 text-xs text-slate-400">
            {daysUntilClose !== null && (
              <span className={`flex items-center gap-0.5 ${
                daysUntilClose < 0 ? 'text-red-500' :
                daysUntilClose <= 7 ? 'text-amber-500' : ''
              }`}>
                <Calendar className="w-3 h-3" />
                {daysUntilClose < 0 ? `${Math.abs(daysUntilClose)}d` : `${daysUntilClose}d`}
              </span>
            )}
            <span className="px-1.5 py-0.5 bg-slate-100 rounded text-[10px]">{deal.probability}%</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
