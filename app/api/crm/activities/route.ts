import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { ActivityType } from '@prisma/client'

// GET /api/crm/activities - Get all activities with filters
export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user || !['ADMIN', 'EDITOR'].includes(session.user.role)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const customerId = searchParams.get('customerId')
    const performedById = searchParams.get('performedById')
    const type = searchParams.get('type') as ActivityType | null
    const page = parseInt(searchParams.get('page') || '1')
    const pageSize = parseInt(searchParams.get('pageSize') || '50')

    const where: Record<string, unknown> = {}

    if (customerId) where.customerId = customerId
    if (performedById) where.performedById = performedById
    if (type) where.type = type

    const [activities, total] = await Promise.all([
      prisma.activity.findMany({
        where,
        include: {
          customer: {
            select: { id: true, companyName: true },
          },
          performedBy: {
            select: { id: true, name: true, avatar: true, color: true },
          },
        },
        orderBy: { occurredAt: 'desc' },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.activity.count({ where }),
    ])

    return NextResponse.json({
      data: activities,
      pagination: {
        page,
        pageSize,
        total,
        totalPages: Math.ceil(total / pageSize),
      },
    })
  } catch (error) {
    console.error('Error fetching activities:', error)
    return NextResponse.json({ error: 'Failed to fetch activities' }, { status: 500 })
  }
}

// POST /api/crm/activities - Log a new activity
export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user || !['ADMIN', 'EDITOR'].includes(session.user.role)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const data = await request.json()

    const activity = await prisma.activity.create({
      data: {
        type: data.type,
        title: data.title,
        description: data.description || null,
        occurredAt: data.occurredAt ? new Date(data.occurredAt) : new Date(),
        duration: data.duration || null,
        customerId: data.customerId,
        performedById: data.performedById,
        metadata: data.metadata || null,
      },
      include: {
        customer: {
          select: { id: true, companyName: true },
        },
        performedBy: {
          select: { id: true, name: true, avatar: true, color: true },
        },
      },
    })

    // Update customer's lastContactAt
    await prisma.customer.update({
      where: { id: data.customerId },
      data: { lastContactAt: activity.occurredAt },
    })

    return NextResponse.json(activity)
  } catch (error) {
    console.error('Error creating activity:', error)
    return NextResponse.json({ error: 'Failed to create activity' }, { status: 500 })
  }
}
