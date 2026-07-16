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
const LOGIN_PATH = '/admin/login'

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const session = await auth()

  // De login-pagina is publiek en mag NOOIT worden beschermd — anders
  // ontstaat een redirect-loop (login -> login -> ...). ERR_TOO_MANY_REDIRECTS.
  if (pathname === LOGIN_PATH) {
    // Al ingelogd? Sla het inlogscherm over.
    if (session?.user && ALLOWED_ROLES.includes(session.user.role)) {
      const callbackUrl = request.nextUrl.searchParams.get('callbackUrl')
      const dest =
        callbackUrl && callbackUrl.startsWith('/admin') && callbackUrl !== LOGIN_PATH
          ? callbackUrl
          : '/admin'
      return NextResponse.redirect(new URL(dest, request.url))
    }
    return NextResponse.next()
  }

  if (!session?.user) {
    // API: return 401 JSON. Page: redirect to login.
    if (pathname.startsWith('/api/')) {
      return NextResponse.json(
        { error: 'Niet geautoriseerd' },
        { status: 401 }
      )
    }
    const loginUrl = new URL(LOGIN_PATH, request.url)
    loginUrl.searchParams.set('callbackUrl', pathname)
    return NextResponse.redirect(loginUrl)
  }

  if (!ALLOWED_ROLES.includes(session.user.role)) {
    if (pathname.startsWith('/api/')) {
      return NextResponse.json(
        { error: 'Geen toegang' },
        { status: 403 }
      )
    }
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}
