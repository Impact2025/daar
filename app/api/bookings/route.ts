import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { z } from 'zod'
import {
  sendBookingEmails,
  formatBookingDateTime,
} from '@/lib/email'

// Mail versturen vereist de Node-runtime (niet Edge) en genoeg tijd.
export const runtime = 'nodejs'
export const maxDuration = 15

/**
 * Bepaal de videogesprek-link voor een online afspraak.
 * - Als er expliciet een link is meegegeven, gebruik die.
 * - Anders een vaste teamruimte via DEFAULT_MEETING_LINK, indien gezet.
 * - Anders een per-afspraak Jitsi-ruimte (werkt zonder account).
 */
function resolveMeetingLink(bookingId: string, provided?: string | null): string {
  if (provided) return provided
  if (process.env.DEFAULT_MEETING_LINK) return process.env.DEFAULT_MEETING_LINK
  return `https://meet.jit.si/DAAR-${bookingId}`
}

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
  customerId: z.string().optional(),
  meetingType: z.enum(['ONLINE', 'BELAFSPRAAK', 'OP_LOCATIE']).default('ONLINE'),
  meetingLink: z.string().optional(),
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

    // Check minimum booking notice (skip for admin bookings)
    if (validated.source !== 'ADMIN') {
      const now = new Date()
      const minNoticeTime = new Date(now.getTime() + 24 * 60 * 60 * 1000) // 24 hours
      if (startTime < minNoticeTime) {
        return NextResponse.json(
          { success: false, error: 'Afspraken moeten minimaal 24 uur van tevoren worden gemaakt' },
          { status: 400 }
        )
      }
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
        customerId: validated.customerId || null,
        meetingType: validated.meetingType,
        meetingLink: validated.meetingType === 'ONLINE' ? (validated.meetingLink || null) : null,
      },
      include: {
        bookingType: true,
      },
    })

    // Zorg dat online afspraken altijd een werkende videolink hebben
    let meetingLink = booking.meetingLink
    if (validated.meetingType === 'ONLINE' && !meetingLink) {
      meetingLink = resolveMeetingLink(booking.id, validated.meetingLink)
      await prisma.booking.update({
        where: { id: booking.id },
        data: { meetingLink },
      })
    }

    // Bepaal de locatie voor de agenda-uitnodiging
    const location =
      validated.meetingType === 'ONLINE'
        ? meetingLink || 'Online videogesprek'
        : validated.meetingType === 'BELAFSPRAAK'
          ? `Telefonisch${validated.phone ? ` (${validated.phone})` : ''}`
          : validated.organization || 'Op locatie'

    // Verstuur bevestiging (klant) + notificatie (team) — betrouwbaar afgewacht
    const { date, time } = formatBookingDateTime(startTime)
    const emailData = {
      name: validated.name,
      email: validated.email,
      organization: validated.organization,
      bookingType: bookingType.name,
      duration: bookingType.duration,
      date,
      time,
      meetingLink: meetingLink || undefined,
      notes: validated.notes,
      bookingId: booking.id,
      startTime,
      endTime,
      location,
    }

    const emailResults = await sendBookingEmails(emailData)

    // Leg vast of de klant een bevestiging heeft ontvangen
    if (emailResults.confirmation.success) {
      await prisma.booking.update({
        where: { id: booking.id },
        data: { confirmationSent: true },
      })
    }

    // TODO: Google Calendar event via API aanmaken (nu: .ics-uitnodiging bijgevoegd)

    return NextResponse.json({
      success: true,
      data: { ...booking, meetingLink },
      confirmationEmailSent: emailResults.confirmation.success,
      message: emailResults.confirmation.success
        ? 'Afspraak succesvol geboekt! Je ontvangt een bevestiging per e-mail.'
        : 'Afspraak succesvol geboekt! We nemen zo snel mogelijk contact met je op.',
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
