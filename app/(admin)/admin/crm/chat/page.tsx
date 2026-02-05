'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import {
  MessageSquare,
  User,
  Bot,
  Clock,
  Globe,
  Smartphone,
  Monitor,
  ExternalLink,
  Loader2,
  ChevronRight,
  Search,
  Filter,
  Calendar,
  Users
} from 'lucide-react'
import { Button, Card, CardContent, CardHeader, Badge } from '@/components/ui'

interface ChatMessage {
  id: string
  role: 'USER' | 'ASSISTANT' | 'SYSTEM'
  content: string
  createdAt: string
}

interface ChatSession {
  id: string
  visitorId: string
  userAgent: string | null
  referrer: string | null
  landingPage: string | null
  isActive: boolean
  messageCount: number
  lastMessageAt: string | null
  createdAt: string
  updatedAt: string
  messages: ChatMessage[]
  lead: {
    name: string | null
    email: string | null
    organization: string | null
  } | null
  _count: { messages: number }
}

export default function ChatLogsPage() {
  const searchParams = useSearchParams()
  const sessionIdParam = searchParams.get('session')

  const [sessions, setSessions] = useState<ChatSession[]>([])
  const [selectedSession, setSelectedSession] = useState<ChatSession | null>(null)
  const [sessionMessages, setSessionMessages] = useState<ChatMessage[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingMessages, setLoadingMessages] = useState(false)
  const [error, setError] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [filterActive, setFilterActive] = useState<'all' | 'active' | 'inactive'>('all')

  // Pagination
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  // Stats
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    today: 0,
    avgMessages: 0
  })

  useEffect(() => {
    loadSessions()
  }, [page, filterActive])

  useEffect(() => {
    if (sessionIdParam && sessions.length > 0) {
      const session = sessions.find(s => s.id === sessionIdParam)
      if (session) {
        loadSessionDetail(session)
      }
    }
  }, [sessionIdParam, sessions])

  async function loadSessions() {
    try {
      const activeParam = filterActive === 'all' ? '' : `&active=${filterActive === 'active'}`
      const res = await fetch(`/api/chat/sessions?page=${page}&pageSize=20${activeParam}`)
      const data = await res.json()
      if (data.success) {
        setSessions(data.data)
        setTotalPages(data.pagination.totalPages)
        calculateStats(data.data, data.pagination.total)
      }
    } catch (err) {
      setError('Kon chat sessies niet laden')
    } finally {
      setLoading(false)
    }
  }

  async function loadSessionDetail(session: ChatSession) {
    setSelectedSession(session)
    setLoadingMessages(true)

    try {
      const res = await fetch(`/api/chat/sessions/${session.id}`)
      const data = await res.json()
      if (data.success) {
        setSessionMessages(data.data.messages || [])
      }
    } catch (err) {
      console.error('Error loading messages:', err)
    } finally {
      setLoadingMessages(false)
    }
  }

  function calculateStats(sessionsData: ChatSession[], total: number) {
    const now = new Date()
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate())

    const active = sessionsData.filter(s => s.isActive).length
    const today = sessionsData.filter(s => new Date(s.createdAt) >= startOfDay).length
    const totalMessages = sessionsData.reduce((acc, s) => acc + s._count.messages, 0)
    const avgMessages = sessionsData.length > 0 ? Math.round(totalMessages / sessionsData.length) : 0

    setStats({ total, active, today, avgMessages })
  }

  function formatDate(date: string) {
    return new Date(date).toLocaleDateString('nl-NL', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  function formatTimeAgo(date: string) {
    const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000)
    if (seconds < 60) return 'Zojuist'
    const minutes = Math.floor(seconds / 60)
    if (minutes < 60) return `${minutes}m geleden`
    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `${hours}u geleden`
    const days = Math.floor(hours / 24)
    return `${days}d geleden`
  }

  function getDeviceIcon(userAgent: string | null) {
    if (!userAgent) return Monitor
    const ua = userAgent.toLowerCase()
    if (ua.includes('mobile') || ua.includes('android') || ua.includes('iphone')) {
      return Smartphone
    }
    return Monitor
  }

  function truncateMessage(content: string, length: number = 60) {
    if (content.length <= length) return content
    return content.substring(0, length) + '...'
  }

  const filteredSessions = sessions.filter(session => {
    if (!searchQuery) return true
    const query = searchQuery.toLowerCase()
    return (
      session.lead?.name?.toLowerCase().includes(query) ||
      session.lead?.email?.toLowerCase().includes(query) ||
      session.visitorId.toLowerCase().includes(query) ||
      session.messages[0]?.content.toLowerCase().includes(query)
    )
  })

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
          <h1 className="text-2xl font-bold text-navy">Chat Logs</h1>
          <p className="text-gray-500">Bekijk gesprekken met bezoekers</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <MessageSquare className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-navy">{stats.total}</p>
                <p className="text-sm text-gray-500">Totaal sessies</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Users className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-navy">{stats.active}</p>
                <p className="text-sm text-gray-500">Actieve sessies</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Calendar className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-navy">{stats.today}</p>
                <p className="text-sm text-gray-500">Vandaag</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-100 rounded-lg">
                <MessageSquare className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-navy">{stats.avgMessages}</p>
                <p className="text-sm text-gray-500">Gem. berichten</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sessions list */}
        <div className="lg:col-span-1">
          {/* Filters */}
          <Card className="mb-4">
            <CardContent className="p-4 space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Zoeken..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brandGreen focus:border-transparent text-sm"
                />
              </div>

              <div className="flex gap-2">
                {(['all', 'active', 'inactive'] as const).map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setFilterActive(filter)}
                    className={`flex-1 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                      filterActive === filter
                        ? 'bg-brandGreen text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {filter === 'all' ? 'Alle' : filter === 'active' ? 'Actief' : 'Inactief'}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Sessions */}
          <Card>
            <CardContent className="p-0 max-h-[600px] overflow-y-auto">
              {filteredSessions.length > 0 ? (
                <div className="divide-y divide-gray-100">
                  {filteredSessions.map((session) => {
                    const DeviceIcon = getDeviceIcon(session.userAgent)
                    const lastMessage = session.messages[0]

                    return (
                      <div
                        key={session.id}
                        onClick={() => loadSessionDetail(session)}
                        className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                          selectedSession?.id === session.id ? 'bg-brandGreen/5 border-l-2 border-brandGreen' : ''
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                            session.isActive ? 'bg-green-100' : 'bg-gray-100'
                          }`}>
                            <User className={`w-4 h-4 ${session.isActive ? 'text-green-600' : 'text-gray-400'}`} />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium text-navy text-sm truncate">
                                {session.lead?.name || session.lead?.email || 'Anonieme bezoeker'}
                              </span>
                              {session.isActive && (
                                <span className="w-2 h-2 bg-green-500 rounded-full" />
                              )}
                            </div>

                            {lastMessage && (
                              <p className="text-xs text-gray-500 truncate mb-1">
                                {lastMessage.role === 'USER' ? 'Bezoeker: ' : 'AI: '}
                                {truncateMessage(lastMessage.content, 40)}
                              </p>
                            )}

                            <div className="flex items-center gap-2 text-xs text-gray-400">
                              <span>{session._count.messages} berichten</span>
                              <span>•</span>
                              <span>{formatTimeAgo(session.updatedAt)}</span>
                            </div>
                          </div>

                          <ChevronRight className="w-4 h-4 text-gray-300 flex-shrink-0" />
                        </div>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div className="text-center py-12">
                  <MessageSquare className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                  <p className="text-sm text-gray-500">Geen sessies gevonden</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                Vorige
              </Button>
              <span className="text-sm text-gray-500">
                Pagina {page} van {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
              >
                Volgende
              </Button>
            </div>
          )}
        </div>

        {/* Chat detail */}
        <div className="lg:col-span-2">
          {selectedSession ? (
            <Card className="h-[700px] flex flex-col">
              {/* Header */}
              <CardHeader className="border-b border-gray-200 flex-shrink-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      selectedSession.isActive ? 'bg-green-100' : 'bg-gray-100'
                    }`}>
                      <User className={`w-5 h-5 ${selectedSession.isActive ? 'text-green-600' : 'text-gray-400'}`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-navy">
                        {selectedSession.lead?.name || selectedSession.lead?.email || 'Anonieme bezoeker'}
                      </h3>
                      <p className="text-xs text-gray-500">
                        {selectedSession.lead?.organization || selectedSession.visitorId.substring(0, 12)}
                      </p>
                    </div>
                  </div>
                  <Badge variant={selectedSession.isActive ? 'success' : 'default'}>
                    {selectedSession.isActive ? 'Actief' : 'Inactief'}
                  </Badge>
                </div>

                {/* Session meta */}
                <div className="flex flex-wrap gap-4 mt-3 text-xs text-gray-500">
                  {selectedSession.landingPage && (
                    <span className="flex items-center gap-1">
                      <Globe className="w-3 h-3" />
                      {selectedSession.landingPage}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    Gestart: {formatDate(selectedSession.createdAt)}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageSquare className="w-3 h-3" />
                    {selectedSession._count.messages} berichten
                  </span>
                </div>
              </CardHeader>

              {/* Messages */}
              <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                {loadingMessages ? (
                  <div className="flex items-center justify-center h-full">
                    <Loader2 className="w-6 h-6 animate-spin text-brandGreen" />
                  </div>
                ) : sessionMessages.length > 0 ? (
                  sessionMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex gap-3 ${message.role === 'USER' ? 'justify-end' : 'justify-start'}`}
                    >
                      {message.role !== 'USER' && (
                        <div className="w-8 h-8 rounded-full bg-brandGreen/10 flex items-center justify-center flex-shrink-0">
                          <Bot className="w-4 h-4 text-brandGreen" />
                        </div>
                      )}

                      <div
                        className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                          message.role === 'USER'
                            ? 'bg-brandGreen text-white rounded-br-md'
                            : 'bg-gray-100 text-navy rounded-bl-md'
                        }`}
                      >
                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                        <p className={`text-xs mt-1 ${
                          message.role === 'USER' ? 'text-white/70' : 'text-gray-400'
                        }`}>
                          {formatDate(message.createdAt)}
                        </p>
                      </div>

                      {message.role === 'USER' && (
                        <div className="w-8 h-8 rounded-full bg-navy/10 flex items-center justify-center flex-shrink-0">
                          <User className="w-4 h-4 text-navy" />
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-500">
                    Geen berichten in deze sessie
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card className="h-[700px] flex items-center justify-center">
              <div className="text-center">
                <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Selecteer een sessie om de chat te bekijken</p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
