import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

// GET /api/crm/stats - Get CRM dashboard stats
export async function GET() {
  try {
    const session = await auth()
    if (!session?.user || !['ADMIN', 'EDITOR'].includes(session.user.role)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0)

    const [
      totalCustomers,
      activeDeals,
      pipelineValueResult,
      dealsWonThisMonth,
      tasksDueToday,
      totalLeads,
      convertedLeads,
      recentActivities,
      dealsByStage,
      teamStats,
    ] = await Promise.all([
      // Total customers
      prisma.customer.count(),

      // Active deals (not closed)
      prisma.deal.count({
        where: { stage: { notIn: ['CLOSED_WON', 'CLOSED_LOST'] } },
      }),

      // Pipeline value (weighted by probability)
      prisma.deal.aggregate({
        where: { stage: { notIn: ['CLOSED_WON', 'CLOSED_LOST'] } },
        _sum: { value: true },
      }),

      // Deals won this month
      prisma.deal.count({
        where: {
          stage: 'CLOSED_WON',
          actualCloseDate: { gte: startOfMonth, lte: endOfMonth },
        },
      }),

      // Tasks due today
      prisma.task.count({
        where: {
          dueDate: { gte: today, lt: tomorrow },
          status: { not: 'COMPLETED' },
        },
      }),

      // Total leads (for conversion rate)
      prisma.customer.count({
        where: { createdAt: { gte: new Date(today.getFullYear(), 0, 1) } },
      }),

      // Converted leads
      prisma.customer.count({
        where: {
          status: 'CUSTOMER',
          createdAt: { gte: new Date(today.getFullYear(), 0, 1) },
        },
      }),

      // Recent activities
      prisma.activity.findMany({
        include: {
          customer: { select: { id: true, companyName: true } },
          performedBy: { select: { id: true, name: true, avatar: true, color: true } },
        },
        orderBy: { occurredAt: 'desc' },
        take: 10,
      }),

      // Deals by stage
      prisma.deal.groupBy({
        by: ['stage'],
        where: { stage: { notIn: ['CLOSED_WON', 'CLOSED_LOST'] } },
        _count: true,
        _sum: { value: true },
      }),

      // Team stats
      prisma.teamMember.findMany({
        where: { isActive: true },
        select: {
          id: true,
          name: true,
          avatar: true,
          color: true,
          _count: {
            select: {
              customers: true,
              deals: { where: { stage: { notIn: ['CLOSED_WON', 'CLOSED_LOST'] } } },
              activities: { where: { occurredAt: { gte: startOfMonth } } },
            },
          },
        },
      }),
    ])

    const conversionRate = totalLeads > 0
      ? Math.round((convertedLeads / totalLeads) * 100)
      : 0

    return NextResponse.json({
      overview: {
        totalCustomers,
        activeDeals,
        pipelineValue: pipelineValueResult._sum.value || 0,
        dealsWonThisMonth,
        tasksDueToday,
        conversionRate,
      },
      recentActivities,
      dealsByStage: dealsByStage.map((d) => ({
        stage: d.stage,
        count: d._count,
        value: d._sum.value || 0,
      })),
      teamStats: teamStats.map((t) => ({
        member: { id: t.id, name: t.name, avatar: t.avatar, color: t.color },
        customersCount: t._count.customers,
        dealsCount: t._count.deals,
        activitiesCount: t._count.activities,
      })),
    })
  } catch (error) {
    console.error('Error fetching CRM stats:', error)
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 })
  }
}
