# Contactformulier anti-spam

Het DAAR contactformulier (`/contact`, API `app/api/contact/route.ts`) kreeg bot-submissies
met willekeurige alfanumerieke strings in naam/organisatie/bericht (bijv.
`bwROJsPwQQbqgdvJYbeTgXF`, `UzrfINqVDhQhLGcKiNH`) en een geldig dropdown-onderwerp.

## Wat er nu staat (gelaagde verdediging)

1. **Server-side spam-heuristiek** — `lib/contact-spam.ts`
   - *Honeypot* veld `company` (verborgen in de UI, gevuld door bots, leeg bij mensen) → 400.
   - *Subject-whitelist*: alleen de 7 opties uit de echte `<select>` zijn geldig → 400 bij forged subject.
   - *Disposable e-mail*: bekende tijdelijke-maildomeinen (mailinator, yopmail, ...) worden geweigerd.
   - *Random-blob detectie*: tokens met veel case-wisselingen (random gemengde case, geen woorden)
     of lange all-caps + cijfer-runs worden geweigerd. Echte namen/berichten met spaties of
     Nederlandse woorden gaan gewoon door.
   - Unit-test: `lib/contact-spam.test.ts` (`npx tsx lib/contact-spam.test.ts`).

2. **Cloudflare Turnstile** (optioneel, aanbevolen) — `lib/turnstile.ts` + widget in `app/(public)/contact/page.tsx`
   - Onzichtbare bot-check. Pas actief als BEIDE keys gezet zijn; zonder keys blijft het formulier
     gewoon werken (de heuristiek hierboven blijft actief).
   - Verificatie server-side tegen `https://challenges.cloudflare.com/turnstile/v0/siteverify`.

3. **Rate-limit** — bestaand: max 5 submissies per IP per 10 min (spam/costbescherming).

## Turnstile aanzetten (eenmalig)

1. Ga naar https://dash.cloudflare.com/ → **Turnstile** → **Add site**.
   - Modus: *Managed* (of *Invisible*).
   - Domein: `daar.nl` (+ evt. `www.daar.nl`, en je preview-domein op Vercel).
2. Kopieer **Site key** en **Secret key**.
3. Zet ze in `.env.local` (lokaal) én in Vercel (Production + Preview):
   ```
   NEXT_PUBLIC_TURNSTILE_SITE_KEY="<site key>"
   TURNSTILE_SECRET_KEY="<secret key>"
   ```
4. Redeploy. Het widget (`cf-turnstile`) verschijnt dan automatisch in het formulier en de
   server dwingt een geldige token af.

Zonder deze stappen is het formulier beveiligd via laag 1 + 3 (voldoende om de waargenomen
spam te stoppen); Turnstile is de industriële extra laag.

## Testen

- Spam-herkenning: `npx tsx lib/contact-spam.test.ts` (verwacht: 11 passed).
- Route-beslissingen: `npx tsx app/api/contact/route.e2e.test.ts` (verwacht: 5 passed).
- Handmatig tegen een draaiende server:
  ```bash
  PORT=3100 npx next start
  # spam -> 400
  curl -X POST localhost:3100/api/contact -H 'Content-Type: application/json' \
    -d '{"name":"bwROJsPwQQbqgdvJYbeTgXF","email":"bafeld4nu@aol.com","subject":"Media / Pers","message":"UzrfINqVDhQhLGcKiNH"}'
  # echt -> 200
  curl -X POST localhost:3100/api/contact -H 'Content-Type: application/json' \
    -d '{"name":"Vincent van Daar","email":"vincent@daar.nl","subject":"Demo aanvragen","message":"Hoi, ik wil graag een demo inplannen."}'
  ```
