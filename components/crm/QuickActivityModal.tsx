'use client'

import { useState } from 'react'
import { X, Phone, Mail, Video, Users, FileText, Send } from 'lucide-react'
import { ActivityType } from '@prisma/client'

interface QuickActivityModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: {
    type: ActivityType
    title: string
    description?: string
    duration?: number
  }) => Promise<void>
  customerId: string
  customerName: string
}

const activityTypes = [
  { type: 'CALL' as ActivityType, icon: Phone, label: 'Telefoongesprek', color: 'bg-green-500' },
  { type: 'EMAIL_SENT' as ActivityType, icon: Send, label: 'Email verstuurd', color: 'bg-blue-500' },
  { type: 'MEETING' as ActivityType, icon: Users, label: 'Meeting', color: 'bg-purple-500' },
  { type: 'VIDEO_CALL' as ActivityType, icon: Video, label: 'Video call', color: 'bg-indigo-500' },
  { type: 'NOTE' as ActivityType, icon: FileText, label: 'Notitie', color: 'bg-gray-500' },
]

export function QuickActivityModal({
  isOpen,
  onClose,
  onSubmit,
  customerId,
  customerName,
}: QuickActivityModalProps) {
  const [selectedType, setSelectedType] = useState<ActivityType | null>(null)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [duration, setDuration] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedType || !title) return

    setIsSubmitting(true)
    try {
      await onSubmit({
        type: selectedType,
        title,
        description: description || undefined,
        duration: duration ? parseInt(duration) : undefined,
      })
      setSelectedType(null)
      setTitle('')
      setDescription('')
      setDuration('')
      onClose()
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleTypeSelect = (type: ActivityType) => {
    setSelectedType(type)
    const typeConfig = activityTypes.find((t) => t.type === type)
    if (typeConfig && !title) {
      setTitle(`${typeConfig.label} met ${customerName}`)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-semibold text-gray-900">Log activiteit</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {/* Activity type selector */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
            <div className="flex gap-2 flex-wrap">
              {activityTypes.map((type) => (
                <button
                  key={type.type}
                  type="button"
                  onClick={() => handleTypeSelect(type.type)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all ${
                    selectedType === type.type
                      ? 'border-brandGreen bg-brandGreen/10 text-brandGreen'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <type.icon className="w-4 h-4" />
                  <span className="text-sm">{type.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Titel</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Bijv. Gesprek over implementatie"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brandGreen focus:border-brandGreen"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Notities (optioneel)</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Wat is besproken?"
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brandGreen focus:border-brandGreen resize-none"
            />
          </div>

          {/* Duration */}
          {selectedType && ['CALL', 'MEETING', 'VIDEO_CALL'].includes(selectedType) && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Duur (minuten)</label>
              <input
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="30"
                min="1"
                className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brandGreen focus:border-brandGreen"
              />
            </div>
          )}

          {/* Submit */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Annuleren
            </button>
            <button
              type="submit"
              disabled={!selectedType || !title || isSubmitting}
              className="px-4 py-2 bg-brandGreen text-white rounded-lg hover:bg-brandGreen/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? 'Opslaan...' : 'Opslaan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
