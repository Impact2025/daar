import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

// POST /api/crm/customers/from-booking - Create customer from booking
export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user || !['ADMIN', 'EDITOR'].includes(session.user.role)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { bookingId, assignedToId } = await request.json()

    if (!bookingId) {
      return NextResponse.json({ error: 'Booking ID is required' }, { status: 400 })
    }

    // Get booking with related info
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: {
        lead: true,
        customer: true,
        bookingType: true,
      },
    })

    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 })
    }

    // Check if already linked to a customer
    if (booking.customerId) {
      return NextResponse.json({
        error: 'Booking is already linked to a customer',
        customerId: booking.customerId
      }, { status: 400 })
    }

    // Check if a customer with this email already exists
    const existingCustomer = await prisma.customer.findFirst({
      where: { contactEmail: booking.email },
    })

    if (existingCustomer) {
      // Link booking to existing customer
      await prisma.booking.update({
        where: { id: bookingId },
        data: { customerId: existingCustomer.id },
      })

      // Create activity
      if (assignedToId) {
        await prisma.activity.create({
          data: {
            type: 'MEETING',
            title: `Afspraak: ${booking.bookingType.name}`,
            description: `Afspraak gepland via website`,
            customerId: existingCustomer.id,
            performedById: assignedToId,
            occurredAt: booking.startTime,
            duration: booking.bookingType.duration,
          },
        })
      }

      return NextResponse.json({
        customer: existingCustomer,
        linked: true,
        message: 'Booking linked to existing customer'
      })
    }

    // Create new customer from booking data
    const customer = await prisma.customer.create({
      data: {
        companyName: booking.organization || `${booking.name} (persoonlijk)`,
        contactName: booking.name || null,
        contactEmail: booking.email || null,
        contactPhone: booking.phone || null,

        // Status
        status: 'LEAD',
        source: 'DEMO_REQUEST',

        // Link to lead if exists
        leadId: booking.leadId,

        // Assignment
        assignedToId: assignedToId || null,
      },
    })

    // Link booking to customer
    await prisma.booking.update({
      where: { id: bookingId },
      data: { customerId: customer.id },
    })

    // Create activity for the meeting
    if (assignedToId) {
      await prisma.activity.create({
        data: {
          type: 'MEETING',
          title: `Afspraak: ${booking.bookingType.name}`,
          description: `Eerste afspraak gepland via website`,
          customerId: customer.id,
          performedById: assignedToId,
          occurredAt: booking.startTime,
          duration: booking.bookingType.duration,
        },
      })
    }

    return NextResponse.json({
      customer,
      created: true,
      message: 'Customer created from booking'
    })
  } catch (error) {
    console.error('Error creating customer from booking:', error)
    return NextResponse.json({ error: 'Failed to create customer' }, { status: 500 })
  }
}
