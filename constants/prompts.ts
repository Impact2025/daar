// DAAR Brand Voice & AI Prompts
// Gebaseerd op de DAAR Brand Guidelines - Team DAAR Drie-eenheid

// =============================================================================
// KERN IDENTITEIT: DE DRIE-EENHEID
// =============================================================================

export const DAAR_FOUNDERS = {
  vincent: {
    name: 'Vincent van Munster',
    title: 'Het Sociale Hart',
    background: 'Sociaal ondernemer en tot oktober 2025 directeur van Stichting de Baan',
    inbreng: 'De praktijkervaring. Hij weet hoe de werkvloer voelt, kent de frustratie van roosters die niet kloppen en bewaakt dat de mens altijd centraal staat.',
    quote: 'Ik heb te vaak goede mensen zien vertrekken omdat we te laat zagen dat ze overvraagd werden.',
  },
  saviem: {
    name: 'Saviem Jansen',
    title: 'De Tech Architect',
    background: 'Ervaren techneut op het snijvlak van hardware en software',
    inbreng: 'De garantie van kwaliteit en veiligheid. Dankzij Saviem is DAAR geen hobby-app, maar een robuust, veilig en schaalbaar platform. Hij zorgt dat de techniek de zorg dient.',
    quote: 'Privacy is geen optie die je aan of uit zet, het is het fundament.',
  },
  thijs: {
    name: 'Thijs Lenting',
    title: 'Het Zakelijk Geweten',
    background: 'Bevlogen ondernemer en creatief strateeg met een zware achtergrond in accountancy (voormalig partner Freen & Co)',
    inbreng: 'De zakelijke validatie. Thijs borgt dat processen administratief en financieel audit-proof zijn. Hij zorgt dat rapportages kloppen voor het bestuur en de accountant.',
    quote: 'Wat niet meetbaar is, is niet verdedigbaar richting je stakeholders.',
  },
} as const;

// =============================================================================
// UNIEKE CONCEPTEN (USP's)
// =============================================================================

export const DAAR_CONCEPTS = {
  geluksmomentFormule: {
    name: 'De Geluksmomenten Formule',
    category: 'Impact',
    description: 'Een unieke formule om zachte impact hard en meetbaar te maken.',
    formula: 'Soort werk × Doelgroep × Intensiteit × Bereik × Kwaliteit',
    result: 'Bruto Maatschappelijk Geluk (BMG)',
    argument: 'Hiermee geven wij gemeenten en fondsen een cijfer dat bruikbaar is voor jaarverslagen. Dankzij de expertise van Thijs is dit zo onderbouwd dat accountants het accepteren.',
  },
  vrijwilligersCheck: {
    name: 'De VrijwilligersCheck',
    category: 'Retentie',
    description: 'Een preventief signaleringssysteem met stoplicht (Groen/Oranje/Rood).',
    doel: 'Voorkomen dat de beste krachten stilletjes opbranden.',
    vincentQuote: 'Ik heb te vaak goede mensen zien vertrekken omdat we te laat zagen dat ze overvraagd werden.',
  },
  privacyFoundation: {
    name: 'Privacy als Fundament',
    category: 'Veiligheid',
    description: 'AVG-compliant tot in de kern, niet als laagje eroverheen.',
    saviemQuote: 'Privacy is geen optie die je aan of uit zet, het is het fundament. Wij bouwen volgens de strengste standaarden omdat we met kwetsbare data werken.',
  },
  impactReserve: {
    name: 'De Impact Reserve',
    category: 'Social Enterprise',
    description: 'DAAR is een Social Enterprise. 10% van de winst vloeit terug naar een reserve voor maatschappelijke doelen.',
    tagline: 'Wij zijn commercieel, maar met een kloppend hart.',
  },
} as const;

// =============================================================================
// BRAND VOICE REGELS
// =============================================================================

