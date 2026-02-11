'use client'

import { useState, useEffect, use } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft,
  Building2,
  Mail,
  Phone,
  Calendar,
  Euro,
  Edit2,
  Trash2,
  User,
  TrendingUp,
  Target,
} from 'lucide-react'
import { Badge } from '@/components/ui'
import { format } from 'date-fns'
import { nl } from 'date-fns/locale'
import { StatusBadge, TeamMemberBadge } from '@/components/crm'
import type { TeamMember } from '@/types'

type DealStage = 'QUALIFICATION' | 'NEEDS_ANALYSIS' | 'PROPOSAL' | 'NEGOTIATION' | 'CLOSED_WON' | 'CLOSED_LOST'

interface DealDetail {
  id: string
  name: string
  description: string | null
  value: number | null
  currency: string
  stage: DealStage
  probability: number
  expectedCloseDate: Date | null
  actualCloseDate: Date | null
  lostReason: string | null
  wonReason: string | null
  competitorName: string | null
  createdAt: Date
  updatedAt: Date
  customer: {
    id: string
    companyName: string
    contactName: string
    contactEmail: string
    contactPhone: string | null
  }
  owner: {
    id: string
    name: string
    avatar: string | null
    color: string
  }
}

const stageLabels: Record<DealStage, string> = {
  QUALIFICATION: 'Kwalificatie',
  NEEDS_ANALYSIS: 'Behoefteanalyse',
  PROPOSAL: 'Offerte',
  NEGOTIATION: 'Onderhandeling',
  CLOSED_WON: 'Gewonnen',
  CLOSED_LOST: 'Verloren',
}

const stageColors: Record<DealStage, string> = {
  QUALIFICATION: 'bg-gray-100 text-gray-700',
  NEEDS_ANALYSIS: 'bg-blue-100 text-blue-700',
  PROPOSAL: 'bg-purple-100 text-purple-700',
  NEGOTIATION: 'bg-orange-100 text-orange-700',
  CLOSED_WON: 'bg-green-100 text-green-700',
  CLOSED_LOST: 'bg-red-100 text-red-700',
}

