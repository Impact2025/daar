import { Metadata } from 'next'
import { PlatformContent } from '@/components/platform/PlatformContent'

export const metadata: Metadata = {
  title: 'Platform | Hoe werkt DAAR Vrijwilligersmanagement?',
  description: 'Ontdek hoe het DAAR platform werkt: van AI-matching en AVG-proof dossiers tot impact dashboards en welzijnsmonitoring. Complete workflow voor vrijwilligersorganisaties.',
  keywords: [
    'vrijwilligersmanagement platform',
    'vrijwilligers software',
    'AI matching vrijwilligers',
    'impact dashboard',
    'AVG-proof vrijwilligersbeheer',
    'welzijnsmonitoring',
    'SDG rapportage',
    'non-profit software',
    'vrijwilligerswerk digitaliseren',
    'DAAR platform'
  ],
  openGraph: {
    title: 'Hoe werkt het DAAR Platform? | Complete Vrijwilligersmanagement',
    description: 'Van aanmelding tot impact: ontdek de 6 modules die vrijwilligerswerk slimmer maken. AI-matching, welzijnsmonitoring en automatische SDG-rapportage.',
    type: 'website',
    locale: 'nl_NL',
    url: 'https://daar.nl/platform',
    siteName: 'DAAR',
    images: [
      {
        url: 'https://daar.nl/og-platform.png',
        width: 1200,
        height: 630,
        alt: 'DAAR Platform - Vrijwilligersmanagement Workflow',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hoe werkt het DAAR Platform?',
    description: 'Van aanmelding tot impact: AI-matching, welzijnsmonitoring en automatische rapportage voor vrijwilligersorganisaties.',
    images: ['https://daar.nl/og-platform.png'],
  },
  alternates: {
    canonical: 'https://daar.nl/platform',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function PlatformPage() {
  return <PlatformContent />
}
