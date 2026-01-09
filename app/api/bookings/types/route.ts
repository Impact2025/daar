import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { DAAR_BOOKING_TYPES } from '@/constants/booking'

// GET /api/bookings/types - Haal beschikbare booking types op
export async function GET() {
  try {
    // First, ensure booking types exist in database
    for (const type of DAAR_BOOKING_TYPES) {
      await prisma.bookingType.upsert({
        where: { slug: type.slug },
        update: {
          name: type.name,
          description: type.description,
          duration: type.duration,
          price: type.price,
          color: type.color,
        },
        create: {
          slug: type.slug,
          name: type.name,
          description: type.description,
          duration: type.duration,
          price: type.price,
          color: type.color,
          isActive: true,
        },
      })
    }

    // Get active booking types
    const bookingTypes = await prisma.bookingType.findMany({
      where: { isActive: true },
      orderBy: { duration: 'asc' },
    })

    return NextResponse.json({
      success: true,
      data: bookingTypes,
    })
  } catch (error) {
    console.error('Error fetching booking types:', error)
    return NextResponse.json(
      { success: false, error: 'Er ging iets mis' },
      { status: 500 }
    )
  }
}
