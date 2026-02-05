import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { put } from '@vercel/blob'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'

// GET /api/drive/files - Get files with filters
export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user || !['ADMIN', 'EDITOR'].includes(session.user.role)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const folderId = searchParams.get('folderId')
    const search = searchParams.get('search')
    const mimeType = searchParams.get('mimeType')
    const page = parseInt(searchParams.get('page') || '1')
    const pageSize = parseInt(searchParams.get('pageSize') || '50')

    const where: Record<string, unknown> = {}

    if (folderId) where.folderId = folderId
    if (mimeType) where.mimeType = { startsWith: mimeType }
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { displayName: { contains: search, mode: 'insensitive' } },
        { tags: { hasSome: [search] } },
      ]
    }

    const [files, total] = await Promise.all([
      prisma.driveFile.findMany({
        where,
        include: {
          folder: { select: { id: true, name: true } },
          uploadedBy: { select: { id: true, name: true, avatar: true } },
        },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.driveFile.count({ where }),
    ])

    return NextResponse.json({
      data: files,
      pagination: {
        page,
        pageSize,
        total,
        totalPages: Math.ceil(total / pageSize),
      },
    })
  } catch (error) {
    console.error('Error fetching files:', error)
    return NextResponse.json({ error: 'Failed to fetch files' }, { status: 500 })
  }
}

// POST /api/drive/files - Upload a new file
export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user || !['ADMIN', 'EDITOR'].includes(session.user.role)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get('file') as File
    const folderId = formData.get('folderId') as string | null
    const uploadedById = formData.get('uploadedById') as string
    const description = formData.get('description') as string | null
    const tagsString = formData.get('tags') as string | null

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Get file extension
    const extension = file.name.split('.').pop()?.toLowerCase() || null

    // Parse tags
    const tags = tagsString ? tagsString.split(',').map((t) => t.trim()).filter(Boolean) : []

    let fileUrl: string
    let blobPathname: string

    // Check if Vercel Blob is configured
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      // Upload to Vercel Blob
      const blob = await put(`drive/${Date.now()}-${file.name}`, file, {
        access: 'public',
      })
      fileUrl = blob.url
      blobPathname = blob.pathname
    } else {
      // Fallback: save locally in public/uploads/drive
      const timestamp = Date.now()
      const safeFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_')
      const filename = `${timestamp}-${safeFileName}`

      const uploadsDir = path.join(process.cwd(), 'public', 'uploads', 'drive')
      await mkdir(uploadsDir, { recursive: true })

      const filePath = path.join(uploadsDir, filename)
      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)
      await writeFile(filePath, buffer)

      fileUrl = `/uploads/drive/${filename}`
      blobPathname = `drive/${filename}`
    }

    const driveFile = await prisma.driveFile.create({
      data: {
        name: file.name,
        mimeType: file.type,
        size: file.size,
        extension,
        url: fileUrl,
        blobPathname,
        folderId: folderId || null,
        description,
        tags,
        uploadedById,
      },
      include: {
        folder: { select: { id: true, name: true } },
        uploadedBy: { select: { id: true, name: true, avatar: true } },
      },
    })

    return NextResponse.json(driveFile)
  } catch (error) {
    console.error('Error uploading file:', error)
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 })
  }
}
