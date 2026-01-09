import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

// Validation schema voor quiz result
const quizResultSchema = z.object({
  answers: z.record(z.string(), z.number()),
  dimensionScores: z.record(z.string(), z.object({
    points: z.number(),
    maxPoints: z.number(),
    percentage: z.number(),
  })),
  totalScore: z.number().min(0).max(100),
  profileId: z.string(),
  organizationSize: z.string().optional(),
  volunteerCount: z.number().optional(),
  roiData: z.object({
    hoursSaved: z.number(),
    costSaved: z.number(),
    retentionImprovement: z.number(),
    volunteersRetained: z.number(),
  }).optional(),
  visitorId: z.string().optional(),
  lead: z.object({
    name: z.string().optional(),
    email: z.string().email(),
    organization: z.string().optional(),
  }).optional(),
})

// POST /api/quiz - Sla quiz resultaat op
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validated = quizResultSchema.parse(body)

    // Convert dimensionScores to simple percentages for storage
    const dimensionScoresForDb = Object.entries(validated.dimensionScores).reduce(
      (acc, [key, value]) => ({ ...acc, [key]: value.percentage }),
      {} as Record<string, number>
    )

    let leadId: string | null = null

    // Create or update lead if email provided
    if (validated.lead?.email) {
      let lead = await prisma.lead.findFirst({
        where: { email: validated.lead.email },
      })

      if (lead) {
        // Update existing lead
        lead = await prisma.lead.update({
          where: { id: lead.id },
          data: {
            name: validated.lead.name || lead.name,
            organization: validated.lead.organization || lead.organization,
            // Update source to QUIZ if not already set to something more specific
            source: lead.source === 'CHAT' || lead.source === 'NEWSLETTER' ? lead.source : 'QUIZ',
            interest: 'VrijwilligersCheck resultaat',
          },
        })
      } else {
        // Create new lead
        lead = await prisma.lead.create({
          data: {
            name: validated.lead.name,
            email: validated.lead.email,
            organization: validated.lead.organization,
            source: 'QUIZ',
            interest: 'VrijwilligersCheck resultaat',
          },
        })
      }

      leadId = lead.id
    }

    // Create quiz result
    const quizResult = await prisma.quizResult.create({
      data: {
        totalScore: validated.totalScore,
        dimensionScores: dimensionScoresForDb,
        answers: validated.answers,
        profileId: validated.profileId,
        organizationSize: validated.organizationSize,
        volunteerCount: validated.volunteerCount,
        roiData: validated.roiData,
        visitorId: validated.visitorId,
        leadId,
      },
    })

    return NextResponse.json({
      success: true,
      data: {
        id: quizResult.id,
        shareToken: quizResult.shareToken,
      },
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      const zodError = error as z.ZodError
      return NextResponse.json(
        { success: false, error: zodError.issues[0]?.message || 'Validatiefout' },
        { status: 400 }
      )
    }
    console.error('Error saving quiz result:', error)
    return NextResponse.json(
      { success: false, error: 'Er ging iets mis bij het opslaan van je resultaat' },
      { status: 500 }
    )
  }
}

// GET /api/quiz?token=xxx - Haal quiz resultaat op via shareToken
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const token = searchParams.get('token')
    const id = searchParams.get('id')

    if (!token && !id) {
      return NextResponse.json(
        { success: false, error: 'Token of ID is verplicht' },
        { status: 400 }
      )
    }

    const quizResult = await prisma.quizResult.findFirst({
      where: token ? { shareToken: token } : { id: id! },
      include: {
        lead: {
          select: {
            name: true,
            organization: true,
          },
        },
      },
    })

    if (!quizResult) {
      return NextResponse.json(
        { success: false, error: 'Resultaat niet gevonden' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: {
        id: quizResult.id,
        totalScore: quizResult.totalScore,
        dimensionScores: quizResult.dimensionScores,
        profileId: quizResult.profileId,
        organizationSize: quizResult.organizationSize,
        volunteerCount: quizResult.volunteerCount,
        roiData: quizResult.roiData,
        shareToken: quizResult.shareToken,
        createdAt: quizResult.createdAt,
        name: quizResult.lead?.name,
        organization: quizResult.lead?.organization,
      },
    })
  } catch (error) {
    console.error('Error fetching quiz result:', error)
    return NextResponse.json(
      { success: false, error: 'Er ging iets mis' },
      { status: 500 }
    )
  }
}