export const DAAR_VOICE_RULES = {
  doThis: [
    'Gebruik altijd de "wij"-vorm: wij bouwen, wij zien, onze ervaring',
    'Spreek bestuurders, wethouders en directies aan op ooghoogte',
    'Combineer empathie van de zorg met zakelijkheid van accountancy',
    'Benoem het probleem (pijn) en bied direct de oplossing (DAAR)',
    'Gebruik sentence case in titels',
    'Verwijs naar de drie-eenheid waar relevant',
  ],
  avoidThis: [
    'DAAR presenteren als eenmanszaak',
    'Klinken als helpdeskmedewerker of pure verkoper',
    'Verkleinwoorden gebruiken (geen tooltje, lijstje, appje)',
    'Gouden bergen beloven zonder inspanning',
    'Tech-jargon zonder uitleg',
    'Wollige beleidstaal',
  ],
  keyPhrases: [
    'Warme Zorg door Slimme Tech',
    'Van Uren naar Impact',
    'Wij tellen geen uren, wij tellen Geluksmomenten',
    'Strategische partner in professionalisering',
    'De combinatie van Zorg, Tech en Finance',
  ],
} as const;

// =============================================================================
// AI CHAT SYSTEM PROMPT - IRIS
// =============================================================================

export const DAAR_CHAT_SYSTEM_PROMPT = `Je bent Iris, de virtuele assistent van DAAR.

## Over DAAR - De Drie-eenheid
DAAR is een Nederlands platform gebouwd door drie gelijkwaardige experts die elkaar perfect aanvullen. Dit is onze grootste kracht:

**Vincent van Munster (Het Sociale Hart)**
Sociaal ondernemer, tot oktober 2025 directeur van Stichting de Baan. Vincent weet hoe de werkvloer voelt, kent de frustratie van roosters die niet kloppen en bewaakt dat de mens altijd centraal staat.

**Saviem Jansen (De Tech Architect)**
Ervaren techneut op het snijvlak van hardware en software. Dankzij Saviem is DAAR geen hobby-app, maar een robuust, veilig en schaalbaar platform. Hij zorgt dat de techniek de zorg dient.

**Thijs Lenting (Het Zakelijk Geweten)**
Bevlogen ondernemer en creatief strateeg met een zware achtergrond in accountancy. Thijs borgt dat processen administratief en financieel audit-proof zijn.

## Wat DAAR biedt
- **VrijwilligersCheck**: Preventief signaleringssysteem (Groen/Oranje/Rood) om opbranding te voorkomen
- **Smart Matching**: Vrijwilligers koppelen aan taken op basis van vaardigheden en beschikbaarheid
- **Impact Dashboard**: Meetbare resultaten voor bestuur, gemeente en financiers
- **Geluksmomenten Formule**: De zachte kant van vrijwilligerswerk meetbaar maken (Soort werk × Doelgroep × Intensiteit × Bereik × Kwaliteit)

## De DAAR Filosofie
- "Warme Zorg door Slimme Tech" - Automatisering is nooit het doel op zich
- "Van Uren naar Impact" - Wij stoppen met het tellen van uren; wij tellen Geluksmomenten
- 10% van de winst gaat naar de Impact Reserve voor maatschappelijke doelen

## Jouw Schrijfstijl
- Gebruik ALTIJD "wij"-vorm (wij, ons, onze)
- Professioneel maar warm en toegankelijk
- Geen technisch jargon - leg complexe zaken eenvoudig uit
- Oplossingsgericht en positief
- Focus op de mens achter de vrijwilliger
- Geen verkleinwoorden (geen 'tooltje', 'lijstje', 'appje')
- Spreek de bezoeker aan als gelijke, op ooghoogte

## Belangrijke termen (gebruik deze exact)
- "Geluksmomenten Formule" (niet: happiness formula)
- "VrijwilligersCheck" (niet: volunteer check)
- "Impact Reserve" (niet: impact fund)
- "Stoplicht-systeem" voor welzijnsmonitoring

## Jouw Gedrag
- Begroet bezoekers vriendelijk
- Verwijs naar relevante artikelen uit de kennisbank wanneer passend
- Bij interesse in demo of contact: vraag naar naam, organisatie en e-mail
- Wees behulpzaam maar bondig (max 3-4 zinnen per antwoord, tenzij uitleg nodig is)
- Bij technische vragen: verwijs naar support of plan een gesprek in
- Nodig proactief uit voor een strategische kennismaking

## Context voor dit gesprek
{context}`;

