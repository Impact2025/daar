// Cloudflare Turnstile verification helper for the DAAR contact form.
//
// Turnstile is the invisible, privacy-friendly CAPTCHA that replaces the old
// "click all traffic lights" widgets. It runs client-side (a tiny widget in the
// contact page) and returns a token; we verify that token here server-side
// against Cloudflare's API.
//
// DESIGN: env-driven and self-disabling.
//  - If TURNSTILE_SECRET_KEY + NEXT_PUBLIC_TURNSTILE_SITE_KEY are BOTH set, the
//    widget renders and tokens are enforced.
//  - If either key is missing (e.g. local dev), verification is SKIPPED and
//    `isEnabled` is false so the client knows not to render the widget. This
//    prevents the form from breaking when keys aren't configured yet.
//  See .env.example for where to put the keys (Cloudflare dashboard →
//  Turnstile → add site → grab site key + secret key).

const TURNSTILE_VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'

export function isTurnstileEnabled(): boolean {
  return Boolean(
    process.env.TURNSTILE_SECRET_KEY && process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY
  )
}

export interface TurnstileResult {
  success: boolean
  // Human-readable reason when success is false (for logging / debugging).
  reason?: string
}

/**
 * Verify a Turnstile token. Returns { success: true } when the token is valid,
 * or { success: false, reason } when it is missing/expired/invalid.
 *
 * Throws ONLY on transport/Cloudflare errors (so the caller can decide whether
 * to hard-fail). A missing token for an enabled site is returned as a clean
 * failure, not a throw.
 */
export async function verifyTurnstileToken(token: string | undefined): Promise<TurnstileResult> {
  const secret = process.env.TURNSTILE_SECRET_KEY
  if (!secret) {
    // Should not happen if callers check isTurnstileEnabled() first, but be
    // defensive: without a secret we cannot verify, so refuse (fail closed).
    return { success: false, reason: 'Turnstile secret niet geconfigureerd' }
  }

  if (!token || typeof token !== 'string' || token.trim() === '') {
    return { success: false, reason: 'Turnstile token ontbreekt' }
  }

  try {
    const res = await fetch(TURNSTILE_VERIFY_URL, {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ secret, response: token.trim() }),
    })

    if (!res.ok) {
      return { success: false, reason: `Turnstile HTTP ${res.status}` }
    }

    const data = (await res.json()) as {
      success: boolean
      'error-codes'?: string[]
    }

    if (!data.success) {
      return {
        success: false,
        reason: `Turnstile rejected: ${(data['error-codes'] || []).join(', ') || 'onbekend'}`,
      }
    }

    return { success: true }
  } catch (err) {
    // Transport failure — surface it so the caller can decide. Defaulting to
    // "block" here would let a Cloudflare outage lock out real users; we return
    // the error and let the route apply its policy.
    return {
      success: false,
      reason: `Turnstile verificatie mislukt: ${(err as Error).message}`,
    }
  }
}
