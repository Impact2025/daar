'use client'

import { useState, useEffect, use } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Loader2 } from 'lucide-react'
import type { TeamMember, CustomerStatus, CustomerSource, OrganizationType, OrganizationSector } from '@/types'

export default function EditCustomerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const [team, setTeam] = useState<TeamMember[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const [formData, setFormData] = useState({
    companyName: '',
    kvkNumber: '',
    vatNumber: '',
    website: '',
    industry: '',
    // Daar-specifieke velden
    organizationType: '' as OrganizationType | '',
    sector: '' as OrganizationSector | '',
    volunteerCount: '',
    paidStaffCount: '',
    currentSoftware: '',
    painPoints: '',
    desiredFeatures: '',
    annualBudget: '',
    subsidized: false,
    subsidySource: '',
    // Contact
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    contactRole: '',
    address: '',
    postalCode: '',
    city: '',
    status: 'LEAD' as CustomerStatus,
    source: 'WEBSITE' as CustomerSource,
    employeeCount: '',
    priceAgreement: '',
    hourlyRate: '',
    monthlyBudget: '',
    paymentTerms: '30',
    assignedToId: '',
    nextFollowUp: '',
    remarks: '',
  })

  useEffect(() => {
    fetchTeam()
    fetchCustomer()
  }, [id])

  const fetchTeam = async () => {
    const res = await fetch('/api/crm/team')
    const data = await res.json()
    setTeam(data)
  }

  const fetchCustomer = async () => {
    const res = await fetch(`/api/crm/customers/${id}`)
    if (res.ok) {
      const customer = await res.json()
      setFormData({
        companyName: customer.companyName || '',
        kvkNumber: customer.kvkNumber || '',
        vatNumber: customer.vatNumber || '',
        website: customer.website || '',
        industry: customer.industry || '',
        organizationType: customer.organizationType || '',
        sector: customer.sector || '',
        volunteerCount: customer.volunteerCount?.toString() || '',
        paidStaffCount: customer.paidStaffCount?.toString() || '',
        currentSoftware: customer.currentSoftware || '',
        painPoints: customer.painPoints || '',
        desiredFeatures: customer.desiredFeatures || '',
        annualBudget: customer.annualBudget?.toString() || '',
        subsidized: customer.subsidized || false,
        subsidySource: customer.subsidySource || '',
        contactName: customer.contactName || '',
        contactEmail: customer.contactEmail || '',
        contactPhone: customer.contactPhone || '',
        contactRole: customer.contactRole || '',
        address: customer.address || '',
        postalCode: customer.postalCode || '',
        city: customer.city || '',
        status: customer.status || 'LEAD',
        source: customer.source || 'WEBSITE',
        employeeCount: customer.employeeCount?.toString() || '',
        priceAgreement: customer.priceAgreement || '',
        hourlyRate: customer.hourlyRate?.toString() || '',
        monthlyBudget: customer.monthlyBudget?.toString() || '',
        paymentTerms: customer.paymentTerms?.toString() || '30',
        assignedToId: customer.assignedToId || '',
        nextFollowUp: customer.nextFollowUp ? customer.nextFollowUp.split('T')[0] : '',
        remarks: customer.remarks || '',
      })
    }
    setIsLoading(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    const newValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    setFormData((prev) => ({ ...prev, [name]: newValue }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.companyName) newErrors.companyName = 'Bedrijfsnaam is verplicht'
    if (formData.kvkNumber && !/^\d{8}$/.test(formData.kvkNumber)) {
      newErrors.kvkNumber = 'KVK nummer moet 8 cijfers zijn'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setIsSubmitting(true)

    const payload = {
      ...formData,
      organizationType: formData.organizationType || null,
      sector: formData.sector || null,
      volunteerCount: formData.volunteerCount ? parseInt(formData.volunteerCount) : null,
      paidStaffCount: formData.paidStaffCount ? parseInt(formData.paidStaffCount) : null,
      annualBudget: formData.annualBudget ? parseFloat(formData.annualBudget) : null,
      hourlyRate: formData.hourlyRate ? parseFloat(formData.hourlyRate) : null,
      monthlyBudget: formData.monthlyBudget ? parseFloat(formData.monthlyBudget) : null,
      paymentTerms: parseInt(formData.paymentTerms),
      assignedToId: formData.assignedToId || null,
      nextFollowUp: formData.nextFollowUp || null,
    }

    const res = await fetch(`/api/crm/customers/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (res.ok) {
      router.push(`/admin/crm/klanten/${id}`)
    } else {
      const error = await res.json()
      setErrors({ submit: error.error || 'Er ging iets mis' })
    }
    setIsSubmitting(false)
  }

  const statuses: { value: CustomerStatus; label: string }[] = [
    { value: 'LEAD', label: 'Lead' },
    { value: 'PROSPECT', label: 'Prospect' },
    { value: 'NEGOTIATION', label: 'In onderhandeling' },
    { value: 'CUSTOMER', label: 'Klant' },
  ]

  const sources: { value: CustomerSource; label: string }[] = [
    { value: 'WEBSITE', label: 'Website' },
    { value: 'REFERRAL', label: 'Doorverwijzing' },
    { value: 'LINKEDIN', label: 'LinkedIn' },
    { value: 'COLD_CALL', label: 'Cold call' },
    { value: 'EVENT', label: 'Event' },
    { value: 'PARTNER', label: 'Partner' },
    { value: 'CHAT', label: 'Chat widget' },
    { value: 'OTHER', label: 'Anders' },
  ]

  const organizationTypes: { value: OrganizationType; label: string }[] = [
    { value: 'STICHTING', label: 'Stichting' },
    { value: 'VERENIGING', label: 'Vereniging' },
    { value: 'GOED_DOEL', label: 'Goed doel' },
    { value: 'GEMEENTE', label: 'Gemeente' },
    { value: 'ZORGINSTELLING', label: 'Zorginstelling' },
    { value: 'WELZIJNSORG', label: 'Welzijnsorganisatie' },
    { value: 'COOPERATIE', label: 'Coöperatie' },
    { value: 'KERK', label: 'Kerkelijke organisatie' },
    { value: 'SPORTCLUB', label: 'Sportvereniging' },
    { value: 'BUURTVERENIGING', label: 'Buurt-/wijkvereniging' },
    { value: 'OVERIG', label: 'Overig' },
  ]

  const sectors: { value: OrganizationSector; label: string }[] = [
    { value: 'ZORG', label: 'Zorg & Gezondheid' },
    { value: 'WELZIJN', label: 'Welzijn & Maatschappelijk werk' },
    { value: 'SPORT', label: 'Sport & Recreatie' },
    { value: 'CULTUUR', label: 'Cultuur & Kunst' },
    { value: 'ONDERWIJS', label: 'Onderwijs & Educatie' },
    { value: 'NATUUR', label: 'Natuur & Milieu' },
    { value: 'DIEREN', label: 'Dierenwelzijn' },
    { value: 'NOODHULP', label: 'Noodhulp & Rampenbestrijding' },
    { value: 'OUDEREN', label: 'Ouderenzorg' },
    { value: 'JEUGD', label: 'Jeugd & Jongeren' },
    { value: 'RELIGIE', label: 'Religieus & Levensbeschouwelijk' },
    { value: 'INTERNATIONAAL', label: 'Internationale hulp' },
    { value: 'BUURT', label: 'Buurt & Wijk' },
    { value: 'OVERIG', label: 'Overig' },
  ]

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 text-brandGreen animate-spin" />
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <Link href={`/admin/crm/klanten/${id}`} className="p-2 hover:bg-gray-100 rounded-lg">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Klant bewerken</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Company info */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="font-semibold text-gray-900 mb-4">Bedrijfsgegevens</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Bedrijfsnaam *</label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-brandGreen focus:border-brandGreen ${
                  errors.companyName ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.companyName && <p className="mt-1 text-sm text-red-500">{errors.companyName}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">KVK nummer</label>
              <input
                type="text"
                name="kvkNumber"
                value={formData.kvkNumber}
                onChange={handleChange}
                placeholder="12345678"
                maxLength={8}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brandGreen focus:border-brandGreen font-mono"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">BTW nummer</label>
              <input
                type="text"
                name="vatNumber"
                value={formData.vatNumber}
                onChange={handleChange}
                placeholder="NL123456789B01"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brandGreen focus:border-brandGreen"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleChange}
                placeholder="https://example.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brandGreen focus:border-brandGreen"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Branche</label>
              <input
                type="text"
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                placeholder="Bijv. Zorg, Technologie"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brandGreen focus:border-brandGreen"
              />
            </div>
          </div>
        </div>

        {/* Vrijwilligersorganisatie info - Daar specifiek */}
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">🤝</span>
            <h2 className="font-semibold text-gray-900">Vrijwilligersorganisatie</h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type organisatie</label>
              <select
                name="organizationType"
                value={formData.organizationType}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brandGreen focus:border-brandGreen"
              >
                <option value="">Selecteer type...</option>
                {organizationTypes.map((t) => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sector</label>
              <select
                name="sector"
                value={formData.sector}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brandGreen focus:border-brandGreen"
              >
                <option value="">Selecteer sector...</option>
                {sectors.map((s) => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Aantal vrijwilligers</label>
              <input
                type="number"
                name="volunteerCount"
                value={formData.volunteerCount}
                onChange={handleChange}
                placeholder="Bijv. 50"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brandGreen focus:border-brandGreen"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Betaalde medewerkers</label>
              <input
                type="number"
                name="paidStaffCount"
                value={formData.paidStaffCount}
                onChange={handleChange}
                placeholder="Bijv. 5"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brandGreen focus:border-brandGreen"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Huidige software</label>
              <input
                type="text"
                name="currentSoftware"
                value={formData.currentSoftware}
                onChange={handleChange}
                placeholder="Bijv. Excel, Salesforce, geen"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brandGreen focus:border-brandGreen"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Jaarbudget organisatie (€)</label>
              <input
                type="number"
                name="annualBudget"
                value={formData.annualBudget}
                onChange={handleChange}
                step="1000"
                placeholder="Bijv. 100000"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brandGreen focus:border-brandGreen"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Belangrijkste uitdagingen</label>
              <textarea
                name="painPoints"
                value={formData.painPoints}
                onChange={handleChange}
                rows={2}
                placeholder="Bijv. roostering, communicatie met vrijwilligers, urenregistratie..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brandGreen focus:border-brandGreen resize-none"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Gewenste functionaliteiten</label>
              <textarea
                name="desiredFeatures"
                value={formData.desiredFeatures}
                onChange={handleChange}
                rows={2}
                placeholder="Bijv. planning, app voor vrijwilligers, rapportages..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brandGreen focus:border-brandGreen resize-none"
              />
            </div>
            <div className="col-span-2 flex items-center gap-4 pt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="subsidized"
                  checked={formData.subsidized}
                  onChange={handleChange}
                  className="w-4 h-4 rounded border-gray-300 text-brandGreen focus:ring-brandGreen"
                />
                <span className="text-sm text-gray-700">Ontvangt subsidie</span>
              </label>
              {formData.subsidized && (
                <input
                  type="text"
                  name="subsidySource"
                  value={formData.subsidySource}
                  onChange={handleChange}
                  placeholder="Bron (bijv. Gemeente Amsterdam)"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brandGreen focus:border-brandGreen"
                />
              )}
            </div>
          </div>
        </div>

        {/* Contact info */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="font-semibold text-gray-900 mb-4">Contactpersoon</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Naam</label>
              <input
                type="text"
                name="contactName"
                value={formData.contactName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brandGreen focus:border-brandGreen"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Functie</label>
              <input
                type="text"
                name="contactRole"
                value={formData.contactRole}
                onChange={handleChange}
                placeholder="Bijv. Directeur, Manager"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brandGreen focus:border-brandGreen"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="contactEmail"
                value={formData.contactEmail}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brandGreen focus:border-brandGreen"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Telefoon</label>
              <input
                type="tel"
                name="contactPhone"
                value={formData.contactPhone}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brandGreen focus:border-brandGreen"
              />
            </div>
          </div>
        </div>

        {/* Address */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="font-semibold text-gray-900 mb-4">Adres</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Straat en huisnummer</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brandGreen focus:border-brandGreen"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Postcode</label>
              <input
                type="text"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brandGreen focus:border-brandGreen"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Plaats</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brandGreen focus:border-brandGreen"
              />
            </div>
          </div>
        </div>

        {/* CRM info */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="font-semibold text-gray-900 mb-4">CRM</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brandGreen focus:border-brandGreen"
              >
                {statuses.map((s) => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bron</label>
              <select
                name="source"
                value={formData.source}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brandGreen focus:border-brandGreen"
              >
                {sources.map((s) => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Toegewezen aan</label>
              <select
                name="assignedToId"
                value={formData.assignedToId}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brandGreen focus:border-brandGreen"
              >
                <option value="">Niet toegewezen</option>
                {team.map((member) => (
                  <option key={member.id} value={member.id}>{member.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Volgende follow-up</label>
              <input
                type="date"
                name="nextFollowUp"
                value={formData.nextFollowUp}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brandGreen focus:border-brandGreen"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Overige opmerkingen</label>
              <textarea
                name="remarks"
                value={formData.remarks}
                onChange={handleChange}
                rows={3}
                placeholder="Extra notities over deze klant..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brandGreen focus:border-brandGreen resize-none"
              />
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="font-semibold text-gray-900 mb-4">Prijsafspraken</h2>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Uurtarief (€)</label>
              <input
                type="number"
                name="hourlyRate"
                value={formData.hourlyRate}
                onChange={handleChange}
                step="0.01"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brandGreen focus:border-brandGreen"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Maandbudget (€)</label>
              <input
                type="number"
                name="monthlyBudget"
                value={formData.monthlyBudget}
                onChange={handleChange}
                step="0.01"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brandGreen focus:border-brandGreen"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Betalingstermijn (dagen)</label>
              <input
                type="number"
                name="paymentTerms"
                value={formData.paymentTerms}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brandGreen focus:border-brandGreen"
              />
            </div>
            <div className="col-span-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">Notities over prijsafspraken</label>
              <textarea
                name="priceAgreement"
                value={formData.priceAgreement}
                onChange={handleChange}
                rows={3}
                placeholder="Bijv. 10% korting eerste 3 maanden"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brandGreen focus:border-brandGreen resize-none"
              />
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
            href={`/admin/crm/klanten/${id}`}
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
