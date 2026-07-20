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

2. **Rate-limit** — bestaand: max 5 submissies per IP per 10 min (spam/costbescherming).

Deze aanpak stopt de waargenomen spam (pure random strings) volledig, zonder externe
dienst, zonder captcha en zonder extra configuratie.

## Limiet van deze aanpak

Een mens-achtige bot die (a) het honeypot leeg laat, (b) leesbare neptekst tikt in
naam/bericht, en (c) een geldig e-mailadres gebruikt, glipt door. Voor die categorie
zou een extra laag nodig zijn (bijv. een eenvoudige vraag/quiz-veld of een captcha-dienst).
Zolang de inkomende spam uit random strings bestaat, is dat niet nodig.

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
