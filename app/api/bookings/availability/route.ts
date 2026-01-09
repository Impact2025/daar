import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import {
  DEFAULT_BUSINESS_HOURS,
  SLOT_INTERVAL,
  MIN_BOOKING_NOTICE_HOURS,
  MAX_BOOKING_DAYS_AHEAD,
} from '@/constants/booking'

// GET /api/bookings/availability - Haal beschikbare tijdslots op
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const bookingTypeId = searchParams.get('bookingTypeId')
    const dateStr = searchParams.get('date') // YYYY-MM-DD

    if (!bookingTypeId) {
      return NextResponse.json(
        { success: false, error: 'bookingTypeId is verplicht' },
        { status: 400 }
      )
    }

    // Get booking type for duration
    const bookingType = await prisma.bookingType.findUnique({
      where: { id: bookingTypeId },
    })

    if (!bookingType || !bookingType.isActive) {
      return NextResponse.json(
        { success: false, error: 'Ongeldig booking type' },
        { status: 400 }
      )
    }

    const now = new Date()
    const minBookingTime = new Date(now.getTime() + MIN_BOOKING_NOTICE_HOURS * 60 * 60 * 1000)

    // If specific date requested, return slots for that date
    if (dateStr) {
      const date = new Date(dateStr)
      const slots = await getSlotsForDate(date, bookingType.duration, minBookingTime)

      return NextResponse.json({
        success: true,
        data: {
          date: dateStr,
          slots,
        },
      })
    }

    // Otherwise, return available dates for next MAX_BOOKING_DAYS_AHEAD days
    const availableDates: { date: string; slotsCount: number }[] = []

    for (let i = 0; i < MAX_BOOKING_DAYS_AHEAD; i++) {
      const date = new Date(now)
      date.setDate(date.getDate() + i)
      date.setHours(0, 0, 0, 0)

      const slots = await getSlotsForDate(date, bookingType.duration, minBookingTime)

      if (slots.length > 0) {
        availableDates.push({
          date: date.toISOString().split('T')[0],
          slotsCount: slots.length,
        })
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        availableDates,
        duration: bookingType.duration,
      },
    })
  } catch (error) {
    console.error('Error fetching availability:', error)
    return NextResponse.json(
      { success: false, error: 'Er ging iets mis' },
      { status: 500 }
    )
  }
}

async function getSlotsForDate(
  date: Date,
  duration: number,
  minBookingTime: Date
): Promise<string[]> {
  const dayOfWeek = date.getDay()
  const businessHours = DEFAULT_BUSINESS_HOURS.find((bh) => bh.dayOfWeek === dayOfWeek)

  if (!businessHours || !businessHours.isActive) {
    return []
  }

  // Parse business hours
  const [startHour, startMin] = businessHours.startTime.split(':').map(Number)
  const [endHour, endMin] = businessHours.endTime.split(':').map(Number)

  // Create start and end times for the day
  const dayStart = new Date(date)
  dayStart.setHours(startHour, startMin, 0, 0)

  const dayEnd = new Date(date)
  dayEnd.setHours(endHour, endMin, 0, 0)

  // Get existing bookings for this day
  const existingBookings = await prisma.booking.findMany({
    where: {
      status: { in: ['PENDING', 'CONFIRMED'] },
      startTime: {
        gte: dayStart,
        lt: dayEnd,
      },
    },
    select: {
      startTime: true,
      endTime: true,
    },
  })

  // Generate available slots
  const slots: string[] = []
  let currentSlot = new Date(dayStart)

  while (currentSlot < dayEnd) {
    const slotEnd = new Date(currentSlot.getTime() + duration * 60 * 1000)

    // Check if slot end is within business hours
    if (slotEnd > dayEnd) {
      break
    }

    // Check if slot is in the future (after min booking time)
    if (currentSlot >= minBookingTime) {
      // Check for conflicts with existing bookings
      const hasConflict = existingBookings.some((booking) => {
        const bookingStart = new Date(booking.startTime)
        const bookingEnd = new Date(booking.endTime)

        return (
          (currentSlot >= bookingStart && currentSlot < bookingEnd) ||
          (slotEnd > bookingStart && slotEnd <= bookingEnd) ||
          (currentSlot <= bookingStart && slotEnd >= bookingEnd)
        )
      })

      if (!hasConflict) {
        slots.push(currentSlot.toISOString())
      }
    }

    // Move to next slot
    currentSlot = new Date(currentSlot.getTime() + SLOT_INTERVAL * 60 * 1000)
  }

  return slots
}
