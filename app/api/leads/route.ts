import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

// GET /api/leads - Haal alle leads op
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
    const source = searchParams.get('source')

    const where: any = {}
    if (status && status !== 'ALL') where.status = status
    if (source && source !== 'ALL') where.source = source

    const leads = await prisma.lead.findMany({
      where,
      include: {
        chatSession: {
          select: {
            id: true,
            messageCount: true
          }
        },
        bookings: {
          select: {
            id: true,
            startTime: true
          },
          take: 5,
          orderBy: { startTime: 'desc' }
        },
        quizResults: {
          select: {
            id: true,
            totalScore: true,
            profileId: true
          },
          take: 1,
          orderBy: { createdAt: 'desc' }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({
      success: true,
      data: leads
    })
  } catch (error) {
    console.error('Error fetching leads:', error)
    return NextResponse.json(
      { success: false, error: 'Er ging iets mis bij het ophalen van leads' },
      { status: 500 }
    )
  }
}
