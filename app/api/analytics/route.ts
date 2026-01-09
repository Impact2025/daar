import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

// GET /api/analytics - Haal analytics data op
export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user || !['ADMIN', 'EDITOR'].includes(session.user.role)) {
      return NextResponse.json(
        { success: false, error: 'Niet geautoriseerd' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const period = searchParams.get('period') || '30' // days

    const startDate = new Date()
    startDate.setDate(startDate.getDate() - parseInt(period))

    // Parallel queries for performance
    const [
      totalPageViews,
      pageViewsByDay,
      topArticles,
      topSearchQueries,
      deviceBreakdown,
      trafficSources,
      leadsBySource,
      quizStats,
      bookingStats
    ] = await Promise.all([
      // Total page views
      prisma.pageView.count({
        where: { createdAt: { gte: startDate } }
      }),

      // Page views by day
      prisma.$queryRaw`
        SELECT
          DATE(created_at) as date,
          COUNT(*)::int as views
        FROM "PageView"
        WHERE created_at >= ${startDate}
        GROUP BY DATE(created_at)
        ORDER BY date ASC
      ` as Promise<{ date: Date; views: number }[]>,

      // Top articles
      prisma.article.findMany({
        where: { status: 'PUBLISHED' },
        select: {
          id: true,
          title: true,
          slug: true,
          viewCount: true,
          publishedAt: true
        },
        orderBy: { viewCount: 'desc' },
        take: 10
      }),

      // Top search queries
      prisma.$queryRaw`
        SELECT
          query,
          COUNT(*)::int as count,
          AVG(results_count)::int as avg_results
        FROM "SearchQuery"
        WHERE created_at >= ${startDate}
        GROUP BY query
        ORDER BY count DESC
        LIMIT 10
      ` as Promise<{ query: string; count: number; avg_results: number }[]>,

      // Device breakdown
      prisma.$queryRaw`
        SELECT
          COALESCE(device_type, 'UNKNOWN') as device,
          COUNT(*)::int as count
        FROM "PageView"
        WHERE created_at >= ${startDate}
        GROUP BY device_type
      ` as Promise<{ device: string; count: number }[]>,

      // Traffic sources (referrers)
      prisma.$queryRaw`
        SELECT
          CASE
            WHEN referrer IS NULL OR referrer = '' THEN 'Direct'
            WHEN referrer LIKE '%google%' THEN 'Google'
            WHEN referrer LIKE '%facebook%' THEN 'Facebook'
            WHEN referrer LIKE '%linkedin%' THEN 'LinkedIn'
            WHEN referrer LIKE '%twitter%' OR referrer LIKE '%x.com%' THEN 'Twitter/X'
            ELSE 'Other'
          END as source,
          COUNT(*)::int as count
        FROM "PageView"
        WHERE created_at >= ${startDate}
        GROUP BY source
        ORDER BY count DESC
      ` as Promise<{ source: string; count: number }[]>,

      // Leads by source
      prisma.$queryRaw`
        SELECT
          source,
          COUNT(*)::int as count
        FROM "Lead"
        WHERE created_at >= ${startDate}
        GROUP BY source
      ` as Promise<{ source: string; count: number }[]>,

      // Quiz stats
      prisma.$queryRaw`
        SELECT
          COUNT(*)::int as total,
          AVG(total_score)::int as avg_score,
          COUNT(CASE WHEN lead_id IS NOT NULL THEN 1 END)::int as with_lead
        FROM "QuizResult"
        WHERE created_at >= ${startDate}
      ` as Promise<{ total: number; avg_score: number; with_lead: number }[]>,

      // Booking stats
      prisma.$queryRaw`
        SELECT
          status,
          COUNT(*)::int as count
        FROM "Booking"
        WHERE created_at >= ${startDate}
        GROUP BY status
      ` as Promise<{ status: string; count: number }[]>
    ])

    // Calculate unique visitors (approximate based on visitor_id)
    const uniqueVisitors = await prisma.pageView.groupBy({
      by: ['visitorId'],
      where: { createdAt: { gte: startDate } },
      _count: true
    })

    // Calculate averages
    const avgTimeOnPage = await prisma.pageView.aggregate({
      where: {
        createdAt: { gte: startDate },
        timeOnPage: { not: null }
      },
      _avg: { timeOnPage: true }
    })

    return NextResponse.json({
      success: true,
      data: {
        overview: {
          totalPageViews,
          uniqueVisitors: uniqueVisitors.length,
          avgTimeOnPage: Math.round(avgTimeOnPage._avg.timeOnPage || 0),
          period: parseInt(period)
        },
        pageViewsByDay,
        topArticles,
        topSearchQueries,
        deviceBreakdown,
        trafficSources,
        leadsBySource,
        quizStats: quizStats[0] || { total: 0, avg_score: 0, with_lead: 0 },
        bookingStats
      }
    })
  } catch (error) {
    console.error('Error fetching analytics:', error)
    return NextResponse.json(
      { success: false, error: 'Er ging iets mis bij het ophalen van analytics' },
      { status: 500 }
    )
  }
}
