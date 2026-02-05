import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { del } from '@vercel/blob'

// GET /api/drive/files/[id] - Get file details
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

    const file = await prisma.driveFile.update({
      where: { id },
      data: {
        lastAccessedAt: new Date(),
        downloadCount: { increment: 1 },
      },
      include: {
        folder: { select: { id: true, name: true } },
        uploadedBy: { select: { id: true, name: true, avatar: true } },
      },
    })

    if (!file) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 })
    }

    return NextResponse.json(file)
  } catch (error) {
    console.error('Error fetching file:', error)
    return NextResponse.json({ error: 'Failed to fetch file' }, { status: 500 })
  }
}

// PATCH /api/drive/files/[id] - Update file metadata
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

    const updateData: Record<string, unknown> = {}

    if (data.displayName !== undefined) updateData.displayName = data.displayName
    if (data.description !== undefined) updateData.description = data.description
    if (data.tags !== undefined) updateData.tags = data.tags
    if (data.folderId !== undefined) updateData.folderId = data.folderId

    const file = await prisma.driveFile.update({
      where: { id },
      data: updateData,
      include: {
        folder: { select: { id: true, name: true } },
        uploadedBy: { select: { id: true, name: true, avatar: true } },
      },
    })

    return NextResponse.json(file)
  } catch (error) {
    console.error('Error updating file:', error)
    return NextResponse.json({ error: 'Failed to update file' }, { status: 500 })
  }
}

// DELETE /api/drive/files/[id] - Delete file
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

    // Get file to delete from blob storage
    const file = await prisma.driveFile.findUnique({
      where: { id },
      select: { url: true },
    })

    if (!file) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 })
    }

    // Delete from Vercel Blob
    try {
      await del(file.url)
    } catch (blobError) {
      console.error('Error deleting blob:', blobError)
      // Continue anyway to clean up database
    }

    // Delete from database
    await prisma.driveFile.delete({ where: { id } })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting file:', error)
    return NextResponse.json({ error: 'Failed to delete file' }, { status: 500 })
  }
}
