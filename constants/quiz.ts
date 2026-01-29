// DAAR Geluksmonitor - Wereldklasse Quiz
// 5 dimensies, adaptive vragen, benchmarks, ROI berekeningen

export const QUIZ_DIMENSIONS = {
  beheer: {
    id: 'beheer',
    name: 'Beheer & Administratie',
    description: 'Hoe georganiseerd is jullie vrijwilligersadministratie?',
    icon: 'FolderOpen',
    color: '#3BA273',
  },
  communicatie: {
    id: 'communicatie',
    name: 'Communicatie & Betrokkenheid',
    description: 'Hoe effectief bereiken en betrekken jullie vrijwilligers?',
    icon: 'MessageSquare',
    color: '#3B82F6',
  },
  onboarding: {
    id: 'onboarding',
    name: 'Onboarding & Training',
    description: 'Hoe snel en effectief worden nieuwe vrijwilligers ingewerkt?',
    icon: 'UserPlus',
    color: '#8B5CF6',
  },
  retentie: {
    id: 'retentie',
    name: 'Retentie & Tevredenheid',
    description: 'Hoe goed behouden jullie vrijwilligers en meten jullie tevredenheid?',
    icon: 'Heart',
    color: '#EC4899',
  },
  impact: {
    id: 'impact',
    name: 'Impact & Rapportage',
    description: 'Hoe goed kunnen jullie de waarde van vrijwilligerswerk aantonen?',
    icon: 'BarChart3',
    color: '#F59E0B',
  },
} as const

export type DimensionId = keyof typeof QUIZ_DIMENSIONS

export interface QuizOption {
  text: string
  score: number
  dimension: DimensionId
}

export interface QuizQuestion {
  id: string
  question: string
  subtitle?: string
  dimension: DimensionId
  options: QuizOption[]
  // Adaptive: alleen tonen als aan conditie voldaan
  condition?: {
    questionId: string
    minScore?: number
    maxScore?: number
  }
}

export interface OrganizationSize {
  id: string
  label: string
  range: string
  multiplier: number // Voor ROI berekeningen
}

export const ORGANIZATION_SIZES: OrganizationSize[] = [
  { id: 'xs', label: 'Klein', range: '1-25 vrijwilligers', multiplier: 0.5 },
  { id: 'sm', label: 'Groeiend', range: '26-100 vrijwilligers', multiplier: 1 },
  { id: 'md', label: 'Middelgroot', range: '101-500 vrijwilligers', multiplier: 2.5 },
  { id: 'lg', label: 'Groot', range: '500+ vrijwilligers', multiplier: 5 },
]

