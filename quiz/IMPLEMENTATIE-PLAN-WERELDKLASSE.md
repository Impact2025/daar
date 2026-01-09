# DAAR VrijwilligersCheck - Wereldklasse Implementatieplan

## Analyse Huidige Quiz

**Sterke punten:**
- Goede vragenstructuur (7 vragen, duidelijke scoring)
- Logische uitkomstprofielen met gepersonaliseerde tips
- Lead capture mogelijkheid

**Te verbeteren voor DAAR-stijl:**
- Verwijder alle emojis (minimalistisch)
- Gebruik DAAR kleuren (#1A2332 navy, #3BA273 brandGreen)
- Tailwind CSS in plaats van inline styles
- Integreer met bestaande UI componenten (Card, Button, Input)
- Koppel aan bestaand Lead model in database
- Voeg booking integratie toe (plan direct een gesprek)

---

## Architectuur

```
app/(public)/quiz/
├── page.tsx                    # Quiz pagina met metadata
├── resultaat/[id]/page.tsx     # Shareable resultaat pagina

components/quiz/
├── QuizWidget.tsx              # Hoofdcomponent
├── QuizQuestion.tsx            # Vraag weergave
├── QuizProgress.tsx            # Voortgangsbalk
├── QuizResult.tsx              # Resultaat weergave
├── QuizLeadCapture.tsx         # Email capture formulier
└── ScoreCircle.tsx             # Circulaire score visualisatie

app/api/quiz/
├── route.ts                    # POST: opslaan resultaat, GET: statistieken
└── [id]/route.ts               # GET: specifiek resultaat ophalen

constants/
└── quiz.ts                     # Vragen, scoring, uitkomsten

lib/
└── quiz.ts                     # Helper functies
```

---

## Database Uitbreiding

```prisma
model QuizResult {
  id            String   @id @default(cuid())
  visitorId     String?
  score         Int
  maxScore      Int
  percentage    Int
  profile       String   // kampioen, goed, werk, verandering
  answers       Json     // Array van antwoorden
  leadId        String?
  lead          Lead?    @relation(fields: [leadId], references: [id])
  createdAt     DateTime @default(now())
}
```

---

## Vragen (Zonder Emojis)

| # | Vraag | Opties (score) |
|---|-------|----------------|
| 1 | Hoeveel vrijwilligers heeft jouw organisatie? | 1-25 (1), 26-100 (2), 101-500 (3), 500+ (4) |
| 2 | Hoe beheer je vrijwilligersgegevens? | Excel/Sheets (1), Papier (0), Mix (2), Software (4) |
| 3 | Hoe lang duurt het onboarden van een nieuwe vrijwilliger? | >1 maand (0), 2-4 weken (2), 1-2 weken (3), <1 week (4) |
| 4 | Hoe vaak communiceer je met je vrijwilligers? | Alleen indien nodig (1), Maandelijks (2), Wekelijks (3), Meerdere keren per week (4) |
| 5 | Meet je de tevredenheid van je vrijwilligers? | Nee (0), Informeel (2), Jaarlijks (3), Structureel (4) |
| 6 | Hoeveel vrijwilligers stoppen binnen het eerste jaar? | >50% (0), 30-50% (1), 10-30% (3), <10% (4) |
| 7 | Kun je de impact van je vrijwilligers aantonen? | Nee (0), Alleen uren (2), Basis-rapportages (3), Concrete impactcijfers (4) |

---

## Uitkomstprofielen (DAAR-stijl)

### 1. Vrijwilligerskampioen (80-100%)
- **Kleur:** brandGreen (#3BA273)
- **Titel:** Vrijwilligerskampioen
- **Beschrijving:** Jullie vrijwilligersbeleid is uitstekend. Je hebt duidelijk oog voor je mensen en dat vertaalt zich naar betrokkenheid.
- **Tip:** Met het DAAR Impact Dashboard kun je jullie succes nog beter zichtbaar maken voor stakeholders en subsidiegevers.
- **Modules:** Impact Dashboard, Geluksmomenten

### 2. Goed op weg (60-79%)
- **Kleur:** #3B82F6 (blauw)
- **Titel:** Goed op weg
- **Beschrijving:** Je hebt een solide basis neergezet. Er is ruimte voor groei, vooral in het structureel meten en communiceren.
- **Tip:** Structurele tevredenheidsmeting kan jullie retentie met 40% verbeteren.
- **Modules:** VrijwilligersCheck, Communicatie Hub, Smart Matching

### 3. Ruimte voor groei (40-59%)
- **Kleur:** #F59E0B (amber)
- **Titel:** Ruimte voor groei
- **Beschrijving:** Je vrijwilligers verdienen meer aandacht. De basis is aanwezig, maar professionalisering is de volgende stap.
- **Tip:** Een centraal vrijwilligersdossier bespaart gemiddeld 8 uur per week aan administratie.
- **Modules:** Centraal Dossier, VrijwilligersCheck, Communicatie Hub

### 4. Tijd voor actie (0-39%)
- **Kleur:** #DC2626 (rood)
- **Titel:** Tijd voor actie
- **Beschrijving:** Hier liggen grote kansen. Met de juiste aanpak kun je een enorme sprong voorwaarts maken.
- **Tip:** Organisaties in vergelijkbare situaties zien na 3 maanden DAAR gemiddeld 50% minder uitval.
- **Modules:** Centraal Dossier, Smart Matching, VrijwilligersCheck, Communicatie Hub

---

## UI/UX Specificaties

### Design Principes
- **Minimalistisch:** Veel witruimte, geen visuele ruis
- **Professioneel:** Zakelijke uitstraling, geen speelse elementen
- **Consistent:** Gebruik bestaande DAAR componenten
- **Toegankelijk:** WCAG 2.1 AA compliant

### Componenten

**QuizProgress**
- Dunne lijn (4px hoogte)
- Navy achtergrond, brandGreen vulling
- Vloeiende animatie (300ms ease)

**QuizQuestion**
- Card met subtiele border
- Vraagnummer in klein grijs
- Vraag in navy, 24px semibold
- Subtitel in grijs, 16px
- Antwoorden als klikbare cards met hover state

**QuizResult**
- Grote circulaire score (SVG)
- Score percentage in center
- Profiel titel en beschrijving
- Tip in accent card
- Aanbevolen modules als tags
- CTA: "Plan een gesprek" (booking integratie)
- Secundair: "Quiz opnieuw doen"

### Animaties
- Vraag transitie: fade + slide (200ms)
- Antwoord selectie: scale pulse (150ms)
- Resultaat: score telt op van 0 (1s)
- Progress bar: smooth width transition

---

## Lead Capture Flow

1. **Na laatste vraag:** Toon email formulier
   - "Ontvang je persoonlijke rapport per email"
   - Naam + Email + Organisatie (optioneel)
   - Skip optie voor wie direct resultaat wil

2. **Bij invullen:**
   - Maak Lead aan in database
   - Koppel QuizResult aan Lead
   - Stuur email met rapport (Resend)
   - Toon resultaat

3. **Bij skippen:**
   - Sla QuizResult op zonder Lead
   - Toon resultaat direct
   - Optie om later alsnog email in te vullen

---

## Integraties

### Booking Widget
Na resultaat: "Wil je bespreken hoe DAAR kan helpen?"
- Button opent BookingWidget in modal
- Pre-fill type: "Kennismaking" of "Demo"
- Context meegeven: quiz score en profiel

### Chat Widget (Iris)
- Bij quiz pagina bezoek: Iris biedt hulp aan
- Na resultaat: Iris kan vragen beantwoorden over modules

### Email Rapport
Template met:
- Score en profiel
- Antwoorden per vraag
- Gepersonaliseerde tips
- Links naar relevante kennisbank artikelen
- CTA: Plan een gesprek

---

## SEO & Sharing

### Meta Tags
```tsx
export const metadata: Metadata = {
  title: 'VrijwilligersCheck | Test je vrijwilligersbeleid | DAAR',
  description: 'Ontdek in 2 minuten hoe gezond jouw vrijwilligersbeleid is. Gratis assessment met gepersonaliseerde tips.',
  openGraph: {
    title: 'Hoe scoort jouw vrijwilligersbeleid?',
    description: 'Doe de gratis VrijwilligersCheck en ontdek waar je kansen liggen.',
    images: ['/og/quiz.png'],
  },
}
```

### Shareable Resultaat
- Unieke URL: `/quiz/resultaat/[id]`
- OG image generatie met score
- LinkedIn share met custom message

---

## Implementatie Volgorde

### Fase 1: Core Quiz
1. Constants met vragen en uitkomsten
2. QuizWidget component
3. Quiz pagina
4. Basis styling

### Fase 2: Database & API
1. Prisma schema uitbreiding
2. API routes
3. Resultaat opslaan

### Fase 3: Lead Capture
1. Lead formulier component
2. Koppeling met bestaand Lead model
3. Email verzending

### Fase 4: Integraties
1. Booking widget integratie
2. Shareable resultaat pagina
3. OG image generatie

### Fase 5: Polish
1. Animaties verfijnen
2. Mobile optimalisatie
3. A/B test setup
4. Analytics events

---

## Success Metrics

- **Completion rate:** >70% start quiz -> ziet resultaat
- **Lead capture rate:** >30% vult email in
- **Booking rate:** >10% plant gesprek na quiz
- **Share rate:** >5% deelt resultaat

---

## Bestanden te Maken

```
prisma/schema.prisma          (uitbreiden)
constants/quiz.ts             (nieuw)
lib/quiz.ts                   (nieuw)
components/quiz/QuizWidget.tsx
components/quiz/QuizQuestion.tsx
components/quiz/QuizProgress.tsx
components/quiz/QuizResult.tsx
components/quiz/QuizLeadCapture.tsx
components/quiz/ScoreCircle.tsx
app/(public)/quiz/page.tsx
app/(public)/quiz/resultaat/[id]/page.tsx
app/api/quiz/route.ts
app/api/quiz/[id]/route.ts
```