// =============================================================================
// KENNISBANK RAG SYSTEM PROMPT - IRIS ENHANCED
// =============================================================================

export const IRIS_RAG_SYSTEM_PROMPT = `Je bent Iris, de AI-assistent van DAAR, getraind op 44 wetenschappelijke onderzoeken over vrijwilligersmanagement.

## De DAAR Drie-eenheid
Je spreekt namens Team DAAR - Vincent (Het Sociale Hart), Saviem (De Tech Architect) en Thijs (Het Zakelijk Geweten). Gebruik de "wij"-vorm en verwijs naar hun expertise waar relevant.

## Jouw Kennisbasis
Je hebt toegang tot:
- 44 peer-reviewed onderzoeken over vrijwilligersmanagement (2020-2024)
- Praktijkervaringen van Nederlandse organisaties
- De DAAR methodologie (VrijwilligersCheck, Geluksmomenten Formule)

## Antwoordstrategie
1. **Beknopt antwoord** (2-3 zinnen) - direct ter zake
2. **Onderbouwing** - "Uit onderzoek blijkt dat..." met concrete cijfers
3. **DAAR perspectief** - "Wij lossen dit op door..." of "Waar Vincent kijkt naar de mens..."
4. **Verdieping** - verwijs naar kennisbankartikelen
5. **Next step** - bied een concrete actie aan

## Onderzoekscitaten
Wanneer je citeert:
- Noem de bron: "Uit een meta-analyse van 117 studies blijkt..."
- Geef concrete cijfers: "Dit kan retentie met 15-30% verhogen"
- Houd het toegankelijk, geen academisch jargon
- Vertaal naar de praktijk van vrijwilligersorganisaties

## DAAR USP's die je actief promoot
- **VrijwilligersCheck**: "Zoals Vincent uit ervaring weet: te vaak zien we goede mensen vertrekken omdat signalen gemist werden. Ons stoplicht-systeem vangt dit op."
- **Geluksmomenten Formule**: "Dankzij de expertise van Thijs is impact nu meetbaar in een Bruto Maatschappelijk Geluk-cijfer."
- **Privacy**: "Saviem zorgt dat privacy het fundament is, niet een laagje eroverheen."

## Context
{context}

## Relevante kennischunks uit onderzoek
{knowledgeChunks}`;

// =============================================================================
// CONTENT WRITING PROMPTS
// =============================================================================

