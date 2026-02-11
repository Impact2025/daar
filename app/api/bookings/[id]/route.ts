import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { z } from 'zod'
import { sendCancellationEmail, formatBookingDateTime } from '@/lib/email'

interface RouteParams {
  params: Promise<{ id: string }>
}

// GET /api/bookings/[id] - Haal specifieke boeking op
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params

    const booking = await prisma.booking.findUnique({
      where: { id },
      include: {
        bookingType: true,
        lead: {
          select: {
            id: true,
            status: true,
          },
        },
      },
    })

    if (!booking) {
      return NextResponse.json(
        { success: false, error: 'Boeking niet gevonden' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: booking,
    })
  } catch (error) {
    console.error('Error fetching booking:', error)
    return NextResponse.json(
      { success: false, error: 'Er ging iets mis' },
      { status: 500 }
    )
  }
}

// PUT /api/bookings/[id] - Update boeking (admin only)
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await auth()
    if (!session?.user || !['ADMIN', 'EDITOR'].includes(session.user.role)) {
      return NextResponse.json(
        { success: false, error: 'Niet geautoriseerd' },
        { status: 401 }
      )
    }

    const { id } = await params
    const body = await request.json()

    const booking = await prisma.booking.findUnique({
      where: { id },
    })

    if (!booking) {
      return NextResponse.json(
        { success: false, error: 'Boeking niet gevonden' },
        { status: 404 }
      )
    }

    // Build update data object
    const updateData: any = {}

    if (body.bookingTypeId !== undefined) updateData.bookingTypeId = body.bookingTypeId
    if (body.startTime !== undefined) updateData.startTime = new Date(body.startTime)
    if (body.endTime !== undefined) updateData.endTime = new Date(body.endTime)
    if (body.status !== undefined) updateData.status = body.status
    if (body.name !== undefined) updateData.name = body.name
    if (body.email !== undefined) updateData.email = body.email
    if (body.phone !== undefined) updateData.phone = body.phone
    if (body.organization !== undefined) updateData.organization = body.organization
    if (body.notes !== undefined) updateData.notes = body.notes
    if (body.meetingLink !== undefined) updateData.meetingLink = body.meetingLink
    if (body.customerId !== undefined) updateData.customerId = body.customerId

    const updated = await prisma.booking.update({
      where: { id },
      data: updateData,
      include: {
        bookingType: true,
      },
    })

    return NextResponse.json({
      success: true,
      data: updated,
    })
  } catch (error) {
    console.error('Error updating booking:', error)
    return NextResponse.json(
      { success: false, error: 'Er ging iets mis' },
      { status: 500 }
    )
  }
}

// DELETE /api/bookings/[id] - Annuleer boeking
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params
    const { searchParams } = new URL(request.url)
    const reason = searchParams.get('reason')

    const booking = await prisma.booking.findUnique({
      where: { id },
    })

    if (!booking) {
      return NextResponse.json(
        { success: false, error: 'Boeking niet gevonden' },
        { status: 404 }
      )
    }

    // Check if booking can be cancelled
    if (booking.status === 'CANCELLED') {
      return NextResponse.json(
        { success: false, error: 'Deze boeking is al geannuleerd' },
        { status: 400 }
      )
    }

    if (booking.status === 'COMPLETED') {
      return NextResponse.json(
        { success: false, error: 'Voltooide boekingen kunnen niet worden geannuleerd' },
        { status: 400 }
      )
    }

    // Update booking to cancelled
    const updatedBooking = await prisma.booking.update({
      where: { id },
      data: {
        status: 'CANCELLED',
        cancelledAt: new Date(),
        cancelReason: reason || 'Door gebruiker geannuleerd',
      },
      include: {
        bookingType: true,
      },
    })

    // Send cancellation email (non-blocking)
    const { date, time } = formatBookingDateTime(updatedBooking.startTime)
    sendCancellationEmail({
      name: updatedBooking.name,
      email: updatedBooking.email,
      bookingType: updatedBooking.bookingType.name,
      duration: updatedBooking.bookingType.duration,
      date,
      time,
    }).catch((err) => console.error('Error sending cancellation email:', err))

    // TODO: Delete Google Calendar event

    return NextResponse.json({
      success: true,
      message: 'Boeking geannuleerd',
    })
  } catch (error) {
    console.error('Error cancelling booking:', error)
    return NextResponse.json(
      { success: false, error: 'Er ging iets mis' },
      { status: 500 }
    )
  }
}
