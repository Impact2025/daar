'use client'

import { Calendar, Building2, CheckCircle2, Circle } from 'lucide-react'
import { format, isPast, isToday } from 'date-fns'
import { nl } from 'date-fns/locale'
import { StatusBadge } from './StatusBadge'
import { TeamMemberBadge } from './TeamMemberBadge'
import type { TaskWithRelations } from '@/types'

interface TaskCardProps {
  task: TaskWithRelations
  onToggleComplete?: (taskId: string, completed: boolean) => void
  onClick?: () => void
}

export function TaskCard({ task, onToggleComplete, onClick }: TaskCardProps) {
  const isOverdue = task.dueDate && isPast(new Date(task.dueDate)) && task.status !== 'COMPLETED'
  const isDueToday = task.dueDate && isToday(new Date(task.dueDate))
  const isCompleted = task.status === 'COMPLETED'

  return (
    <div
      className={`bg-white rounded-lg border p-3 transition-all ${
        isCompleted
          ? 'border-gray-100 bg-gray-50'
          : isOverdue
          ? 'border-red-200 bg-red-50'
          : isDueToday
          ? 'border-yellow-200 bg-yellow-50'
          : 'border-gray-200 hover:border-brandGreen hover:shadow-sm'
      }`}
    >
      <div className="flex items-start gap-3">
        <button
          onClick={(e) => {
            e.stopPropagation()
            onToggleComplete?.(task.id, !isCompleted)
          }}
          className="mt-0.5 flex-shrink-0"
        >
          {isCompleted ? (
            <CheckCircle2 className="w-5 h-5 text-green-500" />
          ) : (
            <Circle className={`w-5 h-5 ${isOverdue ? 'text-red-400' : 'text-gray-300'} hover:text-brandGreen`} />
          )}
        </button>

        <div className="flex-1 min-w-0 cursor-pointer" onClick={onClick}>
          <div className="flex items-start justify-between gap-2 mb-1">
            <h4 className={`font-medium text-sm ${isCompleted ? 'text-gray-400 line-through' : 'text-gray-900'}`}>
              {task.title}
            </h4>
            <StatusBadge type="priority" value={task.priority} size="sm" />
          </div>

          {task.description && (
            <p className="text-xs text-gray-500 line-clamp-2 mb-2">{task.description}</p>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-xs text-gray-400">
              {task.customer && (
                <span className="flex items-center gap-1">
                  <Building2 className="w-3 h-3" />
                  {task.customer.companyName}
                </span>
              )}
              {task.dueDate && (
                <span className={`flex items-center gap-1 ${isOverdue ? 'text-red-500 font-medium' : ''}`}>
                  <Calendar className="w-3 h-3" />
                  {format(new Date(task.dueDate), 'd MMM HH:mm', { locale: nl })}
                </span>
              )}
            </div>

            <TeamMemberBadge
              name={task.assignedTo.name}
              avatar={task.assignedTo.avatar}
              color={task.assignedTo.color}
              size="sm"
              showName={false}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
