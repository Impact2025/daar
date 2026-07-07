import { redirect } from 'next/navigation'

// Consolidated into the single canonical pricing page at /prijzen.
// 301 redirect keeps SEO equity and avoids duplicate-content cannibalisation.
export default function Prijzen3Redirect() {
  redirect('/prijzen')
}
