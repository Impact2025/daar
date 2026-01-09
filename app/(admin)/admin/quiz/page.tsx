import { prisma } from '@/lib/prisma'
import { Card, CardContent, Badge, Button } from '@/components/ui'
import {
  ClipboardCheck,
  TrendingUp,
  Users,
  Calendar,
  ExternalLink,
  Eye,
  Mail,
  Building2,
  BarChart3,
} from 'lucide-react'
import Link from 'next/link'
import { QUIZ_PROFILES, QUIZ_DIMENSIONS, DimensionId } from '@/constants/quiz'

async function getQuizResults() {
  return prisma.quizResult.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      lead: {
        select: {
          name: true,
          email: true,
          organization: true,
        },
      },
    },
    take: 100,
  })
}

async function getStats() {
  const now = new Date()
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
  const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)

  const [total, thisMonth, lastMonth, withLeads, allScores] = await Promise.all([
    prisma.quizResult.count(),
    prisma.quizResult.count({
      where: { createdAt: { gte: startOfMonth } },
    }),
    prisma.quizResult.count({
      where: {
        createdAt: { gte: startOfLastMonth, lt: startOfMonth },
      },
    }),
    prisma.quizResult.count({
      where: { leadId: { not: null } },
    }),
    prisma.quizResult.findMany({
      select: { totalScore: true, profileId: true },
    }),
  ])

  // Calculate average score
  const avgScore =
    allScores.length > 0
      ? Math.round(allScores.reduce((sum, r) => sum + r.totalScore, 0) / allScores.length)
      : 0

  // Profile distribution
  const profileDistribution = QUIZ_PROFILES.reduce(
    (acc, profile) => ({
      ...acc,
      [profile.id]: allScores.filter((r) => r.profileId === profile.id).length,
    }),
    {} as Record<string, number>
  )

  // Month over month change
  const monthChange = lastMonth > 0 ? Math.round(((thisMonth - lastMonth) / lastMonth) * 100) : 0

  return {
    total,
    thisMonth,
    monthChange,
    withLeads,
    avgScore,
    conversionRate: total > 0 ? Math.round((withLeads / total) * 100) : 0,
    profileDistribution,
  }
}

