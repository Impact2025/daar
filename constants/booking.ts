// DAAR Afspraak Types en Configuratie

export const DAAR_BOOKING_TYPES = [
  {
    slug: 'kennismaking',
    name: 'Kennismakingsgesprek',
    description: 'Een vrijblijvend gesprek om kennis te maken en te ontdekken hoe DAAR kan helpen.',
    duration: 30,
    price: 'Gratis',
    color: '#3BA273',
  },
  {
    slug: 'demo',
    name: 'Platform Demo',
    description: 'Een uitgebreide demonstratie van het DAAR platform met al zijn mogelijkheden.',
    duration: 45,
    price: 'Gratis',
    color: '#1A2332',
  },
  {
    slug: 'strategie-sessie',
    name: 'Strategiesessie Vrijwilligersbeheer',
    description: 'Diepgaand adviesgesprek over het professionaliseren van jullie vrijwilligersbeheer.',
    duration: 60,
    price: '€150',
    color: '#2563EB',
  },
  {
    slug: 'impact-workshop',
    name: 'Impact Workshop',
    description: 'Workshop over het meten en rapporteren van maatschappelijke impact met de Geluksmomenten Formule.',
    duration: 90,
    price: '€250',
    color: '#7C3AED',
  },
] as const

export type BookingTypeSlug = typeof DAAR_BOOKING_TYPES[number]['slug']

// Business hours (maandag t/m vrijdag, 9:00-17:00)
export const DEFAULT_BUSINESS_HOURS = [
  { dayOfWeek: 1, startTime: '09:00', endTime: '17:00', isActive: true }, // Maandag
  { dayOfWeek: 2, startTime: '09:00', endTime: '17:00', isActive: true }, // Dinsdag
  { dayOfWeek: 3, startTime: '09:00', endTime: '17:00', isActive: true }, // Woensdag
  { dayOfWeek: 4, startTime: '09:00', endTime: '17:00', isActive: true }, // Donderdag
  { dayOfWeek: 5, startTime: '09:00', endTime: '17:00', isActive: true }, // Vrijdag
  { dayOfWeek: 6, startTime: '09:00', endTime: '13:00', isActive: false }, // Zaterdag (uit)
  { dayOfWeek: 0, startTime: '09:00', endTime: '17:00', isActive: false }, // Zondag (uit)
]

// Slot interval in minuten
export const SLOT_INTERVAL = 30

// Minimum tijd vooruit om te boeken (in uren)
export const MIN_BOOKING_NOTICE_HOURS = 24

// Maximum dagen vooruit om te boeken
export const MAX_BOOKING_DAYS_AHEAD = 60

// Email templates
export const EMAIL_TEMPLATES = {
  confirmation: {
    subject: 'Bevestiging: {bookingType} bij DAAR op {date}',
    body: `Beste {name},

Bedankt voor je boeking! Wij kijken ernaar uit om je te spreken.

**Afspraakdetails:**
- **Type:** {bookingType}
- **Datum:** {date}
- **Tijd:** {time}
- **Duur:** {duration} minuten

{meetingLink ? "**Videogesprek:** " + meetingLink : ""}

Heb je vragen of moet je de afspraak wijzigen? Neem dan contact met ons op via info@daar.nl.

Met vriendelijke groet,
Team DAAR

---
Vincent, Saviem & Thijs
Warme Zorg door Slimme Tech`,
  },
  reminder: {
    subject: 'Herinnering: {bookingType} morgen bij DAAR',
    body: `Beste {name},

Dit is een vriendelijke herinnering voor je afspraak morgen.

**Afspraakdetails:**
- **Type:** {bookingType}
- **Datum:** {date}
- **Tijd:** {time}

{meetingLink ? "**Videogesprek:** " + meetingLink : ""}

Tot morgen!

Team DAAR`,
  },
  cancellation: {
    subject: 'Afspraak geannuleerd: {bookingType} bij DAAR',
    body: `Beste {name},

Je afspraak is geannuleerd.

**Geannuleerde afspraak:**
- **Type:** {bookingType}
- **Datum:** {date}
- **Tijd:** {time}

Wil je een nieuwe afspraak maken? Ga naar onze website of neem contact met ons op.

Met vriendelijke groet,
Team DAAR`,
  },
}
