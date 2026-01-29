'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button, Input, Logo } from '@/components/ui'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError('Ongeldige inloggegevens')
      } else {
        router.push('/admin')
        router.refresh()
      }
    } catch (err) {
      setError('Er ging iets mis. Probeer het opnieuw.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-lightGreen to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <Logo className="h-10" color="#1A2332" />
            </div>
            <h1 className="text-2xl font-bold text-navy">Admin Panel</h1>
            <p className="text-gray-500 mt-1">Log in om verder te gaan</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="email"
              label="E-mailadres"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="je@email.nl"
              required
            />

            <Input
              type="password"
              label="Wachtwoord"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                {error}
              </div>
            )}

            <Button
              type="submit"
              className="w-full"
              loading={loading}
              disabled={loading}
            >
              Inloggen
            </Button>
          </form>

          {/* Help text */}
          <p className="mt-6 text-center text-sm text-gray-500">
            Problemen met inloggen?{' '}
            <a href="mailto:hallo@daar.nl" className="text-brandGreen hover:underline">
              Neem contact op
            </a>
          </p>
        </div>

      </div>
    </div>
  )
}
