// Server-side spam/abuse detection for the DAAR contact form.
//
// The contact endpoint was receiving bot submissions filled with random
// alphanumeric blobs (e.g. name "bwROJsPwQQbqgdvJYbeTgXF", message
// "UzrfINqVDhQhLGcKiNH") arriving with a valid dropdown subject and a
// syntactically valid e-mail. Plain required-field + e-mail-regex validation
// let those straight through. This module adds layered heuristics that catch
// exactly that class of spam without annoying real humans.
//
// Returns null when a submission looks legit, or a Dutch error string that
// should be returned as a 400 to the client.

export interface ContactSubmission {
  name: string
  email: string
  organization?: string
  phone?: string
  subject: string
  message: string
  // Honeypot field. Must stay empty. Hidden from humans, auto-filled by bots.
  company?: string
}

// Subjects offered by the real <select> on the contact page. Anything else is
// forged / bot-injected and gets rejected.
export const VALID_CONTACT_SUBJECTS = [
  'Algemene vraag',
  'Demo aanvragen',
  'Technische ondersteuning',
  'Samenwerking / Partnership',
  'Feedback of suggestie',
  'Media / Pers',
  'Anders',
] as const

// A handful of disposable/temporary mail domains bots love. Legit free
// providers (gmail, outlook, aol, hotmail, ...) are intentionally NOT blocked —
// a real submission arrived from an aol.com address.
const DISPOSABLE_DOMAINS = new Set([
  'mailinator.com',
  'guerrillamail.com',
  '10minutemail.com',
  'tempmail.com',
  'temp-mail.org',
  'throwawaymail.com',
  'trashmail.com',
  'trashmail.net',
  'yopmail.com',
  'yopmail.net',
  'getnada.com',
  'nada.email',
  'sharklasers.com',
  'dispostable.com',
  'fakeinbox.com',
  'maildrop.cc',
  'emailondeck.com',
])

// Dutch words that a real message/name almost always contains. Their presence
// is strong evidence the text is human-written, not a random fingerprint.
const DUTCH_WORD_RE =
  /\b(de|het|ik|wij|jij|en|voor|met|daar|graag|vraag|vragen|info|bedrijf|organisatie|contact|hallo|hoi|beste|groet|vrijwilligers|help|offerte|demo|afspraak)\b/i

/**
 * Detect a "random blob" — a long, single-token string with no spaces, no
 * recognisable words, and a HIGH frequency of case changes. This is the exact
 * bot fingerprint seen in the wild, which uses random mixed-case letter runs
 * WITHOUT digits (e.g. "bwROJsPwQQbqgdvJYbeTgXF", "UzrfINqVDhQhLGcKiNH").
 *
 * Real human text (even single long words) has far fewer case transitions:
 *   - Title Case:  "VincentVanDaar" → 1 transition
 *   - CamelCase:   "stichtingDaar"  → 1 transition
 *   - ALL CAPS:    "STICHTING"      → 0 transitions
 *   - lower:       "vrijwilligers"  → 0 transitions
 * Random blobs flip case constantly (R->O->J->s->P->w...), easily 5-15+ times.
 */
export function isRandomBlob(s: string): boolean {
  const t = (s ?? '').trim()
  if (t.length < 12) return false

  const alnum = (t.match(/[A-Za-z0-9]/g) || []).length
  if (alnum / t.length < 0.9) return false
  if (/\s/.test(t)) return false
  if (DUTCH_WORD_RE.test(t)) return false

  const letters = t.replace(/[^A-Za-z]/g, '')
  if (letters.length < 10) return false

  // Count case transitions (aA, Aa, a1a, A1A don't count as case flips).
  let transitions = 0
  for (let i = 1; i < letters.length; i++) {
    const prev = letters[i - 1]
    const cur = letters[i]
    const prevUpper = prev === prev.toUpperCase() && prev !== prev.toLowerCase()
    const curUpper = cur === cur.toUpperCase() && cur !== cur.toLowerCase()
    if (prevUpper !== curUpper) transitions++
  }

  // >= 5 case flips across the token is the random-fingerprint signal.
  if (transitions >= 5) return true

  // Second signal: a long all-caps / digit-heavy run with no words, e.g.
  // "UZRFINQVDHQHLGCKINH12345678". All-caps means zero case transitions, so the
  // check above misses it, but such a long alphanumeric token with digits is
  // not real human input.
  const digits = (t.match(/[0-9]/g) || []).length
  const allUpper = letters.length > 0 && letters === letters.toUpperCase()
  if (
    t.length >= 16 &&
    digits >= 2 &&
    (allUpper || digits / t.length > 0.15) &&
    !DUTCH_WORD_RE.test(t)
  ) {
    return true
  }

  return false
}

/** True if ANY whitespace-separated token is a random blob and the text has no
 *  Dutch words — catches blobs that were joined with spaces too. */
function textContainsRandomBlob(s: string): boolean {
  if (!s) return false
  if (DUTCH_WORD_RE.test(s)) return false
  const tokens = s.split(/\s+/).filter(Boolean)
  if (tokens.length === 0) return false
  const blobTokens = tokens.filter((tok) => isRandomBlob(tok))
  // A single blob token is enough; if it's all blobs (or mostly), it's spam.
  return blobTokens.length >= 1 && blobTokens.length >= Math.ceil(tokens.length / 2)
}

function getEmailDomain(email: string): string | null {
  const m = String(email || '').toLowerCase().match(/^[^\s@]+@([^\s@]+\.[^\s@]+)$/)
  return m ? m[1] : null
}

/**
 * Inspect a submission. Returns a Dutch error message to reject with, or null
 * if it should be allowed through. Runs cheaply and never throws.
 */
export function detectContactSpam(s: ContactSubmission): string | null {
  // 1) Honeypot — bots fill every field; humans never see it.
  if (s.company && s.company.trim() !== '') {
    return 'Verzoek geweigerd.'
  }

  // 2) Subject must come from the real dropdown.
  if (!VALID_CONTACT_SUBJECTS.includes(s.subject as (typeof VALID_CONTACT_SUBJECTS)[number])) {
    return 'Ongeldig onderwerp geselecteerd.'
  }

  // 3) Disposable / throwaway e-mail domain.
  const domain = getEmailDomain(s.email)
  if (domain && DISPOSABLE_DOMAINS.has(domain)) {
    return 'Gebruik een geldig, niet-tijdelijk e-mailadres.'
  }

  // 4) Random-blob fingerprint in any free-text field.
  if (isRandomBlob(s.name) || textContainsRandomBlob(s.name)) {
    return 'Vul je naam in met leesbare tekst.'
  }
  if (s.organization && (isRandomBlob(s.organization) || textContainsRandomBlob(s.organization))) {
    return 'Vul een geldige organisatienaam in.'
  }
  if (isRandomBlob(s.message) || textContainsRandomBlob(s.message)) {
    return 'Je bericht bevat geen leesbare tekst.'
  }

  return null
}
