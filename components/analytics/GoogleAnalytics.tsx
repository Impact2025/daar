'use client'

import Script from 'next/script'
import { useConsent } from '@/components/cookies/CookieConsentContext'

const GA_MEASUREMENT_ID = 'G-K4LSJQVDFP'

export function GoogleAnalytics() {
  const { consent } = useConsent()

  if (!consent?.analytics) return null

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', { anonymize_ip: true });
        `}
      </Script>
    </>
  )
}
