'use client'

import { useState } from 'react'

interface ShareData {
  title: string
  text?: string
  url: string
}

/**
 * Deelknop-logica: op mobiel het native deelmenu, op desktop de link kopiëren.
 * `copied` is kort true na kopiëren, zodat de knop "Link gekopieerd" kan tonen.
 */
export function useShare() {
  const [copied, setCopied] = useState(false)

  const share = async (data: ShareData) => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches
    if (isTouch && navigator.share) {
      try {
        await navigator.share(data)
        return
      } catch (err) {
        // Gebruiker annuleerde: niets doen. Anders terugvallen op kopiëren.
        if (err instanceof DOMException && err.name === 'AbortError') return
      }
    }

    try {
      await navigator.clipboard.writeText(data.url)
    } catch {
      // Oudere browsers / geen clipboard-permissie
      const input = document.createElement('textarea')
      input.value = data.url
      document.body.appendChild(input)
      input.select()
      document.execCommand('copy')
      input.remove()
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  return { share, copied }
}
