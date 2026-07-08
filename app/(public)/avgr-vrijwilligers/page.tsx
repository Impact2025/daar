import type { Metadata } from 'next'
import { Shield, FileCheck, Users, Baby, AlertTriangle } from 'lucide-react'
import { PillarPage, PillarFAQ, PillarSection, PillarBlogLink } from '@/components/landing/PillarPage'

const SITE = 'https://www.daar.nl'

export const metadata: Metadata = {
  title: 'AVG & Privacy voor Vrijwilligersorganisaties | DAAR',
  description:
    'Alles over AVG-compliance voor vrijwilligersorganisaties: verwerkersovereenkomst, rechtsgronden, minderjarigen onder de 16 jaar en datalek-melding binnen 72 uur.',
  alternates: { canonical: `${SITE}/avgr-vrijwilligers` },
  openGraph: {
    title: 'AVG & Privacy voor Vrijwilligersorganisaties | DAAR',
    description:
      'Verwerkersovereenkomst, rechtsgronden, minderjarigen onder de 16 jaar en de 72-uur meldplicht — helder uitgelegd.',
    url: `${SITE}/avgr-vrijwilligers`,
    type: 'website',
  },
}

const faqs: PillarFAQ[] = [
  {
    q: 'Wanneer ben ik verwerkingsverantwoordelijke als vrijwilligersorganisatie?',
    a: 'Altijd wanneer jij bepaalt wélke persoonsgegevens je verwerkt en met welk doel; je softwareleverancier is dan de verwerker en Artikel 28(3) AVG verplicht een geschreven verwerkersovereenkomst. DAAR helpt je hierbij met de VrijwilligersCheck, waarmee je privacy- en governance-risico’s in 10 minuten in kaart brengt en direct ziet waar je DPA nog ontbreekt.',
  },
  {
    q: 'Welke rechtsgrond heb ik voor vrijwilligersgegevens?',
    a: 'Voor roostering, contact en taakverdeling is de grondslag meestal "contractueel noodzakelijk"; zodra je data voor marketing of deling met derden gebruikt, verschuift de grondslag naar expliciete, te allen tijde intrekbare toestemming. DAAR ondersteunt organisaties hierin als betrokken partner en adviseur, met heldere templates en een stappenplan dat je stap voor stap compliant maakt.',
  },
  {
    q: 'Hoe zit het met minderjarige leden onder de 16 jaar?',
    a: 'In Nederland (UAVG) ligt de grens voor zelfstandige digitale toestemming strikt op 16 jaar en is voor publicatie van naam of foto van een kind onder de 16 jaar schriftelijke ouderlijke toestemming verplicht. DAAR vertaalt deze regels in een praktisch jeugd-protocol en de VrijwilligersCheck, zodat je ook bij jeugdlidmaatschappen AVG-proof blijft.',
  },
  {
    q: 'Hoe snel moet ik een datalek melden?',
    a: 'Binnen 72 uur bij de Autoriteit Persoonsgegevens, waarbij verwerkers contractueel binnen 36-48 uur aan de controller melden; bij hoog risico informeer je ook de betrokkenen zelf. DAAR bewaakt dit met een helder incident-response-proces en training, zodat jouw organisatie bij een lek direct de juiste stappen zet.',
  },
]

const sections: PillarSection[] = [
  {
    icon: <FileCheck className="w-5 h-5" />,
    title: 'Verwerkersovereenkomst (DPA)',
    body: (
      <p>
        Als organisatie ben je de <strong>controller</strong>, je software is de{' '}
        <strong>processor</strong>. Een geschreven verwerkersovereenkomst is
        wettelijk verplicht (Artikel 28(3) AVG). Gebruik een gratis DPA-template
        en pas deze aan voor jouw specifieke software — zonder DPA verwerk je
        illegaal.
      </p>
    ),
  },
  {
    icon: <Users className="w-5 h-5" />,
    title: 'Zes rechtsgronden',
    body: (
      <p>
        Toestemming, overeenkomst, wettelijke plicht, vitaal belang, algemeen
        belang en gerechtvaardigd belang. Een verkeerde keuze aan het begin van
        de verwerking is een fatale fout die de hele verwerking onrechtmatig
        maakt. Voor de meeste vrijwilligersgegevens volstaat contractueel
        noodzakelijk.
      </p>
    ),
  },
  {
    icon: <Baby className="w-5 h-5" />,
    title: 'Minderjarigen (grens 16 jaar)',
    body: (
      <p>
        Leden onder de 16 jaar zijn handelingsonbekwaam voor hun eigen
        privacy-instellingen. Voor publicatie van naam of foto is schriftelijke
        ouderlijke toestemming verplicht. Fysieke prestatieparameters
        (hartslag, BMI) zijn juridisch gezondheidsgegevens en vereisen
        uitdrukkelijke, aparte toestemming van de ouder.
      </p>
    ),
  },
  {
    icon: <AlertTriangle className="w-5 h-5" />,
    title: 'Datalekken & boetes',
    body: (
      <p>
        Melding bij de AP binnen <strong>72 uur</strong>. Boetes lopen op tot €10
        mln of 2% van de wereldwijde jaaromzet. Bekende voorbeelden: KNLTB
        (€525.000) en Enschede (€600.000 wegens wifitracking). Een verdedigbare
        positie rust op juridische, technische én operationele maatregelen.
      </p>
    ),
  },
]

const blogs: PillarBlogLink[] = [
  {
    href: '/blog/avg-privacy-vrijwilligersorganisaties',
    title: 'AVG & Privacy voor Vrijwilligersorganisaties',
    desc: 'Het volledige stappenplan: DPA, rechtsgronden, jeugd-protocols en de 72-uur meldplicht.',
  },
  {
    href: '/kennisbank/categorie/organisatie-management',
    title: 'Kennisbank: Organisatie & Management',
    desc: 'Beknopte gids en aanverwante artikelen over governance en compliance.',
  },
  {
    href: '/blog/vrijwilligers-burnout-voorkomen',
    title: 'Vrijwilligers-Burn-out voorkomen',
    desc: 'Goed welzijnsbeleid is ook governance — voorkom uitval en aansprakelijkheid.',
  },
]

export default function AvgPillarPage() {
  return (
    <PillarPage
      eyebrow="AVG & Privacy"
      title="AVG voor Vrijwilligersorganisaties: Zo Voorkom je Boetes en Bouw je Vertrouwen"
      subtitle="Vrijwilligersorganisaties verwerken meer persoonsgegevens dan ze beseffen. Op basis van DAAR-onderzoek zetten we de regels helder op een rij — van verwerkersovereenkomst tot de 72-uur meldplicht."
      heroIcon={<Shield className="w-4 h-4" />}
      cta={{ href: '/vrijwilligerscheck', label: 'Doe de VrijwilligersCheck' }}
      ctaSecondary={{ href: '/kennisbank/categorie/organisatie-management', label: 'Bekijk de kennisbank' }}
      sections={sections}
      blogs={blogs}
      faqs={faqs}
      canonical={`${SITE}/avgr-vrijwilligers`}
    />
  )
}