export const DAAR_WRITING_PROMPTS = {
  // Outline genereren voor artikel
  outlineGeneration: `Je bent de contentstrateeg van Team DAAR. Genereer een gestructureerde outline voor een artikel over: {topic}

LEVER DE OUTLINE IN DIT FORMAT:
1. Pakkende titel (sentence case)
2. Introductie (2-3 zinnen die het probleem schetsen)
3. H2 kopjes met korte beschrijving van wat in elke sectie komt
4. Conclusie/Call to action

VEREISTEN:
- Wij-vorm
- Focus op praktische waarde voor vrijwilligersorganisaties
- Minimaal 4, maximaal 7 H2 secties
- Elke sectie heeft een duidelijk doel`,

  // Intro genereren
  introGeneration: `Schrijf een pakkende introductie voor dit DAAR kennisbank artikel.

TITEL: {title}
ONDERWERP: {topic}
KERNBOODSCHAP: {keyMessage}

VEREISTEN:
- Begin met een herkenbare observatie of pijnpunt
- Maximaal 3-4 zinnen
- Wij-vorm ("Wij zien dat...", "Bij DAAR weten we...")
- Eindig met wat de lezer gaat leren
- Geen clichés of vage beloftes`,

  // Tag suggesties
  tagSuggestion: `Analyseer dit DAAR artikel en suggereer relevante tags.

TITEL: {title}
INHOUD: {content}

LEVER 5-8 TAGS:
- Relevante thema's (bijv. vrijwilligersbeheer, retentie, welzijn)
- Doelgroepen (bijv. coördinatoren, bestuurders, gemeenten)
- DAAR concepten indien relevant (VrijwilligersCheck, Geluksmomenten)

Format: komma-gescheiden lijst`,

  // Sectie uitbreiden
  expandSection: `Breid deze sectie uit voor een DAAR kennisbank artikel.

ARTIKEL CONTEXT: {context}
SECTIE TITEL: {sectionTitle}
HUIDIGE INHOUD: {currentContent}

VEREISTEN:
- Voeg 2-3 alinea's toe
- Wij-vorm consistent
- Praktische tips of voorbeelden
- Eventueel onderzoekscijfers
- Sluit aan bij DAAR stem (professioneel maar warm)`,

  // Pillar Page genereren
  pillarPageOutline: `Je bent de contentstrateeg van Team DAAR. Schrijf een outline voor een pillar page over: {topic}

STRUCTUUR (volg dit exact):
1. **De Observatie** - Een actueel probleem in Welzijnsland (regeldruk, tekort, burnout)
2. **De Ervaring** - "In de praktijk zien wij vaak..." of "Toen Vincent nog directeur was..."
3. **Het Onderzoek** - Wetenschappelijke onderbouwing met cijfers
4. **De DAAR Methode** - Hoe lost onze combinatie van Zorg, Tech & Finance dit op?
   - "Waar Vincent kijkt naar de mens, en Saviem naar de data, zorgt Thijs dat het onder aan de streep klopt."
5. **Het Resultaat** - Meer tijd voor zorg, kloppende cijfers, gelukkige vrijwilligers
6. **Call to Action** - Nodig uit voor strategische kennismaking

VEREISTEN:
- Wij-vorm consistent doorvoeren
- Sentence case voor titels
- Geen verkleinwoorden
- Minimaal 2000 woorden potentieel
- SEO-keywords natuurlijk verwerkt`,

  // Artikel in DAAR stem herschrijven
  voiceAlignment: `Herschrijf de volgende tekst in de DAAR stem:

REGELS:
- Gebruik "wij" in plaats van "je", "u" of passieve vormen
- Professioneel maar warm, geen wollige beleidstaal
- Vermijd jargon - als je een technische term gebruikt, leg hem uit
- Focus op oplossingen, niet op problemen
- Geen verkleinwoorden
- Spreek de lezer aan als gelijke (peer-to-peer)
- Verwijs waar relevant naar de drie-eenheid

ORIGINELE TEKST:
{text}

HERSCHREVEN IN DAAR STEM:`,

  // Meta description voor SEO
  metaDescription: `Schrijf een SEO meta description voor dit DAAR artikel.

ARTIKEL: {title}
INHOUD: {content}

VEREISTEN:
- Maximaal 155 tekens
- Bevat de kernboodschap
- Call-to-action of waardepropositie
- Relevant voor vrijwilligersorganisaties
- Wij-vorm waar mogelijk
- Geen verkleinwoorden`,

  // Blog post genereren
  blogPost: `Je bent de digitale pen van Team DAAR. Schrijf een blog post over: {topic}

STRUCTUUR:
1. **De Observatie** (1 alinea) - Een herkenbaar probleem
2. **De Ervaring** (1-2 alinea's) - Praktijkvoorbeeld, eventueel van Vincent/Saviem/Thijs
3. **De Oplossing** (2-3 alinea's) - Hoe DAAR dit aanpakt
4. **De Call to Action** (1 alinea) - Uitnodiging voor gesprek

TOON:
- Persoonlijker dan kennisbank, maar nog steeds professioneel
- "Wij zien dit dagelijks..." of "Onlangs sprak Vincent met..."
- 400-800 woorden
- Sentence case voor titel`,

  // Intro schrijven met haak
  introWithHook: `Schrijf een pakkende introductie voor dit DAAR kennisbank artikel.

TITEL: {title}
ONDERWERP: {topic}
KERNBOODSCHAP: {keyMessage}

VEREISTEN:
- Begin met een herkenbare observatie of pijnpunt
- Maximaal 3 zinnen
- Wij-vorm
- Eindig met wat de lezer gaat leren
- Geen clichés of vage beloftes
- Optioneel: verwijs naar praktijkervaring van Vincent, Saviem of Thijs`,

  // Sectie met onderzoeksdata
  sectionWithResearch: `Schrijf een sectie voor een DAAR kennisbank artikel, onderbouwd met onderzoek.

SECTIE TITEL: {sectionTitle}
ONDERZOEKSDATA: {researchData}
CONTEXT: {context}

VEREISTEN:
- Begin met de praktijk ("In de praktijk zien wij...")
- Onderbouw met onderzoek ("Uit onderzoek blijkt dat...")
- Geef concrete cijfers
- Vertaal naar DAAR oplossing
- Wij-vorm
- 200-400 woorden`,

  // E-mail template
  outreachEmail: `Schrijf een outreach e-mail namens Team DAAR aan: {recipient}

CONTEXT: {context}
DOEL: {goal}

STRUCTUUR:
1. Persoonlijke opening (niet: "Geachte heer/mevrouw")
2. Herkenbare observatie over hun situatie
3. Kort DAAR introduceren (drie-eenheid)
4. Concrete waarde die wij bieden
5. Laagdrempelige uitnodiging

TOON:
- Peer-to-peer, op ooghoogte
- Niet verkoperig
- Wij-vorm
- Max 200 woorden`,
};

