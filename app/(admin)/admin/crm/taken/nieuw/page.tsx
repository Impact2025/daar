'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import type { TeamMember, CustomerListItem, TaskPriority } from '@/types'

export default function NewTaskPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const prefilledCustomerId = searchParams.get('customerId')

  const [team, setTeam] = useState<TeamMember[]>([])
  const [customers, setCustomers] = useState<CustomerListItem[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'MEDIUM' as TaskPriority,
    dueDate: '',
    customerId: prefilledCustomerId || '',
    assignedToId: '',
  })

  useEffect(() => {
    fetchTeam()
    fetchCustomers()
  }, [])

  const fetchTeam = async () => {
    const res = await fetch('/api/crm/team')
    const data = await res.json()
    setTeam(data)
    if (data.length > 0 && !formData.assignedToId) {
      setFormData((prev) => ({ ...prev, assignedToId: data[0].id }))
    }
  }

  const fetchCustomers = async () => {
    const res = await fetch('/api/crm/customers?pageSize=100')
    const data = await res.json()
    setCustomers(data.data)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title || !formData.assignedToId) return

    setIsSubmitting(true)

    const res = await fetch('/api/crm/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...formData,
        customerId: formData.customerId || null,
        dueDate: formData.dueDate || null,
        createdById: formData.assignedToId,
      }),
    })

    if (res.ok) {
      router.push('/admin/crm/taken')
    }
    setIsSubmitting(false)
  }

  const priorities: { value: TaskPriority; label: string }[] = [
    { value: 'LOW', label: 'Laag' },
    { value: 'MEDIUM', label: 'Medium' },
    { value: 'HIGH', label: 'Hoog' },
    { value: 'URGENT', label: 'Urgent' },
  ]

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin/crm/taken" className="p-2 hover:bg-gray-100 rounded-lg">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Nieuwe taak</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Titel *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Bijv. Follow-up call met klant"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brandGreen focus:border-brandGreen"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Beschrijving</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              placeholder="Extra details over de taak..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brandGreen focus:border-brandGreen resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Prioriteit</label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brandGreen focus:border-brandGreen"
              >
                {priorities.map((p) => (
                  <option key={p.value} value={p.value}>{p.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Deadline</label>
              <input
                type="datetime-local"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brandGreen focus:border-brandGreen"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Toegewezen aan *</label>
              <select
                name="assignedToId"
                value={formData.assignedToId}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brandGreen focus:border-brandGreen"
                required
              >
                <option value="">Selecteer teamlid</option>
                {team.map((member) => (
                  <option key={member.id} value={member.id}>{member.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Klant (optioneel)</label>
              <select
                name="customerId"
                value={formData.customerId}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brandGreen focus:border-brandGreen"
              >
                <option value="">Geen klant</option>
                {customers.map((customer) => (
                  <option key={customer.id} value={customer.id}>{customer.companyName}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Link
            href="/admin/crm/taken"
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Annuleren
          </Link>
          <button
            type="submit"
            disabled={isSubmitting || !formData.title || !formData.assignedToId}
            className="px-6 py-2 bg-brandGreen text-white rounded-lg hover:bg-brandGreen/90 disabled:opacity-50"
          >
            {isSubmitting ? 'Opslaan...' : 'Taak aanmaken'}
          </button>
        </div>
      </form>
    </div>
  )
}
