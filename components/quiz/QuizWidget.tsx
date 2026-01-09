'use client'

import { useState, useCallback } from 'react'
import { ArrowRight, ArrowLeft, Check, Download, Share2, Calendar, RotateCcw } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button, Card, CardContent, Input } from '@/components/ui'
import { RadarChart } from './RadarChart'
import {
  QUIZ_QUESTIONS,
  QUIZ_DIMENSIONS,
  ORGANIZATION_SIZES,
  BENCHMARKS,
  MODULE_RECOMMENDATIONS,
  DimensionId,
  calculateDimensionScores,
  calculateTotalScore,
  calculateROI,
  getProfile,
} from '@/constants/quiz'

type Step = 'intro' | 'questions' | 'lead' | 'result'

interface QuizWidgetProps {
  onComplete?: (resultId: string) => void
  className?: string
}

export function QuizWidget({ onComplete, className }: QuizWidgetProps) {
  const [step, setStep] = useState<Step>('intro')
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const [leadData, setLeadData] = useState({ name: '', email: '', organization: '' })
  const [resultId, setResultId] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [visitorId] = useState(() => `quiz_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`)

  // Calculate scores
  const dimensionScores = calculateDimensionScores(answers)
  const totalScore = calculateTotalScore(dimensionScores)
  const profile = getProfile(totalScore)

  // Get organization size from first answer
  const orgSizeAnswer = answers['org-size']
  const orgSize = orgSizeAnswer !== undefined ? ORGANIZATION_SIZES[orgSizeAnswer - 1]?.id || 'sm' : 'sm'
  const volunteerCount =
    orgSizeAnswer === 1 ? 15 : orgSizeAnswer === 2 ? 60 : orgSizeAnswer === 3 ? 250 : 750

  // Get benchmarks for org size
  const benchmarks = Object.keys(QUIZ_DIMENSIONS).reduce(
    (acc, dim) => ({
      ...acc,
      [dim]: BENCHMARKS[dim as DimensionId][orgSize] || 50,
    }),
    {} as Record<DimensionId, number>
  )

  // Calculate ROI
  const roi = calculateROI(dimensionScores, orgSize, volunteerCount)

  // Progress
  const progress = (currentQuestion / QUIZ_QUESTIONS.length) * 100

  const handleAnswer = useCallback(
    (score: number) => {
      setSelectedOption(score)
      setIsAnimating(true)

      setTimeout(() => {
        const question = QUIZ_QUESTIONS[currentQuestion]
        setAnswers((prev) => ({ ...prev, [question.id]: score }))

        if (currentQuestion < QUIZ_QUESTIONS.length - 1) {
          setCurrentQuestion(currentQuestion + 1)
          setSelectedOption(null)
        } else {
          setStep('lead')
        }
        setIsAnimating(false)
      }, 300)
    },
    [currentQuestion]
  )

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      setSelectedOption(null)
    }
  }

  const handleSkipLead = async () => {
    await submitResult()
  }

  const handleSubmitLead = async (e: React.FormEvent) => {
    e.preventDefault()
    await submitResult(leadData)
  }

  const submitResult = async (lead?: typeof leadData) => {
    setIsSubmitting(true)

    try {
      const res = await fetch('/api/quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          answers,
          dimensionScores,
          totalScore,
          profileId: profile.id,
          organizationSize: orgSize,
          volunteerCount,
          roiData: roi,
          visitorId,
          lead: lead?.email ? lead : undefined,
        }),
      })

      const data = await res.json()

      if (data.success) {
        setResultId(data.data.id)
        onComplete?.(data.data.id)
      }
    } catch (error) {
      console.error('Error submitting quiz:', error)
    } finally {
      setIsSubmitting(false)
      setStep('result')
    }
  }

  const handleRestart = () => {
    setStep('intro')
    setCurrentQuestion(0)
    setAnswers({})
    setSelectedOption(null)
    setLeadData({ name: '', email: '', organization: '' })
    setResultId(null)
  }

  const handleShare = async () => {
    const shareUrl = resultId
      ? `${window.location.origin}/quiz/resultaat/${resultId}`
      : window.location.href

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Mijn VrijwilligersCheck score',
          text: `Ik scoorde ${totalScore}% op de DAAR VrijwilligersCheck. Hoe scoort jouw organisatie?`,
          url: shareUrl,
        })
      } catch {
        // User cancelled or share failed
      }
    } else {
      navigator.clipboard.writeText(shareUrl)
    }
  }

  // Get lowest scoring dimension for recommendation
  const lowestDimension = Object.entries(dimensionScores).sort(
    (a, b) => a[1].percentage - b[1].percentage
  )[0]
  const lowestDimensionId = lowestDimension[0] as DimensionId
  const recommendedModules = MODULE_RECOMMENDATIONS[lowestDimensionId]

  return (
    <div className={cn('w-full max-w-2xl mx-auto', className)}>
      {/* Intro */}
      {step === 'intro' && (
        <Card>
          <CardContent className="p-8 md:p-12 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-lightGreen rounded-full mb-6">
              <span className="text-brandGreen text-sm font-semibold tracking-wide">
                VRIJWILLIGERSCHECK
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-navy mb-4">
              Hoe gezond is jouw
              <br />
              <span className="text-brandGreen">vrijwilligersbeleid?</span>
            </h1>

            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Ontdek in 2 minuten hoe je scoort op 5 dimensies en ontvang gepersonaliseerde
              aanbevelingen met concrete ROI-berekeningen.
            </p>

            <div className="grid grid-cols-5 gap-3 mb-8">
              {(Object.keys(QUIZ_DIMENSIONS) as DimensionId[]).map((dim) => (
                <div key={dim} className="text-center">
                  <div
                    className="w-10 h-10 rounded-lg mx-auto mb-2 flex items-center justify-center"
                    style={{ backgroundColor: `${QUIZ_DIMENSIONS[dim].color}15` }}
                  >
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: QUIZ_DIMENSIONS[dim].color }}
                    />
                  </div>
                  <span className="text-xs text-gray-500">
                    {QUIZ_DIMENSIONS[dim].name.split(' ')[0]}
                  </span>
                </div>
              ))}
            </div>

            <Button onClick={() => setStep('questions')} className="gap-2">
              Start de check
              <ArrowRight className="w-4 h-4" />
            </Button>

            <p className="text-xs text-gray-400 mt-4">
              11 vragen | Geen account nodig | Direct resultaat
            </p>
          </CardContent>
        </Card>
      )}

      {/* Questions */}
      {step === 'questions' && (
        <Card>
          <CardContent className="p-6 md:p-8">
            {/* Progress bar */}
            <div className="mb-6">
              <div className="flex justify-between text-xs text-gray-500 mb-2">
                <span>
                  Vraag {currentQuestion + 1} van {QUIZ_QUESTIONS.length}
                </span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-brandGreen rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Question */}
            <div
              className={cn(
                'transition-all duration-200',
                isAnimating ? 'opacity-50 scale-98' : 'opacity-100 scale-100'
              )}
            >
              <div className="mb-1">
                <span
                  className="inline-block px-2 py-0.5 rounded text-xs font-medium"
                  style={{
                    backgroundColor: `${QUIZ_DIMENSIONS[QUIZ_QUESTIONS[currentQuestion].dimension].color}15`,
                    color: QUIZ_DIMENSIONS[QUIZ_QUESTIONS[currentQuestion].dimension].color,
                  }}
                >
                  {QUIZ_DIMENSIONS[QUIZ_QUESTIONS[currentQuestion].dimension].name}
                </span>
              </div>

              <h2 className="text-xl md:text-2xl font-semibold text-navy mb-2">
                {QUIZ_QUESTIONS[currentQuestion].question}
              </h2>

              {QUIZ_QUESTIONS[currentQuestion].subtitle && (
                <p className="text-gray-500 mb-6">{QUIZ_QUESTIONS[currentQuestion].subtitle}</p>
              )}

              {/* Options */}
              <div className="space-y-3">
                {QUIZ_QUESTIONS[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(option.score)}
                    disabled={selectedOption !== null}
                    className={cn(
                      'w-full p-4 text-left border-2 rounded-xl transition-all duration-150',
                      selectedOption === option.score
                        ? 'border-brandGreen bg-lightGreen'
                        : 'border-gray-200 hover:border-brandGreen hover:bg-gray-50'
                    )}
                  >
                    <span className="text-navy font-medium">{option.text}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Back button */}
            {currentQuestion > 0 && (
              <button
                onClick={handleBack}
                className="flex items-center gap-2 mt-6 text-gray-500 hover:text-navy transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm">Vorige vraag</span>
              </button>
            )}
          </CardContent>
        </Card>
      )}

      {/* Lead Capture */}
      {step === 'lead' && (
        <Card>
          <CardContent className="p-6 md:p-8">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-lightGreen rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-brandGreen" />
              </div>
              <h2 className="text-2xl font-bold text-navy mb-2">Bijna klaar</h2>
              <p className="text-gray-600">
                Vul je gegevens in om je persoonlijke rapport te ontvangen met benchmarks en
                ROI-berekeningen.
              </p>
            </div>

            <form onSubmit={handleSubmitLead} className="space-y-4">
              <Input
                label="Naam"
                value={leadData.name}
                onChange={(e) => setLeadData({ ...leadData, name: e.target.value })}
                placeholder="Je naam"
              />

              <Input
                label="E-mailadres"
                type="email"
                value={leadData.email}
                onChange={(e) => setLeadData({ ...leadData, email: e.target.value })}
                placeholder="naam@organisatie.nl"
                required
              />

              <Input
                label="Organisatie (optioneel)"
                value={leadData.organization}
                onChange={(e) => setLeadData({ ...leadData, organization: e.target.value })}
                placeholder="Naam van je organisatie"
              />

              <Button type="submit" className="w-full" loading={isSubmitting}>
                Bekijk mijn resultaat
              </Button>
            </form>

            <button
              onClick={handleSkipLead}
              disabled={isSubmitting}
              className="w-full mt-4 text-center text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              Overslaan en direct resultaat bekijken
            </button>
          </CardContent>
        </Card>
      )}

      {/* Result */}
      {step === 'result' && (
        <div className="space-y-6">
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

                <div className="text-6xl font-bold text-navy mb-2">{totalScore}%</div>
                <p className="text-gray-500">Totale Geluksscore</p>
              </div>

              {/* Radar Chart */}
              <div className="flex justify-center my-8">
                <RadarChart
                  scores={Object.entries(dimensionScores).reduce(
                    (acc, [key, value]) => ({ ...acc, [key]: value.percentage }),
                    {} as Record<DimensionId, number>
                  )}
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
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold text-navy mb-4">Potentiele impact van verbetering</h3>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-lightGreen rounded-xl p-4">
                  <p className="text-2xl font-bold text-brandGreen">{roi.hoursSaved}</p>
                  <p className="text-sm text-gray-600">uur/jaar bespaard</p>
                </div>
                <div className="bg-lightGreen rounded-xl p-4">
                  <p className="text-2xl font-bold text-brandGreen">
                    {roi.costSaved.toLocaleString('nl-NL', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 })}
                  </p>
                  <p className="text-sm text-gray-600">kostenreductie</p>
                </div>
                <div className="bg-blue-50 rounded-xl p-4">
                  <p className="text-2xl font-bold text-blue-600">{roi.retentionImprovement}%</p>
                  <p className="text-sm text-gray-600">betere retentie</p>
                </div>
                <div className="bg-blue-50 rounded-xl p-4">
                  <p className="text-2xl font-bold text-blue-600">{roi.volunteersRetained}</p>
                  <p className="text-sm text-gray-600">vrijwilligers behouden</p>
                </div>
              </div>

              <p className="text-xs text-gray-400 mt-4">
                Gebaseerd op industriebenchmarks voor organisaties met {volunteerCount}± vrijwilligers
              </p>
            </CardContent>
          </Card>

          {/* Modules Card */}
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold text-navy mb-2">
                Aanbevolen voor {QUIZ_DIMENSIONS[lowestDimensionId].name}
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                Dit is je laagst scorende dimensie met {lowestDimension[1].percentage}%
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
            <Button variant="outline" className="gap-2" onClick={handleRestart}>
              <RotateCcw className="w-4 h-4" />
              Opnieuw
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
