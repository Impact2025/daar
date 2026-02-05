'use client'

import Link from 'next/link'
import { Building2, Mail, Phone, Calendar, ChevronRight } from 'lucide-react'
import { format } from 'date-fns'
import { nl } from 'date-fns/locale'
import { StatusBadge } from './StatusBadge'
import { TeamMemberBadge } from './TeamMemberBadge'
import type { CustomerListItem } from '@/types'

interface CustomerCardProps {
  customer: CustomerListItem
}

export function CustomerCard({ customer }: CustomerCardProps) {
  return (
    <Link
      href={`/admin/crm/klanten/${customer.id}`}
      className="block bg-white rounded-lg border border-gray-200 p-4 hover:border-brandGreen hover:shadow-md transition-all group"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-gray-900 truncate group-hover:text-brandGreen transition-colors">
              {customer.companyName}
            </h3>
            <StatusBadge type="customer" value={customer.status} />
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
            <span className="flex items-center gap-1">
              <Building2 className="w-3.5 h-3.5" />
              {customer.contactName}
            </span>
            <span className="flex items-center gap-1">
              <Mail className="w-3.5 h-3.5" />
              {customer.contactEmail}
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs text-gray-400">
            {customer.lastContactAt && (
              <span className="flex items-center gap-1">
                <Phone className="w-3 h-3" />
                Laatste contact: {format(new Date(customer.lastContactAt), 'd MMM', { locale: nl })}
              </span>
            )}
            {customer.nextFollowUp && (
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                Follow-up: {format(new Date(customer.nextFollowUp), 'd MMM', { locale: nl })}
              </span>
            )}
            {customer._count && (
              <>
                <span>{customer._count.deals} deals</span>
                <span>{customer._count.tasks} taken</span>
              </>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          {customer.assignedTo && (
            <TeamMemberBadge
              name={customer.assignedTo.name}
              avatar={customer.assignedTo.avatar}
              color={customer.assignedTo.color}
              showName={false}
              size="sm"
            />
          )}
          <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-brandGreen transition-colors" />
        </div>
      </div>
    </Link>
  )
}
