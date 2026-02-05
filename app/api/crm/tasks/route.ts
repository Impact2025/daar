import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { TaskStatus, TaskPriority } from '@prisma/client'
import { sendTaskAssignmentEmail } from '@/lib/email'

// GET /api/crm/tasks - Get all tasks with filters
export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user || !['ADMIN', 'EDITOR'].includes(session.user.role)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const assignedToId = searchParams.get('assignedToId')
    const customerId = searchParams.get('customerId')
    const status = searchParams.get('status') as TaskStatus | null
    const priority = searchParams.get('priority') as TaskPriority | null
    const dueToday = searchParams.get('dueToday') === 'true'
    const overdue = searchParams.get('overdue') === 'true'
    const page = parseInt(searchParams.get('page') || '1')
    const pageSize = parseInt(searchParams.get('pageSize') || '50')

    const where: Record<string, unknown> = {}

    if (assignedToId) where.assignedToId = assignedToId
    if (customerId) where.customerId = customerId
    if (status) where.status = status
    if (priority) where.priority = priority

    if (dueToday) {
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      const tomorrow = new Date(today)
      tomorrow.setDate(tomorrow.getDate() + 1)
      where.dueDate = { gte: today, lt: tomorrow }
      where.status = { not: 'COMPLETED' }
    }

    if (overdue) {
      where.dueDate = { lt: new Date() }
      where.status = { not: 'COMPLETED' }
    }

    const [tasks, total] = await Promise.all([
      prisma.task.findMany({
        where,
        include: {
          customer: {
            select: { id: true, companyName: true },
          },
          assignedTo: {
            select: { id: true, name: true, avatar: true, color: true },
          },
          createdBy: {
            select: { id: true, name: true },
          },
        },
        orderBy: [
          { priority: 'desc' },
          { dueDate: 'asc' },
          { createdAt: 'desc' },
        ],
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.task.count({ where }),
    ])

    return NextResponse.json({
      data: tasks,
      pagination: {
        page,
        pageSize,
        total,
        totalPages: Math.ceil(total / pageSize),
      },
    })
  } catch (error) {
    console.error('Error fetching tasks:', error)
    return NextResponse.json({ error: 'Failed to fetch tasks' }, { status: 500 })
  }
}

// POST /api/crm/tasks - Create a new task
export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user || !['ADMIN', 'EDITOR'].includes(session.user.role)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const data = await request.json()

    const task = await prisma.task.create({
      data: {
        title: data.title,
        description: data.description || null,
        status: data.status || 'TODO',
        priority: data.priority || 'MEDIUM',
        dueDate: data.dueDate ? new Date(data.dueDate) : null,
        reminderAt: data.reminderAt ? new Date(data.reminderAt) : null,
        customerId: data.customerId || null,
        assignedToId: data.assignedToId,
        createdById: data.createdById,
      },
      include: {
        customer: {
          select: { id: true, companyName: true },
        },
        assignedTo: {
          select: { id: true, name: true, email: true, avatar: true, color: true },
        },
        createdBy: {
          select: { id: true, name: true },
        },
      },
    })

    // Stuur e-mailnotificatie naar de toegewezen persoon
    if (task.assignedTo?.email) {
      sendTaskAssignmentEmail({
        assigneeName: task.assignedTo.name,
        assigneeEmail: task.assignedTo.email,
        taskTitle: task.title,
        taskDescription: task.description,
        dueDate: task.dueDate,
        priority: task.priority,
        customerName: task.customer?.companyName,
        createdByName: task.createdBy.name,
      }).catch((err) => {
        console.error('Failed to send task assignment email:', err)
      })
    }

    return NextResponse.json(task)
  } catch (error) {
    console.error('Error creating task:', error)
    return NextResponse.json({ error: 'Failed to create task' }, { status: 500 })
  }
}
