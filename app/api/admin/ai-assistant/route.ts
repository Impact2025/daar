import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { DAAR_WRITING_PROMPTS } from '@/constants/prompts'

type PromptType = 'outline' | 'voice' | 'meta' | 'tags' | 'expand' | 'intro'

// POST /api/admin/ai-assistant - AI writing assistance
export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user || !['ADMIN', 'EDITOR', 'WRITER'].includes(session.user.role)) {
      return NextResponse.json(
        { success: false, error: 'Niet geautoriseerd' },
        { status: 401 }
      )
    }

    const { type, data } = await request.json() as {
      type: PromptType
      data: Record<string, string>
    }

    // Build prompt based on type
    let prompt = ''
    switch (type) {
      case 'outline':
        if (!DAAR_WRITING_PROMPTS.outlineGeneration) {
          return NextResponse.json({ success: false, error: 'Outline prompt niet gevonden' }, { status: 500 })
        }
        prompt = DAAR_WRITING_PROMPTS.outlineGeneration.replace('{topic}', data.topic || '')
        break
      case 'voice':
        if (!DAAR_WRITING_PROMPTS.voiceAlignment) {
          return NextResponse.json({ success: false, error: 'Voice prompt niet gevonden' }, { status: 500 })
        }
        prompt = DAAR_WRITING_PROMPTS.voiceAlignment.replace('{text}', data.text || '')
        break
      case 'meta':
        if (!DAAR_WRITING_PROMPTS.metaDescription) {
          return NextResponse.json({ success: false, error: 'Meta prompt niet gevonden' }, { status: 500 })
        }
        prompt = DAAR_WRITING_PROMPTS.metaDescription
          .replace('{title}', data.title || '')
          .replace('{content}', data.content || '')
        break
      case 'tags':
        if (!DAAR_WRITING_PROMPTS.tagSuggestion) {
          return NextResponse.json({ success: false, error: 'Tags prompt niet gevonden' }, { status: 500 })
        }
        prompt = DAAR_WRITING_PROMPTS.tagSuggestion
          .replace('{title}', data.title || '')
          .replace('{content}', data.content || '')
        break
      case 'expand':
        if (!DAAR_WRITING_PROMPTS.expandSection) {
          return NextResponse.json({ success: false, error: 'Expand prompt niet gevonden' }, { status: 500 })
        }
        prompt = DAAR_WRITING_PROMPTS.expandSection
          .replace('{context}', data.context || '')
          .replace('{sectionTitle}', data.sectionTitle || '')
          .replace('{currentContent}', data.currentContent || '')
        break
      case 'intro':
        if (!DAAR_WRITING_PROMPTS.introGeneration) {
          return NextResponse.json({ success: false, error: 'Intro prompt niet gevonden' }, { status: 500 })
        }
        prompt = DAAR_WRITING_PROMPTS.introGeneration
          .replace('{title}', data.title || '')
          .replace('{topic}', data.topic || '')
          .replace('{keyMessage}', data.keyMessage || '')
        break
      default:
        return NextResponse.json(
          { success: false, error: 'Ongeldig type' },
          { status: 400 }
        )
    }

    // Call OpenRouter API
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': process.env.NEXTAUTH_URL || 'http://localhost:3000',
      },
      body: JSON.stringify({
        model: process.env.OPENROUTER_MODEL || 'anthropic/claude-3-haiku',
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
        max_tokens: 1000,
        temperature: 0.7,
      }),
    })

    if (!response.ok) {
      const error = await response.text()
      console.error('OpenRouter error:', error)
      return NextResponse.json(
        { success: false, error: 'AI service niet beschikbaar' },
        { status: 500 }
      )
    }

    const result = await response.json()
    const content = result.choices?.[0]?.message?.content

    if (!content) {
      return NextResponse.json(
        { success: false, error: 'Geen antwoord van AI' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      data: {
        content,
        type,
      },
    })
  } catch (error) {
    console.error('AI assistant error:', error)
    return NextResponse.json(
      { success: false, error: 'Er ging iets mis' },
      { status: 500 }
    )
  }
}
