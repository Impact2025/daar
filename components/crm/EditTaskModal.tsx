'use client'

import { useState, useEffect } from 'react'
import { X, Loader2, Trash2 } from 'lucide-react'
import type { TaskWithRelations, TeamMember, TaskStatus, TaskPriority } from '@/types'

interface EditTaskModalProps {
  taskId: string
  isOpen: boolean
  onClose: () => void
  onUpdate: () => void
}

export function EditTaskModal({ taskId, isOpen, onClose, onUpdate }: EditTaskModalProps) {
  const [task, setTask] = useState<TaskWithRelations | null>(null)
  const [team, setTeam] = useState<TeamMember[]>([])
  const [customers, setCustomers] = useState<{ id: string; companyName: string }[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'TODO' as TaskStatus,
    priority: 'MEDIUM' as TaskPriority,
    dueDate: '',
    assignedToId: '',
    customerId: '',
  })

  useEffect(() => {
    if (isOpen && taskId) {
      fetchTask()
      fetchTeam()
      fetchCustomers()
    }
  }, [isOpen, taskId])

  const fetchTask = async () => {
    setIsLoading(true)
    try {
      const res = await fetch(`/api/crm/tasks/${taskId}`)
      const data = await res.json()
      setTask(data)
      setFormData({
        title: data.title || '',
        description: data.description || '',
        status: data.status || 'TODO',
        priority: data.priority || 'MEDIUM',
        dueDate: data.dueDate ? new Date(data.dueDate).toISOString().slice(0, 16) : '',
        assignedToId: data.assignedToId || '',
        customerId: data.customerId || '',
      })
    } catch (error) {
      console.error('Error fetching task:', error)
    }
    setIsLoading(false)
  }

  const fetchTeam = async () => {
    const res = await fetch('/api/crm/team')
    const data = await res.json()
    setTeam(data)
  }

  const fetchCustomers = async () => {
    const res = await fetch('/api/crm/customers?pageSize=100')
    const data = await res.json()
    setCustomers(data.data.map((c: any) => ({ id: c.id, companyName: c.companyName })))
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    try {
      const res = await fetch(`/api/crm/tasks/${taskId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          dueDate: formData.dueDate ? new Date(formData.dueDate).toISOString() : null,
          customerId: formData.customerId || null,
        }),
      })

      if (res.ok) {
        onUpdate()
        onClose()
      }
    } catch (error) {
      console.error('Error updating task:', error)
    }
    setIsSaving(false)
  }

  const handleDelete = async () => {
    if (!confirm('Weet je zeker dat je deze taak wilt verwijderen?')) return

    setIsDeleting(true)
    try {
      const res = await fetch(`/api/crm/tasks/${taskId}`, {
        method: 'DELETE',
      })

      if (res.ok) {
        onUpdate()
        onClose()
      }
    } catch (error) {
      console.error('Error deleting task:', error)
    }
    setIsDeleting(false)
  }

  if (!isOpen) return null

  const statusOptions: { value: TaskStatus; label: string }[] = [
    { value: 'TODO', label: 'Te doen' },
    { value: 'IN_PROGRESS', label: 'Bezig' },
    { value: 'WAITING', label: 'Wachtend' },
    { value: 'COMPLETED', label: 'Afgerond' },
    { value: 'CANCELLED', label: 'Geannuleerd' },
  ]

  const priorityOptions: { value: TaskPriority; label: string }[] = [
    { value: 'URGENT', label: 'Urgent' },
    { value: 'HIGH', label: 'Hoog' },
    { value: 'MEDIUM', label: 'Medium' },
    { value: 'LOW', label: 'Laag' },
  ]

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div
        className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Taak bewerken</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 text-brandGreen animate-spin" />
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Titel *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brandGreen focus:border-brandGreen"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Beschrijving
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brandGreen focus:border-brandGreen resize-none"
              />
            </div>

            {/* Status & Priority */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brandGreen focus:border-brandGreen"
                >
                  {statusOptions.map((s) => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Prioriteit
                </label>
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brandGreen focus:border-brandGreen"
                >
                  {priorityOptions.map((p) => (
                    <option key={p.value} value={p.value}>{p.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Assigned To & Customer */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Toegewezen aan
                </label>
                <select
                  name="assignedToId"
                  value={formData.assignedToId}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brandGreen focus:border-brandGreen"
                >
                  {team.map((member) => (
                    <option key={member.id} value={member.id}>{member.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Klant
                </label>
                <select
                  name="customerId"
                  value={formData.customerId}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brandGreen focus:border-brandGreen"
                >
                  <option value="">Geen klant</option>
                  {customers.map((c) => (
                    <option key={c.id} value={c.id}>{c.companyName}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Due Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Deadline
              </label>
              <input
                type="datetime-local"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brandGreen focus:border-brandGreen"
              />
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={handleDelete}
                disabled={isDeleting}
                className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
              >
                <Trash2 className="w-4 h-4" />
                {isDeleting ? 'Verwijderen...' : 'Verwijderen'}
              </button>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Annuleren
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-4 py-2 bg-brandGreen text-white rounded-lg hover:bg-brandGreen/90 disabled:opacity-50"
                >
                  {isSaving ? 'Opslaan...' : 'Opslaan'}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
