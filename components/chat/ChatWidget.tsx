'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { MessageCircle, X, Send, Loader2, ExternalLink, Calendar, ArrowLeft } from 'lucide-react'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { BookingWidget } from '@/components/booking/BookingWidget'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  articles?: Array<{
    title: string
    slug: string
    excerpt?: string
  }>
  showBookingPrompt?: boolean
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [visitorId] = useState(() => `visitor_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`)
  const [showBooking, setShowBooking] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Focus input when opened
  useEffect(() => {
    if (isOpen && !showBooking) {
      inputRef.current?.focus()
    }
  }, [isOpen, showBooking])

  // Add welcome message on first open
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: 'welcome',
          role: 'assistant',
          content: 'Hoi! Ik ben Iris, de virtuele assistent van DAAR. Hoe kan ik je helpen? Stel gerust een vraag over vrijwilligersbeheer, impact meten of onze producten. Je kunt ook direct een afspraak plannen!',
          showBookingPrompt: true,
        },
      ])
    }
  }, [isOpen, messages.length])

  // Check if message indicates booking intent
  const hasBookingIntent = (message: string): boolean => {
    const bookingKeywords = [
      'afspraak',
      'gesprek',
      'kennismaken',
      'kennismaking',
      'demo',
      'demonstratie',
      'bellen',
      'contact',
      'spreken',
      'overleg',
      'plannen',
      'inplannen',
      'meeting',
      'vergadering',
      'bezoek',
      'langskomen',
      'workshop',
    ]
    const lowerMessage = message.toLowerCase()
    return bookingKeywords.some((keyword) => lowerMessage.includes(keyword))
  }

  const sendMessage = useCallback(async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: `user_${Date.now()}`,
      role: 'user',
      content: input.trim(),
    }

    const userWantsBooking = hasBookingIntent(input)

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          visitorId,
          message: userMessage.content,
        }),
      })

      if (!response.ok) {
        throw new Error('Chat request failed')
      }

      const reader = response.body?.getReader()
      if (!reader) throw new Error('No reader')

      const decoder = new TextDecoder()
      let assistantMessage = ''
      let articles: Message['articles'] = []
      let newSessionId: string | null = null

      // Add placeholder message
      const assistantId = `assistant_${Date.now()}`
      setMessages((prev) => [
        ...prev,
        { id: assistantId, role: 'assistant', content: '' },
      ])

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value)
        const lines = chunk.split('\n')

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6))

              if (data.type === 'text') {
                assistantMessage += data.content
                setMessages((prev) =>
                  prev.map((m) =>
                    m.id === assistantId
                      ? { ...m, content: assistantMessage }
                      : m
                  )
                )
              } else if (data.type === 'articles') {
                articles = data.articles
              } else if (data.type === 'done') {
                newSessionId = data.sessionId
              }
            } catch {
              // Skip invalid JSON
            }
          }
        }
      }

      // Update with articles and booking prompt if user showed intent
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId
            ? {
                ...m,
                articles: articles && articles.length > 0 ? articles : undefined,
                showBookingPrompt: userWantsBooking,
              }
            : m
        )
      )

      if (newSessionId) {
        setSessionId(newSessionId)
      }
    } catch (error) {
      console.error('Chat error:', error)
      setMessages((prev) => [
        ...prev,
        {
          id: `error_${Date.now()}`,
          role: 'assistant',
          content: 'Sorry, er ging iets mis. Probeer het opnieuw.',
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }, [input, isLoading, sessionId, visitorId])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const handleBookingSuccess = () => {
    setShowBooking(false)
    setMessages((prev) => [
      ...prev,
      {
        id: `booking_success_${Date.now()}`,
        role: 'assistant',
        content: 'Geweldig! Je afspraak is ingepland. Je ontvangt een bevestiging per e-mail. Is er nog iets anders waar ik je mee kan helpen?',
      },
    ])
  }

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          'fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-brandGreen text-white shadow-lg hover:bg-brandGreenHover transition-all hover:scale-105',
          isOpen && 'hidden'
        )}
        aria-label="Open chat"
      >
        <MessageCircle className="w-6 h-6 mx-auto" />
      </button>

      {/* Chat Window */}
      <div
        className={cn(
          'fixed bottom-6 right-6 z-50 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300',
          isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
        )}
      >
        {/* Header */}
        <div className="bg-brandGreen text-white px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {showBooking && (
              <button
                onClick={() => setShowBooking(false)}
                className="p-1 hover:bg-white/10 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-lg">{showBooking ? '📅' : '🌱'}</span>
            </div>
            <div>
              <h3 className="font-semibold">{showBooking ? 'Plan afspraak' : 'Iris'}</h3>
              <p className="text-xs text-white/80">
                {showBooking ? 'Kies een geschikt moment' : 'DAAR Assistent'}
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              setIsOpen(false)
              setShowBooking(false)
            }}
            className="p-1 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {showBooking ? (
          <div className="flex-1 overflow-y-auto">
            <BookingWidget
              source="CHAT"
              onSuccess={handleBookingSuccess}
              onCancel={() => setShowBooking(false)}
              className="border-0 shadow-none rounded-none"
            />
          </div>
        ) : (
          <>
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    'flex',
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  )}
                >
                  <div
                    className={cn(
                      'max-w-[80%] rounded-2xl px-4 py-2',
                      message.role === 'user'
                        ? 'bg-brandGreen text-white rounded-br-md'
                        : 'bg-gray-100 text-navy rounded-bl-md'
                    )}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>

                    {/* Article suggestions */}
                    {message.articles && message.articles.length > 0 && (
                      <div className="mt-3 space-y-2">
                        <p className="text-xs text-gray-500">Relevante artikelen:</p>
                        {message.articles.map((article) => (
                          <Link
                            key={article.slug}
                            href={`/kennisbank/${article.slug}`}
                            target="_blank"
                            className="block p-2 bg-white rounded-lg border border-gray-200 hover:border-brandGreen transition-colors"
                          >
                            <div className="flex items-start justify-between gap-2">
                              <span className="text-xs font-medium text-navy line-clamp-1">
                                {article.title}
                              </span>
                              <ExternalLink className="w-3 h-3 text-gray-400 flex-shrink-0" />
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}

                    {/* Booking prompt */}
                    {message.showBookingPrompt && message.role === 'assistant' && (
                      <div className="mt-3">
                        <button
                          onClick={() => setShowBooking(true)}
                          className="flex items-center gap-2 w-full p-2 bg-white rounded-lg border border-brandGreen text-brandGreen hover:bg-lightGreen transition-colors text-sm font-medium"
                        >
                          <Calendar className="w-4 h-4" />
                          Plan een afspraak
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isLoading && messages[messages.length - 1]?.content === '' && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-2xl rounded-bl-md px-4 py-2">
                    <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            <div className="px-4 py-2 border-t border-gray-100">
              <div className="flex gap-2 overflow-x-auto pb-2">
                <button
                  onClick={() => setShowBooking(true)}
                  className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 bg-lightGreen text-brandGreen rounded-full text-xs font-medium hover:bg-brandGreen hover:text-white transition-colors"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  Plan afspraak
                </button>
                <button
                  onClick={() => {
                    setInput('Wat kan DAAR voor ons betekenen?')
                    inputRef.current?.focus()
                  }}
                  className="flex-shrink-0 px-3 py-1.5 bg-gray-100 text-gray-600 rounded-full text-xs hover:bg-gray-200 transition-colors"
                >
                  Over DAAR
                </button>
                <button
                  onClick={() => {
                    setInput('Hoe werkt de VrijwilligersCheck?')
                    inputRef.current?.focus()
                  }}
                  className="flex-shrink-0 px-3 py-1.5 bg-gray-100 text-gray-600 rounded-full text-xs hover:bg-gray-200 transition-colors"
                >
                  VrijwilligersCheck
                </button>
              </div>
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Stel een vraag..."
                  disabled={isLoading}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-brandGreen focus:border-transparent disabled:opacity-50"
                />
                <button
                  onClick={sendMessage}
                  disabled={!input.trim() || isLoading}
                  className="p-2 bg-brandGreen text-white rounded-full hover:bg-brandGreenHover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
              <p className="text-xs text-gray-400 text-center mt-2">
                Powered by DAAR AI
              </p>
            </div>
          </>
        )}
      </div>
    </>
  )
}
