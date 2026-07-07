import type { Metadata } from 'next'
import { HeartHandshake, ShieldCheck, Users, RefreshCw } from 'lucide-react'
import { PillarPage, PillarFAQ, PillarSection, PillarBlogLink } from '@/components/landing/PillarPage'

const SITE = 'https://daar.nl'

export const metadata: Metadata = {
  title: 'Vrijwilligers Retentie: Zo Voorkom je Uitval | DAAR',
  description:
    'Hoe behoud je vrijwilligers? Van het Job Demands-Resources model en gamification tot identiteit en welzijn — retentiestrategieën op basis van DAAR-onderzoek.',
  alternates: { canonical: `${SITE}/vrijwilligers-retentie` },
  openGraph: {
    title: 'Vrijwilligers Retentie: Zo Voorkom je Uitval | DAAR',
    description:
      'Identiteit is de sterkste hefboom voor blijvend vrijwilligerswerk. Zo bouw je retentie die werkt.',
    url: `${SITE}/vrijwilligers-retentie`,
    type: 'website',
  },
}

const faqs: PillarFAQ[] = [
  {
    q: 'Wat is de belangrijkste factor voor blijvende vrijwilligersbetrokkenheid?',
    a: 'Identiteitsvorming is de sterkste langetermijnvoorspeller: wie denkt "ik bén vrijwilliger" in plaats van "ik hélp even", blijft aanmerkelijk vaker betrokken, en elke stijging van 1 punt op een normen-index verhoogt de kans op vrijwilligerswerk met 10 procentpunt via sociaal bewijs. DAAR versterkt die identiteit door Geluksmomenten zichtbaar te maken, zodat vrijwilligers het verschil dat ze maken dagelijks terugzien.',
  },
  {
    q: 'Hoe ontstaat vrijwilligers-burn-out en hoe voorkom je het?',
    a: 'Burn-out volgt uit disbalans tussen job demands en job resources (JD-R model): eerst uitputting, daarna cynisme, en dat cynisme leidt het meest direct tot vertrek. DAAR helpt je dit vroeg te signaleren met de VrijwilligersCheck — een stoplicht-systeem waarmee je welzijn en werkplezier structureel monitort en overbelasting voordat het tot uitval komt tegenhoudt.',
  },
  {
    q: 'Werkt gamification voor retentie zonder manipulatief te zijn?',
    a: 'Ja, mits het de drie psychologische basisbehoeften voedt: autonomie, competentie en verbondenheid; milestone-badges en peer recognition werken, terwijl competitieve leaderboards en FOMO extrinsieke motivatie voeden die samenhangt met hogere burn-out. DAAR zet gamification bewust in op Geluksmomenten en erkenning, nooit op puntenjacht, zodat intrinsieke motivatie behouden blijft.',
  },
  {
    q: 'Hoe meet ik of mijn retentiebeleid werkt?',
    a: 'Volg retentie na 90 dagen, tijd tot zelfstandigheid en de UWES-9 bevlogenheidsschaal (vigor, dedication, absorption) als vroege indicator vóórdat burn-out optreedt. DAAR biedt hiervoor de VrijwilligersCheck met het stoplicht-systeem voor welzijn, gekoppeld aan je Geluksmomenten-overzicht, zodat je retentie op cijfers stuurt in plaats van op onderbuikgevoel.',
  },
]

const sections: PillarSection[] = [
  {
    icon: <HeartHandshake className="w-5 h-5" />,
    title: 'Identiteit als hefboom',
    body: (
      <p>
        "Ik bén vrijwilliger" werkt sterker dan "ik hélp even". Identiteitsvorming
        is de sterkste langetermijnvoorspeller van blijvende betrokkenheid.
        Symboliek, mentoring en leiderschapspaden versterken die identiteit.
      </p>
    ),
  },
  {
    icon: <ShieldCheck className="w-5 h-5" />,
    title: 'JD-R en welzijn',
    body: (
      <p>
        Burn-out ontstaat door disbalans tussen eisen en middelen. Cynisme — niet
        uitputting — leidt het meest direct tot vertrek. Investeer in sociale
        steun, autonomie en vroeg signaleren.
      </p>
    ),
  },
  {
    icon: <RefreshCw className="w-5 h-5" />,
    title: 'Gamification die werkt',
    body: (
      <p>
        Milestone-badges, voortgang en peer recognition voeden autonomie,
        competentie en verbondenheid. Vermijd leaderboards en FOMO — die
        ondermijnen intrinsieke motivatie.
      </p>
    ),
  },
  {
    icon: <Users className="w-5 h-5" />,
    title: 'Motiveer via Geluksmomenten',
    body: (
      <p>
        Vrijwilligers die zien dat hun inzet ertoe doet, blijven langer. DAAR
        meet en viert Geluksmomenten — de tastbare signalen dat vrijwilligerswerk
        zin geeft en welzijn versterkt.
      </p>
    ),
  },
]

const blogs: PillarBlogLink[] = [
  {
    href: '/blog/vrijwilligers-burnout-voorkomen',
    title: 'Vrijwilligers-Burn-out voorkomen',
    desc: 'Het JD-R model, de signalen en 4 pijlers van preventie — met OLBI/MBI-meting.',
  },
  {
    href: '/blog/gamification-vrijwilligersbeheer',
    title: 'Gamification in Vrijwilligersbeheer',
    desc: 'Wat werkt (en wat manipulatief is) volgens gedragspsychologie.',
  },
  {
    href: '/kennisbank/vrijwilligersretentie',
    title: 'Kennisbank: Vrijwilligersretentie',
    desc: 'De complete gids en aanverwante artikelen over behoud.',
  },
]

export default function RetentiePillarPage() {
  return (
    <PillarPage
      eyebrow="Vrijwilligers Retentie"
      title="Vrijwilligers Retentie: Zo Bouw je aan Blijvende Betrokkenheid"
      subtitle="Een derde van de vrijwilligers verliest jaarlijks zijn betrokkenheid. Op basis van DAAR-onderzoek naar gedragspsychologie en welzijn bouw je retentie die werkt — niet via trucjes, maar via identiteit en Geluksmomenten."
      heroIcon={<HeartHandshake className="w-4 h-4" />}
      cta={{ href: '/vrijwilligerscheck', label: 'Check jouw retentie' }}
      ctaSecondary={{ href: '/kennisbank/vrijwilligersretentie', label: 'Bekijk de kennisbank' }}
      sections={sections}
      blogs={blogs}
      faqs={faqs}
      canonical={`${SITE}/vrijwilligers-retentie`}
    />
  )
}
