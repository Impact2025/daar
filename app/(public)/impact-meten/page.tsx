import type { Metadata } from 'next'
import { BarChart3, TrendingUp, Heart, Target } from 'lucide-react'
import { PillarPage, PillarFAQ, PillarSection, PillarBlogLink } from '@/components/landing/PillarPage'

const SITE = 'https://www.daar.nl'

export const metadata: Metadata = {
  title: 'Impact Meten van Vrijwilligerswerk | DAAR',
  description:
    'Hoe meet je de maatschappelijke waarde van vrijwilligers? SROI, Theory of Change, welzijnsmetrics en de DAAR Geluksmomenten-Formule — helder uitgelegd.',
  alternates: { canonical: `${SITE}/impact-meten` },
  openGraph: {
    title: 'Impact Meten van Vrijwilligerswerk | DAAR',
    description:
      'SROI, Theory of Change en welzijnsmetrics. CBS: 50% van Nederlanders doet vrijwilligerswerk, €8-12 mld vervangingswaarde.',
    url: `${SITE}/impact-meten`,
    type: 'website',
  },
}

const faqs: PillarFAQ[] = [
  {
    q: 'Wat is de economische waarde van vrijwilligerswerk in Nederland?',
    a: 'Uit CBS-onderzoek 2024 blijkt dat 49,5% van de Nederlandse bevolking (15+) vrijwilligerswerk doet, gemiddeld 4,4 uur per week, met een geschatte vervangingswaarde van €8-12 miljard per jaar. DAAR maakt die waarde zichtbaar met de Geluksmomenten-Formule en de VrijwilligersCheck, zodat je deze impact aantoonbaar voor bestuur en fondsen krijgt.',
  },
  {
    q: 'Wat is SROI en wanneer gebruik ik het?',
    a: 'SROI (Social Return on Investment) drukt maatschappelijke effecten uit in geld — voor elke euro geïnvesteerd, hoeveel sociaal rendement ontstaat — en is de standaard voor verantwoording naar gemeenten en fondsen. DAAR vertaalt dit voor jou naar een concreet impact-dashboard, zodat je SROI en Theory of Change niet als theorie maar als werkend rapport voor subsidieverantwoording hebt.',
  },
  {
    q: 'Hoe meet ik "geluksmomenten" van vrijwilligers?',
    a: 'Combineer het PERMA-model (voorspelt lagere burn-out en lager verloop), Experience Sampling (moment-tot-moment) en de Volunteer Satisfaction Index met gevalideerde welzijnsschalen zoals WEMWBS. DAAR bundelde dit in de Geluksmomenten-Formule — Impact = Soort werk × Doelgroep × Intensiteit × Bereik × Kwaliteit — en meet die Geluksmomenten voor je in het platform.',
  },
  {
    q: 'Wat is het verschil tussen output en outcome?',
    a: 'Output is wat je doet (aantal uren, aantal bezoeken) terwijl outcome is wat ertoe doet: verminderde eenzaamheid, gevoel van betekenis, behouden vrijwilligers. DAAR stuurt op outcome via de VrijwilligersCheck en viert Geluksmomenten, zodat je niet alleen telt maar ook bewijst wat je vrijwilligers en de samenleving opleveren.',
  },
]

const sections: PillarSection[] = [
  {
    icon: <BarChart3 className="w-5 h-5" />,
    title: 'SROI & Theory of Change',
    body: (
      <p>
        SROI vertaalt maatschappelijk effect naar euro's voor gemeenten en fondsen.
        Theory of Change legt de logische keten Resources → Activities → Outputs →
        Outcomes → Impact vast, inclusief <em>waarom</em> elke stap werkt.
      </p>
    ),
  },
  {
    icon: <TrendingUp className="w-5 h-5" />,
    title: 'Economische waarde: €8-12 mld',
    body: (
      <p>
        49,5% van Nederlanders doet vrijwilligerswerk, gemiddeld 4,4 uur per week.
        De vervangingswaarde ligt tussen de €8 en €12 miljard per jaar — een
        onderschatte economische motor.
      </p>
    ),
  },
  {
    icon: <Heart className="w-5 h-5" />,
    title: 'Welzijnsmetrics',
    body: (
      <p>
        PERMA, Experience Sampling en de Volunteer Satisfaction Index meten het
        vrijwilligersgeluk realtime. 1 op de 5 vrijwilligers wil méér waardering —
        systematisch meten schept duidelijkheid.
      </p>
    ),
  },
  {
    icon: <Target className="w-5 h-5" />,
    title: 'De Geluksmomenten-Formule',
    body: (
      <p>
        Impact = Soort werk × Doelgroep × Intensiteit × Bereik × Kwaliteit. Hoe
        hoger elke factor, hoe groter de maatschappelijke én ervaringswaarde. Een
        wekelijks buurthuisbezoek scoort hoog op soort én doelgroep.
      </p>
    ),
  },
]

const blogs: PillarBlogLink[] = [
  {
    href: '/blog/impact-meten-vrijwilligerswerk',
    title: 'Impact Meten van Vrijwilligerswerk',
    desc: 'SROI, Theory of Change, welzijnsmetrics en de Geluksmomenten-Formule — met CBS-cijfers.',
  },
  {
    href: '/blog/gamification-vrijwilligersbeheer',
    title: 'Gamification in Vrijwilligersbeheer',
    desc: 'Hoe je motivatie en betrokkenheid meetbaar én gezond houdt.',
  },
  {
    href: '/kennisbank/categorie/impact-meten',
    title: 'Kennisbank: Impact Meten',
    desc: 'Aanverwante artikelen over ROI en maatschappelijke waarde.',
  },
]

export default function ImpactPillarPage() {
  return (
    <PillarPage
      eyebrow="Impact Meten"
      title="Impact Meten van Vrijwilligerswerk: Bewijs je Maatschappelijke Waarde"
      subtitle="Hoe overtuig je gemeenten, fondsen en bestuur van de waarde van vrijwilligerswerk? Op basis van DAAR-onderzoek zetten we de methodieken op een rij: van SROI tot welzijnsmetrics."
      heroIcon={<BarChart3 className="w-4 h-4" />}
      cta={{ href: '/vrijwilligerscheck', label: 'Meet jouw impact' }}
      ctaSecondary={{ href: '/kennisbank/categorie/impact-meten', label: 'Bekijk de kennisbank' }}
      sections={sections}
      blogs={blogs}
      faqs={faqs}
      canonical={`${SITE}/impact-meten`}
    />
  )
}
