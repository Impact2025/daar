import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/articles/search - Zoek artikelen
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q') || ''
    const category = searchParams.get('category')
    const page = parseInt(searchParams.get('page') || '1')
    const pageSize = parseInt(searchParams.get('pageSize') || '10')

    if (!query.trim()) {
      return NextResponse.json({
        success: true,
        data: [],
        pagination: { page, pageSize, total: 0, totalPages: 0 },
      })
    }

    // Build where clause met full-text search
    const where: any = {
      status: 'PUBLISHED',
      OR: [
        { title: { contains: query, mode: 'insensitive' } },
        { contentPlain: { contains: query, mode: 'insensitive' } },
        { excerpt: { contains: query, mode: 'insensitive' } },
      ],
    }

    if (category) {
      where.category = { slug: category }
    }

    // Log search query voor analytics
    await prisma.searchQuery.create({
      data: {
        query: query.toLowerCase().trim(),
        resultsCount: 0, // Will update after search
      },
    }).catch(() => {}) // Don't fail if logging fails

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
        publishedAt: true,
        readingTime: true,
        viewCount: true,
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
      orderBy: [
        { viewCount: 'desc' }, // Populaire artikelen eerst
        { publishedAt: 'desc' },
      ],
      skip: (page - 1) * pageSize,
      take: pageSize,
    })

    // Update search query with results count
    await prisma.searchQuery.updateMany({
      where: {
        query: query.toLowerCase().trim(),
        createdAt: {
          gte: new Date(Date.now() - 1000), // Within last second
        },
      },
      data: {
        resultsCount: total,
      },
    }).catch(() => {})

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
    console.error('Error searching articles:', error)
    return NextResponse.json(
      { success: false, error: 'Er ging iets mis bij het zoeken' },
      { status: 500 }
    )
  }
}
