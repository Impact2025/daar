'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Save, Eye, Sparkles, Loader2, Wand2, Calendar } from 'lucide-react'
import { Button, Input, Card, CardContent, CardHeader } from '@/components/ui'
import { WYSIWYGEditor } from '@/components/admin/WYSIWYGEditor'
import { FeaturedImagePicker, HeaderStyle } from '@/components/admin/FeaturedImagePicker'
import { BlogWizard } from '@/components/admin/BlogWizard'
import { generateSlug } from '@/lib/utils'

export default function EditArticlePage() {
  const router = useRouter()
  const params = useParams()
  const slug = params.slug as string

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  // AI state
  const [aiLoading, setAiLoading] = useState<string | null>(null)
  const [aiResult, setAiResult] = useState<string | null>(null)

  // Form state
  const [title, setTitle] = useState('')
  const [articleSlug, setArticleSlug] = useState('')
  const [content, setContent] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [metaTitle, setMetaTitle] = useState('')
  const [metaDescription, setMetaDescription] = useState('')
  const [featuredImage, setFeaturedImage] = useState('')
  const [headerStyle, setHeaderStyle] = useState<HeaderStyle>('image')
  const [status, setStatus] = useState<'DRAFT' | 'PUBLISHED'>('DRAFT')
  const [publishedAt, setPublishedAt] = useState('')
  const [articleType, setArticleType] = useState<'KENNISBANK' | 'BLOG'>('KENNISBANK')

  // Load article data
  useEffect(() => {
    async function loadArticle() {
      try {
        const response = await fetch(`/api/articles/${slug}`)
        const data = await response.json()

        if (!data.success) {
          setError(data.error || 'Artikel niet gevonden')
          return
        }

        const article = data.data
        setTitle(article.title || '')
        setArticleSlug(article.slug || '')
        setContent(article.content || '')
        setExcerpt(article.excerpt || '')
        setMetaTitle(article.metaTitle || '')
        setMetaDescription(article.metaDescription || '')
        setFeaturedImage(article.featuredImage || '')
        setHeaderStyle((article.headerStyle as HeaderStyle) || 'image')
        setStatus(article.status === 'PUBLISHED' ? 'PUBLISHED' : 'DRAFT')
        setArticleType(article.type === 'BLOG' ? 'BLOG' : 'KENNISBANK')
        // Format date for datetime-local input
        if (article.publishedAt) {
          const date = new Date(article.publishedAt)
          setPublishedAt(date.toISOString().slice(0, 16))
        }
      } catch (err) {
        setError('Er ging iets mis bij het laden van het artikel')
      } finally {
        setLoading(false)
      }
    }

    loadArticle()
  }, [slug])

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle)
  }

  // AI Assistant functions
  const callAI = async (type: string, data: Record<string, string>) => {
    setAiLoading(type)
    setAiResult(null)
    setError('')

    try {
      const response = await fetch('/api/admin/ai-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, data }),
      })

      const result = await response.json()

      if (!result.success) {
        setError(result.error || 'AI fout')
        return null
      }

      setAiResult(result.data.content)
      return result.data.content
    } catch {
      setError('Kon AI niet bereiken')
      return null
    } finally {
      setAiLoading(null)
    }
  }

  const handleGenerateOutline = async () => {
    if (!title.trim()) {
      setError('Vul eerst een titel in')
      return
    }
    await callAI('outline', { topic: title })
  }

  const handleRewriteVoice = async () => {
    // Get plain text from HTML content
    const tempDiv = document.createElement('div')
    tempDiv.innerHTML = content
    const plainText = tempDiv.textContent || tempDiv.innerText || ''

    if (!plainText.trim()) {
      setError('Vul eerst inhoud in om te herschrijven')
      return
    }

    const result = await callAI('voice', { text: plainText.substring(0, 3000) })
    if (result) {
      // Convert result to HTML paragraphs
      const htmlContent = result.split('\n\n').map((p: string) => `<p>${p}</p>`).join('')
      setContent(htmlContent)
      setAiResult(null)
    }
  }

  const handleGenerateMeta = async () => {
    const tempDiv = document.createElement('div')
    tempDiv.innerHTML = content
    const plainText = tempDiv.textContent || tempDiv.innerText || ''

    const result = await callAI('meta', {
      title,
      content: plainText.substring(0, 2000)
    })
    if (result) {
      setMetaDescription(result.substring(0, 160))
      setAiResult(null)
    }
  }

  const handleSave = async (publishStatus: 'DRAFT' | 'PUBLISHED' = status) => {
    if (!title.trim()) {
      setError('Titel is verplicht')
      return
    }
    if (!content.trim()) {
      setError('Inhoud is verplicht')
      return
    }

    setSaving(true)
    setError('')

    try {
      const response = await fetch(`/api/articles/${slug}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          slug: articleSlug || generateSlug(title),
          content,
          excerpt,
          metaTitle,
          metaDescription,
          featuredImage: featuredImage || null,
          headerStyle,
          type: articleType,
          status: publishStatus,
          publishedAt: publishedAt ? new Date(publishedAt).toISOString() : null,
        }),
      })

      const data = await response.json()

      if (!data.success) {
        setError(data.error || 'Er ging iets mis')
        return
      }

      // If slug changed, redirect to new URL
      if (data.data.slug !== slug) {
        router.push(`/admin/artikelen/${data.data.slug}/bewerken`)
      }
      router.refresh()
    } catch (err) {
      setError('Er ging iets mis. Probeer het opnieuw.')
    } finally {
      setSaving(false)
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
        <div className="flex items-center gap-4">
          <Link
            href="/admin/artikelen"
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-navy">Artikel bewerken</h1>
            <p className="text-gray-500">Pas het artikel aan</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href={`/${articleType === 'BLOG' ? 'blog' : 'kennisbank'}/${articleSlug}`}
            target="_blank"
            className="px-4 py-2 text-sm text-gray-600 hover:text-brandGreen transition-colors"
          >
            Bekijk artikel →
          </Link>
          <Button
            variant="outline"
            onClick={() => handleSave('DRAFT')}
            disabled={saving}
            className="gap-2"
          >
            <Save className="w-4 h-4" />
            Opslaan als concept
          </Button>
          <Button
            onClick={() => handleSave('PUBLISHED')}
            disabled={saving}
            loading={saving}
            className="gap-2"
          >
            <Eye className="w-4 h-4" />
            {status === 'PUBLISHED' ? 'Bijwerken' : 'Publiceren'}
          </Button>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardContent className="p-6 space-y-6">
              <Input
                label="Titel"
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="De titel van je artikel"
                className="text-xl font-medium"
              />

              <Input
                label="URL slug"
                value={articleSlug}
                onChange={(e) => setArticleSlug(e.target.value)}
                placeholder="artikel-url"
                hint={`/${articleType === 'BLOG' ? 'blog' : 'kennisbank'}/${articleSlug || 'artikel-url'}`}
              />

              <div>
                <label className="block text-sm font-medium text-navy mb-2">
                  Inhoud
                </label>
                <WYSIWYGEditor
                  content={content}
                  onChange={setContent}
                  placeholder="Begin met schrijven... Gebruik de DAAR-stem: wij-vorm, professioneel maar warm."
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Blog AI Wizard - alleen zichtbaar voor Blog artikelen */}
          {articleType === 'BLOG' && (
            <BlogWizard
              title={title}
              content={content}
              onApplyMetaTitle={setMetaTitle}
              onApplyMetaDescription={setMetaDescription}
              onApplyExcerpt={setExcerpt}
              onApplyContent={setContent}
            />
          )}

          {/* Status & Publicatie */}
          <Card>
            <CardHeader>
              <h3 className="font-semibold text-navy">Status & Publicatie</h3>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    status === 'PUBLISHED'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}
                >
                  {status === 'PUBLISHED' ? 'Gepubliceerd' : 'Concept'}
                </span>
              </div>

              <div>
                <label className="block text-sm font-medium text-navy mb-1">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    Publicatiedatum
                  </span>
                </label>
                <input
                  type="datetime-local"
                  value={publishedAt}
                  onChange={(e) => setPublishedAt(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brandGreen focus:border-transparent text-sm"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Wordt automatisch ingesteld bij eerste publicatie
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Type */}
          <Card>
            <CardHeader>
              <h3 className="font-semibold text-navy">Type artikel</h3>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setArticleType('KENNISBANK')}
                  className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium border transition-colors ${
                    articleType === 'KENNISBANK'
                      ? 'bg-brandGreen text-white border-brandGreen'
                      : 'bg-white text-gray-600 border-gray-300 hover:border-brandGreen'
                  }`}
                >
                  Kennisbank
                </button>
                <button
                  type="button"
                  onClick={() => setArticleType('BLOG')}
                  className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium border transition-colors ${
                    articleType === 'BLOG'
                      ? 'bg-daar-blue text-white border-daar-blue'
                      : 'bg-white text-gray-600 border-gray-300 hover:border-daar-blue'
                  }`}
                >
                  Blog
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                {articleType === 'BLOG'
                  ? 'Verschijnt op /blog'
                  : 'Verschijnt op /kennisbank'}
              </p>
            </CardContent>
          </Card>

          {/* AI Assistant */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-brandGreen" />
                <h3 className="font-semibold text-navy">AI Schrijfhulp</h3>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-gray-500">
                Laat AI je helpen met schrijven in de DAAR-stem.
              </p>
              <Button
                variant="outline"
                size="sm"
                className="w-full gap-2"
                onClick={handleGenerateOutline}
                disabled={aiLoading === 'outline'}
              >
                {aiLoading === 'outline' ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Wand2 className="w-4 h-4" />
                )}
                Genereer outline
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-full gap-2"
                onClick={handleRewriteVoice}
                disabled={aiLoading === 'voice'}
              >
                {aiLoading === 'voice' ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Wand2 className="w-4 h-4" />
                )}
                Herschrijf in DAAR-stem
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-full gap-2"
                onClick={handleGenerateMeta}
                disabled={aiLoading === 'meta'}
              >
                {aiLoading === 'meta' ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Wand2 className="w-4 h-4" />
                )}
                Genereer meta description
              </Button>

              {/* AI Result Display */}
              {aiResult && (
                <div className="mt-4 p-3 bg-lightGreen rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-brandGreen">AI Resultaat</span>
                    <button
                      onClick={() => setAiResult(null)}
                      className="text-xs text-gray-500 hover:text-gray-700"
                    >
                      Sluiten
                    </button>
                  </div>
                  <p className="text-sm text-gray-700 whitespace-pre-wrap max-h-48 overflow-y-auto">
                    {aiResult}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* SEO */}
          <Card>
            <CardHeader>
              <h3 className="font-semibold text-navy">SEO</h3>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                label="Meta titel"
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
                placeholder={title || 'Titel voor zoekmachines'}
                hint={`${metaTitle.length}/60 tekens`}
              />

              <div>
                <label className="block text-sm font-medium text-navy mb-1">
                  Meta beschrijving
                </label>
                <textarea
                  value={metaDescription}
                  onChange={(e) => setMetaDescription(e.target.value)}
                  placeholder="Korte beschrijving voor zoekmachines..."
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brandGreen focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {metaDescription.length}/160 tekens
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Excerpt */}
          <Card>
            <CardHeader>
              <h3 className="font-semibold text-navy">Excerpt</h3>
            </CardHeader>
            <CardContent>
              <textarea
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="Korte samenvatting voor in de lijst..."
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brandGreen focus:border-transparent"
              />
            </CardContent>
          </Card>

          {/* Featured Image */}
          <Card>
            <CardHeader>
              <h3 className="font-semibold text-navy">Header afbeelding</h3>
            </CardHeader>
            <CardContent>
              <FeaturedImagePicker
                value={featuredImage}
                onChange={setFeaturedImage}
                headerStyle={headerStyle}
                onHeaderStyleChange={setHeaderStyle}
                title={title}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
