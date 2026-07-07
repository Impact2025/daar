import type { Metadata } from 'next'
import { Sparkles, Smartphone, CalendarClock, BadgeCheck } from 'lucide-react'
import { PillarPage, PillarFAQ, PillarSection, PillarBlogLink } from '@/components/landing/PillarPage'

const SITE = 'https://daar.nl'

export const metadata: Metadata = {
  title: 'Generatie Z en Vrijwilligerswerk | DAAR',
  description:
    'Gen Z wil impact maken zonder bureaucratie. Hoe werven en behouden organisaties de "Impact-Native" generatie? Inzichten uit DAAR-onderzoek naar generaties en communicatie.',
  alternates: { canonical: `${SITE}/generatie-z-vrijwilligers` },
  openGraph: {
    title: 'Generatie Z en Vrijwilligerswerk | DAAR',
    description:
      'Snackable vrijwilligerswerk, micro-volunteering en digitale badges — wat werkt om Gen Z te binden.',
    url: `${SITE}/generatie-z-vrijwilligers`,
    type: 'website',
  },
}

const faqs: PillarFAQ[] = [
  {
    q: 'Wat onderscheidt Gen Z van andere generaties in vrijwilligerswerk?',
    a: 'Gen Z is de "Impact-Native": zeer bereidwillig maar allergisch voor bureaucratie, kiest voor thema\'s (mentale gezondheid, klimaat) in plaats van voor "de club", en wil korte sprints in plaats van lidmaatschappen. DAAR sluit hierop aan met frictionless onboarding en een klusjes-feed, zodat je precies die laagdrempelige instap biedt die deze generatie verwacht.',
  },
  {
    q: 'Wat is "snackable" vrijwilligerschap?',
    a: 'Korte, eenmalige of projectmatige inzet zonder langdurige verplichting — bijvoorbeeld 4x per jaar een dagdeel op een festival — die volgens DAAR-onderzoek door Gen Z verkozen wordt boven wekelijkse vaste taken. DAAR vertaalt dit naar een werkende klusjes-feed waarin jij de korte klussen aanbiedt die jonge vrijwilligers direct oppakken.',
  },
  {
    q: 'Hoe bereik ik Gen Z met mijn werving?',
    a: 'Via snelle video-content en mobile-first, frictionless onboarding (geen formulieren van 4 pagina\'s), en door ze te benaderen op het thema dat ze drijft met een digitaal certificaat of LinkedIn-badge als beloning. DAAR automatiseert dat traject en koppelt er meteen een welzijnscheck aan vast, zodat je ze ook daadwerkelijk behoudt.',
  },
  {
    q: 'Hoe bind ik Gen Z zonder ze te verliezen aan concurrentie?',
    a: 'Bied betekenisvolle, zichtbare impact en een soepele technische ervaring, en waardeer met wat zij waarderen: skills-bewijs op hun eigen kanalen. DAAR maakt die impact concreet via Geluksmomenten, waarin elk verschil dat ze maken zichtbaar wordt en je hen blijft verrassen met erkenning die past bij hun voorkeuren.',
  },
]

const sections: PillarSection[] = [
  {
    icon: <Sparkles className="w-5 h-5" />,
    title: 'De Impact-Native',
    body: (
      <p>
        Gen Z is hoogst bereidwillig maar allergisch voor bureaucratie. Ze kiezen
        een doel, niet een zuil — en willen impact zien zonder rompslomp.
      </p>
    ),
  },
  {
    icon: <CalendarClock className="w-5 h-5" />,
    title: 'Snackable vrijwilligerschap',
    body: (
      <p>
        Liever 4x per jaar een dagdeel knallen dan elke maandagavond vergaderen.
        Micro-volunteering en een klusjes-feed passen bij hun episodische ritme.
      </p>
    ),
  },
  {
    icon: <Smartphone className="w-5 h-5" />,
    title: 'Mobile-first & video',
    body: (
      <p>
        Frictionless onboarding, geen lange formulieren, en werving via snelle
        video-content. WhatsApp-herinneringen werken beter dan e-mail voor deze
        groep.
      </p>
    ),
  },
  {
    icon: <BadgeCheck className="w-5 h-5" />,
    title: 'Waardering anders',
    body: (
      <p>
        Een digitaal certificaat of LinkedIn-badge voor skills-bewijs werkt beter
        dan een jaarlijkse BBW-uitnodiging. Differentieer je waardering per
        generatie.
      </p>
    ),
  },
]

const blogs: PillarBlogLink[] = [
  {
    href: '/blog/generatie-z-vrijwilligerswerk',
    title: 'Generatie Z en Vrijwilligerswerk',
    desc: 'Waarom "snackable" vrijwilligerschap de norm wordt — en wat werkt per generatie.',
  },
  {
    href: '/blog/vrijwilligers-werven',
    title: 'Vrijwilligers Werven',
    desc: 'Meer over segmentatie en de 4-generaties vergelijking.',
  },
  {
    href: '/kennisbank/werving-onboarding',
    title: 'Kennisbank: Werving & Onboarding',
    desc: 'Aanverwante artikelen over moderne werving.',
  },
]

export default function GeneratieZPillarPage() {
  return (
    <PillarPage
      eyebrow="Generatie Z"
      title="Generatie Z en Vrijwilligerswerk: De Impact-Native Generatie"
      subtitle="De Nederlandse vrijwilligersmarkt verschuift van trouw aan een zuil naar trouw aan een doel. Op basis van DAAR-onderzoek naar generaties leer je de grootste, meest bereidwillige maar minst bureaucratie-tolerante groep te winnen."
      heroIcon={<Sparkles className="w-4 h-4" />}
      cta={{ href: '/vrijwilligerscheck', label: 'Moderniseer jouw werving' }}
      ctaSecondary={{ href: '/kennisbank/werving-onboarding', label: 'Bekijk de kennisbank' }}
      sections={sections}
      blogs={blogs}
      faqs={faqs}
      canonical={`${SITE}/generatie-z-vrijwilligers`}
    />
  )
}
