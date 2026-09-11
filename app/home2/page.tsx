import { permanentRedirect } from 'next/navigation'

// Legacy landing variant — superseded by the home page at /.
// permanentRedirect() geeft een 308 (permanent) naar de canonieke homepage,
// zodat Google deze oude variant definitief laat vallen.
export default function Home2Redirect() {
  permanentRedirect('/')
}
