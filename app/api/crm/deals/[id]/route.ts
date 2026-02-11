import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { DealStage, ActivityType } from '@prisma/client'

// GET /api/crm/deals/[id] - Get single deal
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    if (!session?.user || !['ADMIN', 'EDITOR'].includes(session.user.role)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params

    const deal = await prisma.deal.findUnique({
      where: { id },
      include: {
        customer: {
          select: {
            id: true,
            companyName: true,
            contactName: true,
            contactEmail: true,
            contactPhone: true
          },
        },
        owner: {
          select: { id: true, name: true, avatar: true, color: true },
        },
      },
    })

    if (!deal) {
      return NextResponse.json({ error: 'Deal not found' }, { status: 404 })
    }

    return NextResponse.json(deal)
  } catch (error) {
    console.error('Error fetching deal:', error)
    return NextResponse.json({ error: 'Failed to fetch deal' }, { status: 500 })
  }
}

// PATCH /api/crm/deals/[id] - Update deal
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    if (!session?.user || !['ADMIN', 'EDITOR'].includes(session.user.role)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    const data = await request.json()

    // Get current deal to check for stage changes
    const currentDeal = await prisma.deal.findUnique({
      where: { id },
      select: { stage: true, customerId: true },
    })

    if (!currentDeal) {
      return NextResponse.json({ error: 'Deal not found' }, { status: 404 })
    }

    const updateData: Record<string, unknown> = {}

    const fields = ['name', 'description', 'value', 'currency', 'probability', 'ownerId', 'lostReason', 'wonReason', 'competitorName']
    for (const field of fields) {
      if (data[field] !== undefined) {
        updateData[field] = data[field]
      }
    }

    if (data.expectedCloseDate !== undefined) {
      updateData.expectedCloseDate = data.expectedCloseDate ? new Date(data.expectedCloseDate) : null
    }

    // Handle stage change
    if (data.stage && data.stage !== currentDeal.stage) {
      updateData.stage = data.stage

      // Auto-set probability based on stage
      const stageProbabilities: Record<DealStage, number> = {
        QUALIFICATION: 10,
        NEEDS_ANALYSIS: 25,
        PROPOSAL: 50,
        NEGOTIATION: 75,
        CLOSED_WON: 100,
        CLOSED_LOST: 0,
      }
      if (data.probability === undefined) {
        updateData.probability = stageProbabilities[data.stage as DealStage]
      }

      // Set actual close date if won/lost
      if (data.stage === 'CLOSED_WON' || data.stage === 'CLOSED_LOST') {
        updateData.actualCloseDate = new Date()

        // Update customer status
        if (data.stage === 'CLOSED_WON') {
          await prisma.customer.update({
            where: { id: currentDeal.customerId },
            data: { status: 'CUSTOMER' },
          })
        }
      }
    }

    const deal = await prisma.deal.update({
      where: { id },
      data: updateData,
      include: {
        customer: {
          select: { id: true, companyName: true, contactName: true },
        },
        owner: {
          select: { id: true, name: true, avatar: true, color: true },
        },
      },
    })

    // Log activity if stage changed
    if (data.stage && data.stage !== currentDeal.stage && data.performedById) {
      await prisma.activity.create({
        data: {
          type: ActivityType.DEAL_UPDATE,
          title: `Deal stage: ${currentDeal.stage} → ${data.stage}`,
          description: data.stage === 'CLOSED_WON'
            ? `Deal "${deal.name}" gewonnen!`
            : data.stage === 'CLOSED_LOST'
            ? `Deal "${deal.name}" verloren. Reden: ${data.lostReason || 'Niet opgegeven'}`
            : `Deal "${deal.name}" verplaatst naar ${data.stage}`,
          customerId: deal.customerId,
          performedById: data.performedById,
          metadata: { dealId: id, oldStage: currentDeal.stage, newStage: data.stage },
        },
      })
    }

    return NextResponse.json(deal)
  } catch (error) {
    console.error('Error updating deal:', error)
    return NextResponse.json({ error: 'Failed to update deal' }, { status: 500 })
  }
}

// DELETE /api/crm/deals/[id] - Delete deal
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params

    await prisma.deal.delete({ where: { id } })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting deal:', error)
    return NextResponse.json({ error: 'Failed to delete deal' }, { status: 500 })
  }
}
