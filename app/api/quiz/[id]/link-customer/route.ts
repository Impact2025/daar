import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

// PATCH /api/quiz/[id]/link-customer - Link quiz result to existing customer
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
    const { customerId } = await request.json()

    if (!customerId) {
      return NextResponse.json({ error: 'Customer ID is required' }, { status: 400 })
    }

    // Verify customer exists
    const customer = await prisma.customer.findUnique({
      where: { id: customerId },
    })

    if (!customer) {
      return NextResponse.json({ error: 'Customer not found' }, { status: 404 })
    }

    // Update quiz result
    const quizResult = await prisma.quizResult.update({
      where: { id },
      data: { customerId },
      include: {
        customer: {
          select: { id: true, companyName: true, contactName: true }
        }
      }
    })

    return NextResponse.json(quizResult)
  } catch (error) {
    console.error('Error linking quiz to customer:', error)
    return NextResponse.json({ error: 'Failed to link quiz to customer' }, { status: 500 })
  }
}

// DELETE /api/quiz/[id]/link-customer - Unlink quiz result from customer
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    if (!session?.user || !['ADMIN', 'EDITOR'].includes(session.user.role)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params

    const quizResult = await prisma.quizResult.update({
      where: { id },
      data: { customerId: null },
    })

    return NextResponse.json(quizResult)
  } catch (error) {
    console.error('Error unlinking quiz from customer:', error)
    return NextResponse.json({ error: 'Failed to unlink quiz from customer' }, { status: 500 })
  }
}
