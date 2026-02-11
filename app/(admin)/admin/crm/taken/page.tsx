'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Plus, Filter, Calendar, AlertTriangle } from 'lucide-react'
import { TaskCard, TeamMemberBadge, EditTaskModal } from '@/components/crm'
import type { TaskWithRelations, TeamMember, TaskStatus, TaskPriority } from '@/types'

export default function TasksPage() {
  const [tasks, setTasks] = useState<TaskWithRelations[]>([])
  const [team, setTeam] = useState<TeamMember[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState<TaskStatus | ''>('')
  const [priorityFilter, setPriorityFilter] = useState<TaskPriority | ''>('')
  const [assignedFilter, setAssignedFilter] = useState('')
  const [showOverdue, setShowOverdue] = useState(false)
  const [editTaskId, setEditTaskId] = useState<string | null>(null)

  useEffect(() => {
    fetchTeam()
  }, [])

  useEffect(() => {
    fetchTasks()
  }, [statusFilter, priorityFilter, assignedFilter, showOverdue])

  const fetchTeam = async () => {
    const res = await fetch('/api/crm/team')
    const data = await res.json()
    setTeam(data)
  }

  const fetchTasks = async () => {
    setIsLoading(true)
    const params = new URLSearchParams()
    if (statusFilter) params.set('status', statusFilter)
    if (priorityFilter) params.set('priority', priorityFilter)
    if (assignedFilter) params.set('assignedToId', assignedFilter)
    if (showOverdue) params.set('overdue', 'true')

    const res = await fetch(`/api/crm/tasks?${params}`)
    const data = await res.json()
    setTasks(data.data)
    setIsLoading(false)
  }

  const handleToggleComplete = async (taskId: string, completed: boolean) => {
    await fetch(`/api/crm/tasks/${taskId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: completed ? 'COMPLETED' : 'TODO' }),
    })
    fetchTasks()
  }

  const overdueTasks = tasks.filter(
    (t) => t.dueDate && new Date(t.dueDate) < new Date() && t.status !== 'COMPLETED'
  )

  const statusOptions: { value: TaskStatus; label: string }[] = [
    { value: 'TODO', label: 'Te doen' },
    { value: 'IN_PROGRESS', label: 'Bezig' },
    { value: 'WAITING', label: 'Wachtend' },
    { value: 'COMPLETED', label: 'Afgerond' },
  ]

  const priorityOptions: { value: TaskPriority; label: string }[] = [
    { value: 'URGENT', label: 'Urgent' },
    { value: 'HIGH', label: 'Hoog' },
    { value: 'MEDIUM', label: 'Medium' },
    { value: 'LOW', label: 'Laag' },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Taken</h1>
          <p className="text-gray-500">
            {tasks.filter((t) => t.status !== 'COMPLETED').length} openstaande taken
            {overdueTasks.length > 0 && (
              <span className="text-red-500"> • {overdueTasks.length} te laat</span>
            )}
          </p>
        </div>
        <Link
          href="/admin/crm/taken/nieuw"
          className="flex items-center gap-2 px-4 py-2 bg-brandGreen text-white rounded-lg hover:bg-brandGreen/90"
        >
          <Plus className="w-4 h-4" />
          Nieuwe taak
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex flex-wrap gap-4">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as TaskStatus | '')}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brandGreen focus:border-brandGreen"
          >
            <option value="">Alle statussen</option>
            {statusOptions.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>

          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value as TaskPriority | '')}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brandGreen focus:border-brandGreen"
          >
            <option value="">Alle prioriteiten</option>
            {priorityOptions.map((p) => (
              <option key={p.value} value={p.value}>{p.label}</option>
            ))}
          </select>

          <select
            value={assignedFilter}
            onChange={(e) => setAssignedFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brandGreen focus:border-brandGreen"
          >
            <option value="">Alle teamleden</option>
            {team.map((member) => (
              <option key={member.id} value={member.id}>{member.name}</option>
            ))}
          </select>

          <button
            onClick={() => setShowOverdue(!showOverdue)}
            className={`flex items-center gap-2 px-4 py-2 border rounded-lg transition-colors ${
              showOverdue
                ? 'border-red-300 bg-red-50 text-red-700'
                : 'border-gray-300 hover:bg-gray-50'
            }`}
          >
            <AlertTriangle className="w-4 h-4" />
            Te laat ({overdueTasks.length})
          </button>
        </div>
      </div>

      {/* Tasks list */}
      {isLoading ? (
        <div className="text-center py-12 text-gray-500">Laden...</div>
      ) : tasks.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <Calendar className="w-12 h-12 mx-auto text-gray-300 mb-4" />
          <h3 className="font-medium text-gray-900 mb-2">Geen taken gevonden</h3>
          <p className="text-gray-500 mb-4">
            {statusFilter || priorityFilter || assignedFilter || showOverdue
              ? 'Probeer andere filters'
              : 'Maak je eerste taak aan'}
          </p>
          <Link
            href="/admin/crm/taken/nieuw"
            className="inline-flex items-center gap-2 px-4 py-2 bg-brandGreen text-white rounded-lg hover:bg-brandGreen/90"
          >
            <Plus className="w-4 h-4" />
            Nieuwe taak
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onToggleComplete={handleToggleComplete}
              onClick={() => setEditTaskId(task.id)}
            />
          ))}
        </div>
      )}

      {/* Edit Task Modal */}
      {editTaskId && (
        <EditTaskModal
          taskId={editTaskId}
          isOpen={!!editTaskId}
          onClose={() => setEditTaskId(null)}
          onUpdate={fetchTasks}
        />
      )}
    </div>
  )
}
