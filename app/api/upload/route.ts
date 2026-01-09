import { NextRequest, NextResponse } from 'next/server'
import { put, del } from '@vercel/blob'
import { auth } from '@/lib/auth'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await auth()
    if (!session?.user || !['ADMIN', 'EDITOR', 'WRITER'].includes(session.user.role)) {
      return NextResponse.json(
        { success: false, error: 'Niet geautoriseerd' },
        { status: 401 }
      )
    }

    const formData = await request.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'Geen bestand geüpload' },
        { status: 400 }
      )
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { success: false, error: 'Ongeldig bestandstype. Alleen JPG, PNG, GIF en WebP zijn toegestaan.' },
        { status: 400 }
      )
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024
    if (file.size > maxSize) {
      return NextResponse.json(
        { success: false, error: 'Bestand is te groot. Maximum is 5MB.' },
        { status: 400 }
      )
    }

    // Generate unique filename
    const timestamp = Date.now()
    const extension = file.name.split('.').pop()
    const filename = `${timestamp}-${Math.random().toString(36).substring(7)}.${extension}`

    // Check if Vercel Blob is configured
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      // Upload to Vercel Blob
      const blobFilename = `articles/${filename}`
      const blob = await put(blobFilename, file, {
        access: 'public',
        addRandomSuffix: false,
      })

      return NextResponse.json({
        success: true,
        data: {
          url: blob.url,
          filename: blob.pathname,
        },
      })
    } else {
      // Fallback: save locally in public/uploads
      const uploadsDir = path.join(process.cwd(), 'public', 'uploads', 'articles')
      await mkdir(uploadsDir, { recursive: true })

      const filePath = path.join(uploadsDir, filename)
      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)
      await writeFile(filePath, buffer)

      const url = `/uploads/articles/${filename}`

      return NextResponse.json({
        success: true,
        data: {
          url,
          filename,
        },
      })
    }
  } catch (error) {
    console.error('[Upload] Error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Upload mislukt'
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user || !['ADMIN', 'EDITOR', 'WRITER'].includes(session.user.role)) {
      return NextResponse.json(
        { success: false, error: 'Niet geautoriseerd' },
        { status: 401 }
      )
    }

    const { url } = await request.json()

    if (!url) {
      return NextResponse.json(
        { success: false, error: 'Geen URL opgegeven' },
        { status: 400 }
      )
    }

    await del(url)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[Upload] Delete error:', error)
    return NextResponse.json(
      { success: false, error: 'Verwijderen mislukt' },
      { status: 500 }
    )
  }
}