// Startvrаag bepaalt organisatiegrootte en past vervolgvragen aan
export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // === INTAKE ===
  {
    id: 'org-size',
    question: 'Hoeveel vrijwilligers heeft jouw organisatie?',
    subtitle: 'Dit helpt ons relevante benchmarks te tonen',
    dimension: 'beheer',
    options: [
      { text: '1-25 vrijwilligers', score: 1, dimension: 'beheer' },
      { text: '26-100 vrijwilligers', score: 2, dimension: 'beheer' },
      { text: '101-500 vrijwilligers', score: 3, dimension: 'beheer' },
      { text: '500+ vrijwilligers', score: 4, dimension: 'beheer' },
    ],
  },

  // === BEHEER & ADMINISTRATIE ===
  {
    id: 'beheer-systeem',
    question: 'Hoe beheren jullie vrijwilligersgegevens?',
    subtitle: 'Denk aan contactgegevens, beschikbaarheid, vaardigheden',
    dimension: 'beheer',
    options: [
      { text: 'Papieren administratie of losse notities', score: 0, dimension: 'beheer' },
      { text: 'Excel of Google Sheets', score: 1, dimension: 'beheer' },
      { text: 'Meerdere losse systemen naast elkaar', score: 2, dimension: 'beheer' },
      { text: 'Eén centraal digitaal systeem', score: 4, dimension: 'beheer' },
    ],
  },
  {
    id: 'beheer-actueel',
    question: 'Hoe actueel zijn jullie vrijwilligersgegevens?',
    dimension: 'beheer',
    options: [
      { text: 'Geen idee, we checken zelden', score: 0, dimension: 'beheer' },
      { text: 'Deels verouderd, we updaten ad hoc', score: 1, dimension: 'beheer' },
      { text: 'Redelijk actueel, jaarlijkse check', score: 3, dimension: 'beheer' },
      { text: 'Altijd actueel, vrijwilligers beheren zelf', score: 4, dimension: 'beheer' },
    ],
  },

  // === COMMUNICATIE & BETROKKENHEID ===
  {
    id: 'comm-frequentie',
    question: 'Hoe vaak communiceren jullie met vrijwilligers?',
    subtitle: 'Nieuwsbrieven, updates, persoonlijk contact',
    dimension: 'communicatie',
    options: [
      { text: 'Alleen wanneer strikt noodzakelijk', score: 0, dimension: 'communicatie' },
      { text: 'Een paar keer per jaar', score: 1, dimension: 'communicatie' },
      { text: 'Maandelijks', score: 3, dimension: 'communicatie' },
      { text: 'Wekelijks of vaker', score: 4, dimension: 'communicatie' },
    ],
  },
  {
    id: 'comm-kanalen',
    question: 'Via welke kanalen bereiken jullie vrijwilligers?',
    dimension: 'communicatie',
    options: [
      { text: 'Alleen email of telefoon', score: 1, dimension: 'communicatie' },
      { text: 'Email en een WhatsApp groep', score: 2, dimension: 'communicatie' },
      { text: 'Meerdere kanalen, maar niet gecoördineerd', score: 2, dimension: 'communicatie' },
      { text: 'Geïntegreerde communicatie via één platform', score: 4, dimension: 'communicatie' },
    ],
  },

  // === ONBOARDING & TRAINING ===
  {
    id: 'onboard-tijd',
    question: 'Hoe lang duurt het voordat een nieuwe vrijwilliger volledig ingewerkt is?',
    subtitle: 'Van eerste contact tot zelfstandig inzetbaar',
    dimension: 'onboarding',
    options: [
      { text: 'Meer dan een maand', score: 0, dimension: 'onboarding' },
      { text: '2-4 weken', score: 2, dimension: 'onboarding' },
      { text: '1-2 weken', score: 3, dimension: 'onboarding' },
      { text: 'Binnen een week', score: 4, dimension: 'onboarding' },
    ],
  },
  {
    id: 'onboard-proces',
    question: 'Hoe ziet jullie onboarding proces eruit?',
    dimension: 'onboarding',
    options: [
      { text: 'Geen vast proces, verschilt per persoon', score: 0, dimension: 'onboarding' },
      { text: 'Informele kennismaking en meelopen', score: 1, dimension: 'onboarding' },
      { text: 'Gestructureerd maar handmatig proces', score: 3, dimension: 'onboarding' },
      { text: 'Geautomatiseerd traject met checkpoints', score: 4, dimension: 'onboarding' },
    ],
  },

  // === RETENTIE & TEVREDENHEID ===
  {
    id: 'retentie-uitval',
    question: 'Hoeveel vrijwilligers stoppen binnen het eerste jaar?',
    subtitle: 'Een eerlijke inschatting',
    dimension: 'retentie',
    options: [
      { text: 'Meer dan 50%', score: 0, dimension: 'retentie' },
      { text: '30-50%', score: 1, dimension: 'retentie' },
      { text: '10-30%', score: 3, dimension: 'retentie' },
      { text: 'Minder dan 10%', score: 4, dimension: 'retentie' },
    ],
  },
  {
    id: 'retentie-meting',
    question: 'Meten jullie de tevredenheid van vrijwilligers?',
    dimension: 'retentie',
    options: [
      { text: 'Nee, daar hebben we geen zicht op', score: 0, dimension: 'retentie' },
      { text: 'Informeel, via gesprekken', score: 1, dimension: 'retentie' },
      { text: 'Jaarlijkse enquête', score: 3, dimension: 'retentie' },
      { text: 'Structureel en regelmatig met opvolging', score: 4, dimension: 'retentie' },
    ],
  },

  // === IMPACT & RAPPORTAGE ===
  {
    id: 'impact-inzicht',
    question: 'Kunnen jullie de impact van vrijwilligerswerk aantonen?',
    subtitle: 'Aan subsidiegevers, bestuur of sponsors',
    dimension: 'impact',
    options: [
      { text: 'Nee, dat vinden we lastig', score: 0, dimension: 'impact' },
      { text: 'Alleen in uren en aantallen', score: 1, dimension: 'impact' },
      { text: 'Basis-rapportages met enkele metrics', score: 3, dimension: 'impact' },
      { text: 'Uitgebreide impactcijfers en verhalen', score: 4, dimension: 'impact' },
    ],
  },
  {
    id: 'impact-waarde',
    question: 'Weten jullie de economische waarde van het vrijwilligerswerk?',
    dimension: 'impact',
    options: [
      { text: 'Nee, nooit berekend', score: 0, dimension: 'impact' },
      { text: 'Globale schatting', score: 1, dimension: 'impact' },
      { text: 'Berekening op basis van uren x uurtarief', score: 3, dimension: 'impact' },
      { text: 'Uitgebreide SROI of maatschappelijke waarde berekening', score: 4, dimension: 'impact' },
    ],
  },
]

