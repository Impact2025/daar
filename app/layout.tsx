import type { Metadata } from "next";
import { Inter, Nunito } from "next/font/google";
import "./globals.css";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { OrganizationSchema, WebsiteSchema } from "@/components/seo/JsonLd";

const inter = Inter({
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-inter',
});

const nunito = Nunito({
  subsets: ["latin"],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-nunito',
});

const BASE_URL = 'https://daar.nl';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Daar - Het Vrijwilligersplatform voor Grip en Geluk',
    template: '%s | Daar',
  },
  description: 'Daar is het complete platform voor vrijwilligersmanagement. Van werving tot impactmeting, met de unieke Geluksformule. Verhoog betrokkenheid en maak elk uur meetbaar waardevol.',
  keywords: [
    'vrijwilligersmanagement',
    'vrijwilligersplatform',
    'vrijwilligers beheer',
    'vrijwilligerswerk',
    'impactmeting',
    'geluksformule',
    'vrijwilligers werving',
    'vrijwilligers retentie',
    'maatschappelijke impact',
    'sociale sector',
    'non-profit software',
    'vrijwilligerscoördinatie',
  ],
  authors: [{ name: 'Daar B.V.', url: BASE_URL }],
  creator: 'Daar B.V.',
  publisher: 'Daar B.V.',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'nl_NL',
    url: BASE_URL,
    siteName: 'Daar',
    title: 'Daar - Het Vrijwilligersplatform voor Grip en Geluk',
    description: 'Het complete platform voor vrijwilligersmanagement. Van werving tot impactmeting, met de unieke Geluksformule.',
    // Images are auto-generated via opengraph-image.tsx
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Daar - Het Vrijwilligersplatform voor Grip en Geluk',
    description: 'Het complete platform voor vrijwilligersmanagement. Van werving tot impactmeting.',
    // Images are auto-generated via twitter-image.tsx
    creator: '@daarnl',
    site: '@daarnl',
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
  alternates: {
    canonical: BASE_URL,
  },
  verification: {
    // Add your verification codes here when available
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
  category: 'technology',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl" className={`${inter.variable} ${nunito.variable}`}>
      <body className={inter.className}>
        <OrganizationSchema />
        <WebsiteSchema />
        <GoogleAnalytics />
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}
