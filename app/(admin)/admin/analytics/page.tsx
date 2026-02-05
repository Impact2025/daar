'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  BarChart3,
  TrendingUp,
  Users,
  Eye,
  Clock,
  Search,
  Monitor,
  Smartphone,
  Tablet,
  FileText,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Globe,
  MessageSquare,
  ClipboardCheck,
  Loader2,
  ExternalLink
} from 'lucide-react'
import { Card, CardContent, CardHeader, Badge } from '@/components/ui'

interface AnalyticsData {
  overview: {
    totalPageViews: number
    uniqueVisitors: number
    avgTimeOnPage: number
    period: number
  }
  pageViewsByDay: { date: string; views: number }[]
  topArticles: { id: string; title: string; slug: string; viewCount: number }[]
  topSearchQueries: { query: string; count: number; avg_results: number }[]
  deviceBreakdown: { device: string; count: number }[]
  trafficSources: { source: string; count: number }[]
  leadsBySource: { source: string; count: number }[]
  quizStats: { total: number; avg_score: number; with_lead: number }
  bookingStats: { status: string; count: number }[]
}

const deviceIcons: Record<string, React.ElementType> = {
  DESKTOP: Monitor,
  MOBILE: Smartphone,
  TABLET: Tablet,
  UNKNOWN: Globe
}