// Benchmark data per dimensie en organisatiegrootte
export const BENCHMARKS: Record<DimensionId, Record<string, number>> = {
  beheer: { xs: 45, sm: 52, md: 61, lg: 68 },
  communicatie: { xs: 48, sm: 51, md: 55, lg: 62 },
  onboarding: { xs: 42, sm: 48, md: 54, lg: 58 },
  retentie: { xs: 55, sm: 52, md: 48, lg: 45 },
  impact: { xs: 35, sm: 42, md: 51, lg: 58 },
}

// ROI data voor berekeningen
export const ROI_FACTORS = {
  // Gemiddelde kosten per verloren vrijwilliger (werving + onboarding)
  costPerLostVolunteer: 850,
  // Uren besparing per week met goed beheer
  hoursPerWeekSaved: {
    poor: 0,
    basic: 3,
    good: 6,
    excellent: 10,
  },
  // Retentie verbetering met goede communicatie
  retentionImprovement: {
    poor: 0,
    basic: 0.1,
    good: 0.25,
    excellent: 0.4,
  },
  // Uurtarief coordinator
  hourlyRate: 35,
}

export interface QuizProfile {
  id: string
  title: string
  minPercentage: number
  maxPercentage: number
  color: string
  description: string
  recommendation: string
}

export const QUIZ_PROFILES: QuizProfile[] = [
  {
    id: 'kampioen',
    title: 'Vrijwilligerskampioen',
    minPercentage: 80,
    maxPercentage: 100,
    color: '#3BA273',
    description:
      'Jullie vrijwilligersbeleid is uitstekend. De basis staat, processen zijn gestroomlijnd, en jullie hebben oog voor zowel de mensen als de cijfers.',
    recommendation:
      'Focus op het delen van jullie best practices en het verder verfijnen van impactmeting om jullie verhaal nog sterker te maken richting stakeholders.',
  },
  {
    id: 'gevorderd',
    title: 'Goed op weg',
    minPercentage: 60,
    maxPercentage: 79,
    color: '#3B82F6',
    description:
      'Jullie hebben een solide basis neergezet. Op de meeste vlakken scoren jullie bovengemiddeld, maar er zijn specifieke gebieden waar winst te behalen valt.',
    recommendation:
      'Identificeer de dimensie waar jullie het laagst scoren en maak daar een verbeterplan voor. Kleine verbeteringen kunnen grote impact hebben.',
  },
  {
    id: 'groei',
    title: 'Ruimte voor groei',
    minPercentage: 40,
    maxPercentage: 59,
    color: '#F59E0B',
    description:
      'De intentie is er, maar de uitvoering kan beter. Jullie vrijwilligers verdienen een meer gestructureerde aanpak.',
    recommendation:
      'Start met het centraliseren van jullie administratie. Dit is de basis waarop alle andere verbeteringen kunnen bouwen.',
  },
  {
    id: 'start',
    title: 'Tijd voor actie',
    minPercentage: 0,
    maxPercentage: 39,
    color: '#DC2626',
    description:
      'Hier liggen grote kansen. Met de juiste aanpak en tools kunnen jullie een enorme sprong voorwaarts maken.',
    recommendation:
      'Begin klein maar concreet. Een centraal overzicht van al jullie vrijwilligers is stap één. Van daaruit kunnen jullie systematisch verbeteren.',
  },
]

