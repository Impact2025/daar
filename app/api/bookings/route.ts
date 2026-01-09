import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { z } from 'zod'
import {
  sendBookingConfirmation,
  sendAdminNotification,
  formatBookingDateTime,
} from '@/lib/email'

// Validation schema voor booking
const bookingSchema = z.object({
  bookingTypeId: z.string().min(1, 'Selecteer een type afspraak'),
  startTime: z.string().min(1, 'Selecteer een datum en tijd'),
  name: z.string().min(2, 'Naam is verplicht'),
  email: z.string().email('Ongeldig e-mailadres'),
  phone: z.string().optional(),
  organization: z.string().optional(),
  notes: z.string().optional(),
  source: z.enum(['WEBSITE', 'CHAT', 'PHONE', 'EMAIL', 'ADMIN']).default('WEBSITE'),
})

// GET /api/bookings - Haal boekingen op (admin only)
export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user || !['ADMIN', 'EDITOR'].includes(session.user.role)) {
      return NextResponse.json(
        { success: false, error: 'Niet geautoriseerd' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const from = searchParams.get('from')
    const to = searchParams.get('to')
    const page = parseInt(searchParams.get('page') || '1')
    const pageSize = parseInt(searchParams.get('pageSize') || '20')

    const where: any = {}

    if (status && status !== 'all') {
      where.status = status
    }

    if (from) {
      where.startTime = { ...where.startTime, gte: new Date(from) }
    }

    if (to) {
      where.startTime = { ...where.startTime, lte: new Date(to) }
    }

    const [bookings, total] = await Promise.all([
      prisma.booking.findMany({
        where,
        include: {
          bookingType: {
            select: {
              name: true,
              duration: true,
              color: true,
            },
          },
        },
        orderBy: { startTime: 'desc' },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.booking.count({ where }),
    ])

    return NextResponse.json({
      success: true,
      data: bookings,
      pagination: {
        page,
        pageSize,
        total,
        totalPages: Math.ceil(total / pageSize),
      },
    })
  } catch (error) {
    console.error('Error fetching bookings:', error)
    return NextResponse.json(
      { success: false, error: 'Er ging iets mis' },
      { status: 500 }
    )
  }
}

// POST /api/bookings - Maak nieuwe boeking
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validated = bookingSchema.parse(body)

    // Get booking type
    const bookingType = await prisma.bookingType.findUnique({
      where: { id: validated.bookingTypeId },
    })

    if (!bookingType || !bookingType.isActive) {
      return NextResponse.json(
        { success: false, error: 'Dit type afspraak is niet beschikbaar' },
        { status: 400 }
      )
    }

    // Calculate end time
    const startTime = new Date(validated.startTime)
    const endTime = new Date(startTime.getTime() + bookingType.duration * 60 * 1000)

    // Check if slot is still available
    const conflictingBooking = await prisma.booking.findFirst({
      where: {
        status: { in: ['PENDING', 'CONFIRMED'] },
        OR: [
          {
            startTime: { lte: startTime },
            endTime: { gt: startTime },
          },
          {
            startTime: { lt: endTime },
            endTime: { gte: endTime },
          },
          {
            startTime: { gte: startTime },
            endTime: { lte: endTime },
          },
        ],
      },
    })

    if (conflictingBooking) {
      return NextResponse.json(
        { success: false, error: 'Dit tijdslot is helaas niet meer beschikbaar' },
        { status: 400 }
      )
    }

    // Check minimum booking notice
    const now = new Date()
    const minNoticeTime = new Date(now.getTime() + 24 * 60 * 60 * 1000) // 24 hours
    if (startTime < minNoticeTime) {
      return NextResponse.json(
        { success: false, error: 'Afspraken moeten minimaal 24 uur van tevoren worden gemaakt' },
        { status: 400 }
      )
    }

    // Create or find lead
    let lead = await prisma.lead.findFirst({
      where: { email: validated.email },
    })

    if (!lead) {
      lead = await prisma.lead.create({
        data: {
          name: validated.name,
          email: validated.email,
          phone: validated.phone,
          organization: validated.organization,
          source: 'DEMO_REQUEST',
          interest: bookingType.name,
        },
      })
    }

    // Create booking
    const booking = await prisma.booking.create({
      data: {
        bookingTypeId: bookingType.id,
        startTime,
        endTime,
        name: validated.name,
        email: validated.email,
        phone: validated.phone,
        organization: validated.organization,
        notes: validated.notes,
        source: validated.source,
        status: 'CONFIRMED', // Auto-confirm for now
        leadId: lead.id,
      },
      include: {
        bookingType: true,
      },
    })

    // Send confirmation emails (non-blocking)
    const { date, time } = formatBookingDateTime(startTime)
    const emailData = {
      name: validated.name,
      email: validated.email,
      organization: validated.organization,
      bookingType: bookingType.name,
      duration: bookingType.duration,
      date,
      time,
      meetingLink: booking.meetingLink || undefined,
      notes: validated.notes,
    }

    // Send emails in background (don't await)
    Promise.all([
      sendBookingConfirmation(emailData),
      sendAdminNotification(emailData),
    ]).catch((err) => console.error('Error sending booking emails:', err))

    // TODO: Create Google Calendar event

    return NextResponse.json({
      success: true,
      data: booking,
      message: 'Afspraak succesvol geboekt!',
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      const zodError = error as z.ZodError
      return NextResponse.json(
        { success: false, error: zodError.issues[0]?.message || 'Validatiefout' },
        { status: 400 }
      )
    }
    console.error('Error creating booking:', error)
    return NextResponse.json(
      { success: false, error: 'Er ging iets mis bij het maken van de afspraak' },
      { status: 500 }
    )
  }
}
