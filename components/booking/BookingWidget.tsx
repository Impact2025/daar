'use client'

import { useState, useEffect } from 'react'
import { Calendar, Clock, User, Building2, Mail, Phone, ChevronLeft, ChevronRight, Check, Loader2 } from 'lucide-react'
import { Button, Input, Card, CardContent, CardHeader } from '@/components/ui'
import { cn } from '@/lib/utils'

interface BookingType {
  id: string
  slug: string
  name: string
  description: string | null
  duration: number
  price: string | null
  color: string | null
}

interface BookingWidgetProps {
  onSuccess?: (booking: any) => void
  onCancel?: () => void
  source?: 'WEBSITE' | 'CHAT'
  preSelectedType?: string
  className?: string
}

type Step = 'type' | 'date' | 'time' | 'details' | 'confirm'

export function BookingWidget({
  onSuccess,
  onCancel,
  source = 'WEBSITE',
  preSelectedType,
  className,
}: BookingWidgetProps) {
  const [step, setStep] = useState<Step>('type')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Booking types
  const [bookingTypes, setBookingTypes] = useState<BookingType[]>([])
  const [selectedType, setSelectedType] = useState<BookingType | null>(null)

  // Date selection
  const [availableDates, setAvailableDates] = useState<{ date: string; slotsCount: number }[]>([])
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [currentMonth, setCurrentMonth] = useState(new Date())

  // Time selection
  const [availableSlots, setAvailableSlots] = useState<string[]>([])
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null)

  // Contact details
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    notes: '',
  })

  // Load booking types
  useEffect(() => {
    async function loadTypes() {
      try {
        const res = await fetch('/api/bookings/types')
        const data = await res.json()
        if (data.success) {
          setBookingTypes(data.data)
          if (preSelectedType) {
            const type = data.data.find((t: BookingType) => t.slug === preSelectedType)
            if (type) {
              setSelectedType(type)
              setStep('date')
            }
          }
        }
      } catch (err) {
        console.error('Error loading booking types:', err)
      }
    }
    loadTypes()
  }, [preSelectedType])

  // Load available dates when type is selected
  useEffect(() => {
    if (!selectedType) return

    async function loadAvailability() {
      try {
        const res = await fetch(`/api/bookings/availability?bookingTypeId=${selectedType?.id}`)
        const data = await res.json()
        if (data.success) {
          setAvailableDates(data.data.availableDates)
        }
      } catch (err) {
        console.error('Error loading availability:', err)
      }
    }
    loadAvailability()
  }, [selectedType])

  // Load time slots when date is selected
  useEffect(() => {
    if (!selectedType || !selectedDate) return

    async function loadSlots() {
      try {
        const res = await fetch(
          `/api/bookings/availability?bookingTypeId=${selectedType?.id}&date=${selectedDate}`
        )
        const data = await res.json()
        if (data.success) {
          setAvailableSlots(data.data.slots)
        }
      } catch (err) {
        console.error('Error loading slots:', err)
      }
    }
    loadSlots()
  }, [selectedType, selectedDate])

  const handleSubmit = async () => {
    if (!selectedType || !selectedSlot) return

    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookingTypeId: selectedType?.id,
          startTime: selectedSlot,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          organization: formData.organization,
          notes: formData.notes,
          source,
        }),
      })

      const data = await res.json()

      if (!data.success) {
        setError(data.error)
        return
      }

      setStep('confirm')
      onSuccess?.(data.data)
    } catch (err) {
      setError('Er ging iets mis. Probeer het opnieuw.')
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('nl-NL', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    })
  }

  const formatTime = (isoStr: string) => {
    const date = new Date(isoStr)
    return date.toLocaleTimeString('nl-NL', {
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  // Calendar helpers
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const days: (Date | null)[] = []

    // Add empty slots for days before the first day
    for (let i = 0; i < (firstDay.getDay() || 7) - 1; i++) {
      days.push(null)
    }

    // Add all days in the month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i))
    }

    return days
  }

  const isDateAvailable = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0]
    return availableDates.some((d) => d.date === dateStr)
  }

  return (
    <Card className={cn('w-full max-w-lg mx-auto', className)}>
      {/* Header */}
      <CardHeader className="border-b">
        <div className="flex items-center gap-3">
          {step !== 'type' && step !== 'confirm' && (
            <button
              onClick={() => {
                if (step === 'date') setStep('type')
                else if (step === 'time') setStep('date')
                else if (step === 'details') setStep('time')
              }}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}
          <div>
            <h3 className="font-semibold text-daar-blue">
              {step === 'type' && 'Plan een afspraak'}
              {step === 'date' && 'Kies een datum'}
              {step === 'time' && 'Kies een tijd'}
              {step === 'details' && 'Jouw gegevens'}
              {step === 'confirm' && 'Bevestigd!'}
            </h3>
            {selectedType && step !== 'type' && step !== 'confirm' && (
              <p className="text-sm text-gray-500">
                {selectedType.name} ({selectedType.duration} min)
              </p>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
            {error}
          </div>
        )}

        {/* Step 1: Select Type */}
        {step === 'type' && (
          <div className="space-y-3">
            {bookingTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => {
                  setSelectedType(type)
                  setStep('date')
                }}
                className="w-full p-4 text-left border rounded-lg hover:border-brandGreen hover:bg-lightGreen/30 transition-all"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-daar-blue">{type.name}</h4>
                    {type.description && (
                      <p className="text-sm text-gray-500 mt-1">{type.description}</p>
                    )}
                    <div className="flex items-center gap-3 mt-2 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {type.duration} min
                      </span>
                    </div>
                  </div>
                  <span
                    className="px-2 py-1 text-sm font-medium rounded"
                    style={{
                      backgroundColor: type.color ? `${type.color}15` : '#EBF7F2',
                      color: type.color || '#3BA273',
                    }}
                  >
                    {type.price || 'Gratis'}
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Step 2: Select Date */}
        {step === 'date' && (
          <div>
            {/* Month navigation */}
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() =>
                  setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() - 1)))
                }
                className="p-1 hover:bg-gray-100 rounded"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="font-medium">
                {currentMonth.toLocaleDateString('nl-NL', { month: 'long', year: 'numeric' })}
              </span>
              <button
                onClick={() =>
                  setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() + 1)))
                }
                className="p-1 hover:bg-gray-100 rounded"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-1 text-center text-sm">
              {['Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za', 'Zo'].map((day) => (
                <div key={day} className="p-2 font-medium text-gray-500">
                  {day}
                </div>
              ))}
              {getDaysInMonth(currentMonth).map((date, i) => {
                if (!date) {
                  return <div key={`empty-${i}`} className="p-2" />
                }

                const isAvailable = isDateAvailable(date)
                const dateStr = date.toISOString().split('T')[0]
                const isSelected = selectedDate === dateStr
                const isPast = date < new Date(new Date().setHours(0, 0, 0, 0))

                return (
                  <button
                    key={dateStr}
                    onClick={() => {
                      if (isAvailable && !isPast) {
                        setSelectedDate(dateStr)
                        setSelectedSlot(null)
                        setStep('time')
                      }
                    }}
                    disabled={!isAvailable || isPast}
                    className={cn(
                      'p-2 rounded-lg transition-all',
                      isSelected && 'bg-brandGreen text-white',
                      !isSelected && isAvailable && !isPast && 'hover:bg-lightGreen text-daar-blue',
                      (!isAvailable || isPast) && 'text-gray-300 cursor-not-allowed'
                    )}
                  >
                    {date.getDate()}
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* Step 3: Select Time */}
        {step === 'time' && (
          <div>
            <p className="text-sm text-gray-500 mb-4">
              <Calendar className="w-4 h-4 inline mr-1" />
              {selectedDate && formatDate(selectedDate)}
            </p>

            {availableSlots.length > 0 ? (
              <div className="grid grid-cols-3 gap-2">
                {availableSlots.map((slot) => (
                  <button
                    key={slot}
                    onClick={() => {
                      setSelectedSlot(slot)
                      setStep('details')
                    }}
                    className={cn(
                      'p-3 border rounded-lg text-center transition-all',
                      selectedSlot === slot
                        ? 'border-brandGreen bg-lightGreen text-brandGreen'
                        : 'hover:border-brandGreen hover:bg-lightGreen/30'
                    )}
                  >
                    {formatTime(slot)}
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 py-8">
                Geen beschikbare tijden op deze datum.
              </p>
            )}
          </div>
        )}

        {/* Step 4: Contact Details */}
        {step === 'details' && (
          <div className="space-y-4">
            <p className="text-sm text-gray-500 mb-4">
              <Calendar className="w-4 h-4 inline mr-1" />
              {selectedDate && formatDate(selectedDate)} om {selectedSlot && formatTime(selectedSlot)}
            </p>

            <Input
              label="Naam"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Je volledige naam"
              required
            />

            <Input
              label="E-mailadres"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="je@email.nl"
              required
            />

            <Input
              label="Telefoonnummer"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="06-12345678"
            />

            <Input
              label="Organisatie"
              value={formData.organization}
              onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
              placeholder="Naam van je organisatie"
            />

            <div>
              <label className="block text-sm font-medium text-daar-blue mb-1">
                Opmerkingen (optioneel)
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Waar wil je het over hebben?"
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brandGreen focus:border-transparent"
              />
            </div>

            <Button
              onClick={handleSubmit}
              disabled={!formData.name || !formData.email || loading}
              loading={loading}
              className="w-full"
            >
              Bevestig afspraak
            </Button>
          </div>
        )}

        {/* Step 5: Confirmation */}
        {step === 'confirm' && (
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-daar-blue mb-2">
              Afspraak bevestigd!
            </h3>
            <p className="text-gray-600 mb-4">
              Je ontvangt een bevestiging per e-mail op {formData.email}
            </p>

            <div className="bg-gray-50 rounded-lg p-4 text-left mb-6">
              <p className="font-medium text-daar-blue">{selectedType?.name}</p>
              <p className="text-sm text-gray-600">
                {selectedDate && formatDate(selectedDate)} om {selectedSlot && formatTime(selectedSlot)}
              </p>
              <p className="text-sm text-gray-600">{selectedType?.duration} minuten</p>
            </div>

            {onCancel && (
              <Button variant="outline" onClick={onCancel}>
                Sluiten
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
