'use client'

import { useState } from 'react'
import { Wand2, Loader2, Check, ChevronDown, ChevronUp, ExternalLink, X, Sparkles } from 'lucide-react'
import { Button, Card, CardContent, CardHeader } from '@/components/ui'
import type { BlogWizardResult } from '@/app/api/admin/blog-wizard/route'

interface BlogWizardProps {
  title: string
  content: string
  onApplyMetaTitle: (value: string) => void
  onApplyMetaDescription: (value: string) => void
  onApplyExcerpt: (value: string) => void
  onApplyContent: (value: string) => void
}

type AppliedFields = {
  metaTitle: boolean
  metaDescription: boolean
  excerpt: boolean
  content: boolean
}

export function BlogWizard({
  title,
  content,
  onApplyMetaTitle,
  onApplyMetaDescription,
  onApplyExcerpt,
  onApplyContent,
}: BlogWizardProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState<BlogWizardResult | null>(null)
  const [applied, setApplied] = useState<AppliedFields>({ metaTitle: false, metaDescription: false, excerpt: false, content: false })
  const [showLinks, setShowLinks] = useState(false)

  const runWizard = async () => {
    if (!title.trim() || !content.trim()) {
      setError('Vul eerst een titel en inhoud in')
      return
    }

    setLoading(true)
    setError('')
    setResult(null)
    setApplied({ metaTitle: false, metaDescription: false, excerpt: false, content: false })

    try {
      const response = await fetch('/api/admin/blog-wizard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content }),
      })

      const data = await response.json()

      if (!data.success) {
        setError(data.error || 'Er ging iets mis')
        return
      }

      setResult(data.data)
    } catch {
      setError('Kon AI Wizard niet bereiken')
    } finally {
      setLoading(false)
    }
  }

  const apply = (field: keyof AppliedFields, callback: () => void) => {
    callback()
    setApplied((prev) => ({ ...prev, [field]: true }))
  }

  return (
    <Card className="border-2 border-daar-blue/20 bg-gradient-to-br from-daar-blue/5 to-transparent">
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-daar-blue flex items-center justify-center">
            <Wand2 className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-navy">AI Wizard</h3>
            <p className="text-xs text-gray-500">SEO + interne links</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-gray-600">
          De AI analyseert je blogpost, voegt interne links naar de kennisbank toe en optimaliseert je SEO-metadata.
        </p>

        <Button
          onClick={runWizard}
          disabled={loading}
          className="w-full gap-2 bg-daar-blue hover:bg-daar-blue/90 text-white"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              AI aan het werk...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              AI Wizard starten
            </>
          )}
        </Button>

        {error && (
          <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
            <X className="w-4 h-4 mt-0.5 shrink-0" />
            {error}
          </div>
        )}

        {result && (
          <div className="space-y-3 pt-1">
            <div className="flex items-center gap-2">
              <div className="h-px flex-1 bg-gray-200" />
              <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">Resultaten</span>
              <div className="h-px flex-1 bg-gray-200" />
            </div>

            {/* Meta Title */}
            <WizardField
              label="Meta titel"
              value={result.metaTitle}
              chars={result.metaTitle.length}
              maxChars={60}
              applied={applied.metaTitle}
              onApply={() => apply('metaTitle', () => onApplyMetaTitle(result.metaTitle))}
            />

            {/* Meta Description */}
            <WizardField
              label="Meta beschrijving"
              value={result.metaDescription}
              chars={result.metaDescription.length}
              maxChars={160}
              applied={applied.metaDescription}
              onApply={() => apply('metaDescription', () => onApplyMetaDescription(result.metaDescription))}
            />

            {/* Focus keyword */}
            {result.focusKeyword && (
              <div className="p-3 bg-white rounded-lg border border-gray-200">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Focus keyword</span>
                </div>
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-brandGreen/10 text-brandGreen">
                  {result.focusKeyword}
                </span>
              </div>
            )}

            {/* Excerpt */}
            <WizardField
              label="Excerpt"
              value={result.excerpt}
              chars={result.excerpt.length}
              maxChars={200}
              applied={applied.excerpt}
              onApply={() => apply('excerpt', () => onApplyExcerpt(result.excerpt))}
            />

            {/* Content met links */}
            <div className="p-3 bg-white rounded-lg border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Content met interne links
                </span>
                {applied.content && (
                  <span className="flex items-center gap-1 text-xs text-brandGreen">
                    <Check className="w-3 h-3" /> Toegepast
                  </span>
                )}
              </div>

              {result.linksAdded.length > 0 ? (
                <>
                  <button
                    type="button"
                    onClick={() => setShowLinks(!showLinks)}
                    className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700 mb-2"
                  >
                    {showLinks ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                    {result.linksAdded.length} link{result.linksAdded.length !== 1 ? 's' : ''} toegevoegd
                  </button>

                  {showLinks && (
                    <ul className="mb-2 space-y-1">
                      {result.linksAdded.map((link, i) => (
                        <li key={i} className="flex items-center gap-2 text-xs text-gray-600">
                          <ExternalLink className="w-3 h-3 text-brandGreen shrink-0" />
                          <span className="font-medium">&ldquo;{link.anchorText}&rdquo;</span>
                          <span className="text-gray-400">→</span>
                          <span className="text-brandGreen">{link.title}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <p className="text-xs text-gray-400 mb-2">Geen interne links toegevoegd</p>
              )}

              {!applied.content ? (
                <button
                  type="button"
                  onClick={() => apply('content', () => onApplyContent(result.enrichedContent))}
                  className="w-full py-1.5 px-3 text-xs font-medium bg-brandGreen text-white rounded-md hover:bg-brandGreenHover transition-colors"
                >
                  Content toepassen
                </button>
              ) : (
                <div className="flex items-center justify-center gap-1 py-1.5 text-xs text-brandGreen">
                  <Check className="w-3 h-3" /> Content toegepast
                </div>
              )}
            </div>

            {/* Alles toepassen */}
            {Object.values(applied).some((v) => !v) && (
              <button
                type="button"
                onClick={() => {
                  if (!applied.metaTitle) apply('metaTitle', () => onApplyMetaTitle(result.metaTitle))
                  if (!applied.metaDescription) apply('metaDescription', () => onApplyMetaDescription(result.metaDescription))
                  if (!applied.excerpt) apply('excerpt', () => onApplyExcerpt(result.excerpt))
                  if (!applied.content) apply('content', () => onApplyContent(result.enrichedContent))
                }}
                className="w-full py-2 text-xs font-medium text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Alles toepassen
              </button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

interface WizardFieldProps {
  label: string
  value: string
  chars: number
  maxChars: number
  applied: boolean
  onApply: () => void
}

function WizardField({ label, value, chars, maxChars, applied, onApply }: WizardFieldProps) {
  const isOverLimit = chars > maxChars
  return (
    <div className="p-3 bg-white rounded-lg border border-gray-200">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">{label}</span>
        <div className="flex items-center gap-2">
          <span className={`text-xs ${isOverLimit ? 'text-red-500' : 'text-gray-400'}`}>
            {chars}/{maxChars}
          </span>
          {applied ? (
            <span className="flex items-center gap-1 text-xs text-brandGreen">
              <Check className="w-3 h-3" /> Toegepast
            </span>
          ) : (
            <button
              type="button"
              onClick={onApply}
              className="text-xs font-medium text-brandGreen hover:text-brandGreenHover transition-colors"
            >
              Toepassen
            </button>
          )}
        </div>
      </div>
      <p className="text-sm text-gray-700 leading-relaxed">{value}</p>
    </div>
  )
}
