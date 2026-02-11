'use client'

import { useState, useEffect, use } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Loader2 } from 'lucide-react'
import type { TeamMember } from '@/types'

type DealStage = 'QUALIFICATION' | 'NEEDS_ANALYSIS' | 'PROPOSAL' | 'NEGOTIATION' | 'CLOSED_WON' | 'CLOSED_LOST'

interface Customer {
  id: string
  companyName: string
  contactName: string
}

interface DealDetail {
  id: string
  name: string
  description: string | null
  value: number | null
  currency: string
  stage: DealStage
  probability: number
  expectedCloseDate: Date | null
  lostReason: string | null
  wonReason: string | null
  competitorName: string | null
  customerId: string
  ownerId: string
}

export default function EditDealPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const [team, setTeam] = useState<TeamMember[]>([])
  const [customers, setCustomers] = useState<Customer[]>([])
  const [deal, setDeal] = useState<DealDetail | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    value: '',
    currency: 'EUR',
    stage: 'QUALIFICATION' as DealStage,
    probability: '10',
    expectedCloseDate: '',
    ownerId: '',
    customerId: '',
    wonReason: '',
    lostReason: '',
    competitorName: '',
  })

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const [dealRes, teamRes, customersRes] = await Promise.all([
          fetch(`/api/crm/deals/${id}`),
          fetch('/api/crm/team'),
          fetch('/api/crm/customers?pageSize=1000'),
        ])

        const dealData = await dealRes.json()
        const teamData = await teamRes.json()
        const customersData = await customersRes.json()

        setDeal(dealData)
        setTeam(teamData)
        setCustomers(customersData.data || [])

        // Populate form
        setFormData({
          name: dealData.name || '',
          description: dealData.description || '',
          value: dealData.value ? String(dealData.value) : '',
          currency: dealData.currency || 'EUR',
          stage: dealData.stage || 'QUALIFICATION',
          probability: String(dealData.probability || 10),
          expectedCloseDate: dealData.expectedCloseDate
            ? new Date(dealData.expectedCloseDate).toISOString().split('T')[0]
            : '',
          ownerId: dealData.ownerId || '',
          customerId: dealData.customerId || '',
          wonReason: dealData.wonReason || '',
          lostReason: dealData.lostReason || '',
          competitorName: dealData.competitorName || '',
        })
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }

    // Auto-update probability when stage changes
    if (name === 'stage') {
      const stageProbabilities: Record<DealStage, number> = {
        QUALIFICATION: 10,
        NEEDS_ANALYSIS: 25,
        PROPOSAL: 50,
        NEGOTIATION: 75,
        CLOSED_WON: 100,
        CLOSED_LOST: 0,
      }
      setFormData((prev) => ({
        ...prev,
        probability: String(stageProbabilities[value as DealStage]),
      }))
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
      probability: parseInt(formData.probability),
      expectedCloseDate: formData.expectedCloseDate || null,
      wonReason: formData.wonReason || null,
      lostReason: formData.lostReason || null,
      competitorName: formData.competitorName || null,
    }

    try {
      const res = await fetch(`/api/crm/deals/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (res.ok) {
        router.push(`/admin/crm/deals/${id}`)
      } else {
        const error = await res.json()
        setErrors({ submit: error.error || 'Er ging iets mis' })
      }
    } catch (error) {
      setErrors({ submit: 'Er ging iets mis bij het verbinden' })
    }
    setIsSubmitting(false)
  }

  const stages: { value: DealStage; label: string }[] = [
    { value: 'QUALIFICATION', label: 'Kwalificatie' },
    { value: 'NEEDS_ANALYSIS', label: 'Behoefteanalyse' },
    { value: 'PROPOSAL', label: 'Offerte' },
    { value: 'NEGOTIATION', label: 'Onderhandeling' },
    { value: 'CLOSED_WON', label: 'Gewonnen' },
    { value: 'CLOSED_LOST', label: 'Verloren' },
  ]

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 text-brandGreen animate-spin" />
      </div>
    )
  }

  if (!deal) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Deal niet gevonden</h2>
        <Link href="/admin/crm/pipeline" className="text-brandGreen hover:underline">
          Terug naar pipeline
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <Link
          href={`/admin/crm/deals/${id}`}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Deal bewerken</h1>
          <p className="text-sm text-gray-500">{deal.name}</p>
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

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fase *</label>
                <select
                  name="stage"
                  value={formData.stage}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brandGreen focus:border-brandGreen"
                >
                  {stages.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Kans (%)</label>
                <input
                  type="number"
                  name="probability"
                  value={formData.probability}
                  onChange={handleChange}
                  min="0"
                  max="100"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brandGreen focus:border-brandGreen"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Won/Lost details */}
        {(formData.stage === 'CLOSED_WON' || formData.stage === 'CLOSED_LOST') && (
          <div className={`rounded-xl border p-6 ${
            formData.stage === 'CLOSED_WON' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
          }`}>
            <h2 className={`font-semibold mb-4 ${
              formData.stage === 'CLOSED_WON' ? 'text-green-900' : 'text-red-900'
            }`}>
              {formData.stage === 'CLOSED_WON' ? 'Deal gewonnen' : 'Deal verloren'}
            </h2>
            <div className="space-y-4">
              {formData.stage === 'CLOSED_WON' ? (
                <div>
                  <label className="block text-sm font-medium text-green-800 mb-1">
                    Reden gewonnen
                  </label>
                  <textarea
                    name="wonReason"
                    value={formData.wonReason}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Waarom hebben we deze deal gewonnen?"
                    className="w-full px-4 py-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 resize-none"
                  />
                </div>
              ) : (
                <>
                  <div>
                    <label className="block text-sm font-medium text-red-800 mb-1">
                      Reden verloren
                    </label>
                    <textarea
                      name="lostReason"
                      value={formData.lostReason}
                      onChange={handleChange}
                      rows={3}
                      placeholder="Waarom hebben we deze deal verloren?"
                      className="w-full px-4 py-2 border border-red-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-red-800 mb-1">
                      Concurrent
                    </label>
                    <input
                      type="text"
                      name="competitorName"
                      value={formData.competitorName}
                      onChange={handleChange}
                      placeholder="Wie heeft de deal gewonnen?"
                      className="w-full px-4 py-2 border border-red-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        )}

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
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-brandGreen focus:border-brandGreen ${
                  errors.customerId ? 'border-red-500' : 'border-gray-300'
                }`}
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
            href={`/admin/crm/deals/${id}`}
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Annuleren
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 bg-brandGreen text-white rounded-lg hover:bg-brandGreen/90 disabled:opacity-50"
          >
            {isSubmitting ? 'Opslaan...' : 'Wijzigingen opslaan'}
          </button>
        </div>
      </form>
    </div>
  )
}