export default async function QuizAdminPage() {
  const [results, stats] = await Promise.all([getQuizResults(), getStats()])

  const getProfileBadge = (profileId: string) => {
    const profile = QUIZ_PROFILES.find((p) => p.id === profileId)
    if (!profile) return <Badge>{profileId}</Badge>

    return (
      <Badge
        style={{
          backgroundColor: `${profile.color}15`,
          color: profile.color,
        }}
      >
        {profile.title}
      </Badge>
    )
  }

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('nl-NL', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const getOrgSizeLabel = (size: string | null) => {
    switch (size) {
      case 'xs':
        return '1-25'
      case 'sm':
        return '26-100'
      case 'md':
        return '101-500'
      case 'lg':
        return '500+'
      default:
        return '-'
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-navy">Quiz Resultaten</h1>
          <p className="text-gray-500">VrijwilligersCheck analytics en resultaten</p>
        </div>
        <Link href="/quiz" target="_blank">
          <Button variant="outline" className="gap-2">
            <ExternalLink className="w-4 h-4" />
            Quiz pagina
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Totaal ingevuld</p>
                <p className="text-2xl font-bold text-navy">{stats.total}</p>
              </div>
              <ClipboardCheck className="w-8 h-8 text-brandGreen/20" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Deze maand</p>
                <p className="text-2xl font-bold text-navy">{stats.thisMonth}</p>
                {stats.monthChange !== 0 && (
                  <p
                    className={`text-xs ${stats.monthChange > 0 ? 'text-green-600' : 'text-red-600'}`}
                  >
                    {stats.monthChange > 0 ? '+' : ''}
                    {stats.monthChange}% vs vorige maand
                  </p>
                )}
              </div>
              <Calendar className="w-8 h-8 text-blue-500/20" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Gem. score</p>
                <p className="text-2xl font-bold text-brandGreen">{stats.avgScore}%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-brandGreen/20" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Met lead gegevens</p>
                <p className="text-2xl font-bold text-navy">{stats.withLeads}</p>
                <p className="text-xs text-gray-400">{stats.conversionRate}% conversie</p>
              </div>
              <Users className="w-8 h-8 text-purple-500/20" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Profile Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="lg:col-span-2">
          <CardContent className="p-6">
            <h3 className="font-semibold text-navy mb-4">Profiel verdeling</h3>
            <div className="space-y-3">
              {QUIZ_PROFILES.map((profile) => {
                const count = stats.profileDistribution[profile.id] || 0
                const percentage = stats.total > 0 ? (count / stats.total) * 100 : 0

                return (
                  <div key={profile.id} className="flex items-center gap-4">
                    <div className="w-32 text-sm font-medium text-navy">{profile.title}</div>
                    <div className="flex-1 h-6 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${percentage}%`,
                          backgroundColor: profile.color,
                        }}
                      />
                    </div>
                    <div className="w-16 text-right text-sm text-gray-600">
                      {count} ({Math.round(percentage)}%)
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold text-navy mb-4">Quick stats</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Hoogste score</span>
                <span className="font-semibold text-navy">
                  {results.length > 0 ? Math.max(...results.map((r) => r.totalScore)) : 0}%
                </span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Laagste score</span>
                <span className="font-semibold text-navy">
                  {results.length > 0 ? Math.min(...results.map((r) => r.totalScore)) : 0}%
                </span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Meeste organisaties</span>
                <span className="font-semibold text-navy">
                  {(() => {
                    const sizes = results.reduce(
                      (acc, r) => {
                        const size = r.organizationSize || 'unknown'
                        acc[size] = (acc[size] || 0) + 1
                        return acc
                      },
                      {} as Record<string, number>
                    )
                    const topSize = Object.entries(sizes).sort((a, b) => b[1] - a[1])[0]
                    return topSize ? getOrgSizeLabel(topSize[0]) : '-'
                  })()}{' '}
                  vrijwilligers
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Results Table */}
      <Card>
        <CardContent className="p-0">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="font-semibold text-navy">Alle resultaten</h3>
          </div>
          {results.length > 0 ? (
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Datum</th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Score</th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Profiel</th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">
                    Org. grootte
                  </th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Lead</th>
                  <th className="text-right px-6 py-3 text-sm font-medium text-gray-500">Acties</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {results.map((result) => (
                  <tr key={result.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">{formatDate(result.createdAt)}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-12 h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-brandGreen rounded-full"
                            style={{ width: `${result.totalScore}%` }}
                          />
                        </div>
                        <span className="font-semibold text-navy">{result.totalScore}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">{getProfileBadge(result.profileId)}</td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">
                        {getOrgSizeLabel(result.organizationSize)}
                      </span>
                      {result.volunteerCount && (
                        <span className="text-xs text-gray-400 ml-1">
                          (~{result.volunteerCount})
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {result.lead ? (
                        <div className="text-sm">
                          {result.lead.name && (
                            <p className="font-medium text-navy">{result.lead.name}</p>
                          )}
                          {result.lead.email && (
                            <p className="text-gray-500 flex items-center gap-1">
                              <Mail className="w-3 h-3" />
                              {result.lead.email}
                            </p>
                          )}
                          {result.lead.organization && (
                            <p className="text-gray-500 flex items-center gap-1">
                              <Building2 className="w-3 h-3" />
                              {result.lead.organization}
                            </p>
                          )}
                        </div>
                      ) : (
                        <span className="text-gray-400 text-sm">Anoniem</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        href={`/quiz/resultaat/${result.id}`}
                        target="_blank"
                        className="inline-flex items-center gap-1 text-sm text-brandGreen hover:underline"
                      >
                        <Eye className="w-4 h-4" />
                        Bekijk
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center py-12">
              <ClipboardCheck className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 mb-2">Nog geen quiz resultaten</p>
              <p className="text-sm text-gray-400">
                Resultaten verschijnen hier wanneer bezoekers de quiz invullen
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
