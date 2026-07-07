import { redirect } from 'next/navigation'

// Legacy landing variant — superseded by the home page at /.
// 301 redirect to the canonical homepage.
export default function Home2Redirect() {
  redirect('/')
}
