import { prisma } from '@/lib/prisma'
import { Card, CardContent, CardHeader } from '@/components/ui'
import { FileText, Eye, Users, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import { formatRelativeTime } from '@/lib/utils'

async function getStats() {
  const [
    totalArticles,
    publishedArticles,
    totalViews,
    totalLeads,
    recentArticles,
    recentLeads,
  ] = await Promise.all([
    prisma.article.count(),
    prisma.article.count({ where: { status: 'PUBLISHED' } }),
    prisma.article.aggregate({ _sum: { viewCount: true } }),
    prisma.lead.count(),
    prisma.article.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
      select: {
        id: true,
        title: true,
        slug: true,
        status: true,
        viewCount: true,
        createdAt: true,
      },
    }),
    prisma.lead.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
      select: {
        id: true,
        name: true,
        email: true,
        organization: true,
        status: true,
        createdAt: true,
      },
    }),
  ])

  return {
    totalArticles,
    publishedArticles,
    totalViews: totalViews._sum.viewCount || 0,
    totalLeads,
    recentArticles,
    recentLeads,
  }
}

export default async function AdminDashboard() {
  const stats = await getStats()

  const statCards = [
    {
      label: 'Artikelen',
      value: stats.totalArticles,
      subValue: `${stats.publishedArticles} gepubliceerd`,
      icon: FileText,
      color: 'bg-blue-500',
    },
    {
      label: 'Totaal views',
      value: stats.totalViews.toLocaleString('nl-NL'),
      subValue: 'alle artikelen',
      icon: Eye,
      color: 'bg-green-500',
    },
    {
      label: 'Leads',
      value: stats.totalLeads,
      subValue: 'via chat & formulieren',
      icon: Users,
      color: 'bg-purple-500',
    },
    {
      label: 'Gemiddelde views',
      value: stats.publishedArticles > 0
        ? Math.round(stats.totalViews / stats.publishedArticles)
        : 0,
      subValue: 'per artikel',
      icon: TrendingUp,
      color: 'bg-orange-500',
    },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-navy">Dashboard</h1>
        <p className="text-gray-500">Welkom terug bij het DAAR admin panel</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-navy">{stat.value}</p>
                  <p className="text-xs text-gray-400 mt-1">{stat.subValue}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Articles */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-navy">Recente artikelen</h2>
              <Link
                href="/admin/artikelen"
                className="text-sm text-brandGreen hover:underline"
              >
                Bekijk alle
              </Link>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {stats.recentArticles.length > 0 ? (
              <ul className="divide-y divide-gray-100">
                {stats.recentArticles.map((article) => (
                  <li key={article.id}>
                    <Link
                      href={`/admin/artikelen/${article.slug}/bewerken`}
                      className="flex items-center justify-between px-6 py-3 hover:bg-gray-50 transition-colors"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-navy truncate">
                          {article.title}
                        </p>
                        <p className="text-sm text-gray-500">
                          {formatRelativeTime(article.createdAt)}
                        </p>
                      </div>
                      <div className="ml-4 flex items-center gap-3">
                        <span className="text-sm text-gray-500">
                          {article.viewCount} views
                        </span>
                        <span
                          className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                            article.status === 'PUBLISHED'
                              ? 'bg-green-100 text-green-700'
                              : article.status === 'DRAFT'
                              ? 'bg-gray-100 text-gray-700'
                              : 'bg-yellow-100 text-yellow-700'
                          }`}
                        >
                          {article.status === 'PUBLISHED' ? 'Live' : article.status === 'DRAFT' ? 'Concept' : 'Review'}
                        </span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="px-6 py-8 text-center text-gray-500">
                <p>Nog geen artikelen</p>
                <Link
                  href="/admin/artikelen/nieuw"
                  className="text-brandGreen hover:underline mt-2 inline-block"
                >
                  Maak je eerste artikel
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Leads */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-navy">Recente leads</h2>
              <Link
                href="/admin/leads"
                className="text-sm text-brandGreen hover:underline"
              >
                Bekijk alle
              </Link>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {stats.recentLeads.length > 0 ? (
              <ul className="divide-y divide-gray-100">
                {stats.recentLeads.map((lead) => (
                  <li key={lead.id}>
                    <Link
                      href={`/admin/leads?id=${lead.id}`}
                      className="flex items-center justify-between px-6 py-3 hover:bg-gray-50 transition-colors"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-navy truncate">
                          {lead.name || lead.email || 'Onbekend'}
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                          {lead.organization || lead.email}
                        </p>
                      </div>
                      <div className="ml-4">
                        <span
                          className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                            lead.status === 'NEW'
                              ? 'bg-blue-100 text-blue-700'
                              : lead.status === 'CONTACTED'
                              ? 'bg-yellow-100 text-yellow-700'
                              : lead.status === 'QUALIFIED'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {lead.status === 'NEW' ? 'Nieuw' : lead.status}
                        </span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="px-6 py-8 text-center text-gray-500">
                <p>Nog geen leads</p>
                <p className="text-sm mt-1">Leads verschijnen hier wanneer bezoekers de chat gebruiken</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
