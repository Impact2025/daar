import { permanentRedirect } from 'next/navigation'

// 308 permanent — deze URL is definitief samengevoegd met /quiz.
export default function VrijwilligersCheckPage() {
  permanentRedirect('/quiz')
}
