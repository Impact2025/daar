import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { QuizResultDisplay } from '@/components/quiz/QuizResultDisplay'
import { QUIZ_PROFILES, QUIZ_DIMENSIONS, DimensionId } from '@/constants/quiz'

interface PageProps {
  params: Promise<{ id: string }>
}

async function getQuizResult(id: string) {
  const result = await prisma.quizResult.findFirst({
    where: {
      OR: [
        { id },
        { shareToken: id },
      ],
    },
    include: {
      lead: {
        select: {
          name: true,
          organization: true,
        },
      },
    },
  })

  return result
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  const result = await getQuizResult(id)

  if (!result) {
    return {
      title: 'Resultaat niet gevonden | DAAR',
    }
  }

  const profile = QUIZ_PROFILES.find((p) => p.id === result.profileId) || QUIZ_PROFILES[3]
  const title = `${result.totalScore}% - ${profile.title} | VrijwilligersCheck`
  const description = `Score op de DAAR VrijwilligersCheck: ${result.totalScore}%. ${profile.description.slice(0, 120)}...`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
    },
  }
}

export default async function QuizResultPage({ params }: PageProps) {
  const { id } = await params
  const result = await getQuizResult(id)

  if (!result) {
    notFound()
  }

  // Transform data for the display component
  const dimensionScores = result.dimensionScores as Record<DimensionId, number>
  const roiData = result.roiData as {
    hoursSaved: number
    costSaved: number
    retentionImprovement: number
    volunteersRetained: number
  } | null

  const displayData = {
    id: result.id,
    totalScore: result.totalScore,
    dimensionScores,
    profileId: result.profileId,
    organizationSize: result.organizationSize,
    volunteerCount: result.volunteerCount,
    roiData,
    shareToken: result.shareToken,
    createdAt: result.createdAt.toISOString(),
    name: result.lead?.name || undefined,
    organization: result.lead?.organization || undefined,
  }

  return (
    <div className="bg-offWhite min-h-screen py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-lightGreen rounded-full mb-4">
            <span className="text-brandGreen text-sm font-semibold tracking-wide">
              VRIJWILLIGERSCHECK
            </span>
          </div>
          <h1 className="text-3xl font-bold text-daar-blue">
            Quiz Resultaat
          </h1>
        </div>

        <QuizResultDisplay data={displayData} />
      </div>
    </div>
  )
}
