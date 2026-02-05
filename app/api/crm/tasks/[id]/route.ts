import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { sendTaskAssignmentEmail } from '@/lib/email'

// GET /api/crm/tasks/[id] - Get task details
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

    const task = await prisma.task.findUnique({
      where: { id },
      include: {
        customer: {
          select: { id: true, companyName: true, contactName: true },
        },
        assignedTo: {
          select: { id: true, name: true, avatar: true, color: true, email: true },
        },
        createdBy: {
          select: { id: true, name: true },
        },
      },
    })

    if (!task) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 })
    }

    return NextResponse.json(task)
  } catch (error) {
    console.error('Error fetching task:', error)
    return NextResponse.json({ error: 'Failed to fetch task' }, { status: 500 })
  }
}

// PATCH /api/crm/tasks/[id] - Update task
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

    // Haal de huidige taak op om te checken of assignee wijzigt
    const currentTask = await prisma.task.findUnique({
      where: { id },
      select: { assignedToId: true },
    })

    const updateData: Record<string, unknown> = {}

    const fields = ['title', 'description', 'status', 'priority', 'assignedToId', 'customerId']
    for (const field of fields) {
      if (data[field] !== undefined) {
        updateData[field] = data[field]
      }
    }

    if (data.dueDate !== undefined) {
      updateData.dueDate = data.dueDate ? new Date(data.dueDate) : null
    }

    if (data.reminderAt !== undefined) {
      updateData.reminderAt = data.reminderAt ? new Date(data.reminderAt) : null
    }

    // If completing the task, set completedAt
    if (data.status === 'COMPLETED') {
      updateData.completedAt = new Date()
    } else if (data.status && data.status !== 'COMPLETED') {
      updateData.completedAt = null
    }

    const task = await prisma.task.update({
      where: { id },
      data: updateData,
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

    // Stuur e-mail als de taak aan iemand anders is toegewezen
    const assigneeChanged = data.assignedToId && currentTask?.assignedToId !== data.assignedToId
    if (assigneeChanged && task.assignedTo?.email) {
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
        console.error('Failed to send task reassignment email:', err)
      })
    }

    return NextResponse.json(task)
  } catch (error) {
    console.error('Error updating task:', error)
    return NextResponse.json({ error: 'Failed to update task' }, { status: 500 })
  }
}

// DELETE /api/crm/tasks/[id] - Delete task
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    if (!session?.user || !['ADMIN', 'EDITOR'].includes(session.user.role)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params

    await prisma.task.delete({ where: { id } })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting task:', error)
    return NextResponse.json({ error: 'Failed to delete task' }, { status: 500 })
  }
}
