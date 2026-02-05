import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

// PATCH /api/bookings/[id]/link-customer - Link booking to existing customer
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

    // Update booking
    const booking = await prisma.booking.update({
      where: { id },
      data: { customerId },
      include: {
        customer: {
          select: { id: true, companyName: true, contactName: true }
        }
      }
    })

    return NextResponse.json(booking)
  } catch (error) {
    console.error('Error linking booking to customer:', error)
    return NextResponse.json({ error: 'Failed to link booking to customer' }, { status: 500 })
  }
}

// DELETE /api/bookings/[id]/link-customer - Unlink booking from customer
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

    const booking = await prisma.booking.update({
      where: { id },
      data: { customerId: null },
    })

    return NextResponse.json(booking)
  } catch (error) {
    console.error('Error unlinking booking from customer:', error)
    return NextResponse.json({ error: 'Failed to unlink booking from customer' }, { status: 500 })
  }
}
