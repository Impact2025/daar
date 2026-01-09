import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { generateSlug, calculateReadingTime, stripHtml } from '@/lib/utils'
import { z } from 'zod'

// Validation schema voor artikel
const articleSchema = z.object({
  title: z.string().min(1, 'Titel is verplicht'),
  slug: z.string().optional(),
  content: z.string().min(1, 'Inhoud is verplicht'),
  excerpt: z.string().optional(),
  metaTitle: z.string().max(60).optional(),
  metaDescription: z.string().max(160).optional(),
  featuredImage: z.string().url().optional().or(z.literal('')),
  featuredImageAlt: z.string().optional(),
  headerStyle: z.enum(['image', 'gradient']).default('image'),
  categoryId: z.string().optional(),
  tagIds: z.array(z.string()).optional(),
  status: z.enum(['DRAFT', 'REVIEW', 'PUBLISHED', 'ARCHIVED']).default('DRAFT'),
})

// GET /api/articles - Haal artikelen op
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status') || 'PUBLISHED'
    const category = searchParams.get('category')
    const tag = searchParams.get('tag')
    const page = parseInt(searchParams.get('page') || '1')
    const pageSize = parseInt(searchParams.get('pageSize') || '10')
    const sortBy = searchParams.get('sortBy') || 'publishedAt'
    const sortOrder = searchParams.get('sortOrder') || 'desc'

    // Build where clause
    const where: any = {}

    if (status !== 'all') {
      where.status = status
    }

    if (category) {
      where.category = { slug: category }
    }

    if (tag) {
      where.tags = {
        some: {
          tag: { slug: tag }
        }
      }
    }

    // Get total count
    const total = await prisma.article.count({ where })

    // Get articles
    const articles = await prisma.article.findMany({
      where,
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        featuredImage: true,
        headerStyle: true,
        publishedAt: true,
        readingTime: true,
        viewCount: true,
        status: true,
        createdAt: true,
        author: {
          select: {
            name: true,
            avatar: true,
          },
        },
        category: {
          select: {
            name: true,
            slug: true,
            color: true,
          },
        },
      },
      orderBy: {
        [sortBy]: sortOrder,
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
    })

    return NextResponse.json({
      success: true,
      data: articles,
      pagination: {
        page,
        pageSize,
        total,
        totalPages: Math.ceil(total / pageSize),
      },
    })
  } catch (error) {
    console.error('Error fetching articles:', error)
    return NextResponse.json(
      { success: false, error: 'Er ging iets mis bij het ophalen van artikelen' },
      { status: 500 }
    )
  }
}

// POST /api/articles - Maak nieuw artikel
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

    const body = await request.json()
    const validated = articleSchema.parse(body)

    // Generate slug if not provided
    const slug = validated.slug || generateSlug(validated.title)

    // Check if slug already exists
    const existingArticle = await prisma.article.findUnique({
      where: { slug },
    })

    if (existingArticle) {
      return NextResponse.json(
        { success: false, error: 'Er bestaat al een artikel met deze URL' },
        { status: 400 }
      )
    }

    // Get author
    const author = await prisma.author.findFirst({
      where: { userId: session.user.id },
    })

    if (!author) {
      return NextResponse.json(
        { success: false, error: 'Auteur profiel niet gevonden' },
        { status: 400 }
      )
    }

    // Calculate reading time and plain text
    const contentPlain = stripHtml(validated.content)
    const readingTime = calculateReadingTime(contentPlain)

    // Create article
    const article = await prisma.article.create({
      data: {
        title: validated.title,
        slug,
        content: validated.content,
        contentPlain,
        excerpt: validated.excerpt || contentPlain.substring(0, 200) + '...',
        metaTitle: validated.metaTitle,
        metaDescription: validated.metaDescription,
        featuredImage: validated.featuredImage || null,
        featuredImageAlt: validated.featuredImageAlt,
        headerStyle: validated.headerStyle,
        status: validated.status,
        publishedAt: validated.status === 'PUBLISHED' ? new Date() : null,
        readingTime,
        authorId: author.id,
        categoryId: validated.categoryId || null,
        tags: validated.tagIds?.length
          ? {
              create: validated.tagIds.map((tagId) => ({
                tagId,
              })),
            }
          : undefined,
      },
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
    console.error('Error creating article:', error)
    return NextResponse.json(
      { success: false, error: 'Er ging iets mis bij het aanmaken van het artikel' },
      { status: 500 }
    )
  }
}
