import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

// POST /api/crm/customers/from-quiz - Create customer from quiz result
export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user || !['ADMIN', 'EDITOR'].includes(session.user.role)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { quizResultId, assignedToId } = await request.json()

    if (!quizResultId) {
      return NextResponse.json({ error: 'Quiz result ID is required' }, { status: 400 })
    }

    // Get quiz result with lead info
    const quizResult = await prisma.quizResult.findUnique({
      where: { id: quizResultId },
      include: {
        lead: true,
        customer: true,
      },
    })

    if (!quizResult) {
      return NextResponse.json({ error: 'Quiz result not found' }, { status: 404 })
    }

    // Check if already linked to a customer
    if (quizResult.customerId) {
      return NextResponse.json({
        error: 'Quiz result is already linked to a customer',
        customerId: quizResult.customerId
      }, { status: 400 })
    }

    // Check if lead is already a customer
    if (quizResult.leadId) {
      const existingCustomer = await prisma.customer.findUnique({
        where: { leadId: quizResult.leadId },
      })
      if (existingCustomer) {
        // Link quiz to existing customer
        await prisma.quizResult.update({
          where: { id: quizResultId },
          data: { customerId: existingCustomer.id },
        })
        return NextResponse.json({
          customer: existingCustomer,
          linked: true,
          message: 'Quiz result linked to existing customer'
        })
      }
    }

    // Map organization size to volunteer count estimate
    const volunteerCountMap: Record<string, number> = {
      xs: 15,
      sm: 60,
      md: 300,
      lg: 750,
    }

    // Create new customer from quiz data
    const customer = await prisma.customer.create({
      data: {
        companyName: quizResult.lead?.organization || 'Onbekende organisatie',
        contactName: quizResult.lead?.name || 'Onbekend',
        contactEmail: quizResult.lead?.email || '',
        contactPhone: quizResult.lead?.phone || null,

        // Daar-specific fields from quiz
        volunteerCount: quizResult.volunteerCount || volunteerCountMap[quizResult.organizationSize || ''] || null,

        // Status
        status: 'LEAD',
        source: 'QUIZ',

        // Link to lead if exists
        leadId: quizResult.leadId,

        // Assignment
        assignedToId: assignedToId || null,
      },
    })

    // Link quiz result to customer
    await prisma.quizResult.update({
      where: { id: quizResultId },
      data: { customerId: customer.id },
    })

    // Create activity for the new customer
    if (assignedToId) {
      await prisma.activity.create({
        data: {
          type: 'OTHER',
          title: 'Klant aangemaakt vanuit quiz',
          description: `Quiz profiel: ${quizResult.profileId}, Score: ${quizResult.totalScore}%`,
          customerId: customer.id,
          performedById: assignedToId,
        },
      })
    }

    return NextResponse.json({
      customer,
      created: true,
      message: 'Customer created from quiz result'
    })
  } catch (error) {
    console.error('Error creating customer from quiz:', error)
    return NextResponse.json({ error: 'Failed to create customer' }, { status: 500 })
  }
}
