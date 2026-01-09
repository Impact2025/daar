import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { generateSlug } from '@/lib/utils'
import { z } from 'zod'

const categorySchema = z.object({
  name: z.string().min(1, 'Naam is verplicht'),
  slug: z.string().optional(),
  description: z.string().optional(),
  icon: z.string().optional(),
  color: z.string().optional(),
  parentId: z.string().optional(),
})

// GET /api/categories - Haal alle categorieën op
export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      include: {
        _count: {
          select: {
            articles: {
              where: { status: 'PUBLISHED' },
            },
          },
        },
        children: {
          include: {
            _count: {
              select: {
                articles: {
                  where: { status: 'PUBLISHED' },
                },
              },
            },
          },
        },
      },
      where: {
        parentId: null, // Only top-level categories
      },
      orderBy: {
        sortOrder: 'asc',
      },
    })

    return NextResponse.json({
      success: true,
      data: categories,
    })
  } catch (error) {
    console.error('Error fetching categories:', error)
    return NextResponse.json(
      { success: false, error: 'Er ging iets mis bij het ophalen van categorieën' },
      { status: 500 }
    )
  }
}

// POST /api/categories - Maak nieuwe categorie
export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user || !['ADMIN', 'EDITOR'].includes(session.user.role)) {
      return NextResponse.json(
        { success: false, error: 'Niet geautoriseerd' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const validated = categorySchema.parse(body)

    const slug = validated.slug || generateSlug(validated.name)

    // Check if slug exists
    const existing = await prisma.category.findUnique({
      where: { slug },
    })

    if (existing) {
      return NextResponse.json(
        { success: false, error: 'Er bestaat al een categorie met deze URL' },
        { status: 400 }
      )
    }

    // Get max sortOrder
    const maxOrder = await prisma.category.aggregate({
      _max: { sortOrder: true },
    })

    const category = await prisma.category.create({
      data: {
        name: validated.name,
        slug,
        description: validated.description,
        icon: validated.icon,
        color: validated.color,
        parentId: validated.parentId || null,
        sortOrder: (maxOrder._max.sortOrder || 0) + 1,
      },
    })

    return NextResponse.json({
      success: true,
      data: category,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      const zodError = error as z.ZodError
      return NextResponse.json(
        { success: false, error: zodError.issues[0]?.message || 'Validatiefout' },
        { status: 400 }
      )
    }
    console.error('Error creating category:', error)
    return NextResponse.json(
      { success: false, error: 'Er ging iets mis bij het aanmaken van de categorie' },
      { status: 500 }
    )
  }
}
