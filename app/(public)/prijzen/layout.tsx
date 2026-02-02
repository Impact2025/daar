import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Prijzen - Transparante pakketten vanaf €1.450 | Daar',
  description: 'Kies uit drie pakketten (Basis, Extra, Compleet) met volledige transparantie. 667% ROI in jaar 1. Geen verborgen kosten, maandelijks opzegbaar.',
  keywords: [
    'prijzen',
    'tarieven',
    'pakketten',
    'vrijwilligersmanagement kosten',
    'ROI',
    'pricing',
    'offerte',
    'investering',
    'daar prijzen',
    'vrijwilligers platform kosten',
  ],
  openGraph: {
    title: 'Prijzen - Transparante pakketten vanaf €1.450 | Daar',
    description: 'Kies uit drie pakketten met 667% ROI in jaar 1. Geen verborgen kosten.',
    type: 'website',
    url: 'https://daar.nl/prijzen',
    siteName: 'Daar',
    locale: 'nl_NL',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Prijzen - Transparante pakketten vanaf €1.450 | Daar',
    description: 'Kies uit drie pakketten met 667% ROI in jaar 1.',
  },
  alternates: {
    canonical: 'https://daar.nl/prijzen',
  },
};

export default function PrijzenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
