import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

// GET /api/drive/folders/[id] - Get folder with contents
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    if (!session?.user || !['ADMIN', 'EDITOR'].includes(session.user.role)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params

    const folder = await prisma.driveFolder.findUnique({
      where: { id },
      include: {
        parent: { select: { id: true, name: true } },
        children: {
          select: { id: true, name: true, color: true, icon: true, _count: { select: { files: true, children: true } } },
          orderBy: { name: 'asc' },
        },
        files: {
          include: {
            uploadedBy: { select: { id: true, name: true, avatar: true } },
          },
          orderBy: { createdAt: 'desc' },
        },
        customer: { select: { id: true, companyName: true } },
        createdBy: { select: { id: true, name: true } },
        _count: {
          select: { children: true, files: true },
        },
      },
    })

    if (!folder) {
      return NextResponse.json({ error: 'Folder not found' }, { status: 404 })
    }

    // Build breadcrumb path
    const breadcrumbs = []
    let currentFolder = folder
    while (currentFolder.parent) {
      breadcrumbs.unshift({ id: currentFolder.parent.id, name: currentFolder.parent.name })
      const parent = await prisma.driveFolder.findUnique({
        where: { id: currentFolder.parent.id },
        include: { parent: { select: { id: true, name: true } } },
      })
      if (!parent) break
      currentFolder = parent as typeof folder
    }

    return NextResponse.json({ ...folder, breadcrumbs })
  } catch (error) {
    console.error('Error fetching folder:', error)
    return NextResponse.json({ error: 'Failed to fetch folder' }, { status: 500 })
  }
}

// PATCH /api/drive/folders/[id] - Update folder
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    if (!session?.user || !['ADMIN', 'EDITOR'].includes(session.user.role)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    const data = await request.json()

    const folder = await prisma.driveFolder.update({
      where: { id },
      data: {
        name: data.name,
        color: data.color,
        icon: data.icon,
        parentId: data.parentId,
        customerId: data.customerId,
      },
      include: {
        parent: { select: { id: true, name: true } },
        createdBy: { select: { id: true, name: true } },
      },
    })

    return NextResponse.json(folder)
  } catch (error) {
    console.error('Error updating folder:', error)
    return NextResponse.json({ error: 'Failed to update folder' }, { status: 500 })
  }
}

// DELETE /api/drive/folders/[id] - Delete folder and contents
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    if (!session?.user || !['ADMIN', 'EDITOR'].includes(session.user.role)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params

    // Cascade delete will remove all children and files
    await prisma.driveFolder.delete({ where: { id } })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting folder:', error)
    return NextResponse.json({ error: 'Failed to delete folder' }, { status: 500 })
  }
}
