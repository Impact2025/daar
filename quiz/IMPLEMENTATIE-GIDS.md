# DAAR Vrijwilligerscheck Quiz - Implementatie Gids

## Overzicht
Deze gids helpt je om de DAAR Vrijwilligerscheck Quiz te implementeren via Claude Code in Windows PowerShell.

---

## Optie 1: Snelle Start (Copy-Paste Prompt)

Open PowerShell en start Claude Code. Kopieer dan deze prompt:

```
Ik wil een interactieve React quiz implementeren voor onze website daar.nl. 

De quiz heet "DAAR Vrijwilligerscheck" en test hoe gezond het vrijwilligersbeleid van een organisatie is.

Specificaties:
- 7 vragen over vrijwilligersmanagement
- Elke vraag heeft 4 antwoordopties met scores (0-4)
- Eindresultaat toont een "Geluksscore" (0-100)
- 4 uitkomstprofielen: Vrijwilligerskampioen (80%+), Goed op weg (60-80%), Werk aan de winkel (40-60%), Tijd voor verandering (<40%)
- Elke uitkomst geeft gepersonaliseerde tips en aanbevolen DAAR-modules
- Deelknoppen voor LinkedIn en kopiëren

Design vereisten (DAAR huisstijl):
- Primaire kleur: #10B981 (groen)
- Achtergrond: #F8FAFC (licht grijs)
- Tekst: #0F172A (donker)
- Cards: wit met subtiele schaduw
- Afgeronde hoeken (12-20px)
- Clean, moderne look
- Animated progress bar
- Hover states op alle buttons

De vragen zijn:
1. Hoeveel vrijwilligers heeft jouw organisatie? (1-25 / 26-100 / 101-500 / 500+)
2. Hoe houd je vrijwilligersgegevens bij? (Excel / Papier / Mix / Software)
3. Hoe lang duurt onboarding? (>1 maand / 2-4 weken / 1-2 weken / <1 week)
4. Hoe vaak communiceer je? (Alleen als nodig / Maandelijks / Wekelijks / Vaker)
5. Meet je tevredenheid? (Nee / Informeel / Jaarlijks / Structureel)
6. Hoeveel stoppen binnen eerste jaar? (>50% / 30-50% / 10-30% / <10%)
7. Kun je impact aantonen? (Nee / Alleen uren / Basis-rapportages / Ja, concreet)

Maak dit als een standalone React component die ik kan embedden op onze website.
```

---

## Optie 2: Direct de Code Implementeren

Als je de quiz direct wilt implementeren, gebruik dan deze PowerShell commando's:

### Stap 1: Navigeer naar je project
```powershell
cd C:\pad\naar\jouw\daar-website
```

### Stap 2: Maak de quiz component
```powershell
# Als je een components folder hebt:
New-Item -Path ".\src\components\VrijwilligersQuiz.jsx" -ItemType File

# Of voor een pages folder:
New-Item -Path ".\src\pages\quiz.jsx" -ItemType File
```

### Stap 3: Kopieer de code
De volledige React code staat in het bijgevoegde bestand `daar-quiz-light.jsx`.

---

## Optie 3: Volledige Prompt voor Claude Code

Start Claude Code in PowerShell:
```powershell
claude
```

Geef dan deze gedetailleerde prompt:

```
Maak een React quiz component voor daar.nl met de volgende specificaties:

## Technische vereisten
- Standalone React functional component met hooks (useState)
- Geen externe dependencies behalve React
- Inline styling (geen aparte CSS file nodig)
- Mobile-responsive

## DAAR Huisstijl
const colors = {
  primary: '#10B981',      // DAAR groen
  primaryDark: '#059669',
  primaryLight: '#D1FAE5',
  dark: '#0F172A',         // Tekst
  gray: '#64748B',
  lightGray: '#F1F5F9',
  white: '#FFFFFF',
  background: '#F8FAFC'
};

## Functionaliteit
1. Progress bar bovenaan die vult naarmate quiz vordert
2. Animatie bij klikken op antwoord (scale + fade)
3. 7 vragen met elk 4 opties
4. Score berekening (0-4 per vraag, totaal percentage)
5. Resultaat met circulaire Geluksscore visualisatie
6. 4 verschillende uitkomsten met:
   - Titel en emoji
   - Beschrijving
   - Gepersonaliseerde tip
   - Aanbevolen DAAR modules
7. Deel buttons (kopieer + LinkedIn)
8. "Opnieuw doen" functie

## De 7 vragen
[Zie volledige vragenlijst hierboven]

## Export
Export als default: export default function DaarQuiz()

Plaats het bestand in: src/components/VrijwilligersQuiz.jsx
```

---

## Integratie op je website

### Voor Next.js / React website:

```jsx
// In je pagina bestand (bijv. pages/quiz.js of app/quiz/page.jsx)
import DaarQuiz from '@/components/VrijwilligersQuiz';

export default function QuizPage() {
  return <DaarQuiz />;
}
```

### Voor statische HTML met React:

```html
<!DOCTYPE html>
<html>
<head>
  <title>Vrijwilligerscheck | DAAR</title>
  <script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
</head>
<body>
  <div id="quiz-root"></div>
  <script type="text/babel" src="./daar-quiz-light.jsx"></script>
  <script type="text/babel">
    ReactDOM.render(<DaarQuiz />, document.getElementById('quiz-root'));
  </script>
</body>
</html>
```

### Voor WordPress:

1. Installeer een plugin zoals "Scripts n Styles" of "Insert Headers and Footers"
2. Maak een custom page template
3. Embed de React code via een shortcode of custom block

---

## Aanpassingen voor jullie exacte huisstijl

Als jullie andere kleuren/fonts gebruiken, pas deze variabelen aan in de code:

```javascript
const colors = {
  primary: '#10B981',      // Pas aan naar jullie exacte groen
  primaryDark: '#059669',  // Donkerdere variant
  primaryLight: '#D1FAE5', // Lichtere variant voor hover
  dark: '#0F172A',         // Hoofdtekst kleur
  gray: '#64748B',         // Subtekst
  lightGray: '#F1F5F9',    // Achtergrond elementen
  white: '#FFFFFF',
  background: '#F8FAFC'    // Pagina achtergrond
};
```

Voor het font, vervang in de styling:
```javascript
fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
// Vervang 'Inter' met jullie eigen font
```

---

## Leadgeneratie toevoegen (optioneel)

Wil je emails verzamelen? Voeg dit toe vóór het tonen van resultaten:

```jsx
const [email, setEmail] = useState('');
const [showEmailForm, setShowEmailForm] = useState(false);

// In de results sectie, voeg toe:
{!email && (
  <div>
    <p>Vul je email in om je persoonlijke rapport te ontvangen:</p>
    <input 
      type="email" 
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      placeholder="jouw@email.nl"
    />
    <button onClick={() => {
      // Stuur naar je CRM/mailchimp/etc
      fetch('/api/quiz-lead', {
        method: 'POST',
        body: JSON.stringify({ email, score: geluksScore, result: result.title })
      });
    }}>
      Verstuur rapport
    </button>
  </div>
)}
```

---

## Vragen?

De bijgevoegde `daar-quiz-light.jsx` bevat de volledige werkende code in DAAR's huisstijl. Kopieer deze naar je project en pas aan waar nodig.