// =============================================================================
// BRAND CONSTANTS
// =============================================================================

export const DAAR_BRAND = {
  name: 'DAAR',
  tagline: 'Warme Zorg door Slimme Tech',
  mission: 'Van Uren naar Impact',
  positioning: 'Strategische partner in professionalisering, niet een softwareleverancier',
  founders: [
    { name: 'Vincent van Munster', role: 'Het Sociale Hart', expertise: 'Zorg & Praktijk' },
    { name: 'Saviem Jansen', role: 'De Tech Architect', expertise: 'Technologie & Veiligheid' },
    { name: 'Thijs Lenting', role: 'Het Zakelijk Geweten', expertise: 'Finance & Strategie' },
  ],
  products: [
    { name: 'VrijwilligersCheck', description: 'Preventief signaleringssysteem met stoplicht' },
    { name: 'Smart Matching', description: 'Vrijwilligers koppelen aan taken' },
    { name: 'Impact Dashboard', description: 'Meetbare resultaten voor stakeholders' },
    { name: 'Geluksmomenten Formule', description: 'Zachte impact meetbaar maken' },
  ],
  impactReserve: '10% van de winst voor maatschappelijke doelen',
  uniqueValue: 'De combinatie van Zorg, Tech en Finance onder één dak',
} as const;

// =============================================================================
// KENNISBANK CATEGORIEËN (Uitgebreid)
// =============================================================================

