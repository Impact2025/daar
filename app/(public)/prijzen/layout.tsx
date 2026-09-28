import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Prijzen - Prijsopgave op maat voor jouw organisatie | Daar',
  description: 'Bereken de waarde van jouw vrijwilligers en vraag een prijsopgave op maat aan. Daar past zich aan op het aantal vrijwilligers in jouw organisatie.',
  keywords: [
    'prijzen',
    'tarieven',
    'modules',
    'vrijwilligersmanagement kosten',
    'ROI',
    'pricing',
    'offerte',
    'investering',
    'daar prijzen',
    'vrijwilligers platform kosten',
    'volumetarief',
  ],
  openGraph: {
    title: 'Prijzen - Prijsopgave op maat voor jouw organisatie | Daar',
    description: 'Bereken de waarde van jouw vrijwilligers en vraag een prijsopgave op maat aan.',
    type: 'website',
    url: 'https://www.daar.nl/prijzen',
    siteName: 'Daar',
    locale: 'nl_NL',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Prijzen - Prijsopgave op maat voor jouw organisatie | Daar',
    description: 'Bereken de waarde van jouw vrijwilligers en vraag een prijsopgave op maat aan.',
  },
  alternates: {
    canonical: 'https://www.daar.nl/prijzen',
  },
};

export default function Prijzen2Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
