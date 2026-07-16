/**
 * iCalendar (.ics) generatie voor afspraken — RFC 5545.
 *
 * Zelfstandig, geen externe dependency. Genereert een geldige VEVENT met
 * METHOD:REQUEST zodat de ontvanger een échte agenda-uitnodiging krijgt
 * (Outlook / Google Calendar / Apple Calendar accepteren dit als invite).
 */

export interface CalendarEventData {
  /** Stabiele unieke id — gebruik de booking-id zodat updates hetzelfde event raken */
  uid: string
  /** Volgnummer; verhoog bij wijziging/annulering zodat clients de update tonen */
  sequence?: number
  title: string
  description?: string
  start: Date
  end: Date
  /** Meeting-link of fysiek adres */
  location?: string
  organizerName: string
  organizerEmail: string
  attendeeName: string
  attendeeEmail: string
  /** REQUEST (nieuw/wijziging) of CANCEL (annulering) */
  method?: 'REQUEST' | 'CANCEL'
  status?: 'CONFIRMED' | 'CANCELLED'
  /** URL die in het event komt (bijv. de meeting-link) */
  url?: string
}

/** Escape volgens RFC 5545 §3.3.11 (TEXT). */
function escapeText(value: string): string {
  return value
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\r?\n/g, '\\n')
}

/** UTC-timestamp in de vorm 20260716T140000Z. */
function formatUTC(date: Date): string {
  return date
    .toISOString()
    .replace(/[-:]/g, '')
    .replace(/\.\d{3}/, '')
}

/**
 * Vouw regels langer dan 75 octets volgens RFC 5545 §3.1
 * (vervolgregels beginnen met een spatie).
 */
function foldLine(line: string): string {
  if (line.length <= 75) return line
  const chunks: string[] = []
  let remaining = line
  chunks.push(remaining.slice(0, 75))
  remaining = remaining.slice(75)
  while (remaining.length > 74) {
    chunks.push(' ' + remaining.slice(0, 74))
    remaining = remaining.slice(74)
  }
  if (remaining.length) chunks.push(' ' + remaining)
  return chunks.join('\r\n')
}

export function generateICS(data: CalendarEventData): string {
  const method = data.method ?? 'REQUEST'
  const status = data.status ?? 'CONFIRMED'
  const now = formatUTC(new Date())

  const lines: string[] = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//DAAR//Afspraken//NL',
    'CALSCALE:GREGORIAN',
    `METHOD:${method}`,
    'BEGIN:VEVENT',
    `UID:${data.uid}@daar.nl`,
    `SEQUENCE:${data.sequence ?? 0}`,
    `DTSTAMP:${now}`,
    `DTSTART:${formatUTC(data.start)}`,
    `DTEND:${formatUTC(data.end)}`,
    `SUMMARY:${escapeText(data.title)}`,
    `ORGANIZER;CN=${escapeText(data.organizerName)}:mailto:${data.organizerEmail}`,
    `ATTENDEE;CN=${escapeText(data.attendeeName)};ROLE=REQ-PARTICIPANT;PARTSTAT=NEEDS-ACTION;RSVP=TRUE:mailto:${data.attendeeEmail}`,
    `STATUS:${status}`,
  ]

  if (data.description) lines.push(`DESCRIPTION:${escapeText(data.description)}`)
  if (data.location) lines.push(`LOCATION:${escapeText(data.location)}`)
  if (data.url) lines.push(`URL:${data.url}`)

  // Herinnering 30 minuten van tevoren (niet bij annulering)
  if (method !== 'CANCEL') {
    lines.push(
      'BEGIN:VALARM',
      'ACTION:DISPLAY',
      'DESCRIPTION:Herinnering: je afspraak met DAAR begint binnenkort',
      'TRIGGER:-PT30M',
      'END:VALARM'
    )
  }

  lines.push('END:VEVENT', 'END:VCALENDAR')

  return lines.map(foldLine).join('\r\n')
}
