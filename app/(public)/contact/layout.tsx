import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact | DAAR - Hulp & Ondersteuning',
  description: 'Neem contact op met DAAR. Stel je vraag, plan een gesprek of vind antwoorden in onze FAQ. We helpen je graag met vrijwilligersbeheer.',
  openGraph: {
    title: 'Contact | DAAR - Hulp & Ondersteuning',
    description: 'Neem contact op met DAAR. Stel je vraag, plan een gesprek of vind antwoorden in onze FAQ.',
    type: 'website',
  },
  keywords: [
    'contact DAAR',
    'vrijwilligersbeheer hulp',
    'DAAR support',
    'vrijwilligersorganisatie contact',
    'VrijwilligersCheck hulp',
  ],
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
