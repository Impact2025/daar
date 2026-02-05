'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Loader2 } from 'lucide-react'
import type { TeamMember } from '@/types'

type DealStage = 'QUALIFICATION' | 'NEEDS_ANALYSIS' | 'PROPOSAL' | 'NEGOTIATION' | 'CLOSED_WON' | 'CLOSED_LOST'

interface Customer {
  id: string
  companyName: string
  contactName: string
}

export default function NewDealPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const customerId = searchParams.get('customerId')

  const [team, setTeam] = useState<TeamMember[]>([])
  const [customers, setCustomers] = useState<Customer[]>([])
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    value: '',
    currency: 'EUR',
    stage: 'QUALIFICATION' as DealStage,
    expectedCloseDate: '',
    ownerId: '',
    customerId: customerId || '',
  })

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const [teamRes, customersRes] = await Promise.all([
          fetch('/api/crm/team'),
          fetch('/api/crm/customers?pageSize=1000'),
        ])

        const teamData = await teamRes.json()
        const customersData = await customersRes.json()

        setTeam(teamData)
        setCustomers(customersData.data || [])

        // If customerId is in URL, find and set the customer
        if (customerId && customersData.data) {
          const customer = customersData.data.find((c: Customer) => c.id === customerId)
          if (customer) {
            setSelectedCustomer(customer)
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [customerId])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }

    // If customer selection changes, update selectedCustomer
    if (name === 'customerId') {
      const customer = customers.find(c => c.id === value)
      setSelectedCustomer(customer || null)
    }
  }

  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.name) newErrors.name = 'Naam is verplicht'
    if (!formData.customerId) newErrors.customerId = 'Klant is verplicht'
    if (!formData.ownerId) newErrors.ownerId = 'Eigenaar is verplicht'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setIsSubmitting(true)

    const payload = {
      ...formData,
      value: formData.value ? parseFloat(formData.value) : null,
      expectedCloseDate: formData.expectedCloseDate || null,
    }

    try {
      const res = await fetch('/api/crm/deals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (res.ok) {
        // Navigate back to customer page if we came from there, otherwise to pipeline
        if (customerId) {
          router.push(`/admin/crm/klanten/${customerId}`)
        } else {
          router.push('/admin/crm/pipeline')
        }
      } else {
        const error = await res.json()
        setErrors({ submit: error.error || 'Er ging iets mis' })
      }
    } catch (error) {
      setErrors({ submit: 'Er ging iets mis bij het verbinden' })
    }
    setIsSubmitting(false)
  }

  const stages: { value: DealStage; label: string; probability: number }[] = [
    { value: 'QUALIFICATION', label: 'Kwalificatie', probability: 10 },
    { value: 'NEEDS_ANALYSIS', label: 'Behoefteanalyse', probability: 25 },
    { value: 'PROPOSAL', label: 'Offerte', probability: 50 },
    { value: 'NEGOTIATION', label: 'Onderhandeling', probability: 75 },
  ]

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 text-brandGreen animate-spin" />
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <Link
          href={customerId ? `/admin/crm/klanten/${customerId}` : '/admin/crm/pipeline'}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Nieuwe deal</h1>
          {selectedCustomer && (
            <p className="text-sm text-gray-500">Voor {selectedCustomer.companyName}</p>
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Deal info */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="font-semibold text-gray-900 mb-4">Deal informatie</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Naam *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Bijv. Website redesign, Maandelijks pakket"
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-brandGreen focus:border-brandGreen ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Beschrijving</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                placeholder="Beschrijf de deal..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brandGreen focus:border-brandGreen resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Waarde</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">€</span>
                  <input
                    type="number"
                    name="value"
                    value={formData.value}
                    onChange={handleChange}
                    step="0.01"
                    placeholder="0.00"
                    className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brandGreen focus:border-brandGreen"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Verwachte sluiting</label>
                <input
                  type="date"
                  name="expectedCloseDate"
                  value={formData.expectedCloseDate}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brandGreen focus:border-brandGreen"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fase</label>
              <select
                name="stage"
                value={formData.stage}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brandGreen focus:border-brandGreen"
              >
                {stages.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label} ({s.probability}%)
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Customer & Owner */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="font-semibold text-gray-900 mb-4">Toewijzing</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Klant *</label>
              <select
                name="customerId"
                value={formData.customerId}
                onChange={handleChange}
                disabled={!!customerId}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-brandGreen focus:border-brandGreen ${
                  errors.customerId ? 'border-red-500' : 'border-gray-300'
                } ${customerId ? 'bg-gray-50' : ''}`}
              >
                <option value="">Selecteer een klant</option>
                {customers.map((customer) => (
                  <option key={customer.id} value={customer.id}>
                    {customer.companyName} - {customer.contactName}
                  </option>
                ))}
              </select>
              {errors.customerId && <p className="mt-1 text-sm text-red-500">{errors.customerId}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Eigenaar *</label>
              <select
                name="ownerId"
                value={formData.ownerId}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-brandGreen focus:border-brandGreen ${
                  errors.ownerId ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Selecteer eigenaar</option>
                {team.map((member) => (
                  <option key={member.id} value={member.id}>
                    {member.name}
                  </option>
                ))}
              </select>
              {errors.ownerId && <p className="mt-1 text-sm text-red-500">{errors.ownerId}</p>}
            </div>
          </div>
        </div>

        {/* Submit */}
        {errors.submit && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-600">
            {errors.submit}
          </div>
        )}

        <div className="flex justify-end gap-4">
          <Link
            href={customerId ? `/admin/crm/klanten/${customerId}` : '/admin/crm/pipeline'}
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Annuleren
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 bg-brandGreen text-white rounded-lg hover:bg-brandGreen/90 disabled:opacity-50"
          >
            {isSubmitting ? 'Opslaan...' : 'Deal aanmaken'}
          </button>
        </div>
      </form>
    </div>
  )
}
