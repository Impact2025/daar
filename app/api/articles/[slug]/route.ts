import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { generateSlug, calculateReadingTime, stripHtml } from '@/lib/utils'
import { z } from 'zod'

// Validation schema voor update
const updateSchema = z.object({
  title: z.string().min(1).optional(),
  slug: z.string().optional(),
  content: z.string().min(1).optional(),
  excerpt: z.string().optional(),
  metaTitle: z.string().max(60).optional(),
  metaDescription: z.string().max(160).optional(),
  featuredImage: z.string().url().optional().or(z.literal('')).or(z.null()),
  featuredImageAlt: z.string().optional(),
  headerStyle: z.enum(['image', 'gradient']).optional(),
  categoryId: z.string().optional().or(z.null()),
  tagIds: z.array(z.string()).optional(),
  status: z.enum(['DRAFT', 'REVIEW', 'PUBLISHED', 'ARCHIVED']).optional(),
})

interface RouteParams {
  params: Promise<{ slug: string }>
}

// GET /api/articles/[slug] - Haal specifiek artikel op
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { slug } = await params

    const article = await prisma.article.findUnique({
      where: { slug },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            bio: true,
            avatar: true,
            role: true,
          },
        },
        category: true,
        tags: {
          include: {
            tag: true,
          },
        },
      },
    })

    if (!article) {
      return NextResponse.json(
        { success: false, error: 'Artikel niet gevonden' },
        { status: 404 }
      )
    }

    // Check if article is published (or user is admin)
    const session = await auth()
    const isAdmin = session?.user && ['ADMIN', 'EDITOR'].includes(session.user.role)

    if (article.status !== 'PUBLISHED' && !isAdmin) {
      return NextResponse.json(
        { success: false, error: 'Artikel niet gevonden' },
        { status: 404 }
      )
    }

    // Increment view count (only for published articles viewed by non-admin)
    if (article.status === 'PUBLISHED' && !isAdmin) {
      await prisma.article.update({
        where: { id: article.id },
        data: { viewCount: { increment: 1 } },
      })
    }

    return NextResponse.json({
      success: true,
      data: article,
    })
  } catch (error) {
    console.error('Error fetching article:', error)
    return NextResponse.json(
      { success: false, error: 'Er ging iets mis bij het ophalen van het artikel' },
      { status: 500 }
    )
  }
}

// PUT /api/articles/[slug] - Update artikel
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await auth()
    if (!session?.user || !['ADMIN', 'EDITOR', 'WRITER'].includes(session.user.role)) {
      return NextResponse.json(
        { success: false, error: 'Niet geautoriseerd' },
        { status: 401 }
      )
    }

    const { slug } = await params
    const body = await request.json()
    const validated = updateSchema.parse(body)

    // Find existing article
    const existingArticle = await prisma.article.findUnique({
      where: { slug },
    })

    if (!existingArticle) {
      return NextResponse.json(
        { success: false, error: 'Artikel niet gevonden' },
        { status: 404 }
      )
    }

    // Prepare update data
    const updateData: any = { ...validated }

    // If content changed, update plain text and reading time
    if (validated.content) {
      updateData.contentPlain = stripHtml(validated.content)
      updateData.readingTime = calculateReadingTime(updateData.contentPlain)
    }

    // Handle slug change
    if (validated.slug && validated.slug !== slug) {
      const slugExists = await prisma.article.findUnique({
        where: { slug: validated.slug },
      })
      if (slugExists) {
        return NextResponse.json(
          { success: false, error: 'Er bestaat al een artikel met deze URL' },
          { status: 400 }
        )
      }
    }

    // Handle status change to PUBLISHED
    if (validated.status === 'PUBLISHED' && existingArticle.status !== 'PUBLISHED') {
      updateData.publishedAt = new Date()
    }

    // Handle tags update
    if (validated.tagIds !== undefined) {
      // Remove existing tags
      await prisma.tagsOnArticles.deleteMany({
        where: { articleId: existingArticle.id },
      })

      // Add new tags
      if (validated.tagIds.length > 0) {
        await prisma.tagsOnArticles.createMany({
          data: validated.tagIds.map((tagId) => ({
            articleId: existingArticle.id,
            tagId,
          })),
        })
      }

      delete updateData.tagIds
    }

    // Update article
    const article = await prisma.article.update({
      where: { slug },
      data: updateData,
      include: {
        author: true,
        category: true,
        tags: {
          include: {
            tag: true,
          },
        },
      },
    })

    return NextResponse.json({
      success: true,
      data: article,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      const zodError = error as z.ZodError
      return NextResponse.json(
        { success: false, error: zodError.issues[0]?.message || 'Validatiefout' },
        { status: 400 }
      )
    }
    console.error('Error updating article:', error)
    return NextResponse.json(
      { success: false, error: 'Er ging iets mis bij het updaten van het artikel' },
      { status: 500 }
    )
  }
}

// DELETE /api/articles/[slug] - Verwijder artikel
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await auth()
    if (!session?.user || !['ADMIN', 'EDITOR'].includes(session.user.role)) {
      return NextResponse.json(
        { success: false, error: 'Niet geautoriseerd' },
        { status: 401 }
      )
    }

    const { slug } = await params

    const article = await prisma.article.findUnique({
      where: { slug },
    })

    if (!article) {
      return NextResponse.json(
        { success: false, error: 'Artikel niet gevonden' },
        { status: 404 }
      )
    }

    await prisma.article.delete({
      where: { slug },
    })

    return NextResponse.json({
      success: true,
      message: 'Artikel verwijderd',
    })
  } catch (error) {
    console.error('Error deleting article:', error)
    return NextResponse.json(
      { success: false, error: 'Er ging iets mis bij het verwijderen van het artikel' },
      { status: 500 }
    )
  }
}
