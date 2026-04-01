'use client'

import { createContext, useContext, useEffect, useState } from 'react'

export interface CookieConsent {
  necessary: true
  functional: boolean
  analytics: boolean
  marketing: boolean
  timestamp: string
  version: string
}

const CONSENT_KEY = 'daar_consent'
const CONSENT_VERSION = '1.1'

interface ConsentContextValue {
  consent: CookieConsent | null
  hasDecided: boolean
  acceptAll: () => void
  rejectAll: () => void
  saveCustom: (prefs: Pick<CookieConsent, 'functional' | 'analytics' | 'marketing'>) => void
}

const ConsentContext = createContext<ConsentContextValue | null>(null)

export function CookieConsentProvider({ children }: { children: React.ReactNode }) {
  const [consent, setConsent] = useState<CookieConsent | null>(null)
  const [hasDecided, setHasDecided] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(CONSENT_KEY)
      if (stored) {
        const parsed: CookieConsent = JSON.parse(stored)
        if (parsed.version === CONSENT_VERSION) {
          setConsent(parsed)
          setHasDecided(true)
        }
      }
    } catch {
      // ignore parse errors
    }
  }, [])

  function save(prefs: Omit<CookieConsent, 'necessary' | 'timestamp' | 'version'>) {
    const value: CookieConsent = {
      necessary: true,
      ...prefs,
      timestamp: new Date().toISOString(),
      version: CONSENT_VERSION,
    }
    localStorage.setItem(CONSENT_KEY, JSON.stringify(value))
    document.cookie = `daar_consent=1; max-age=${60 * 60 * 24 * 365}; path=/; SameSite=Lax`
    setConsent(value)
    setHasDecided(true)
  }

  return (
    <ConsentContext.Provider value={{
      consent,
      hasDecided,
      acceptAll: () => save({ functional: true, analytics: true, marketing: true }),
      rejectAll: () => save({ functional: false, analytics: false, marketing: false }),
      saveCustom: (prefs) => save(prefs),
    }}>
      {children}
    </ConsentContext.Provider>
  )
}

export function useConsent() {
  const ctx = useContext(ConsentContext)
  if (!ctx) throw new Error('useConsent must be used within CookieConsentProvider')
  return ctx
}
