'use client'

import { useState, useEffect } from 'react'
import {
  Plus,
  Edit2,
  Trash2,
  FolderOpen,
  FileText,
  GripVertical,
  Check,
  X,
  Loader2
} from 'lucide-react'
import { Button, Input, Card, CardContent, CardHeader, Badge } from '@/components/ui'

interface Category {
  id: string
  name: string
  slug: string
  description: string | null
  icon: string | null
  color: string | null
  sortOrder: number
  _count: { articles: number }
  children: Category[]
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  // New/Edit form state
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    color: '#22c55e',
    icon: 'FolderOpen'
  })

  const presetColors = [
    '#22c55e', // green
    '#3b82f6', // blue
    '#8b5cf6', // purple
    '#f59e0b', // amber
    '#ef4444', // red
    '#ec4899', // pink
    '#06b6d4', // cyan
    '#84cc16', // lime
  ]

  useEffect(() => {
    loadCategories()
  }, [])

  async function loadCategories() {
    try {
      const res = await fetch('/api/categories')
      const data = await res.json()
      if (data.success) {
        setCategories(data.data)
      }
    } catch (err) {
      setError('Kon categorieën niet laden')
    } finally {
      setLoading(false)
    }
  }

  function generateSlug(name: string) {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
  }

  function handleNameChange(name: string) {
    setFormData(prev => ({
      ...prev,
      name,
      slug: editingId ? prev.slug : generateSlug(name)
    }))
  }

  function resetForm() {
    setFormData({ name: '', slug: '', description: '', color: '#22c55e', icon: 'FolderOpen' })
    setEditingId(null)
    setShowForm(false)
    setError('')
  }

  function startEdit(category: Category) {
    setFormData({
      name: category.name,
      slug: category.slug,
      description: category.description || '',
      color: category.color || '#22c55e',
      icon: category.icon || 'FolderOpen'
    })
    setEditingId(category.id)
    setShowForm(true)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!formData.name.trim()) {
      setError('Naam is verplicht')
      return
    }

    setSaving(true)
    setError('')

    try {
      const url = editingId ? `/api/categories/${editingId}` : '/api/categories'
      const method = editingId ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await res.json()

      if (!data.success) {
        setError(data.error || 'Er ging iets mis')
        return
      }

      await loadCategories()
      resetForm()
    } catch (err) {
      setError('Er ging iets mis')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Weet je zeker dat je "${name}" wilt verwijderen?`)) return

    try {
      const res = await fetch(`/api/categories/${id}`, { method: 'DELETE' })
      const data = await res.json()

      if (!data.success) {
        setError(data.error || 'Kon niet verwijderen')
        return
      }

      await loadCategories()
    } catch (err) {
      setError('Er ging iets mis bij verwijderen')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-brandGreen" />
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-navy">Categorieën</h1>
          <p className="text-gray-500">Beheer de categorieën voor je kennisbank</p>
        </div>
        <Button onClick={() => setShowForm(true)} className="gap-2">
          <Plus className="w-4 h-4" />
          Nieuwe categorie
        </Button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Categories list */}
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-0">
              {categories.length > 0 ? (
                <div className="divide-y divide-gray-100">
                  {categories.map((category) => (
                    <div
                      key={category.id}
                      className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="text-gray-300 cursor-move">
                        <GripVertical className="w-5 h-5" />
                      </div>

                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${category.color}20` }}
                      >
                        <FolderOpen
                          className="w-5 h-5"
                          style={{ color: category.color || '#22c55e' }}
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium text-navy">{category.name}</h3>
                          <Badge variant="default" className="text-xs">
                            {category._count.articles} artikelen
                          </Badge>
                        </div>
                        {category.description && (
                          <p className="text-sm text-gray-500 truncate">
                            {category.description}
                          </p>
                        )}
                        <p className="text-xs text-gray-400">/kennisbank/{category.slug}</p>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => startEdit(category)}
                          className="p-2 text-gray-400 hover:text-brandGreen hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(category.id, category.name)}
                          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <FolderOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 mb-4">Nog geen categorieën</p>
                  <Button onClick={() => setShowForm(true)} className="gap-2">
                    <Plus className="w-4 h-4" />
                    Maak je eerste categorie
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Form */}
        <div>
          {showForm && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-navy">
                    {editingId ? 'Categorie bewerken' : 'Nieuwe categorie'}
                  </h3>
                  <button
                    onClick={resetForm}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <X className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    label="Naam"
                    value={formData.name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    placeholder="bijv. Vrijwilligersbeheer"
                    required
                  />

                  <Input
                    label="URL slug"
                    value={formData.slug}
                    onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                    placeholder="vrijwilligersbeheer"
                    hint={`/kennisbank/${formData.slug || 'slug'}`}
                  />

                  <div>
                    <label className="block text-sm font-medium text-navy mb-1">
                      Beschrijving
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Korte beschrijving van deze categorie..."
                      rows={2}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brandGreen focus:border-transparent text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-navy mb-2">
                      Kleur
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {presetColors.map((color) => (
                        <button
                          key={color}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, color }))}
                          className={`w-8 h-8 rounded-lg transition-transform ${
                            formData.color === color ? 'ring-2 ring-offset-2 ring-navy scale-110' : ''
                          }`}
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={resetForm}
                      className="flex-1"
                    >
                      Annuleren
                    </Button>
                    <Button
                      type="submit"
                      loading={saving}
                      disabled={saving}
                      className="flex-1 gap-2"
                    >
                      <Check className="w-4 h-4" />
                      {editingId ? 'Opslaan' : 'Toevoegen'}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {!showForm && (
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <FileText className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                  <p className="text-sm text-gray-500 mb-4">
                    Categorieën helpen bezoekers om artikelen te vinden en geven structuur aan je kennisbank.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => setShowForm(true)}
                    className="gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Categorie toevoegen
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
