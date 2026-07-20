// End-to-end test of the contact API route's spam decision logic
// WITHOUT a live DB / Resend. We re-implement the minimal route guard order
// against the real detectContactSpam module to prove behaviour:
//   spam check -> required-field check -> lead write.
//
// Run: npx tsx app/api/contact/route.e2e.test.ts   (from repo root)

import { detectContactSpam } from '../../../lib/contact-spam'

let passed = 0
let failed = 0
function check(label: string, cond: boolean) {
  if (cond) { passed++; console.log(`  ok   ${label}`) }
  else { failed++; console.error(`  FAIL ${label}`) }
}

console.log('contact route e2e (decision logic)\n')

// Mimic the route's guard order: spam check -> required-field check.
function routeDecision(body: any) {
  const spam = detectContactSpam(body)
  if (spam) return { status: 400, error: spam, reachedDb: false }
  if (!body.name || !body.email || !body.subject || !body.message)
    return { status: 400, error: 'required', reachedDb: false }
  return { status: 200, error: null, reachedDb: true }
}

const spam = {
  name: 'bwROJsPwQQbqgdvJYbeTgXF', email: 'bafeld4nu@aol.com',
  organization: 'LBrXmkfHeYHkqJOo', phone: '2402513031',
  subject: 'Media / Pers', message: 'UzrfINqVDhQhLGcKiNH',
}
const real = {
  name: 'Vincent van Daar', email: 'vincent@daar.nl',
  organization: 'Stichting DAAR', phone: '+31614470977',
  subject: 'Demo aanvragen', message: 'Hoi! Ik wil graag een demo inplannen voor onze organisatie. Wat is jullie beschikbaarheid?',
}

const r1 = routeDecision(spam)
check('spam -> 400, does NOT reach DB', r1.status === 400 && r1.reachedDb === false)

const r2 = routeDecision(real)
check('real -> 200, reaches DB', r2.status === 200 && r2.reachedDb === true)

// Honeypot filled -> 400 (bot signature)
const r3 = routeDecision({ ...real, company: 'spamcorp' })
check('honeypot filled -> 400, no DB', r3.status === 400 && r3.reachedDb === false)

// Forged subject -> 400
const r4 = routeDecision({ ...real, subject: 'evil' })
check('forged subject -> 400', r4.status === 400)

// Missing required field -> 400
const r5 = routeDecision({ ...real, message: '' })
check('missing message -> 400', r5.status === 400 && r5.reachedDb === false)

console.log(`\n${passed} passed, ${failed} failed`)
process.exit(failed === 0 ? 0 : 1)
