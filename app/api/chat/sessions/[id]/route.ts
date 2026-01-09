import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

interface RouteParams {
  params: Promise<{ id: string }>
}

// GET /api/chat/sessions/[id] - Haal chat sessie met alle berichten op
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await auth()
    if (!session?.user || !['ADMIN', 'EDITOR'].includes(session.user.role)) {
      return NextResponse.json(
        { success: false, error: 'Niet geautoriseerd' },
        { status: 401 }
      )
    }

    const { id } = await params

    const chatSession = await prisma.chatSession.findUnique({
      where: { id },
      include: {
        messages: {
          orderBy: { createdAt: 'asc' },
          include: {
            articleRefs: {
              include: {
                article: {
                  select: {
                    id: true,
                    title: true,
                    slug: true
                  }
                }
              }
            }
          }
        },
        lead: true
      }
    })

    if (!chatSession) {
      return NextResponse.json(
        { success: false, error: 'Sessie niet gevonden' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: chatSession
    })
  } catch (error) {
    console.error('Error fetching chat session:', error)
    return NextResponse.json(
      { success: false, error: 'Er ging iets mis' },
      { status: 500 }
    )
  }
}

// DELETE /api/chat/sessions/[id] - Verwijder chat sessie
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await auth()
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { success: false, error: 'Niet geautoriseerd' },
        { status: 401 }
      )
    }

    const { id } = await params

    await prisma.chatSession.delete({
      where: { id }
    })

    return NextResponse.json({
      success: true,
      message: 'Sessie verwijderd'
    })
  } catch (error) {
    console.error('Error deleting chat session:', error)
    return NextResponse.json(
      { success: false, error: 'Er ging iets mis bij het verwijderen' },
      { status: 500 }
    )
  }
}
