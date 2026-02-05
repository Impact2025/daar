'use client'

import { useState, useEffect } from 'react'
import { Filter, Activity } from 'lucide-react'
import { ActivityTimeline, TeamMemberBadge } from '@/components/crm'
import type { ActivityWithRelations, TeamMember, ActivityType } from '@/types'

const activityTypes: { value: ActivityType; label: string }[] = [
  { value: 'CALL', label: 'Telefoongesprek' },
  { value: 'EMAIL_SENT', label: 'Email verstuurd' },
  { value: 'EMAIL_RECEIVED', label: 'Email ontvangen' },
  { value: 'MEETING', label: 'Meeting' },
  { value: 'VIDEO_CALL', label: 'Video call' },
  { value: 'NOTE', label: 'Notitie' },
  { value: 'DEMO', label: 'Demo' },
  { value: 'PROPOSAL', label: 'Offerte' },
  { value: 'FOLLOW_UP', label: 'Follow-up' },
  { value: 'DEAL_UPDATE', label: 'Deal update' },
]

export default function ActivitiesPage() {
  const [activities, setActivities] = useState<ActivityWithRelations[]>([])
  const [team, setTeam] = useState<TeamMember[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [typeFilter, setTypeFilter] = useState<ActivityType | ''>('')
  const [performedByFilter, setPerformedByFilter] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    fetchTeam()
  }, [])

  useEffect(() => {
    fetchActivities()
  }, [typeFilter, performedByFilter, page])

  const fetchTeam = async () => {
    const res = await fetch('/api/crm/team')
    const data = await res.json()
    setTeam(data)
  }

  const fetchActivities = async () => {
    setIsLoading(true)
    const params = new URLSearchParams()
    if (typeFilter) params.set('type', typeFilter)
    if (performedByFilter) params.set('performedById', performedByFilter)
    params.set('page', page.toString())
    params.set('pageSize', '50')

    const res = await fetch(`/api/crm/activities?${params}`)
    const data = await res.json()
    setActivities(data.data)
    setTotalPages(data.pagination.totalPages)
    setIsLoading(false)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Activiteiten</h1>
          <p className="text-gray-500">Overzicht van alle klantinteracties</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex flex-wrap gap-4">
          <select
            value={typeFilter}
            onChange={(e) => {
              setTypeFilter(e.target.value as ActivityType | '')
              setPage(1)
            }}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brandGreen focus:border-brandGreen"
          >
            <option value="">Alle types</option>
            {activityTypes.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>

          <select
            value={performedByFilter}
            onChange={(e) => {
              setPerformedByFilter(e.target.value)
              setPage(1)
            }}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brandGreen focus:border-brandGreen"
          >
            <option value="">Alle teamleden</option>
            {team.map((member) => (
              <option key={member.id} value={member.id}>{member.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Activities */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        {isLoading ? (
          <div className="text-center py-12 text-gray-500">Laden...</div>
        ) : activities.length === 0 ? (
          <div className="text-center py-12">
            <Activity className="w-12 h-12 mx-auto text-gray-300 mb-4" />
            <h3 className="font-medium text-gray-900 mb-2">Geen activiteiten gevonden</h3>
            <p className="text-gray-500">
              {typeFilter || performedByFilter
                ? 'Probeer andere filters'
                : 'Nog geen activiteiten gelogd'}
            </p>
          </div>
        ) : (
          <ActivityTimeline activities={activities} showCustomer />
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2">
          <button
            onClick={() => setPage(Math.max(1, page - 1))}
            disabled={page === 1}
            className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50"
          >
            Vorige
          </button>
          <span className="px-4 py-2 text-gray-600">
            Pagina {page} van {totalPages}
          </span>
          <button
            onClick={() => setPage(Math.min(totalPages, page + 1))}
            disabled={page === totalPages}
            className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50"
          >
            Volgende
          </button>
        </div>
      )}
    </div>
  )
}
