'use client'

import { Share2, Calendar, RotateCcw, Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button, Card, CardContent } from '@/components/ui'
import { RadarChart } from './RadarChart'
import {
  QUIZ_DIMENSIONS,
  QUIZ_PROFILES,
  BENCHMARKS,
  MODULE_RECOMMENDATIONS,
  DimensionId,
  QuizProfile,
} from '@/constants/quiz'

interface QuizResultData {
  id: string
  totalScore: number
  dimensionScores: Record<DimensionId, number>
  profileId: string
  organizationSize: string | null
  volunteerCount: number | null
  roiData: {
    hoursSaved: number
    costSaved: number
    retentionImprovement: number
    volunteersRetained: number
  } | null
  shareToken: string
  createdAt: string
  name?: string
  organization?: string
}

interface QuizResultDisplayProps {
  data: QuizResultData
  className?: string
}

export function QuizResultDisplay({ data, className }: QuizResultDisplayProps) {
  const profile = QUIZ_PROFILES.find((p) => p.id === data.profileId) || QUIZ_PROFILES[3]
  const orgSize = data.organizationSize || 'sm'
  const volunteerCount = data.volunteerCount || 60

  // Get benchmarks for org size
  const benchmarks = Object.keys(QUIZ_DIMENSIONS).reduce(
    (acc, dim) => ({
      ...acc,
      [dim]: BENCHMARKS[dim as DimensionId][orgSize] || 50,
    }),
    {} as Record<DimensionId, number>
  )

  // Get lowest scoring dimension for recommendation
  const sortedDimensions = Object.entries(data.dimensionScores).sort(
    (a, b) => a[1] - b[1]
  )
  const lowestDimensionId = sortedDimensions[0][0] as DimensionId
  const lowestDimensionScore = sortedDimensions[0][1]
  const recommendedModules = MODULE_RECOMMENDATIONS[lowestDimensionId]

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/quiz/resultaat/${data.id}`

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Mijn VrijwilligersCheck score',
          text: `Ik scoorde ${data.totalScore}% op de DAAR VrijwilligersCheck. Hoe scoort jouw organisatie?`,
          url: shareUrl,
        })
      } catch {
        // User cancelled or share failed
      }
    } else {
      navigator.clipboard.writeText(shareUrl)
    }
  }

  return (
    <div className={cn('space-y-6', className)}>
      {/* Header */}
      {(data.name || data.organization) && (
        <div className="text-center text-gray-600">
          {data.name && <p>Resultaat van {data.name}</p>}
          {data.organization && <p className="text-sm">{data.organization}</p>}
        </div>
      )}

      {/* Score Overview */}
      <Card>
        <CardContent className="p-6 md:p-8">
          <div className="text-center mb-6">
            <span
              className="inline-block px-3 py-1 rounded-full text-sm font-medium mb-4"
              style={{ backgroundColor: `${profile.color}15`, color: profile.color }}
            >
              {profile.title}
            </span>

            <div className="text-6xl font-bold text-navy mb-2">{data.totalScore}%</div>
            <p className="text-gray-500">Totale Geluksscore</p>
          </div>

          {/* Radar Chart */}
          <div className="flex justify-center my-8">
            <RadarChart
              scores={data.dimensionScores}
              benchmarks={benchmarks}
              size={280}
            />
          </div>

          {/* Profile description */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <p className="text-navy">{profile.description}</p>
          </div>

          {/* Recommendation */}
          <div
            className="rounded-xl p-4 mb-6"
            style={{ backgroundColor: `${profile.color}10` }}
          >
            <p className="text-sm font-medium text-navy mb-1">Onze aanbeveling</p>
            <p className="text-gray-700">{profile.recommendation}</p>
          </div>
        </CardContent>
      </Card>

      {/* ROI Card */}
      {data.roiData && (
        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold text-navy mb-4">Potentiele impact van verbetering</h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-lightGreen rounded-xl p-4">
                <p className="text-2xl font-bold text-brandGreen">{data.roiData.hoursSaved}</p>
                <p className="text-sm text-gray-600">uur/jaar bespaard</p>
              </div>
              <div className="bg-lightGreen rounded-xl p-4">
                <p className="text-2xl font-bold text-brandGreen">
                  {data.roiData.costSaved.toLocaleString('nl-NL', {
                    style: 'currency',
                    currency: 'EUR',
                    maximumFractionDigits: 0,
                  })}
                </p>
                <p className="text-sm text-gray-600">kostenreductie</p>
              </div>
              <div className="bg-blue-50 rounded-xl p-4">
                <p className="text-2xl font-bold text-blue-600">{data.roiData.retentionImprovement}%</p>
                <p className="text-sm text-gray-600">betere retentie</p>
              </div>
              <div className="bg-blue-50 rounded-xl p-4">
                <p className="text-2xl font-bold text-blue-600">{data.roiData.volunteersRetained}</p>
                <p className="text-sm text-gray-600">vrijwilligers behouden</p>
              </div>
            </div>

            <p className="text-xs text-gray-400 mt-4">
              Schatting gebaseerd op sectoronderzoek en praktijkervaring
            </p>
          </CardContent>
        </Card>
      )}

      {/* Modules Card */}
      <Card>
        <CardContent className="p-6">
          <h3 className="font-semibold text-navy mb-2">
            Aanbevolen voor {QUIZ_DIMENSIONS[lowestDimensionId].name}
          </h3>
          <p className="text-sm text-gray-500 mb-4">
            Dit is de laagst scorende dimensie met {lowestDimensionScore}%
          </p>

          <div className="space-y-3">
            {recommendedModules.map((module, i) => (
              <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-brandGreen/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-brandGreen" />
                </div>
                <div>
                  <p className="font-medium text-navy">{module.name}</p>
                  <p className="text-sm text-gray-500">{module.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          variant="primary"
          className="flex-1 gap-2"
          onClick={() => window.open('/afspraak', '_blank')}
        >
          <Calendar className="w-4 h-4" />
          Plan een gesprek
        </Button>
        <Button variant="outline" className="gap-2" onClick={handleShare}>
          <Share2 className="w-4 h-4" />
          Delen
        </Button>
        <Button variant="outline" className="gap-2" onClick={() => window.location.href = '/quiz'}>
          <RotateCcw className="w-4 h-4" />
          Zelf doen
        </Button>
      </div>

      {/* Created at */}
      <p className="text-center text-xs text-gray-400">
        Ingevuld op {new Date(data.createdAt).toLocaleDateString('nl-NL', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })}
      </p>
    </div>
  )
}
