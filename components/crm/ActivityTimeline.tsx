'use client'

import { format, formatDistanceToNow } from 'date-fns'
import { nl } from 'date-fns/locale'
import { ActivityIcon, getActivityLabel } from './ActivityIcon'
import { TeamMemberBadge } from './TeamMemberBadge'
import type { ActivityWithRelations } from '@/types'

interface ActivityTimelineProps {
  activities: ActivityWithRelations[]
  showCustomer?: boolean
}

export function ActivityTimeline({ activities, showCustomer = false }: ActivityTimelineProps) {
  if (activities.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        Nog geen activiteiten gelogd
      </div>
    )
  }

  // Group activities by date
  const groupedActivities = activities.reduce((groups, activity) => {
    const date = format(new Date(activity.occurredAt), 'yyyy-MM-dd')
    if (!groups[date]) {
      groups[date] = []
    }
    groups[date].push(activity)
    return groups
  }, {} as Record<string, ActivityWithRelations[]>)

  return (
    <div className="space-y-6">
      {Object.entries(groupedActivities).map(([date, dayActivities]) => (
        <div key={date}>
          <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
            {format(new Date(date), 'EEEE d MMMM', { locale: nl })}
          </h4>
          <div className="space-y-3">
            {dayActivities.map((activity) => (
              <div key={activity.id} className="flex gap-3">
                <ActivityIcon type={activity.type} size="md" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                      {activity.description && (
                        <p className="text-sm text-gray-500 mt-0.5">{activity.description}</p>
                      )}
                    </div>
                    <span className="text-xs text-gray-400 whitespace-nowrap">
                      {format(new Date(activity.occurredAt), 'HH:mm')}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mt-2">
                    <TeamMemberBadge
                      name={activity.performedBy.name}
                      avatar={activity.performedBy.avatar}
                      color={activity.performedBy.color}
                      size="sm"
                    />
                    {activity.duration && (
                      <span className="text-xs text-gray-400">{activity.duration} min</span>
                    )}
                    {showCustomer && (
                      <span className="text-xs text-gray-400">• {activity.customer.companyName}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