const sourceLabels: Record<string, string> = {
  CHAT: 'Chat',
  CONTACT_FORM: 'Contactformulier',
  NEWSLETTER: 'Nieuwsbrief',
  DEMO_REQUEST: 'Demo aanvraag',
  QUIZ: 'VrijwilligersCheck'
}

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [period, setPeriod] = useState('30')

  useEffect(() => {
    loadAnalytics()
  }, [period])

  async function loadAnalytics() {
    setLoading(true)
    try {
      const res = await fetch(`/api/analytics?period=${period}`)
      const result = await res.json()
      if (result.success) {
        setData(result.data)
      } else {
        setError(result.error)
      }
    } catch (err) {
      setError('Kon analytics niet laden')
    } finally {
      setLoading(false)
    }
  }

  function formatNumber(num: number) {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
    return num.toString()
  }

  function formatDuration(seconds: number) {
    if (seconds < 60) return `${seconds}s`
    const minutes = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${minutes}m ${secs}s`
  }

  function getMaxViews(views: { views: number }[]) {
    return Math.max(...views.map(v => v.views), 1)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-brandGreen" />
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="text-center py-12">
        <BarChart3 className="w-12 h-12 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500">{error || 'Geen data beschikbaar'}</p>
      </div>
    )
  }

  const totalTraffic = data.trafficSources.reduce((acc, s) => acc + s.count, 0)
  const totalDevices = data.deviceBreakdown.reduce((acc, d) => acc + d.count, 0)

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-navy">Analytics</h1>
          <p className="text-gray-500">Inzicht in je website prestaties</p>
        </div>

        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brandGreen text-sm"
        >
          <option value="7">Afgelopen 7 dagen</option>
          <option value="30">Afgelopen 30 dagen</option>
          <option value="90">Afgelopen 90 dagen</option>
        </select>
      </div>

      {/* Overview stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Paginaweergaven</p>
                <p className="text-2xl font-bold text-navy">{formatNumber(data.overview.totalPageViews)}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-xl">
                <Eye className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Unieke bezoekers</p>
                <p className="text-2xl font-bold text-navy">{formatNumber(data.overview.uniqueVisitors)}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-xl">
                <Users className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Gem. tijd op pagina</p>
                <p className="text-2xl font-bold text-navy">{formatDuration(data.overview.avgTimeOnPage)}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-xl">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Quiz ingevuld</p>
                <p className="text-2xl font-bold text-navy">{data.quizStats.total}</p>
                <p className="text-xs text-gray-400">Gem. score: {data.quizStats.avg_score}%</p>
              </div>
              <div className="p-3 bg-amber-100 rounded-xl">
                <ClipboardCheck className="w-6 h-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main content - 2 columns */}
        <div className="lg:col-span-2 space-y-8">
          {/* Page views chart */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-navy">Paginaweergaven over tijd</h3>
                <Badge variant="default">{data.overview.period} dagen</Badge>
              </div>
            </CardHeader>
            <CardContent>
              {data.pageViewsByDay.length > 0 ? (
                <div className="h-48">
                  <div className="flex items-end justify-between h-full gap-1">
                    {data.pageViewsByDay.map((day, index) => {
                      const height = (day.views / getMaxViews(data.pageViewsByDay)) * 100
                      const date = new Date(day.date)
                      return (
                        <div key={index} className="flex-1 flex flex-col items-center group">
                          <div className="relative w-full">
                            <div
                              className="w-full bg-brandGreen/80 rounded-t transition-all hover:bg-brandGreen"
                              style={{ height: `${Math.max(height, 2)}%`, minHeight: '4px' }}
                            />
                            <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-navy text-white text-xs px-2 py-1 rounded whitespace-nowrap z-10">
                              {day.views} views
                            </div>
                          </div>
                          {index % Math.ceil(data.pageViewsByDay.length / 7) === 0 && (
                            <span className="text-xs text-gray-400 mt-2">
                              {date.getDate()}/{date.getMonth() + 1}
                            </span>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              ) : (
                <div className="h-48 flex items-center justify-center text-gray-400">
                  Geen data beschikbaar
                </div>
              )}
            </CardContent>
          </Card>

          {/* Top articles */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-navy">Populairste artikelen</h3>
                <Link href="/admin/artikelen" className="text-sm text-brandGreen hover:underline">
                  Alle artikelen →
                </Link>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {data.topArticles.length > 0 ? (
                <div className="divide-y divide-gray-100">
                  {data.topArticles.slice(0, 5).map((article, index) => (
                    <div key={article.id} className="flex items-center gap-4 p-4 hover:bg-gray-50">
                      <span className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs font-medium text-gray-500">
                        {index + 1}
                      </span>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-navy truncate">{article.title}</h4>
                        <p className="text-xs text-gray-400">/kennisbank/{article.slug}</p>
                      </div>
                      <div className="flex items-center gap-1 text-gray-500">
                        <Eye className="w-4 h-4" />
                        <span className="text-sm font-medium">{formatNumber(article.viewCount)}</span>
                      </div>
                      <Link
                        href={`/kennisbank/${article.slug}`}
                        target="_blank"
                        className="p-2 text-gray-400 hover:text-brandGreen"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center text-gray-400">
                  Geen artikelen met views
                </div>
              )}
            </CardContent>
          </Card>

          {/* Search queries */}
          <Card>
            <CardHeader>
              <h3 className="font-semibold text-navy">Populaire zoekopdrachten</h3>
            </CardHeader>
            <CardContent>
              {data.topSearchQueries.length > 0 ? (
                <div className="space-y-3">
                  {data.topSearchQueries.map((query, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Search className="w-4 h-4 text-gray-400" />
                      <span className="flex-1 text-navy">{query.query}</span>
                      <span className="text-sm text-gray-500">{query.count}x</span>
                      <span className="text-xs text-gray-400">
                        {query.avg_results} resultaten
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-400">
                  Nog geen zoekopdrachten
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar - 1 column */}
        <div className="space-y-8">
          {/* Traffic sources */}
          <Card>
            <CardHeader>
              <h3 className="font-semibold text-navy">Verkeersbronnen</h3>
            </CardHeader>
            <CardContent className="space-y-3">
              {data.trafficSources.map((source, index) => {
                const percentage = totalTraffic > 0 ? (source.count / totalTraffic) * 100 : 0
                return (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-navy">{source.source}</span>
                      <span className="text-sm text-gray-500">{Math.round(percentage)}%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-brandGreen rounded-full transition-all"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                )
              })}
              {data.trafficSources.length === 0 && (
                <p className="text-center text-gray-400 py-4">Geen data</p>
              )}
            </CardContent>
          </Card>

          {/* Device breakdown */}
          <Card>
            <CardHeader>
              <h3 className="font-semibold text-navy">Apparaten</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.deviceBreakdown.map((device, index) => {
                  const DeviceIcon = deviceIcons[device.device] || Globe
                  const percentage = totalDevices > 0 ? (device.count / totalDevices) * 100 : 0
                  return (
                    <div key={index} className="flex items-center gap-3">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        <DeviceIcon className="w-4 h-4 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-navy capitalize">
                            {device.device.toLowerCase()}
                          </span>
                          <span className="text-sm text-gray-500">{Math.round(percentage)}%</span>
                        </div>
                        <div className="h-1.5 bg-gray-100 rounded-full mt-1 overflow-hidden">
                          <div
                            className="h-full bg-navy rounded-full"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  )
                })}
                {data.deviceBreakdown.length === 0 && (
                  <p className="text-center text-gray-400 py-4">Geen data</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Leads by source */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-navy">Leads per bron</h3>
                <Link href="/admin/crm/klanten" className="text-sm text-brandGreen hover:underline">
                  Bekijk →
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              {data.leadsBySource.length > 0 ? (
                <div className="space-y-3">
                  {data.leadsBySource.map((source, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm text-navy">
                        {sourceLabels[source.source] || source.source}
                      </span>
                      <Badge variant="default">{source.count}</Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-400 py-4">Geen leads in deze periode</p>
              )}
            </CardContent>
          </Card>

          {/* Booking stats */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-navy">Afspraken</h3>
                <Link href="/admin/crm/afspraken" className="text-sm text-brandGreen hover:underline">
                  Bekijk →
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              {data.bookingStats.length > 0 ? (
                <div className="grid grid-cols-2 gap-3">
                  {data.bookingStats.map((stat, index) => {
                    const statusColors: Record<string, string> = {
                      PENDING: 'bg-yellow-100 text-yellow-700',
                      CONFIRMED: 'bg-green-100 text-green-700',
                      COMPLETED: 'bg-blue-100 text-blue-700',
                      CANCELLED: 'bg-red-100 text-red-700',
                      NO_SHOW: 'bg-gray-100 text-gray-700'
                    }
                    return (
                      <div
                        key={index}
                        className={`p-3 rounded-lg text-center ${statusColors[stat.status] || 'bg-gray-100'}`}
                      >
                        <p className="text-2xl font-bold">{stat.count}</p>
                        <p className="text-xs capitalize">{stat.status.toLowerCase().replace('_', ' ')}</p>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <p className="text-center text-gray-400 py-4">Geen afspraken in deze periode</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
