import type { NextAuthConfig } from 'next-auth'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'

// Prisma is imported lazily so that this module can be imported from an
// edge-runtime middleware without pulling in the Node.js database driver.
// (next-auth v5 auth() itself is edge-compatible; only the DB call below is not.)
let prisma: typeof import('./prisma').prisma | undefined
async function getPrisma() {
  if (!prisma) {
    prisma = (await import('./prisma')).prisma
  }
  return prisma
}

export const authConfig: NextAuthConfig = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Wachtwoord', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        try {
          const db = await getPrisma()
          const user = await db.user.findUnique({
            where: { email: credentials.email as string },
          })

          if (!user) {
            return null
          }

          // Check password — every account must use a bcrypt-hashed passwordHash.
          // The previous hardcoded legacy fallback (admin@daar.nl / daar2024!) has
          // been removed: it bypassed the database and was a permanent backdoor.
          if (!user.passwordHash) {
            return null
          }

          const isValid = await bcrypt.compare(
            credentials.password as string,
            user.passwordHash
          )
          if (!isValid) {
            return null
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          }
        } catch (error) {
          console.error('[Auth] Database error:', error)
          return null
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string
        session.user.id = token.id as string
      }
      return session
    },
  },
  pages: {
    signIn: '/admin/login',
    error: '/admin/login',
  },
  debug: process.env.NODE_ENV === 'development',
}

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig)
