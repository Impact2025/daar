import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { DAAR_CHAT_SYSTEM_PROMPT } from '@/constants/prompts'

// POST /api/chat - Streaming chat response
export async function POST(request: NextRequest) {
  try {
    const { sessionId, message, visitorId } = await request.json()

    if (!message?.trim()) {
      return new Response(
        JSON.stringify({ error: 'Bericht is verplicht' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Get or create session
    let session
    if (sessionId) {
      session = await prisma.chatSession.findUnique({
        where: { id: sessionId },
        include: {
          messages: {
            orderBy: { createdAt: 'asc' },
            take: 20, // Last 20 messages for context
          },
        },
      })
    }

    if (!session) {
      session = await prisma.chatSession.create({
        data: {
          visitorId: visitorId || `visitor_${Date.now()}`,
          userAgent: request.headers.get('user-agent') || undefined,
          referrer: request.headers.get('referer') || undefined,
        },
        include: {
          messages: true,
        },
      })
    }

    // Save user message
    await prisma.chatMessage.create({
      data: {
        sessionId: session.id,
        role: 'USER',
        content: message,
      },
    })

    // Update session
    await prisma.chatSession.update({
      where: { id: session.id },
      data: {
        messageCount: { increment: 1 },
        lastMessageAt: new Date(),
      },
    })

    // Search for relevant articles
    const relevantArticles = await prisma.article.findMany({
      where: {
        status: 'PUBLISHED',
        OR: [
          { title: { contains: message, mode: 'insensitive' } },
          { contentPlain: { contains: message, mode: 'insensitive' } },
        ],
      },
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
      },
      take: 3,
    })

    // Build context
    let context = ''
    if (relevantArticles.length > 0) {
      context = `\n\nRelevante artikelen uit de kennisbank:\n${relevantArticles
        .map((a) => `- "${a.title}": ${a.excerpt?.substring(0, 100)}...`)
        .join('\n')}`
    }

    // Build conversation history
    const conversationHistory = session.messages.map((msg) => ({
      role: msg.role.toLowerCase() as 'user' | 'assistant',
      content: msg.content,
    }))

    // Add current message
    conversationHistory.push({
      role: 'user',
      content: message,
    })

    // Build system prompt with context
    const systemPrompt = DAAR_CHAT_SYSTEM_PROMPT.replace('{context}', context)

    // Call OpenRouter API with streaming
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
          { role: 'system', content: systemPrompt },
          ...conversationHistory,
        ],
        stream: true,
        max_tokens: 500,
        temperature: 0.7,
      }),
    })

    if (!response.ok) {
      const error = await response.text()
      console.error('OpenRouter error:', error)
      return new Response(
        JSON.stringify({ error: 'Er ging iets mis met de AI. Probeer het opnieuw.' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Create a TransformStream to process the response
    const encoder = new TextEncoder()
    const decoder = new TextDecoder()

    let fullResponse = ''

    const transformStream = new TransformStream({
      async transform(chunk, controller) {
        const text = decoder.decode(chunk)
        const lines = text.split('\n')

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6)
            if (data === '[DONE]') {
              // Save assistant message
              await prisma.chatMessage.create({
                data: {
                  sessionId: session.id,
                  role: 'ASSISTANT',
                  content: fullResponse,
                  modelUsed: process.env.OPENROUTER_MODEL || 'anthropic/claude-3-haiku',
                },
              })

              // Send article suggestions if any
              if (relevantArticles.length > 0) {
                const suggestionsEvent = JSON.stringify({
                  type: 'articles',
                  articles: relevantArticles.map((a) => ({
                    title: a.title,
                    slug: a.slug,
                    excerpt: a.excerpt?.substring(0, 100),
                  })),
                })
                controller.enqueue(encoder.encode(`data: ${suggestionsEvent}\n\n`))
              }

              controller.enqueue(encoder.encode(`data: {"type":"done","sessionId":"${session.id}"}\n\n`))
              return
            }

            try {
              const parsed = JSON.parse(data)
              const content = parsed.choices?.[0]?.delta?.content
              if (content) {
                fullResponse += content
                controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'text', content })}\n\n`))
              }
            } catch {
              // Skip invalid JSON
            }
          }
        }
      },
    })

    // Pipe the response through our transform
    const readable = response.body?.pipeThrough(transformStream)

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    })
  } catch (error) {
    console.error('Chat error:', error)
    return new Response(
      JSON.stringify({ error: 'Er ging iets mis. Probeer het opnieuw.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}
