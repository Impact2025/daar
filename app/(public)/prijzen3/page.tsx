import { permanentRedirect } from 'next/navigation'

// Consolidated into the single canonical pricing page at /prijzen.
// permanentRedirect() geeft een 308 (permanent) — behoudt SEO-equity en
// voorkomt duplicate-content cannibalisatie. `redirect()` zou 307 (tijdelijk)
// geven, waardoor Google de oude URL zou blijven proberen te indexeren.
export default function Prijzen3Redirect() {
  permanentRedirect('/prijzen')
}
