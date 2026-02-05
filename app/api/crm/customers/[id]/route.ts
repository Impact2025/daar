import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

// GET /api/crm/customers/[id] - Get customer details
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

    const customer = await prisma.customer.findUnique({
      where: { id },
      include: {
        assignedTo: {
          select: { id: true, name: true, email: true, avatar: true, color: true, phone: true },
        },
        deals: {
          include: {
            customer: { select: { id: true, companyName: true, contactName: true } },
            owner: { select: { id: true, name: true, avatar: true, color: true } },
          },
          orderBy: { updatedAt: 'desc' },
        },
        tasks: {
          where: { status: { not: 'COMPLETED' } },
          include: {
            customer: { select: { id: true, companyName: true } },
            assignedTo: { select: { id: true, name: true, avatar: true, color: true } },
            createdBy: { select: { id: true, name: true } },
          },
          orderBy: { dueDate: 'asc' },
          take: 10,
        },
        notes: {
          include: {
            author: { select: { id: true, name: true, avatar: true } },
          },
          orderBy: [{ isPinned: 'desc' }, { createdAt: 'desc' }],
          take: 10,
        },
        activities: {
          include: {
            customer: { select: { id: true, companyName: true } },
            performedBy: { select: { id: true, name: true, avatar: true, color: true } },
          },
          orderBy: { occurredAt: 'desc' },
          take: 20,
        },
        folders: {
          select: { id: true, name: true, color: true },
        },
        _count: {
          select: {
            activities: true,
            tasks: true,
            deals: true,
            notes: true,
          },
        },
      },
    })

    if (!customer) {
      return NextResponse.json({ error: 'Customer not found' }, { status: 404 })
    }

    return NextResponse.json(customer)
  } catch (error) {
    console.error('Error fetching customer:', error)
    return NextResponse.json({ error: 'Failed to fetch customer' }, { status: 500 })
  }
}

// PATCH /api/crm/customers/[id] - Update customer
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

    // Validate KVK number format if provided
    if (data.kvkNumber && !/^\d{8}$/.test(data.kvkNumber)) {
      return NextResponse.json({ error: 'KVK nummer moet 8 cijfers zijn' }, { status: 400 })
    }

    const updateData: Record<string, unknown> = {}

    // Only include fields that are provided
    const fields = [
      'companyName', 'kvkNumber', 'vatNumber', 'website', 'industry',
      'contactName', 'contactEmail', 'contactPhone', 'contactRole',
      'address', 'postalCode', 'city', 'country',
      'status', 'source', 'employeeCount',
      'priceAgreement', 'hourlyRate', 'monthlyBudget', 'paymentTerms',
      'assignedToId', 'lastContactAt'
    ]

    for (const field of fields) {
      if (data[field] !== undefined) {
        updateData[field] = data[field]
      }
    }

    if (data.nextFollowUp !== undefined) {
      updateData.nextFollowUp = data.nextFollowUp ? new Date(data.nextFollowUp) : null
    }

    const customer = await prisma.customer.update({
      where: { id },
      data: updateData,
      include: {
        assignedTo: {
          select: { id: true, name: true, avatar: true, color: true },
        },
      },
    })

    return NextResponse.json(customer)
  } catch (error) {
    console.error('Error updating customer:', error)
    return NextResponse.json({ error: 'Failed to update customer' }, { status: 500 })
  }
}

// DELETE /api/crm/customers/[id] - Delete customer
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params

    await prisma.customer.delete({ where: { id } })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting customer:', error)
    return NextResponse.json({ error: 'Failed to delete customer' }, { status: 500 })
  }
}
