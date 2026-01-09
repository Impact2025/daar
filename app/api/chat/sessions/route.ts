import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

// GET /api/chat/sessions - Haal chat sessies op (admin)
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
    const page = parseInt(searchParams.get('page') || '1')
    const pageSize = parseInt(searchParams.get('pageSize') || '20')
    const isActive = searchParams.get('active')

    const where: any = {}
    if (isActive !== null) {
      where.isActive = isActive === 'true'
    }

    const total = await prisma.chatSession.count({ where })

    const sessions = await prisma.chatSession.findMany({
      where,
      include: {
        messages: {
          orderBy: { createdAt: 'desc' },
          take: 1, // Just the last message
        },
        lead: {
          select: {
            name: true,
            email: true,
            organization: true,
          },
        },
        _count: {
          select: { messages: true },
        },
      },
      orderBy: { updatedAt: 'desc' },
      skip: (page - 1) * pageSize,
      take: pageSize,
    })

    return NextResponse.json({
      success: true,
      data: sessions,
      pagination: {
        page,
        pageSize,
        total,
        totalPages: Math.ceil(total / pageSize),
      },
    })
  } catch (error) {
    console.error('Error fetching chat sessions:', error)
    return NextResponse.json(
      { success: false, error: 'Er ging iets mis' },
      { status: 500 }
    )
  }
}

// POST /api/chat/sessions - Maak nieuwe sessie
export async function POST(request: NextRequest) {
  try {
    const { visitorId, userAgent, referrer, landingPage } = await request.json()

    const session = await prisma.chatSession.create({
      data: {
        visitorId: visitorId || `visitor_${Date.now()}`,
        userAgent,
        referrer,
        landingPage,
      },
    })

    return NextResponse.json({
      success: true,
      data: session,
    })
  } catch (error) {
    console.error('Error creating chat session:', error)
    return NextResponse.json(
      { success: false, error: 'Er ging iets mis' },
      { status: 500 }
    )
  }
}
