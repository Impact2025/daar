import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export interface BlogWizardResult {
  metaTitle: string
  metaDescription: string
  focusKeyword: string
  excerpt: string
  enrichedContent: string
  linksAdded: Array<{ title: string; slug: string; anchorText: string }>
}

// POST /api/admin/blog-wizard
export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user || !['ADMIN', 'EDITOR', 'WRITER'].includes(session.user.role)) {
      return NextResponse.json(
        { success: false, error: 'Niet geautoriseerd' },
        { status: 401 }
      )
    }

    const { title, content } = await request.json() as {
      title: string
      content: string
    }

    if (!title || !content) {
      return NextResponse.json(
        { success: false, error: 'Titel en inhoud zijn verplicht' },
        { status: 400 }
      )
    }

    // Haal gepubliceerde kennisbank artikelen op voor interne links
    const kennisbankArticles = await prisma.article.findMany({
      where: { status: 'PUBLISHED', type: 'KENNISBANK' },
      select: { title: true, slug: true, excerpt: true },
      orderBy: { viewCount: 'desc' },
      take: 40,
    })

    // Maak plain text van HTML content
    const plainText = content
      .replace(/<[^>]*>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .substring(0, 4000)

    const articleList = kennisbankArticles
      .map((a) => `- "${a.title}" → /kennisbank/${a.slug}${a.excerpt ? ` (${a.excerpt.substring(0, 80)}...)` : ''}`)
      .join('\n')

    const prompt = `Je bent een SEO-expert en contentstrateeg voor DAAR, een Nederlands platform voor vrijwilligersbeheer.

Je taak: analyseer deze blogpost en lever:
1. Interne links naar de kennisbank (verwerk ze in de HTML content)
2. Perfecte SEO-metadata

---
BLOGPOST TITEL: ${title}

BLOGPOST INHOUD (HTML):
${content.substring(0, 5000)}

---
BESCHIKBARE KENNISBANK ARTIKELEN (voor interne links):
${articleList || '(nog geen kennisbank artikelen beschikbaar)'}

---
INSTRUCTIES:

**Interne links:**
- Voeg 2-5 interne links toe aan de HTML content waar dat natuurlijk past
- Gebruik <a href="/kennisbank/[slug]" class="text-brandGreen hover:underline font-medium">anchor tekst</a>
- Kies anchortext die de leesstroom niet onderbreekt
- Link alleen als het echt relevant is voor de context
- Voeg GEEN links toe als er geen goede match is

**SEO:**
- metaTitle: max 60 tekens, bevat het hoofdkeyword, prikkelend
- metaDescription: exact 120-155 tekens, bevat keyword, uitnodigend, eindig met impliciete call-to-action
- focusKeyword: het meest relevante zoekwoord (1-3 woorden)
- excerpt: 1 aantrekkelijke zin van max 180 tekens als samenvatting voor in overzichten

**Taal & Stijl:**
- Alles in het Nederlands
- DAAR stijl: wij-vorm, professioneel maar warm, geen verkleinwoorden
- Zoekmachines zijn Nederlandstalig

Geef je antwoord ALLEEN als valide JSON, zonder markdown blokken:
{
  "metaTitle": "...",
  "metaDescription": "...",
  "focusKeyword": "...",
  "excerpt": "...",
  "enrichedContent": "... volledige HTML content met interne links ...",
  "linksAdded": [
    { "title": "Titel van het kennisbank artikel", "slug": "de-slug", "anchorText": "de gebruikte anchor tekst" }
  ]
}`

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': process.env.NEXTAUTH_URL || 'http://localhost:3000',
      },
      body: JSON.stringify({
        model: process.env.OPENROUTER_MODEL || 'anthropic/claude-3-haiku',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 4000,
        temperature: 0.3,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('OpenRouter error:', errorText)
      return NextResponse.json(
        { success: false, error: 'AI service niet beschikbaar' },
        { status: 500 }
      )
    }

    const result = await response.json()
    const rawContent = result.choices?.[0]?.message?.content

    if (!rawContent) {
      return NextResponse.json(
        { success: false, error: 'Geen antwoord van AI' },
        { status: 500 }
      )
    }

    // Parse JSON antwoord van AI
    let parsed: BlogWizardResult
    try {
      // Verwijder eventuele markdown code blocks
      const jsonStr = rawContent
        .replace(/^```json\s*/i, '')
        .replace(/^```\s*/i, '')
        .replace(/\s*```$/i, '')
        .trim()
      parsed = JSON.parse(jsonStr)
    } catch {
      console.error('JSON parse fout:', rawContent)
      return NextResponse.json(
        { success: false, error: 'AI gaf geen geldig antwoord. Probeer opnieuw.' },
        { status: 500 }
      )
    }

    // Validatie & truncatie
    if (parsed.metaTitle && parsed.metaTitle.length > 60) {
      parsed.metaTitle = parsed.metaTitle.substring(0, 57) + '...'
    }
    if (parsed.metaDescription && parsed.metaDescription.length > 160) {
      parsed.metaDescription = parsed.metaDescription.substring(0, 157) + '...'
    }
    if (parsed.excerpt && parsed.excerpt.length > 200) {
      parsed.excerpt = parsed.excerpt.substring(0, 197) + '...'
    }

    return NextResponse.json({ success: true, data: parsed })
  } catch (error) {
    console.error('Blog wizard error:', error)
    return NextResponse.json(
      { success: false, error: 'Er ging iets mis bij de AI Wizard' },
      { status: 500 }
    )
  }
}
