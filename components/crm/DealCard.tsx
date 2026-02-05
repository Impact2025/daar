'use client'

import { Building2, Calendar, Euro } from 'lucide-react'
import { format } from 'date-fns'
import { nl } from 'date-fns/locale'
import { TeamMemberBadge } from './TeamMemberBadge'
import type { DealWithRelations } from '@/types'

interface DealCardProps {
  deal: DealWithRelations
  onClick?: () => void
  isDragging?: boolean
}

export function DealCard({ deal, onClick, isDragging }: DealCardProps) {
  const formattedValue = deal.value
    ? new Intl.NumberFormat('nl-NL', { style: 'currency', currency: deal.currency }).format(Number(deal.value))
    : null

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-lg border border-gray-200 p-3 cursor-pointer hover:border-brandGreen hover:shadow-sm transition-all ${
        isDragging ? 'shadow-lg ring-2 ring-brandGreen' : ''
      }`}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <h4 className="font-medium text-gray-900 text-sm line-clamp-2">{deal.name}</h4>
        {formattedValue && (
          <span className="flex items-center gap-0.5 text-sm font-semibold text-brandGreen whitespace-nowrap">
            {formattedValue}
          </span>
        )}
      </div>

      {deal.customer && (
        <div className="flex items-center gap-1 text-xs text-gray-500 mb-2">
          <Building2 className="w-3 h-3" />
          <span className="truncate">{deal.customer.companyName}</span>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {deal.owner && (
            <TeamMemberBadge
              name={deal.owner.name}
              avatar={deal.owner.avatar}
              color={deal.owner.color}
              size="sm"
              showName={false}
            />
          )}
          {deal.expectedCloseDate && (
            <span className="flex items-center gap-1 text-xs text-gray-400">
              <Calendar className="w-3 h-3" />
              {format(new Date(deal.expectedCloseDate), 'd MMM', { locale: nl })}
            </span>
          )}
        </div>
        <span className="text-xs text-gray-400">{deal.probability}%</span>
      </div>
    </div>
  )
}
