import type { Metadata } from 'next'
import { Megaphone, Users, Lightbulb, Smartphone } from 'lucide-react'
import { PillarPage, PillarFAQ, PillarSection, PillarBlogLink } from '@/components/landing/PillarPage'

const SITE = 'https://www.daar.nl'

export const metadata: Metadata = {
  title: 'Vrijwilligers Werven: Strategieën voor 2025 | DAAR',
  description:
    'Hoe werven organisaties vrijwilligers in een krappe markt? Van Gen Z tot Boomers, micro-volunteering en frictionless onboarding — op basis van DAAR-onderzoek.',
  alternates: { canonical: `${SITE}/vrijwilligers-werven` },
  openGraph: {
    title: 'Vrijwilligers Werven: Strategieën voor 2025 | DAAR',
    description:
      'Segmenteer je werving: Gen Z wil snackable impact, Boomers zoeken zingeving. Wat werkt per generatie.',
    url: `${SITE}/vrijwilligers-werven`,
    type: 'website',
  },
}

const faqs: PillarFAQ[] = [
  {
    q: 'Hoe werven we Gen Z-vrijwilligers?',
    a: 'Gen Z is de "Impact-Native": zeer bereidwillig, maar allergisch voor bureaucratie, en kiest voor korte sprints (micro-volunteering) met een "solliciteer met 1 klik"-flow en een digitaal LinkedIn-badge als beloning. DAAR ondersteunt dit met frictionless onboarding en een klusjes-feed in het platform, zodat je jonge vrijwilligers zonder drempel binnenhaalt en behoudt.',
  },
  {
    q: 'Waarom vertrekken vrijwilligers zo vaak in het begin?',
    a: 'Uit DAAR-onderzoek blijkt dat vrijwilligers met een gestructureerde onboarding 50% vaker blijven dan degenen die "in het diepe worden gegooid", en dat 65% onduidelijke verwachtingen noemt als reden voor vroeg vertrek. DAAR verbindt werving en onboarding in één werkstroom via de VrijwilligersCheck, waarmee je verwachtingen en welzijn vanaf dag één monitort.',
  },
  {
    q: 'Wat is het verschil tussen leden werven en handjes werven?',
    a: 'Voor een eenmalige klus (handjes voor een evenement) richt je op Gen Z met laagdrempelige, tijdelijke aanbiedingen, terwijl een structurele bestuursfunctie Gen X via LinkedIn of Boomers via lokale netwerken vraagt. DAAR helpt je deze doelgroepen te segmenteren in één overzicht, zodat elke wervingscampagne de juiste tone of voice en kanaal krijgt.',
  },
  {
    q: 'Hoe voorkom ik dat werving een drama wordt?',
    a: 'Automatiseer wat kan: een klusjes-feed in plaats van een vacaturebank, WhatsApp-herinneringen en een sterke filter op tijdsinvestering, want organisaties zonder self-service planning verliezen onevenredig veel tijd aan coördinatie. DAAR biedt precies die automatisering en koppelt er meteen een welzijnscheck aan vast, zodat nieuwe aanwas ook daadwerkelijk blijft.',
  },
]

const sections: PillarSection[] = [
  {
    icon: <Megaphone className="w-5 h-5" />,
    title: 'Segmenteer je werving',
    body: (
      <p>
        Van institutioneel lidmaatschap naar persoonlijke participatie. Babyboomers
        zijn de grootste groeimarkt voor structurele inzet; Gen Z eist snackable
        vrijwilligerswerk zonder bureaucratie.
      </p>
    ),
  },
  {
    icon: <Smartphone className="w-5 h-5" />,
    title: 'Frictionless onboarding',
    body: (
      <p>
        Geen formulieren van 4 pagina's. Een "solliciteer met 1 klik"-flow en een
        klusjes-feed werken beter dan een traditionele vacaturebank — zeker voor
        jongere generaties.
      </p>
    ),
  },
  {
    icon: <Lightbulb className="w-5 h-5" />,
    title: 'Cause-driven aantrekkingskracht',
    body: (
      <p>
        Gen Z kiest niet voor "de club" maar voor thema's: mentale gezondheid,
        diversiteit, klimaat. Verkoop het doel, niet de organisatie. Een digitaal
        certificaat of badge voor op LinkedIn versterkt de trekker.
      </p>
    ),
  },
  {
    icon: <Users className="w-5 h-5" />,
    title: 'Behoud begint bij werving',
    body: (
      <p>
        Goede onboarding verhoogt retentie met 50%. Werk werving en onboarding
        daarom als één proces: duidelijke verwachtingen voorkomen vroegtijdig
        vertrek en dure hervering.
      </p>
    ),
  },
]

const blogs: PillarBlogLink[] = [
  {
    href: '/blog/generatie-z-vrijwilligerswerk',
    title: 'Generatie Z en Vrijwilligerswerk',
    desc: 'Waarom "snackable" vrijwilligerschap de norm wordt en wat werkt per generatie.',
  },
  {
    href: '/blog/gamification-vrijwilligersbeheer',
    title: 'Gamification in Vrijwilligersbeheer',
    desc: 'Badges en milestones die wél werken — zonder extrinsieke valkuilen.',
  },
  {
    href: '/kennisbank/categorie/werving-onboarding',
    title: 'Kennisbank: Werving & Onboarding',
    desc: 'Aanverwante artikelen over 12 bewezen wervingsstrategieën.',
  },
]

export default function WervenPillarPage() {
  return (
    <PillarPage
      eyebrow="Vrijwilligers Werven"
      title="Vrijwilligers Werven: Strategieën die Werken in een Krappe Markt"
      subtitle="De totale participatie blijft hoog (~50%), maar de beschikbaarheid versnippert. Op basis van DAAR-onderzoek naar generaties leer je werven zónder bureaucratie — per doelgroep."
      heroIcon={<Megaphone className="w-4 h-4" />}
      cta={{ href: '/vrijwilligerscheck', label: 'Scan jouw werving' }}
      ctaSecondary={{ href: '/kennisbank/categorie/werving-onboarding', label: 'Bekijk de kennisbank' }}
      sections={sections}
      blogs={blogs}
      faqs={faqs}
      canonical={`${SITE}/vrijwilligers-werven`}
    />
  )
}
