// Unit tests for the contact-form spam detection.
// Run: npx tsx lib/contact-spam.test.ts   (from the repo root)
//
// Proves the heuristics catch the real bot payload seen in production AND let
// genuine submissions through.

import { detectContactSpam, isRandomBlob, VALID_CONTACT_SUBJECTS } from './contact-spam'

let passed = 0
let failed = 0

function check(label: string, cond: boolean) {
  if (cond) {
    passed++
    console.log(`  ok   ${label}`)
  } else {
    failed++
    console.error(`  FAIL ${label}`)
  }
}

console.log('contact-spam heuristics\n')

// 1) The exact spam payload from the screenshot (random blobs + valid subject)
const spamPayload = {
  name: 'bwROJsPwQQbqgdvJYbeTgXF',
  email: 'bafeld4nu@aol.com',
  organization: 'LBrXmkfHeYHkqJOo',
  phone: '2402513031',
  subject: 'Media / Pers',
  message: 'UzrfINqVDhQhLGcKiNH',
}
check('screenshot spam payload is rejected', detectContactSpam(spamPayload) !== null)

// 2) A genuine human submission sails through
const realPayload = {
  name: 'Vincent van Daar',
  email: 'vincent@daar.nl',
  organization: 'Stichting DAAR',
  phone: '+31614470977',
  subject: 'Demo aanvragen',
  message: 'Hoi! Ik wil graag een demo inplannen voor onze organisatie. Wat is jullie beschikbaarheid?',
}
check('real human submission is allowed', detectContactSpam(realPayload) === null)

// 3) Honeypot filled -> rejected
check(
  'honeypot filled is rejected',
  detectContactSpam({ ...realPayload, company: 'spamcorp' }) !== null
)

// 4) Forged subject -> rejected
check(
  'forged subject is rejected',
  detectContactSpam({ ...realPayload, subject: 'http://evil.example' }) !== null
)

// 5) Disposable email -> rejected
check(
  'disposable email is rejected',
  detectContactSpam({ ...realPayload, email: 'spammer@mailinator.com' }) !== null
)

// 6) Random blob in message only (subject + email legit)
check(
  'random blob message is rejected',
  detectContactSpam({
    name: 'Jan Jansen',
    email: 'jan@jansen.nl',
    subject: 'Algemene vraag',
    message: 'KqPz9LwRt2VbNxCmZ',
  }) !== null
)

// 7) isRandomBlob tuning — short token / real word not flagged
check('short token not flagged', isRandomBlob('abc123') === false)
check('name with space not flagged', isRandomBlob('John Smith') === false)
check('random blob flagged', isRandomBlob('bwROJsPwQQbqgdvJYbeTgXF') === true)
check('long uppercase+digit blob flagged', isRandomBlob('UZRFINQVDHQHLGCKINH12345678') === true)

// 8) Valid subjects are all reachable
check('7 valid subjects defined', VALID_CONTACT_SUBJECTS.length === 7)

console.log(`\n${passed} passed, ${failed} failed`)
process.exit(failed === 0 ? 0 : 1)
