import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { generateSlug } from '@/lib/utils'
import { z } from 'zod'

const updateSchema = z.object({
  name: z.string().min(1).optional(),
  slug: z.string().optional(),
  description: z.string().optional(),
  icon: z.string().optional(),
  color: z.string().optional(),
  sortOrder: z.number().optional(),
  parentId: z.string().optional().nullable()
})

interface RouteParams {
  params: Promise<{ id: string }>
}

// GET /api/categories/[id] - Haal specifieke categorie op
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params

    const category = await prisma.category.findUnique({
      where: { id },
      include: {
        _count: {
          select: { articles: true }
        },
        children: true,
        parent: true
      }
    })

    if (!category) {
      return NextResponse.json(
        { success: false, error: 'Categorie niet gevonden' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: category
    })
  } catch (error) {
    console.error('Error fetching category:', error)
    return NextResponse.json(
      { success: false, error: 'Er ging iets mis' },
      { status: 500 }
    )
  }
}

// PUT /api/categories/[id] - Update categorie
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await auth()
    if (!session?.user || !['ADMIN', 'EDITOR'].includes(session.user.role)) {
      return NextResponse.json(
        { success: false, error: 'Niet geautoriseerd' },
        { status: 401 }
      )
    }

    const { id } = await params
    const body = await request.json()
    const validated = updateSchema.parse(body)

    // If name changed but not slug, generate new slug
    if (validated.name && !validated.slug) {
      validated.slug = generateSlug(validated.name)
    }

    // Check if new slug conflicts with existing
    if (validated.slug) {
      const existing = await prisma.category.findFirst({
        where: {
          slug: validated.slug,
          NOT: { id }
        }
      })

      if (existing) {
        return NextResponse.json(
          { success: false, error: 'Er bestaat al een categorie met deze URL' },
          { status: 400 }
        )
      }
    }

    const category = await prisma.category.update({
      where: { id },
      data: validated,
      include: {
        _count: {
          select: { articles: true }
        }
      }
    })

    return NextResponse.json({
      success: true,
      data: category
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Validatiefout' },
        { status: 400 }
      )
    }
    console.error('Error updating category:', error)
    return NextResponse.json(
      { success: false, error: 'Er ging iets mis bij het updaten' },
      { status: 500 }
    )
  }
}

// DELETE /api/categories/[id] - Verwijder categorie
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await auth()
    if (!session?.user || !['ADMIN', 'EDITOR'].includes(session.user.role)) {
      return NextResponse.json(
        { success: false, error: 'Niet geautoriseerd' },
        { status: 401 }
      )
    }

    const { id } = await params

    // Check if category has articles
    const category = await prisma.category.findUnique({
      where: { id },
      include: {
        _count: {
          select: { articles: true }
        }
      }
    })

    if (!category) {
      return NextResponse.json(
        { success: false, error: 'Categorie niet gevonden' },
        { status: 404 }
      )
    }

    if (category._count.articles > 0) {
      return NextResponse.json(
        { success: false, error: `Kan niet verwijderen: ${category._count.articles} artikel(en) gebruiken deze categorie` },
        { status: 400 }
      )
    }

    await prisma.category.delete({
      where: { id }
    })

    return NextResponse.json({
      success: true,
      message: 'Categorie verwijderd'
    })
  } catch (error) {
    console.error('Error deleting category:', error)
    return NextResponse.json(
      { success: false, error: 'Er ging iets mis bij het verwijderen' },
      { status: 500 }
    )
  }
}
