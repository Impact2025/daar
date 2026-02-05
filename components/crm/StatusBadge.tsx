'use client'

import { CustomerStatus, DealStage, TaskStatus, TaskPriority } from '@prisma/client'

const customerStatusConfig: Record<CustomerStatus, { label: string; color: string }> = {
  LEAD: { label: 'Lead', color: 'bg-blue-100 text-blue-800' },
  PROSPECT: { label: 'Prospect', color: 'bg-purple-100 text-purple-800' },
  NEGOTIATION: { label: 'Onderhandeling', color: 'bg-yellow-100 text-yellow-800' },
  CUSTOMER: { label: 'Klant', color: 'bg-green-100 text-green-800' },
  CHURNED: { label: 'Verloren', color: 'bg-red-100 text-red-800' },
  INACTIVE: { label: 'Inactief', color: 'bg-gray-100 text-gray-800' },
}

const dealStageConfig: Record<DealStage, { label: string; color: string }> = {
  QUALIFICATION: { label: 'Kwalificatie', color: 'bg-blue-100 text-blue-800' },
  NEEDS_ANALYSIS: { label: 'Analyse', color: 'bg-indigo-100 text-indigo-800' },
  PROPOSAL: { label: 'Offerte', color: 'bg-purple-100 text-purple-800' },
  NEGOTIATION: { label: 'Onderhandeling', color: 'bg-yellow-100 text-yellow-800' },
  CLOSED_WON: { label: 'Gewonnen', color: 'bg-green-100 text-green-800' },
  CLOSED_LOST: { label: 'Verloren', color: 'bg-red-100 text-red-800' },
}

const taskStatusConfig: Record<TaskStatus, { label: string; color: string }> = {
  TODO: { label: 'Te doen', color: 'bg-gray-100 text-gray-800' },
  IN_PROGRESS: { label: 'Bezig', color: 'bg-blue-100 text-blue-800' },
  WAITING: { label: 'Wachtend', color: 'bg-yellow-100 text-yellow-800' },
  COMPLETED: { label: 'Afgerond', color: 'bg-green-100 text-green-800' },
  CANCELLED: { label: 'Geannuleerd', color: 'bg-red-100 text-red-800' },
}

const taskPriorityConfig: Record<TaskPriority, { label: string; color: string }> = {
  LOW: { label: 'Laag', color: 'bg-gray-100 text-gray-600' },
  MEDIUM: { label: 'Medium', color: 'bg-blue-100 text-blue-700' },
  HIGH: { label: 'Hoog', color: 'bg-orange-100 text-orange-700' },
  URGENT: { label: 'Urgent', color: 'bg-red-100 text-red-700' },
}

interface StatusBadgeProps {
  type: 'customer' | 'deal' | 'task' | 'priority'
  value: CustomerStatus | DealStage | TaskStatus | TaskPriority
  size?: 'sm' | 'md'
}

export function StatusBadge({ type, value, size = 'sm' }: StatusBadgeProps) {
  let config: { label: string; color: string }

  switch (type) {
    case 'customer':
      config = customerStatusConfig[value as CustomerStatus]
      break
    case 'deal':
      config = dealStageConfig[value as DealStage]
      break
    case 'task':
      config = taskStatusConfig[value as TaskStatus]
      break
    case 'priority':
      config = taskPriorityConfig[value as TaskPriority]
      break
  }

  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-sm'

  return (
    <span className={`inline-flex items-center rounded-full font-medium ${config.color} ${sizeClasses}`}>
      {config.label}
    </span>
  )
}
