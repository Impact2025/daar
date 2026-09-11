'use client'

import { useEffect, useRef } from 'react'

interface ViewTrackerProps {
  articleId: string
}

/**
 * Registreert één weergave per paginabezoek, client-side en fire-and-forget.
 *
 * Vervangt de oude `prisma.article.update()` in de server-render, zodat de
 * artikelpagina statisch/ISR gecached kan worden. `keepalive` zorgt dat de
 * request ook afrondt als de gebruiker meteen wegnavigeert.
 */
export function ViewTracker({ articleId }: ViewTrackerProps) {
  const sent = useRef(false)

  useEffect(() => {
    if (sent.current || !articleId) return
    sent.current = true

    fetch('/api/track-view', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: articleId }),
      keepalive: true,
    }).catch(() => {
      // Best-effort; stilte bij falen.
    })
  }, [articleId])

  return null
}
