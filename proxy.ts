import { NextResponse, type NextRequest } from 'next/server'
import { auth } from '@/lib/auth'

// Centralised route protection (defense-in-depth on top of per-route checks).
// Runs on the edge. JWT sessions are stateless, so this works without a DB.
export const config = {
  matcher: [
    // All admin pages + admin API routes
    '/admin/:path*',
    '/api/admin/:path*',
  ],
}

const ALLOWED_ROLES = ['ADMIN', 'EDITOR', 'WRITER']

export default async function proxy(request: NextRequest) {
  const session = await auth()

  if (!session?.user) {
    // API: return 401 JSON. Page: redirect to login.
    if (request.nextUrl.pathname.startsWith('/api/')) {
      return NextResponse.json(
        { error: 'Niet geautoriseerd' },
        { status: 401 }
      )
    }
    const loginUrl = new URL('/admin/login', request.url)
    loginUrl.searchParams.set('callbackUrl', request.nextUrl.pathname)
    return NextResponse.redirect(loginUrl)
  }

  if (!ALLOWED_ROLES.includes(session.user.role)) {
    if (request.nextUrl.pathname.startsWith('/api/')) {
      return NextResponse.json(
        { error: 'Geen toegang' },
        { status: 403 }
      )
    }
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}
