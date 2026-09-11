import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Node.js runtime vereist voor Prisma (geen edge).
export const runtime = 'nodejs'
// Deze route mag nooit gecached worden — elke hit telt.
export const dynamic = 'force-dynamic'

/**
 * Fire-and-forget view tracking.
 *
 * Het verhogen van viewCount gebeurt bewust NIET meer tijdens het renderen van
 * de artikelpagina. Daardoor kunnen artikelpagina's statisch gegenereerd en
 * gecached worden (ISR) — sneller, goedkoper te crawlen en immuun voor
 * transient DB-fouten (geen 5xx richting Googlebot).
 *
 * `/api/` staat in robots.txt op Disallow, dus zoekbots vuren dit endpoint niet
 * af: alleen echte bezoekers tellen mee.
 */
export async function POST(request: Request) {
  try {
    const { id } = await request.json()

    if (!id || typeof id !== 'string') {
      return NextResponse.json({ ok: false }, { status: 400 })
    }

    await prisma.article.update({
      where: { id },
      data: { viewCount: { increment: 1 } },
    })

    return NextResponse.json({ ok: true })
  } catch {
    // View tracking is best-effort; een fout mag de bezoeker nooit raken.
    return NextResponse.json({ ok: false }, { status: 200 })
  }
}