export default function DealDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const [deal, setDeal] = useState<DealDetail | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchDeal()
  }, [id])

  const fetchDeal = async () => {
    setIsLoading(true)
    try {
      const res = await fetch(`/api/crm/deals/${id}`)
      if (res.ok) {
        const data = await res.json()
        setDeal(data)
      }
    } catch (error) {
      console.error('Error fetching deal:', error)
    }
    setIsLoading(false)
  }

  const handleDelete = async () => {
    if (!confirm('Weet je zeker dat je deze deal wilt verwijderen?')) return
    const res = await fetch(`/api/crm/deals/${id}`, { method: 'DELETE' })
    if (res.ok) {
      router.push('/admin/crm/pipeline')
    }
  }

  if (isLoading) {
    return <div className="text-center py-12 text-gray-500">Laden...</div>
  }

  if (!deal) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Deal niet gevonden</h2>
        <Link href="/admin/crm/pipeline" className="text-brandGreen hover:underline">
          Terug naar pipeline
        </Link>
      </div>
    )
  }

  const formattedValue = deal.value
    ? new Intl.NumberFormat('nl-NL', { style: 'currency', currency: deal.currency }).format(Number(deal.value))
    : null

  const isClosed = deal.stage === 'CLOSED_WON' || deal.stage === 'CLOSED_LOST'

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          <Link
            href="/admin/crm/pipeline"
            className="mt-1 p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-2xl font-bold text-gray-900">{deal.name}</h1>
              <Badge className={stageColors[deal.stage]}>
                {stageLabels[deal.stage]}
              </Badge>
            </div>
            <p className="text-gray-500">
              {formattedValue && `${formattedValue} • `}
              {deal.probability}% kans
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href={`/admin/crm/deals/${id}/bewerken`}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <Edit2 className="w-4 h-4" />
            Bewerken
          </Link>
          <button
            onClick={handleDelete}
            className="flex items-center gap-2 px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50"
          >
            <Trash2 className="w-4 h-4" />
            Verwijderen
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - Info */}
        <div className="space-y-6">
          {/* Customer info */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="font-semibold text-gray-900 mb-4">Klant</h3>
            <div className="space-y-3">
              <Link
                href={`/admin/crm/klanten/${deal.customer.id}`}
                className="flex items-center gap-3 hover:text-brandGreen"
              >
                <Building2 className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="font-medium">{deal.customer.companyName}</p>
                  <p className="text-sm text-gray-500">{deal.customer.contactName}</p>
                </div>
              </Link>
              <a
                href={`mailto:${deal.customer.contactEmail}`}
                className="flex items-center gap-3 text-brandGreen hover:underline"
              >
                <Mail className="w-4 h-4 text-gray-400" />
                {deal.customer.contactEmail}
              </a>
              {deal.customer.contactPhone && (
                <a
                  href={`tel:${deal.customer.contactPhone}`}
                  className="flex items-center gap-3 text-brandGreen hover:underline"
                >
                  <Phone className="w-4 h-4 text-gray-400" />
                  {deal.customer.contactPhone}
                </a>
              )}
            </div>
          </div>

          {/* Owner */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="font-semibold text-gray-900 mb-4">Eigenaar</h3>
            <TeamMemberBadge
              name={deal.owner.name}
              avatar={deal.owner.avatar}
              color={deal.owner.color}
            />
          </div>

          {/* Timeline */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="font-semibold text-gray-900 mb-4">Tijdlijn</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Aangemaakt</span>
                <span className="font-medium">
                  {format(new Date(deal.createdAt), 'd MMM yyyy', { locale: nl })}
                </span>
              </div>
              {deal.expectedCloseDate && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Verwachte sluiting</span>
                  <span className="font-medium">
                    {format(new Date(deal.expectedCloseDate), 'd MMM yyyy', { locale: nl })}
                  </span>
                </div>
              )}
              {deal.actualCloseDate && (
                <div className="flex justify-between">
                  <span className="text-gray-500">
                    {deal.stage === 'CLOSED_WON' ? 'Gewonnen op' : 'Verloren op'}
                  </span>
                  <span className="font-medium">
                    {format(new Date(deal.actualCloseDate), 'd MMM yyyy', { locale: nl })}
                  </span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-500">Laatst bijgewerkt</span>
                <span className="font-medium">
                  {format(new Date(deal.updatedAt), 'd MMM yyyy', { locale: nl })}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right column - Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Description */}
          {deal.description && (
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h3 className="font-semibold text-gray-900 mb-4">Beschrijving</h3>
              <p className="text-gray-700 whitespace-pre-wrap">{deal.description}</p>
            </div>
          )}

          {/* Won/Lost details */}
          {deal.stage === 'CLOSED_WON' && deal.wonReason && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-5">
              <h3 className="font-semibold text-green-900 mb-2 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Reden gewonnen
              </h3>
              <p className="text-green-800">{deal.wonReason}</p>
            </div>
          )}

          {deal.stage === 'CLOSED_LOST' && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-5">
              <h3 className="font-semibold text-red-900 mb-3">Details verlies</h3>
              <div className="space-y-2 text-sm">
                {deal.lostReason && (
                  <div>
                    <span className="text-red-700 font-medium">Reden: </span>
                    <span className="text-red-800">{deal.lostReason}</span>
                  </div>
                )}
                {deal.competitorName && (
                  <div>
                    <span className="text-red-700 font-medium">Concurrent: </span>
                    <span className="text-red-800">{deal.competitorName}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Pipeline progress */}
          {!isClosed && (
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h3 className="font-semibold text-gray-900 mb-4">Pipeline voortgang</h3>
              <div className="space-y-4">
                {/* Progress bar */}
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Kans op sluiting</span>
                    <span className="font-semibold text-brandGreen">{deal.probability}%</span>
                  </div>
                  <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-brandGreen rounded-full transition-all"
                      style={{ width: `${deal.probability}%` }}
                    />
                  </div>
                </div>

                {/* Stages */}
                <div className="space-y-2">
                  {(['QUALIFICATION', 'NEEDS_ANALYSIS', 'PROPOSAL', 'NEGOTIATION'] as DealStage[]).map((stage) => {
                    const isCurrentStage = deal.stage === stage
                    const stages: DealStage[] = ['QUALIFICATION', 'NEEDS_ANALYSIS', 'PROPOSAL', 'NEGOTIATION']
                    const isPastStage = stages.indexOf(deal.stage) > stages.indexOf(stage)

                    return (
                      <div
                        key={stage}
                        className={`flex items-center gap-3 p-3 rounded-lg ${
                          isCurrentStage ? 'bg-brandGreen/10 border border-brandGreen' :
                          isPastStage ? 'bg-gray-50' : 'bg-white border border-gray-200'
                        }`}
                      >
                        <div
                          className={`w-3 h-3 rounded-full ${
                            isCurrentStage ? 'bg-brandGreen' :
                            isPastStage ? 'bg-gray-400' : 'bg-gray-200'
                          }`}
                        />
                        <span className={`text-sm ${
                          isCurrentStage ? 'font-semibold text-brandGreen' :
                          isPastStage ? 'text-gray-500' : 'text-gray-400'
                        }`}>
                          {stageLabels[stage]}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Quick actions */}
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex flex-wrap gap-2">
              <Link
                href={`/admin/crm/klanten/${deal.customer.id}`}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <Building2 className="w-4 h-4" />
                Bekijk klant
              </Link>
              <Link
                href={`/admin/crm/deals/${id}/bewerken`}
                className="flex items-center gap-2 px-4 py-2 bg-brandGreen text-white rounded-lg hover:bg-brandGreen/90"
              >
                <Edit2 className="w-4 h-4" />
                Deal bewerken
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
