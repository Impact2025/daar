'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Search, Loader2, CheckCircle2, Building2, MapPin } from 'lucide-react'
import type { TeamMember, CustomerStatus, CustomerSource, OrganizationType, OrganizationSector } from '@/types'

interface KvkSearchResult {
  kvkNumber: string
  companyName: string
  address?: string
  postalCode?: string
  city?: string
  type?: string
}

export default function NewCustomerPage() {
  const router = useRouter()
  const [team, setTeam] = useState<TeamMember[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  // KVK Search state
  const [searchMode, setSearchMode] = useState<'kvk' | 'name'>('name')
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [searchResults, setSearchResults] = useState<KvkSearchResult[]>([])
  const [showResults, setShowResults] = useState(false)
  const [selectedCompany, setSelectedCompany] = useState<KvkSearchResult | null>(null)
  const searchRef = useRef<HTMLDivElement>(null)

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

    // Click outside handler
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const fetchTeam = async () => {
    const res = await fetch('/api/crm/team')
    const data = await res.json()
    setTeam(data)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    const newValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    setFormData((prev) => ({ ...prev, [name]: newValue }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  // Debounced search
  useEffect(() => {
    if (searchMode === 'name' && searchQuery.length >= 2) {
      const timer = setTimeout(() => {
        searchByName(searchQuery)
      }, 300)
      return () => clearTimeout(timer)
    } else {
      setSearchResults([])
    }
  }, [searchQuery, searchMode])

  const searchByName = async (query: string) => {
    setIsSearching(true)
    try {
      const res = await fetch(`/api/kvk/search?q=${encodeURIComponent(query)}`)
      const data = await res.json()
      if (data.success) {
        setSearchResults(data.results)
        setShowResults(true)
      }
    } catch (error) {
      console.error('Search error:', error)
    } finally {
      setIsSearching(false)
    }
  }

  const searchByKvk = async () => {
    const kvk = searchQuery.trim()
    if (!/^\d{8}$/.test(kvk)) {
      setErrors((prev) => ({ ...prev, search: 'KVK nummer moet 8 cijfers zijn' }))
      return
    }

    setIsSearching(true)
    setErrors((prev) => ({ ...prev, search: '' }))

    try {
      const res = await fetch(`/api/kvk/${kvk}`)
      const result = await res.json()

      if (result.success && result.data) {
        selectCompany({
          kvkNumber: kvk,
          companyName: result.data.companyName || '',
          address: result.data.address || '',
          postalCode: result.data.postalCode || '',
          city: result.data.city || '',
        })
      } else {
        setErrors((prev) => ({ ...prev, search: result.error || 'Geen bedrijf gevonden' }))
      }
    } catch (error) {
      setErrors((prev) => ({ ...prev, search: 'Kon KVK gegevens niet ophalen' }))
    } finally {
      setIsSearching(false)
    }
  }

  const selectCompany = (company: KvkSearchResult) => {
    setSelectedCompany(company)
    setFormData((prev) => ({
      ...prev,
      companyName: company.companyName || prev.companyName,
      kvkNumber: company.kvkNumber || prev.kvkNumber,
      address: company.address || prev.address,
      postalCode: company.postalCode || prev.postalCode,
      city: company.city || prev.city,
    }))
    setShowResults(false)
    setSearchQuery('')
  }

  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      if (searchMode === 'kvk') {
        searchByKvk()
      }
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

    const res = await fetch('/api/crm/customers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (res.ok) {
      const customer = await res.json()
      router.push(`/admin/crm/klanten/${customer.id}`)
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

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin/crm/klanten" className="p-2 hover:bg-gray-100 rounded-lg">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Nieuwe klant</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* KVK Search - prominent bovenaan */}
        <div className="bg-gradient-to-r from-brandGreen/10 to-blue-50 rounded-xl border border-brandGreen/20 p-6">
          <h2 className="font-semibold text-gray-900 mb-2">Zoek bedrijf via KVK</h2>
          <p className="text-sm text-gray-600 mb-4">
            Zoek op bedrijfsnaam of voer direct een KVK nummer in
          </p>

          {/* Search mode toggle */}
          <div className="flex gap-2 mb-4">
            <button
              type="button"
              onClick={() => { setSearchMode('name'); setSearchQuery(''); setSearchResults([]) }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                searchMode === 'name'
                  ? 'bg-brandGreen text-white'
                  : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              Zoek op naam
            </button>
            <button
              type="button"
              onClick={() => { setSearchMode('kvk'); setSearchQuery(''); setSearchResults([]) }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                searchMode === 'kvk'
                  ? 'bg-brandGreen text-white'
                  : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              KVK nummer
            </button>
          </div>

          {/* Search input */}
          <div className="relative" ref={searchRef}>
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleSearchKeyDown}
                  onFocus={() => searchResults.length > 0 && setShowResults(true)}
                  placeholder={searchMode === 'name' ? 'Typ bedrijfsnaam...' : 'Voer KVK nummer in (8 cijfers)'}
                  maxLength={searchMode === 'kvk' ? 8 : 100}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-brandGreen focus:border-brandGreen text-lg ${
                    searchMode === 'kvk' ? 'font-mono' : ''
                  } ${errors.search ? 'border-red-500' : 'border-gray-300'}`}
                />
                {isSearching && (
                  <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-brandGreen animate-spin" />
                )}
              </div>
              {searchMode === 'kvk' && (
                <button
                  type="button"
                  onClick={searchByKvk}
                  disabled={isSearching || searchQuery.length !== 8}
                  className="px-6 py-3 bg-brandGreen text-white rounded-lg hover:bg-brandGreen/90 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Zoeken
                </button>
              )}
            </div>

            {errors.search && (
              <p className="mt-2 text-sm text-red-500">{errors.search}</p>
            )}

            {/* Search results dropdown */}
            {showResults && searchResults.length > 0 && (
              <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-80 overflow-y-auto">
                {searchResults.map((result, index) => (
                  <button
                    key={`${result.kvkNumber}-${index}`}
                    type="button"
                    onClick={() => selectCompany(result)}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-0 flex items-start gap-3"
                  >
                    <Building2 className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900">{result.companyName}</p>
                      <div className="flex items-center gap-3 text-sm text-gray-500">
                        <span className="font-mono">KVK: {result.kvkNumber}</span>
                        {result.city && (
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {result.city}
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {showResults && searchQuery.length >= 2 && searchResults.length === 0 && !isSearching && (
              <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-4 text-center">
                <p className="text-gray-500 mb-2">Geen bedrijven gevonden voor "{searchQuery}"</p>
                <p className="text-sm text-gray-400">Vul de gegevens hieronder handmatig in</p>
              </div>
            )}
          </div>

          {/* Selected company indicator */}
          {selectedCompany && (
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
              <div>
                <p className="font-medium text-green-800">{selectedCompany.companyName}</p>
                <p className="text-sm text-green-600">KVK: {selectedCompany.kvkNumber} • Gegevens ingevuld</p>
              </div>
            </div>
          )}
        </div>

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
            href="/admin/crm/klanten"
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Annuleren
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 bg-brandGreen text-white rounded-lg hover:bg-brandGreen/90 disabled:opacity-50"
          >
            {isSubmitting ? 'Opslaan...' : 'Klant aanmaken'}
          </button>
        </div>
      </form>
    </div>
  )
}
