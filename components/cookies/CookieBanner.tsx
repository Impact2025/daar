'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useConsent } from './CookieConsentContext'

export function CookieBanner() {
  const { hasDecided, acceptAll, rejectAll, saveCustom } = useConsent()
  const [showDetails, setShowDetails] = useState(false)
  const [functional, setFunctional] = useState(false)
  const [analytics, setAnalytics] = useState(false)

  if (hasDecided) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
        <div className="p-6">
          <div className="flex items-start gap-4 mb-4">
            <div className="text-2xl">🍪</div>
            <div>
              <h2 className="text-base font-semibold text-navy mb-1">Wij gebruiken cookies</h2>
              <p className="text-sm text-gray-600">
                DAAR gebruikt noodzakelijke cookies voor de werking van de website. Met uw toestemming plaatsen we ook analytische cookies (Google Analytics) om de website te verbeteren.{' '}
                <Link href="/cookies" className="text-brandGreen hover:underline">Meer informatie</Link>
              </p>
            </div>
          </div>

          {showDetails && (
            <div className="mb-4 space-y-3 border-t border-gray-100 pt-4">
              <label className="flex items-center justify-between gap-4">
                <div>
                  <span className="text-sm font-medium text-navy">Noodzakelijk</span>
                  <p className="text-xs text-gray-500">Altijd actief — vereist voor de werking van de website</p>
                </div>
                <input type="checkbox" checked disabled className="w-4 h-4 accent-brandGreen" />
              </label>
              <label className="flex items-center justify-between gap-4 cursor-pointer">
                <div>
                  <span className="text-sm font-medium text-navy">Functioneel</span>
                  <p className="text-xs text-gray-500">Onthoudt uw voorkeuren en instellingen</p>
                </div>
                <input
                  type="checkbox"
                  checked={functional}
                  onChange={e => setFunctional(e.target.checked)}
                  className="w-4 h-4 accent-brandGreen"
                />
              </label>
              <label className="flex items-center justify-between gap-4 cursor-pointer">
                <div>
                  <span className="text-sm font-medium text-navy">Analytisch (Google Analytics)</span>
                  <p className="text-xs text-gray-500">Geanonimiseerde meting van websitegebruik</p>
                </div>
                <input
                  type="checkbox"
                  checked={analytics}
                  onChange={e => setAnalytics(e.target.checked)}
                  className="w-4 h-4 accent-brandGreen"
                />
              </label>
              <label className="flex items-center justify-between gap-4 opacity-50">
                <div>
                  <span className="text-sm font-medium text-navy">Marketing</span>
                  <p className="text-xs text-gray-500">Niet actief — DAAR gebruikt momenteel geen marketingcookies</p>
                </div>
                <input type="checkbox" disabled className="w-4 h-4" />
              </label>
            </div>
          )}

          <div className="flex flex-wrap gap-2 justify-end">
            <button
              onClick={rejectAll}
              className="px-4 py-2 text-sm text-gray-600 hover:text-navy border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
            >
              Alleen noodzakelijk
            </button>
            {showDetails ? (
              <button
                onClick={() => saveCustom({ functional, analytics, marketing: false })}
                className="px-4 py-2 text-sm bg-navy/10 text-navy rounded-lg hover:bg-navy/20 transition-colors"
              >
                Opslaan
              </button>
            ) : (
              <button
                onClick={() => setShowDetails(true)}
                className="px-4 py-2 text-sm text-gray-600 hover:text-navy border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
              >
                Aanpassen
              </button>
            )}
            <button
              onClick={acceptAll}
              className="px-4 py-2 text-sm bg-brandGreen text-white rounded-lg hover:bg-brandGreen/90 transition-colors font-medium"
            >
              Alles accepteren
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
