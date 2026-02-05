import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { DealStage } from '@prisma/client'

// GET /api/crm/deals - Get all deals with filters
export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user || !['ADMIN', 'EDITOR'].includes(session.user.role)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const customerId = searchParams.get('customerId')
    const ownerId = searchParams.get('ownerId')
    const stage = searchParams.get('stage') as DealStage | null
    const isOpen = searchParams.get('isOpen')
    const page = parseInt(searchParams.get('page') || '1')
    const pageSize = parseInt(searchParams.get('pageSize') || '100')

    const where: Record<string, unknown> = {}

    if (customerId) where.customerId = customerId
    if (ownerId) where.ownerId = ownerId
    if (stage) where.stage = stage
    if (isOpen === 'true') {
      where.stage = { notIn: ['CLOSED_WON', 'CLOSED_LOST'] }
    }

    const [deals, total] = await Promise.all([
      prisma.deal.findMany({
        where,
        include: {
          customer: {
            select: { id: true, companyName: true, contactName: true },
          },
          owner: {
            select: { id: true, name: true, avatar: true, color: true },
          },
        },
        orderBy: [
          { stage: 'asc' },
          { expectedCloseDate: 'asc' },
          { value: 'desc' },
        ],
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.deal.count({ where }),
    ])

    return NextResponse.json({
      data: deals,
      pagination: {
        page,
        pageSize,
        total,
        totalPages: Math.ceil(total / pageSize),
      },
    })
  } catch (error) {
    console.error('Error fetching deals:', error)
    return NextResponse.json({ error: 'Failed to fetch deals' }, { status: 500 })
  }
}

// POST /api/crm/deals - Create a new deal
export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user || !['ADMIN', 'EDITOR'].includes(session.user.role)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const data = await request.json()

    // Get probability based on stage
    const stageProbabilities: Record<DealStage, number> = {
      QUALIFICATION: 10,
      NEEDS_ANALYSIS: 25,
      PROPOSAL: 50,
      NEGOTIATION: 75,
      CLOSED_WON: 100,
      CLOSED_LOST: 0,
    }

    const stage: DealStage = data.stage || 'QUALIFICATION'
    const probability = data.probability ?? stageProbabilities[stage]

    const deal = await prisma.deal.create({
      data: {
        name: data.name,
        description: data.description || null,
        value: data.value || null,
        currency: data.currency || 'EUR',
        stage,
        probability,
        expectedCloseDate: data.expectedCloseDate ? new Date(data.expectedCloseDate) : null,
        customerId: data.customerId,
        ownerId: data.ownerId,
      },
      include: {
        customer: {
          select: { id: true, companyName: true, contactName: true },
        },
        owner: {
          select: { id: true, name: true, avatar: true, color: true },
        },
      },
    })

    return NextResponse.json(deal)
  } catch (error) {
    console.error('Error creating deal:', error)
    return NextResponse.json({ error: 'Failed to create deal' }, { status: 500 })
  }
}
