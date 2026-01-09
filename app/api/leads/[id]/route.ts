import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { z } from 'zod'

const updateSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  organization: z.string().optional(),
  interest: z.string().optional(),
  notes: z.string().optional(),
  status: z.enum(['NEW', 'CONTACTED', 'QUALIFIED', 'CONVERTED', 'ARCHIVED']).optional()
})

interface RouteParams {
  params: Promise<{ id: string }>
}

// GET /api/leads/[id] - Haal specifieke lead op
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

    const lead = await prisma.lead.findUnique({
      where: { id },
      include: {
        chatSession: {
          include: {
            messages: {
              orderBy: { createdAt: 'asc' }
            }
          }
        },
        bookings: {
          include: {
            bookingType: true
          },
          orderBy: { startTime: 'desc' }
        },
        quizResults: {
          orderBy: { createdAt: 'desc' }
        }
      }
    })

    if (!lead) {
      return NextResponse.json(
        { success: false, error: 'Lead niet gevonden' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: lead
    })
  } catch (error) {
    console.error('Error fetching lead:', error)
    return NextResponse.json(
      { success: false, error: 'Er ging iets mis' },
      { status: 500 }
    )
  }
}

// PUT /api/leads/[id] - Update lead
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
    const validated = updateSchema.parse(body)

    const lead = await prisma.lead.update({
      where: { id },
      data: validated
    })

    return NextResponse.json({
      success: true,
      data: lead
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Validatiefout' },
        { status: 400 }
      )
    }
    console.error('Error updating lead:', error)
    return NextResponse.json(
      { success: false, error: 'Er ging iets mis bij het updaten' },
      { status: 500 }
    )
  }
}

// DELETE /api/leads/[id] - Verwijder lead
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

    await prisma.lead.delete({
      where: { id }
    })

    return NextResponse.json({
      success: true,
      message: 'Lead verwijderd'
    })
  } catch (error) {
    console.error('Error deleting lead:', error)
    return NextResponse.json(
      { success: false, error: 'Er ging iets mis bij het verwijderen' },
      { status: 500 }
    )
  }
}
