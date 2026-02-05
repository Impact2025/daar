import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

// GET /api/drive/folders - Get folders (root or by parent)
export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user || !['ADMIN', 'EDITOR'].includes(session.user.role)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const parentId = searchParams.get('parentId')
    const customerId = searchParams.get('customerId')

    const where: Record<string, unknown> = {}

    if (parentId) {
      where.parentId = parentId
    } else if (!customerId) {
      // Root level folders (no parent)
      where.parentId = null
    }

    if (customerId) {
      where.customerId = customerId
    }

    const folders = await prisma.driveFolder.findMany({
      where,
      include: {
        parent: { select: { id: true, name: true } },
        customer: { select: { id: true, companyName: true } },
        createdBy: { select: { id: true, name: true } },
        _count: {
          select: { children: true, files: true },
        },
      },
      orderBy: { name: 'asc' },
    })

    return NextResponse.json(folders)
  } catch (error) {
    console.error('Error fetching folders:', error)
    return NextResponse.json({ error: 'Failed to fetch folders' }, { status: 500 })
  }
}

// POST /api/drive/folders - Create a new folder
export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user || !['ADMIN', 'EDITOR'].includes(session.user.role)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const data = await request.json()

    const folder = await prisma.driveFolder.create({
      data: {
        name: data.name,
        color: data.color || null,
        icon: data.icon || null,
        parentId: data.parentId || null,
        customerId: data.customerId || null,
        createdById: data.createdById,
      },
      include: {
        parent: { select: { id: true, name: true } },
        customer: { select: { id: true, companyName: true } },
        createdBy: { select: { id: true, name: true } },
        _count: {
          select: { children: true, files: true },
        },
      },
    })

    return NextResponse.json(folder)
  } catch (error) {
    console.error('Error creating folder:', error)
    return NextResponse.json({ error: 'Failed to create folder' }, { status: 500 })
  }
}