// Module aanbevelingen per dimensie
export const MODULE_RECOMMENDATIONS: Record<DimensionId, { name: string; description: string }[]> = {
  beheer: [
    { name: 'Centraal Dossier', description: 'Alle vrijwilligersdata op één plek' },
    { name: 'Smart Matching', description: 'Automatisch de juiste vrijwilliger bij de juiste taak' },
  ],
  communicatie: [
    { name: 'Communicatie Hub', description: 'Geïntegreerde communicatie via alle kanalen' },
    { name: 'Nieuwsbrief Builder', description: 'Professionele updates in minuten' },
  ],
  onboarding: [
    { name: 'Onboarding Flows', description: 'Geautomatiseerde inwerktrajecten' },
    { name: 'E-learning Module', description: 'Online trainingen voor vrijwilligers' },
  ],
  retentie: [
    { name: 'Geluksmonitor', description: 'Structurele tevredenheidsmeting' },
    { name: 'Waardering & Badges', description: 'Erkenning die motiveert' },
  ],
  impact: [
    { name: 'Impact Dashboard', description: 'Real-time inzicht in jullie impact' },
    { name: 'Rapportage Generator', description: 'Professionele rapporten in één klik' },
  ],
}

// Helper functies
export function getProfile(percentage: number): QuizProfile {
  return (
    QUIZ_PROFILES.find((p) => percentage >= p.minPercentage && percentage <= p.maxPercentage) ||
    QUIZ_PROFILES[QUIZ_PROFILES.length - 1]
  )
}

export function calculateDimensionScores(
  answers: Record<string, number>
): Record<DimensionId, { score: number; maxScore: number; percentage: number }> {
  const dimensions: Record<DimensionId, { score: number; maxScore: number }> = {
    beheer: { score: 0, maxScore: 0 },
    communicatie: { score: 0, maxScore: 0 },
    onboarding: { score: 0, maxScore: 0 },
    retentie: { score: 0, maxScore: 0 },
    impact: { score: 0, maxScore: 0 },
  }

  QUIZ_QUESTIONS.forEach((q) => {
    if (answers[q.id] !== undefined) {
      dimensions[q.dimension].score += answers[q.id]
      dimensions[q.dimension].maxScore += 4
    }
  })

  const result: Record<DimensionId, { score: number; maxScore: number; percentage: number }> = {} as any

  Object.entries(dimensions).forEach(([key, value]) => {
    result[key as DimensionId] = {
      ...value,
      percentage: value.maxScore > 0 ? Math.round((value.score / value.maxScore) * 100) : 0,
    }
  })

  return result
}

export function calculateTotalScore(dimensionScores: Record<DimensionId, { percentage: number }>): number {
  const values = Object.values(dimensionScores)
  return Math.round(values.reduce((sum, d) => sum + d.percentage, 0) / values.length)
}

export function calculateROI(
  dimensionScores: Record<DimensionId, { percentage: number }>,
  orgSize: string,
  volunteerCount: number
): {
  hoursSaved: number
  costSaved: number
  retentionImprovement: number
  volunteersRetained: number
} {
  const beheerScore = dimensionScores.beheer.percentage
  const retentieScore = dimensionScores.retentie.percentage

  // Potentiële verbetering naar 80%
  const beheerGap = Math.max(0, 80 - beheerScore)
  const retentieGap = Math.max(0, 80 - retentieScore)

  // Uren besparing potentieel
  const hoursPerWeek = (beheerGap / 80) * ROI_FACTORS.hoursPerWeekSaved.excellent
  const hoursSaved = Math.round(hoursPerWeek * 52)
  const costSaved = Math.round(hoursSaved * ROI_FACTORS.hourlyRate)

  // Retentie verbetering potentieel
  const retentionImprovement = (retentieGap / 80) * ROI_FACTORS.retentionImprovement.excellent
  const volunteersRetained = Math.round(volunteerCount * retentionImprovement)

  return {
    hoursSaved,
    costSaved,
    retentionImprovement: Math.round(retentionImprovement * 100),
    volunteersRetained,
  }
}