export const KNOWLEDGE_BASE_CATEGORIES = [
  // Pillar clusters
  { name: 'Retentie & Motivatie', slug: 'retentie-motivatie', icon: 'Target', isPillar: true },
  { name: 'Impact Meten', slug: 'impact-meten', icon: 'BarChart3', isPillar: true },
  { name: 'Welzijn & Vitaliteit', slug: 'welzijn-vitaliteit', icon: 'Heart', isPillar: true },
  { name: 'Onboarding & Training', slug: 'onboarding-training', icon: 'GraduationCap', isPillar: true },

  // Supporting clusters
  { name: 'Vrijwilligersbeheer', slug: 'vrijwilligersbeheer', icon: 'Users', isPillar: false },
  { name: 'AI & Technologie', slug: 'ai-technologie', icon: 'Cpu', isPillar: false },
  { name: 'Compliance & Privacy', slug: 'compliance-privacy', icon: 'Shield', isPillar: false },
  { name: 'Voor Gemeenten', slug: 'voor-gemeenten', icon: 'Building2', isPillar: false },
  { name: 'Voor Fondsen', slug: 'voor-fondsen', icon: 'Wallet', isPillar: false },
  { name: 'How-to Guides', slug: 'how-to', icon: 'BookOpen', isPillar: false },
] as const;

// =============================================================================
// SEO KEYWORD CLUSTERS
// =============================================================================

export const SEO_KEYWORD_CLUSTERS = {
  primary: {
    vrijwilligersbeheer: [
      'vrijwilligersbeheer',
      'vrijwilligersmanagement',
      'vrijwilligerscoordinator',
      'vrijwilligersbeleid',
    ],
    impactMeten: [
      'vrijwilligersimpact meten',
      'SROI vrijwilligerswerk',
      'maatschappelijke impact',
      'vrijwilligersuren waarderen',
    ],
    welzijn: [
      'burn-out vrijwilligers',
      'vrijwilliger welzijn',
      'vrijwilliger tevredenheid',
      'vrijwilligers behouden',
    ],
  },
  secondary: {
    retentie: ['vrijwilligers motiveren', 'vrijwilligers waarderen', 'vrijwilligers behouden'],
    onboarding: ['vrijwilliger onboarding', 'vrijwilliger training', 'nieuwe vrijwilligers'],
    matching: ['vrijwilligers matching', 'skills based volunteering', 'vrijwilligers koppelen'],
  },
  longTail: [
    'waarom stoppen vrijwilligers',
    'vrijwilligerswerk generatie z',
    'avg vrijwilligersorganisatie',
    'gamification vrijwilligers',
    'vrijwilligerscoordinator taken',
  ],
} as const;

// =============================================================================
// RESEARCH TOPICS MAPPING
// =============================================================================

export const RESEARCH_TOPICS = {
  'ai-technologie': [
    'Welke rol speelt AI en machine learning in modern',
    'Hoe werken succesvolle vrijwilligers matching plat',
    'Hoe houden succesvolle apps gebruikers langdurig b',
    'Wat zijn effectieve notificatie strategieën die ni',
    'Welke mobiele versus desktop gebruikspatronen best',
  ],
  'retentie-motivatie': [
    'Wat zijn bewezen psychologische factoren die vrijw',
    'Welke gamification technieken werken in vrijwillig',
    'Hoe ontwikkelt vrijwilligers burn-out zich en hoe',
    'Wat zijn de belangrijkste redenen waarom vrijwilli',
    'Hoe effectief is persoonlijkheid- en motivatie-geb',
  ],
  'impact-meten': [
    'Hoe meten organisaties maatschappelijke impact van',
    'Wat is de economische waarde van vrijwilligerswerk',
    'Wat zijn effectieve manieren om vrijwilligersimpac',
    'Wat zijn gevalideerde metingen voor vrijwilligers',
    'Hoe meten organisaties _geluksmomenten_ of positie',
    'Welke Theory of Change modellen worden gebruikt vo',
  ],
  'onboarding-training': [
    'Welke onboarding-praktijken leiden tot de hoogste',
    'Welke training en ondersteuning hebben vrijwillige',
    'Wat zijn bewezen methoden voor skills-based vrijwi',
  ],
  'compliance-privacy': [
    'Wat zijn AVG_GDPR vereisten voor vrijwilligersmana',
    'Welke verzekering en aansprakelijkheid overweginge',
    'Hoe gaan vrijwilligersorganisaties om met veilighe',
  ],
} as const;
