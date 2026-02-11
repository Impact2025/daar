import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { CustomerStatus, CustomerSource } from '@prisma/client'

// GET /api/crm/customers - Get all customers with filters
export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user || !['ADMIN', 'EDITOR'].includes(session.user.role)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status') as CustomerStatus | null
    const source = searchParams.get('source') as CustomerSource | null
    const assignedToId = searchParams.get('assignedToId')
    const search = searchParams.get('search')
    const page = parseInt(searchParams.get('page') || '1')
    const pageSize = parseInt(searchParams.get('pageSize') || '25')

    const where: Record<string, unknown> = {}

    if (status) where.status = status
    if (source) where.source = source
    if (assignedToId) where.assignedToId = assignedToId
    if (search) {
      where.OR = [
        { companyName: { contains: search, mode: 'insensitive' } },
        { contactName: { contains: search, mode: 'insensitive' } },
        { contactEmail: { contains: search, mode: 'insensitive' } },
        { kvkNumber: { contains: search } },
      ]
    }

    const [customers, total] = await Promise.all([
      prisma.customer.findMany({
        where,
        include: {
          assignedTo: {
            select: { id: true, name: true, avatar: true, color: true },
          },
          _count: {
            select: { deals: true, tasks: { where: { status: { not: 'COMPLETED' } } } },
          },
        },
        orderBy: { updatedAt: 'desc' },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.customer.count({ where }),
    ])

    return NextResponse.json({
      data: customers,
      pagination: {
        page,
        pageSize,
        total,
        totalPages: Math.ceil(total / pageSize),
      },
    })
  } catch (error) {
    console.error('Error fetching customers:', error)
    return NextResponse.json({ error: 'Failed to fetch customers' }, { status: 500 })
  }
}

// POST /api/crm/customers - Create a new customer
export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user || !['ADMIN', 'EDITOR'].includes(session.user.role)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const data = await request.json()

    // Validate KVK number format (8 digits)
    if (data.kvkNumber && !/^\d{8}$/.test(data.kvkNumber)) {
      return NextResponse.json({ error: 'KVK nummer moet 8 cijfers zijn' }, { status: 400 })
    }

    const customer = await prisma.customer.create({
      data: {
        companyName: data.companyName,
        kvkNumber: data.kvkNumber || null,
        vatNumber: data.vatNumber || null,
        website: data.website || null,
        industry: data.industry || null,
        // Daar-specific fields
        organizationType: data.organizationType || null,
        sector: data.sector || null,
        volunteerCount: data.volunteerCount || null,
        paidStaffCount: data.paidStaffCount || null,
        currentSoftware: data.currentSoftware || null,
        painPoints: data.painPoints || null,
        desiredFeatures: data.desiredFeatures || null,
        annualBudget: data.annualBudget || null,
        subsidized: data.subsidized || false,
        subsidySource: data.subsidySource || null,
        // Contact
        contactName: data.contactName || null,
        contactEmail: data.contactEmail || null,
        contactPhone: data.contactPhone || null,
        contactRole: data.contactRole || null,
        address: data.address || null,
        postalCode: data.postalCode || null,
        city: data.city || null,
        country: data.country || 'Nederland',
        status: data.status || 'LEAD',
        source: data.source || 'WEBSITE',
        employeeCount: data.employeeCount || null,
        priceAgreement: data.priceAgreement || null,
        hourlyRate: data.hourlyRate || null,
        monthlyBudget: data.monthlyBudget || null,
        paymentTerms: data.paymentTerms || 30,
        assignedToId: data.assignedToId || null,
        nextFollowUp: data.nextFollowUp ? new Date(data.nextFollowUp) : null,
        remarks: data.remarks || null,
      },
      include: {
        assignedTo: {
          select: { id: true, name: true, avatar: true, color: true },
        },
      },
    })

    return NextResponse.json(customer)
  } catch (error) {
    console.error('Error creating customer:', error)
    return NextResponse.json({ error: 'Failed to create customer' }, { status: 500 })
  }
}
