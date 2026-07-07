import { NextRequest, NextResponse } from 'next/server'

// Lightweight in-memory sliding-window rate limiter.
//
// No external dependency (keeps the bundle small and avoids infra coupling).
// Stores hit-timestamps per key in a module-level Map. Bounded per key so memory
// stays small. NOTE: in serverless/edge multi-instance deployments each instance
// keeps its own counters — sufficient as a first line of defense. For strict
// global limits add Redis/Upstash later, keeping this same interface.

interface RateLimitOptions {
  // max requests
  limit: number
  // window in seconds
  windowSec: number
  // identifier factory — defaults to client IP
  key?: (req: NextRequest) => string
  // message returned when blocked
  message?: string
}

const buckets = new Map<string, number[]>()

// Best-effort client IP extraction across proxies / Vercel / edge.
function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0].trim()
  const real = req.headers.get('x-real-ip')
  if (real) return real
  return 'local'
}

export interface RateLimitResult {
  success: boolean
  limit: number
  remaining: number
  resetSec: number
}

export function rateLimit(
  req: NextRequest,
  options: RateLimitOptions
): RateLimitResult {
  const { limit, windowSec } = options
  const now = Date.now()
  const key = `${options.key ? options.key(req) : getClientIp(req)}:${req.nextUrl.pathname}`

  const windowMs = windowSec * 1000
  const hits = (buckets.get(key) ?? []).filter((t) => now - t < windowMs)

  if (hits.length >= limit) {
    const oldest = hits[0]
    const resetSec = Math.ceil((oldest + windowMs - now) / 1000)
    buckets.set(key, hits)
    return { success: false, limit, remaining: 0, resetSec }
  }

  hits.push(now)
  buckets.set(key, hits)
  return {
    success: true,
    limit,
    remaining: Math.max(0, limit - hits.length),
    resetSec: windowSec,
  }
}

// Helper to return a standard 429 response — apply at the top of a POST handler.
export function rateLimitOrJson(
  req: NextRequest,
  options: RateLimitOptions
): NextResponse | null {
  const result = rateLimit(req, options)
  if (result.success) return null
  return NextResponse.json(
    { error: options.message ?? 'Te veel verzoeken. Probeer het later opnieuw.' },
    {
      status: 429,
      headers: {
        'Retry-After': String(result.resetSec),
        'X-RateLimit-Limit': String(result.limit),
        'X-RateLimit-Remaining': String(result.remaining),
      },
    }
  )
}
