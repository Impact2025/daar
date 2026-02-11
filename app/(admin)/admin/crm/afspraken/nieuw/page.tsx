'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Loader2, Plus, User } from 'lucide-react'

interface BookingType {
  id: string
  name: string
  description: string
  duration: number
  color: string | null
}

interface Customer {
  id: string
  companyName: string
  contactName: string
  contactEmail: string
  contactPhone: string | null
}

export default function NewBookingPage() {
  const router = useRouter()
  const [bookingTypes, setBookingTypes] = useState<BookingType[]>([])
  const [customers, setCustomers] = useState<Customer[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [useExistingCustomer, setUseExistingCustomer] = useState(true)

  const [formData, setFormData] = useState({
    bookingTypeId: '',
    customerId: '',
    date: '',
    time: '',
    name: '',
    email: '',
    phone: '',
    organization: '',
    notes: '',
    meetingLink: '',
  })

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const [typesRes, customersRes] = await Promise.all([
          fetch('/api/bookings/types'),
          fetch('/api/crm/customers?pageSize=1000'),
        ])

        const typesData = await typesRes.json()
        const customersData = await customersRes.json()

        setBookingTypes(typesData.data || [])
        setCustomers(customersData.data || [])
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }

    // If customer is selected, pre-fill contact info
    if (name === 'customerId' && value) {
      const customer = customers.find(c => c.id === value)
      if (customer) {
        setFormData((prev) => ({
          ...prev,
          name: customer.contactName,
          email: customer.contactEmail,
          phone: customer.contactPhone || '',
          organization: customer.companyName,
        }))
      }
    }
  }

  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.bookingTypeId) newErrors.bookingTypeId = 'Type afspraak is verplicht'
    if (!formData.date) newErrors.date = 'Datum is verplicht'
    if (!formData.time) newErrors.time = 'Tijd is verplicht'

    if (!useExistingCustomer || !formData.customerId) {
      if (!formData.name) newErrors.name = 'Naam is verplicht'
      if (!formData.email) newErrors.email = 'E-mail is verplicht'
    } else if (useExistingCustomer && !formData.customerId) {
      newErrors.customerId = 'Selecteer een klant'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setIsSubmitting(true)

    try {
      // Combine date and time into ISO string
      const startTime = new Date(`${formData.date}T${formData.time}:00`)

      const payload = {
        bookingTypeId: formData.bookingTypeId,
        startTime: startTime.toISOString(),
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        organization: formData.organization || undefined,
        notes: formData.notes || undefined,
        source: 'ADMIN' as const,
        customerId: (useExistingCustomer && formData.customerId) ? formData.customerId : undefined,
        meetingLink: formData.meetingLink || undefined,
      }

      // Create the booking
      const bookingRes = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const bookingData = await bookingRes.json()

      if (!bookingRes.ok) {
        setErrors({ submit: bookingData.error || 'Er ging iets mis' })
        setIsSubmitting(false)
        return
      }

      // Navigate to bookings page
      router.push('/admin/crm/afspraken')
    } catch (error) {
      console.error('Error creating booking:', error)
      setErrors({ submit: 'Er ging iets mis bij het maken van de afspraak' })
    }
    setIsSubmitting(false)
  }

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
          href="/admin/crm/afspraken"
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Nieuwe afspraak</h1>
          <p className="text-sm text-gray-500">Maak handmatig een afspraak aan</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Booking Type */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="font-semibold text-gray-900 mb-4">Type afspraak</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Type *</label>
            <select
              name="bookingTypeId"
              value={formData.bookingTypeId}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-brandGreen focus:border-brandGreen ${
                errors.bookingTypeId ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Selecteer type afspraak</option>
              {bookingTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name} ({type.duration} min)
                </option>
              ))}
            </select>
            {errors.bookingTypeId && (
              <p className="mt-1 text-sm text-red-500">{errors.bookingTypeId}</p>
            )}
          </div>
        </div>

        {/* Date & Time */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="font-semibold text-gray-900 mb-4">Datum & Tijd</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Datum *</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-brandGreen focus:border-brandGreen ${
                  errors.date ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.date && <p className="mt-1 text-sm text-red-500">{errors.date}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tijd *</label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-brandGreen focus:border-brandGreen ${
                  errors.time ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.time && <p className="mt-1 text-sm text-red-500">{errors.time}</p>}
            </div>
          </div>
        </div>

        {/* Contact Selection */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="font-semibold text-gray-900 mb-4">Contact</h2>

          {/* Toggle between existing customer and new contact */}
          <div className="flex gap-4 mb-4">
            <button
              type="button"
              onClick={() => {
                setUseExistingCustomer(true)
                setFormData(prev => ({ ...prev, name: '', email: '', phone: '', organization: '' }))
              }}
              className={`flex-1 py-2 px-4 rounded-lg border-2 transition-colors ${
                useExistingCustomer
                  ? 'border-brandGreen bg-brandGreen/5 text-brandGreen'
                  : 'border-gray-200 text-gray-600 hover:border-gray-300'
              }`}
            >
              Bestaande klant
            </button>
            <button
              type="button"
              onClick={() => {
                setUseExistingCustomer(false)
                setFormData(prev => ({ ...prev, customerId: '' }))
              }}
              className={`flex-1 py-2 px-4 rounded-lg border-2 transition-colors ${
                !useExistingCustomer
                  ? 'border-brandGreen bg-brandGreen/5 text-brandGreen'
                  : 'border-gray-200 text-gray-600 hover:border-gray-300'
              }`}
            >
              Nieuw contact
            </button>
          </div>

          <div className="space-y-4">
            {useExistingCustomer ? (
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
                {errors.customerId && (
                  <p className="mt-1 text-sm text-red-500">{errors.customerId}</p>
                )}
              </div>
            ) : (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Naam *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Voor- en achternaam"
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-brandGreen focus:border-brandGreen ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">E-mail *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="naam@voorbeeld.nl"
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-brandGreen focus:border-brandGreen ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Telefoonnummer</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+31 6 12345678"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brandGreen focus:border-brandGreen"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Organisatie</label>
                  <input
                    type="text"
                    name="organization"
                    value={formData.organization}
                    onChange={handleChange}
                    placeholder="Bedrijfsnaam"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brandGreen focus:border-brandGreen"
                  />
                </div>
              </>
            )}
          </div>
        </div>

        {/* Additional Details */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="font-semibold text-gray-900 mb-4">Extra informatie</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Meeting link</label>
              <input
                type="url"
                name="meetingLink"
                value={formData.meetingLink}
                onChange={handleChange}
                placeholder="https://meet.google.com/..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brandGreen focus:border-brandGreen"
              />
              <p className="mt-1 text-xs text-gray-500">Google Meet, Zoom, Teams, etc.</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Notities</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={3}
                placeholder="Extra informatie over de afspraak..."
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
            href="/admin/crm/afspraken"
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Annuleren
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 bg-brandGreen text-white rounded-lg hover:bg-brandGreen/90 disabled:opacity-50 flex items-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Afspraak maken...
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                Afspraak maken
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
