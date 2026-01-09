'use client'

import { useState, useRef, useCallback } from 'react'
import {
  Image as ImageIcon,
  Upload,
  Link as LinkIcon,
  Trash2,
  Loader2,
  Type,
  Check,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { cn } from '@/lib/utils'

export type HeaderStyle = 'image' | 'gradient' | 'none'

interface FeaturedImagePickerProps {
  value: string
  onChange: (value: string) => void
  headerStyle: HeaderStyle
  onHeaderStyleChange: (style: HeaderStyle) => void
  title?: string
  className?: string
}

export function FeaturedImagePicker({
  value,
  onChange,
  headerStyle,
  onHeaderStyleChange,
  title = 'Titel van het artikel',
  className,
}: FeaturedImagePickerProps) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [showUrlInput, setShowUrlInput] = useState(false)
  const [urlValue, setUrlValue] = useState('')
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleUpload = async (file: File) => {
    setUploading(true)
    setError('')

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      const result = await response.json()

      if (!result.success) {
        setError(result.error || 'Upload mislukt')
        return
      }

      onChange(result.data.url)
      onHeaderStyleChange('image')
    } catch {
      setError('Upload mislukt. Probeer het opnieuw.')
    } finally {
      setUploading(false)
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleUpload(file)
    }
  }

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const file = e.dataTransfer.files?.[0]
    if (file && file.type.startsWith('image/')) {
      handleUpload(file)
    } else {
      setError('Alleen afbeeldingen zijn toegestaan')
    }
  }, [])

  const handleUrlSubmit = () => {
    if (urlValue.trim()) {
      onChange(urlValue.trim())
      onHeaderStyleChange('image')
      setShowUrlInput(false)
      setUrlValue('')
    }
  }

  const handleRemove = async () => {
    if (value && value.includes('vercel-storage')) {
      try {
        await fetch('/api/upload', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: value }),
        })
      } catch {
        // Ignore delete errors
      }
    }
    onChange('')
  }

  const styleOptions = [
    {
      id: 'image' as HeaderStyle,
      label: 'Afbeelding',
      icon: ImageIcon,
      description: 'Upload een afbeelding',
    },
    {
      id: 'gradient' as HeaderStyle,
      label: 'Groene header',
      icon: Type,
      description: 'Witte tekst op groene achtergrond',
    },
  ]

  return (
    <div className={cn('space-y-4', className)}>
      {/* Style Selection */}
      <div className="grid grid-cols-2 gap-3">
        {styleOptions.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => {
              onHeaderStyleChange(option.id)
              if (option.id === 'gradient') {
                onChange('')
              }
            }}
            className={cn(
              'p-4 rounded-xl border-2 text-left transition-all',
              headerStyle === option.id
                ? 'border-brandGreen bg-lightGreen'
                : 'border-gray-200 hover:border-gray-300 bg-white'
            )}
          >
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  'w-10 h-10 rounded-lg flex items-center justify-center',
                  headerStyle === option.id
                    ? 'bg-brandGreen text-white'
                    : 'bg-gray-100 text-gray-500'
                )}
              >
                <option.icon className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-navy">{option.label}</span>
                  {headerStyle === option.id && (
                    <Check className="w-4 h-4 text-brandGreen" />
                  )}
                </div>
                <p className="text-xs text-gray-500">{option.description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Preview */}
      <div className="rounded-xl overflow-hidden border border-gray-200">
        {headerStyle === 'gradient' ? (
          // Gradient Preview
          <div className="h-48 bg-gradient-to-br from-brandGreen to-brandGreenHover flex items-center justify-center p-6 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-4 right-4 w-32 h-32 bg-white rounded-full blur-2xl" />
              <div className="absolute bottom-4 left-4 w-48 h-48 bg-white rounded-full blur-3xl" />
            </div>
            <h3 className="text-2xl font-bold text-white text-center relative z-10 leading-tight">
              {title || 'Titel van het artikel'}
            </h3>
          </div>
        ) : value ? (
          // Image Preview
          <div className="relative">
            <img
              src={value}
              alt="Preview"
              className="w-full h-48 object-cover"
              onError={() => setError('Afbeelding kon niet worden geladen')}
            />
            <button
              type="button"
              onClick={handleRemove}
              className="absolute top-3 right-3 p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors shadow-lg"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ) : (
          // Upload Area
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={cn(
              'h-48 flex flex-col items-center justify-center p-6 transition-colors',
              dragActive
                ? 'bg-lightGreen border-2 border-dashed border-brandGreen'
                : 'bg-gray-50'
            )}
          >
            {uploading ? (
              <div className="flex flex-col items-center gap-3">
                <Loader2 className="w-8 h-8 animate-spin text-brandGreen" />
                <p className="text-sm text-gray-500">Uploaden...</p>
              </div>
            ) : showUrlInput ? (
              <div className="w-full max-w-sm space-y-3">
                <Input
                  value={urlValue}
                  onChange={(e) => setUrlValue(e.target.value)}
                  placeholder="https://..."
                  onKeyDown={(e) => e.key === 'Enter' && handleUrlSubmit()}
                />
                <div className="flex gap-2">
                  <Button size="sm" onClick={handleUrlSubmit} className="flex-1">
                    Toevoegen
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setShowUrlInput(false)}
                  >
                    Annuleren
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center mb-3">
                  <Upload className="w-6 h-6 text-gray-400" />
                </div>
                <p className="text-sm text-gray-600 mb-1">
                  Sleep een afbeelding hierheen
                </p>
                <p className="text-xs text-gray-400 mb-4">of</p>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    className="gap-2"
                  >
                    <Upload className="w-4 h-4" />
                    Upload
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setShowUrlInput(true)}
                    className="gap-2"
                  >
                    <LinkIcon className="w-4 h-4" />
                    URL
                  </Button>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Error */}
      {error && (
        <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">
          {error}
        </p>
      )}

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Info */}
      <p className="text-xs text-gray-400">
        JPG, PNG, GIF of WebP. Max 5MB.
      </p>
    </div>
  )
}
