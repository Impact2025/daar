import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { ArrowRight } from 'lucide-react'
import { StatsCard, ActivityTimeline, TaskCard, TeamMemberBadge } from '@/components/crm'

async function getCRMData() {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)

  const [
    totalCustomers,
    activeDeals,
    pipelineValue,
    dealsWonThisMonth,
    tasksDueToday,
    overdueTasks,
    recentActivities,
    upcomingTasks,
    dealsByStage,
    team,
  ] = await Promise.all([
    prisma.customer.count(),
    prisma.deal.count({ where: { stage: { notIn: ['CLOSED_WON', 'CLOSED_LOST'] } } }),
    prisma.deal.aggregate({
      where: { stage: { notIn: ['CLOSED_WON', 'CLOSED_LOST'] } },
      _sum: { value: true },
    }),
    prisma.deal.count({
      where: { stage: 'CLOSED_WON', actualCloseDate: { gte: startOfMonth } },
    }),
    prisma.task.count({
      where: { dueDate: { gte: today, lt: tomorrow }, status: { not: 'COMPLETED' } },
    }),
    prisma.task.count({
      where: { dueDate: { lt: today }, status: { not: 'COMPLETED' } },
    }),
    prisma.activity.findMany({
      include: {
        customer: { select: { id: true, companyName: true } },
        performedBy: { select: { id: true, name: true, avatar: true, color: true } },
      },
      orderBy: { occurredAt: 'desc' },
      take: 10,
    }),
    prisma.task.findMany({
      where: { status: { not: 'COMPLETED' } },
      include: {
        customer: { select: { id: true, companyName: true } },
        assignedTo: { select: { id: true, name: true, avatar: true, color: true } },
        createdBy: { select: { id: true, name: true } },
      },
      orderBy: [{ priority: 'desc' }, { dueDate: 'asc' }],
      take: 5,
    }),
    prisma.deal.groupBy({
      by: ['stage'],
      where: { stage: { notIn: ['CLOSED_WON', 'CLOSED_LOST'] } },
      _count: true,
      _sum: { value: true },
    }),
    prisma.teamMember.findMany({
      where: { isActive: true },
      include: {
        _count: {
          select: {
            customers: true,
            deals: { where: { stage: { notIn: ['CLOSED_WON', 'CLOSED_LOST'] } } },
          },
        },
      },
    }),
  ])

  return {
    totalCustomers,
    activeDeals,
    pipelineValue: Number(pipelineValue._sum.value || 0),
    dealsWonThisMonth,
    tasksDueToday,
    overdueTasks,
    recentActivities,
    upcomingTasks,
    dealsByStage,
    team,
  }
}

export default async function CRMDashboardPage() {
  const data = await getCRMData()

  const formattedPipelineValue = new Intl.NumberFormat('nl-NL', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(data.pipelineValue)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">CRM Dashboard</h1>
          <p className="text-gray-500">Overzicht van klanten, deals en activiteiten</p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/admin/crm/klanten/nieuw"
            className="px-4 py-2 bg-brandGreen text-white rounded-lg hover:bg-brandGreen/90 transition-colors"
          >
            + Nieuwe klant
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Klanten"
          value={data.totalCustomers}
          icon="Building2"
          color="blue"
        />
        <StatsCard
          title="Actieve deals"
          value={data.activeDeals}
          icon="TrendingUp"
          color="purple"
        />
        <StatsCard
          title="Pipeline waarde"
          value={formattedPipelineValue}
          icon="Euro"
          color="green"
        />
        <StatsCard
          title="Taken vandaag"
          value={data.tasksDueToday}
          subtitle={data.overdueTasks > 0 ? `${data.overdueTasks} te laat` : undefined}
          icon="CheckSquare"
          color={data.overdueTasks > 0 ? 'red' : 'yellow'}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pipeline overview */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-900">Pipeline</h2>
            <Link href="/admin/crm/pipeline" className="text-sm text-brandGreen hover:underline flex items-center gap-1">
              Bekijk pipeline <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[
              { stage: 'QUALIFICATION', label: 'Kwalificatie', color: 'bg-blue-500' },
              { stage: 'NEEDS_ANALYSIS', label: 'Analyse', color: 'bg-indigo-500' },
              { stage: 'PROPOSAL', label: 'Offerte', color: 'bg-purple-500' },
              { stage: 'NEGOTIATION', label: 'Onderhandeling', color: 'bg-yellow-500' },
            ].map((s) => {
              const stageData = data.dealsByStage.find((d) => d.stage === s.stage)
              return (
                <div key={s.stage} className="text-center">
                  <div className={`w-full h-2 ${s.color} rounded-full mb-2`} />
                  <p className="text-xs text-gray-500">{s.label}</p>
                  <p className="text-lg font-semibold">{stageData?._count || 0}</p>
                  <p className="text-xs text-gray-400">
                    {new Intl.NumberFormat('nl-NL', {
                      style: 'currency',
                      currency: 'EUR',
                      maximumFractionDigits: 0,
                    }).format(Number(stageData?._sum.value || 0))}
                  </p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Team */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="font-semibold text-gray-900 mb-4">Team</h2>
          <div className="space-y-3">
            {data.team.map((member) => (
              <div key={member.id} className="flex items-center justify-between">
                <TeamMemberBadge
                  name={member.name}
                  avatar={member.avatar}
                  color={member.color}
                />
                <div className="flex gap-4 text-sm text-gray-500">
                  <span>{member._count.customers} klanten</span>
                  <span>{member._count.deals} deals</span>
                </div>
              </div>
            ))}
            {data.team.length === 0 && (
              <p className="text-sm text-gray-500">Nog geen teamleden</p>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming tasks */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-900">Openstaande taken</h2>
            <Link href="/admin/crm/taken" className="text-sm text-brandGreen hover:underline flex items-center gap-1">
              Alle taken <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="space-y-3">
            {data.upcomingTasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
            {data.upcomingTasks.length === 0 && (
              <p className="text-sm text-gray-500 text-center py-4">Geen openstaande taken</p>
            )}
          </div>
        </div>

        {/* Recent activities */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-900">Recente activiteiten</h2>
            <Link href="/admin/crm/activiteiten" className="text-sm text-brandGreen hover:underline flex items-center gap-1">
              Alle activiteiten <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <ActivityTimeline activities={data.recentActivities} showCustomer />
        </div>
      </div>
    </div>
  )
}
