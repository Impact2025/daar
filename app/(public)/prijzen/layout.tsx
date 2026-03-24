import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Prijzen - Transparante module-prijzen per vrijwilliger | Daar',
  description: 'Bereken direct wat Daar kost voor jouw organisatie. Volume-tarieven per vrijwilliger, vanaf 15 vrijwilligers. Centraal Dossier, Communicatie en VrijwilligersCheck.',
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
    title: 'Prijzen - Transparante module-prijzen per vrijwilliger | Daar',
    description: 'Volume-tarieven per vrijwilliger. Schaalbaar van 15 tot 2500+ vrijwilligers.',
    type: 'website',
    url: 'https://daar.nl/prijzen',
    siteName: 'Daar',
    locale: 'nl_NL',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Prijzen - Transparante module-prijzen per vrijwilliger | Daar',
    description: 'Volume-tarieven per vrijwilliger. Schaalbaar van 15 tot 2500+ vrijwilligers.',
  },
  alternates: {
    canonical: 'https://daar.nl/prijzen',
  },
};

export default function Prijzen2Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
