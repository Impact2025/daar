import { Metadata } from 'next'
import { FAQSchema, LocalBusinessSchema } from '@/components/seo/JsonLd'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Neem contact op met Daar. Stel je vraag, plan een adviesgesprek of vind antwoorden in onze FAQ. We helpen je graag met vrijwilligersbeheer.',
  openGraph: {
    title: 'Contact - Daar Vrijwilligersplatform',
    description: 'Neem contact op met Daar. Stel je vraag, plan een adviesgesprek of vind antwoorden in onze FAQ.',
    type: 'website',
    url: 'https://daar.nl/contact',
    siteName: 'Daar',
    locale: 'nl_NL',
  },
  twitter: {
    card: 'summary',
    title: 'Contact - Daar',
    description: 'Neem contact op met Daar voor vragen over vrijwilligersmanagement.',
  },
  keywords: [
    'contact daar',
    'vrijwilligersbeheer hulp',
    'daar support',
    'vrijwilligersorganisatie contact',
    'demo aanvragen',
    'adviesgesprek vrijwilligers',
  ],
  alternates: {
    canonical: 'https://daar.nl/contact',
  },
}

// FAQ items for structured data
const contactFAQs = [
  {
    question: 'Wat kost Daar?',
    answer: 'Daar biedt flexibele prijsmodellen op basis van het aantal vrijwilligers en de modules die je kiest. Neem contact op voor een vrijblijvende offerte.',
  },
  {
    question: 'Hoe lang duurt de implementatie?',
    answer: 'De meeste organisaties zijn binnen 2-4 weken volledig operationeel met Daar. We bieden begeleiding en training tijdens het onboardingproces.',
  },
  {
    question: 'Is er een gratis proefperiode?',
    answer: 'Ja, je kunt Daar 14 dagen gratis uitproberen. Geen creditcard nodig, geen verplichtingen.',
  },
  {
    question: 'Welke ondersteuning bieden jullie?',
    answer: 'We bieden support via email, telefoon en chat. Daarnaast heb je toegang tot onze uitgebreide kennisbank met handleidingen en video tutorials.',
  },
]

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <FAQSchema items={contactFAQs} />
      <LocalBusinessSchema
        name="Daar B.V."
        description="Vrijwilligersplatform voor organisaties in Nederland"
        email="info@daar.nl"
      />
      {children}
    </>
  )
}
