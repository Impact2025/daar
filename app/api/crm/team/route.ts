import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

// GET /api/crm/team - Get all team members
export async function GET() {
  try {
    const session = await auth()
    if (!session?.user || !['ADMIN', 'EDITOR'].includes(session.user.role)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const team = await prisma.teamMember.findMany({
      where: { isActive: true },
      orderBy: { name: 'asc' },
      include: {
        _count: {
          select: {
            customers: true,
            deals: true,
            tasksAssigned: { where: { status: { not: 'COMPLETED' } } },
          },
        },
      },
    })

    return NextResponse.json(team)
  } catch (error) {
    console.error('Error fetching team:', error)
    return NextResponse.json({ error: 'Failed to fetch team' }, { status: 500 })
  }
}

// POST /api/crm/team - Create a new team member
export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const data = await request.json()

    const teamMember = await prisma.teamMember.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        role: data.role,
        avatar: data.avatar,
        color: data.color || '#3BA273',
        userId: data.userId,
      },
    })

    return NextResponse.json(teamMember)
  } catch (error) {
    console.error('Error creating team member:', error)
    return NextResponse.json({ error: 'Failed to create team member' }, { status: 500 })
  }
}
