import type { NextAuthConfig } from 'next-auth'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { prisma } from './prisma'

export const authConfig: NextAuthConfig = {
  // Note: We don't use adapter with credentials provider + JWT strategy
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Wachtwoord', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email) {
          return null
        }

        // Voor development: hardcoded admin user
        // In productie: vervang door echte authenticatie
        if (
          credentials.email === 'admin@daar.nl' &&
          credentials.password === 'daar2024!'
        ) {
          // Check of user bestaat, zo niet aanmaken
          let user = await prisma.user.findUnique({
            where: { email: 'admin@daar.nl' },
          })

          if (!user) {
            user = await prisma.user.create({
              data: {
                email: 'admin@daar.nl',
                name: 'DAAR Admin',
                role: 'ADMIN',
              },
            })

            // Maak ook een author aan
            await prisma.author.create({
              data: {
                name: 'Team DAAR',
                email: 'admin@daar.nl',
                bio: 'Het team achter DAAR: Vincent, Saviem en Thijs. Samen bouwen wij aan een platform waar vrijwilligerswerk de waardering krijgt die het verdient.',
                role: 'Founders',
                userId: user.id,
              },
            })
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          }
        }

        return null
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
