import { PrismaClient } from '@prisma/client'
import {
  ARTICLE_IMPACT_METEN,
  ARTICLE_AI_VRIJWILLIGERSBEHEER,
  ARTICLE_VRIJWILLIGERS_WERVEN,
  ARTICLE_VRIJWILLIGERSWELZIJN,
  ARTICLE_ROI_VRIJWILLIGERSWERK,
  ARTICLE_ONBOARDING,
} from './articles-content'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // ===========================================
  // TEAM MEMBERS (CRM)
  // ===========================================
  const teamMembers = [
    {
      name: 'Vincent',
      email: 'vincent@daar.nl',
      role: 'Co-founder & Sales',
      color: '#3BA273',
    },
    {
      name: 'Saveim',
      email: 'saveim@daar.nl',
      role: 'Co-founder & Operations',
      color: '#C8A860',
    },
    {
      name: 'Thijs',
      email: 'thijs@daar.nl',
      role: 'Co-founder & Tech',
      color: '#6CB4C8',
    },
  ]

  for (const member of teamMembers) {
    await prisma.teamMember.upsert({
      where: { email: member.email },
      update: member,
      create: member,
    })
  }

  console.log('Created team members:', teamMembers.length)

  // ===========================================
  // AUTEURS
  // ===========================================
  const teamDaar = await prisma.author.upsert({
    where: { email: 'team@daar.nl' },
    update: {},
    create: {
      name: 'Team DAAR',
      email: 'team@daar.nl',
      bio: 'Wij zijn Vincent, Saviem en Thijs - drie ondernemers die geloven dat vrijwilligers het fundament vormen van een sterke samenleving. Met DAAR combineren we sociale passie, technologische innovatie en zakelijke scherpte.',
      role: 'Founders',
    },
  })

  console.log('Created author:', teamDaar.name)

  // ===========================================
  // CATEGORIEËN
  // ===========================================
  const categories = [
    {
      name: 'Vrijwilligersretentie',
      slug: 'vrijwilligersretentie',
      description: 'Strategieën en inzichten om vrijwilligers betrokken en gemotiveerd te houden',
      icon: 'Heart',
      color: '#00A878',
      sortOrder: 1,
    },
    {
      name: 'Werving & Onboarding',
      slug: 'werving-onboarding',
      description: 'Effectief nieuwe vrijwilligers aantrekken en inwerken',
      icon: 'UserPlus',
      color: '#1E3A5F',
      sortOrder: 2,
    },
    {
      name: 'Impact Meten',
      slug: 'impact-meten',
      description: 'De Geluksmomenten Formule en andere meetmethoden voor sociale impact',
      icon: 'BarChart3',
      color: '#FF6B35',
      sortOrder: 3,
    },
    {
      name: 'Technologie & AI',
      slug: 'technologie-ai',
      description: 'Slimme tools en AI-toepassingen voor vrijwilligersbeheer',
      icon: 'Cpu',
      color: '#7C3AED',
      sortOrder: 4,
    },
    {
      name: 'Organisatie & Management',
      slug: 'organisatie-management',
      description: 'Best practices voor het aansturen van vrijwilligersorganisaties',
      icon: 'Building2',
      color: '#2563EB',
      sortOrder: 5,
    },
    {
      name: 'Welzijn & Waardering',
      slug: 'welzijn-waardering',
      description: 'Het welzijn van vrijwilligers centraal stellen',
      icon: 'Sparkles',
      color: '#EC4899',
      sortOrder: 6,
    },
  ]

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: cat,
      create: cat,
    })
  }

  console.log('Created categories:', categories.length)

  // ===========================================
  // TAGS
  // ===========================================
  const tags = [
    'vrijwilligerswerk',
    'retentie',
    'motivatie',
    'onboarding',
    'impact',
    'meetmethoden',
    'AI',
    'automatisering',
    'waardering',
    'communicatie',
    'planning',
    'ROI',
    'zelfredzaamheid',
    'subsidie',
    'non-profit',
  ]

  for (const tagName of tags) {
    await prisma.tag.upsert({
      where: { slug: tagName.toLowerCase().replace(/\s+/g, '-') },
      update: {},
      create: {
        name: tagName,
        slug: tagName.toLowerCase().replace(/\s+/g, '-'),
      },
    })
  }

  console.log('Created tags:', tags.length)

  // ===========================================
  // PILLAR PAGE: VRIJWILLIGERSRETENTIE
  // ===========================================
  const retentieCategory = await prisma.category.findUnique({
    where: { slug: 'vrijwilligersretentie' },
  })

  const pillarPageContent = `
<article class="prose prose-lg max-w-none">

<p class="lead text-xl text-gray-600 mb-8">
Waarom vertrekken vrijwilligers terwijl ze eerst zo enthousiast waren? Na jarenlang onderzoek en gesprekken met honderden organisaties ontdekten wij een patroon. In deze complete gids delen wij alles wat we weten over vrijwilligersretentie - onderbouwd door wetenschappelijk onderzoek en getest in de praktijk.
</p>

<div class="bg-lightGreen p-6 rounded-xl mb-8">
<p class="font-semibold text-navy mb-2">Wat je leert in dit artikel:</p>
<ul class="list-disc list-inside text-gray-700">
<li>De 7 wetenschappelijk bewezen redenen waarom vrijwilligers stoppen</li>
<li>Het verschil tussen 'goede' en 'slechte' uitstroom</li>
<li>Praktische retentiestrategieën die direct toepasbaar zijn</li>
<li>Hoe de VrijwilligersCheck je organisatie kan doorlichten</li>
</ul>
</div>

<h2 id="het-retentieprobleem">Het Retentieprobleem in Cijfers</h2>

<p>
Laten we eerlijk zijn: vrijwilligersretentie is een van de grootste uitdagingen voor sociale organisaties. Onderzoek toont aan dat <strong>gemiddeld 30-40% van nieuwe vrijwilligers binnen het eerste jaar vertrekt</strong>. Dat betekent dat voor elke 10 vrijwilligers die je werft, er 3 tot 4 al weg zijn voordat ze echt waarde kunnen toevoegen.
</p>

<p>
De kosten? Die zijn hoger dan je denkt:
</p>

<ul>
<li><strong>Wervingskosten:</strong> Gemiddeld €150-300 per nieuwe vrijwilliger</li>
<li><strong>Inwerkkosten:</strong> 10-20 uur begeleiding per persoon</li>
<li><strong>Productiviteitsverlies:</strong> 6-12 maanden voordat een vrijwilliger volledig productief is</li>
<li><strong>Kennisveriles:</strong> Onschatbaar - ervaring loopt letterlijk de deur uit</li>
</ul>

<h2 id="waarom-vrijwilligers-stoppen">De 7 Redenen Waarom Vrijwilligers Stoppen</h2>

<p>
Op basis van ons onderzoek onder 2.500 vrijwilligers identificeerden wij zeven hoofdredenen voor vertrek. Het goede nieuws? De meeste zijn te voorkomen.
</p>

<h3>1. Onduidelijke verwachtingen (38%)</h3>

<p>
De nummer één reden voor vertrek is verrassend simpel: vrijwilligers weten niet precies wat er van hen verwacht wordt. Ze komen enthousiast binnen, maar raken gefrustreerd door vaagheid over taken, tijdsinvestering en verantwoordelijkheden.
</p>

<div class="bg-gray-50 border-l-4 border-brandGreen p-4 my-6">
<p class="font-medium text-navy">"Ik wilde graag helpen, maar na drie maanden wist ik nog steeds niet precies wat mijn rol was. Elke week was het iets anders."</p>
<p class="text-sm text-gray-500 mt-2">- Voormalig vrijwilliger bij een welzijnsorganisatie</p>
</div>

<p><strong>Wat werkt:</strong> Maak voor elke functie een duidelijk profiel met concrete taken, verwachte tijdsinvestering en meetbare doelen. Communiceer dit al tijdens de werving.</p>

<h3>2. Gebrek aan waardering (31%)</h3>

<p>
Vrijwilligers zoeken geen salaris, maar erkenning. Wanneer hun inzet onopgemerkt blijft, daalt de motivatie snel. Dit gaat verder dan een jaarlijks bedankje - het draait om dagelijkse waardering.
</p>

<p><strong>Wat werkt:</strong> Implementeer een structureel waarderingssysteem. Denk aan persoonlijke bedankjes, publieke erkenning, kleine attenties en vooral: oprechte interesse in de mens achter de vrijwilliger.</p>

<h3>3. Geen ontwikkelmogelijkheden (27%)</h3>

<p>
Veel vrijwilligers willen groeien - nieuwe vaardigheden leren, meer verantwoordelijkheid krijgen of doorgroeien naar andere rollen. Wanneer dit niet mogelijk is, zoeken ze uitdaging elders.
</p>

<p><strong>Wat werkt:</strong> Creëer groeipaden binnen je organisatie. Bied trainingen aan, mentor-programma's en mogelijkheden om door te groeien naar coördinerende functies.</p>

<h3>4. Slechte communicatie (24%)</h3>

<p>
"Ik hoorde nooit wat er speelde" of "Beslissingen werden genomen zonder ons te vragen" - dit horen we vaak. Vrijwilligers willen betrokken worden, niet alleen als uitvoerders gezien worden.
</p>

<p><strong>Wat werkt:</strong> Structurele communicatie via vaste kanalen. Wekelijkse updates, maandelijkse overleggen en vooral: vraag regelmatig om input.</p>

<h3>5. Geen sociale connectie (21%)</h3>

<p>
Vrijwilligerswerk is vaak een sociale activiteit. Wanneer vrijwilligers geen band opbouwen met collega-vrijwilligers of het team, missen ze de sociale component die hen gemotiveerd houdt.
</p>

<p><strong>Wat werkt:</strong> Investeer in teambuilding. Organiseer sociale activiteiten, koppel nieuwe vrijwilligers aan buddies en creëer mogelijkheden voor informeel contact.</p>

<h3>6. Mismatch met taken (18%)</h3>

<p>
Soms passen vrijwilligers simpelweg niet bij de taken die ze krijgen. Hun talenten worden niet benut, of de werkzaamheden sluiten niet aan bij hun interesses.
</p>

<p><strong>Wat werkt:</strong> Voer intake-gesprekken waarin je talenten, interesses en beschikbaarheid grondig in kaart brengt. Match vervolgens bewust op basis van deze informatie.</p>

<h3>7. Overbelasting (15%)</h3>

<p>
Het klinkt paradoxaal bij onbetaald werk, maar burn-out onder vrijwilligers is een reëel probleem. Enthousiaste vrijwilligers nemen vaak te veel hooi op hun vork.
</p>

<p><strong>Wat werkt:</strong> Monitor de werkdruk actief. Stel grenzen aan het aantal taken of uren en spreek vrijwilligers aan wanneer je overbelasting signaleert.</p>

<h2 id="goede-vs-slechte-uitstroom">Goede vs. Slechte Uitstroom</h2>

<p>
Een nuance die vaak vergeten wordt: niet alle uitstroom is slecht. Wij maken onderscheid tussen:
</p>

<div class="grid md:grid-cols-2 gap-6 my-8">
<div class="bg-green-50 p-6 rounded-xl">
<h4 class="font-semibold text-green-800 mb-3">Gezonde uitstroom</h4>
<ul class="text-green-700 space-y-2">
<li>Vrijwilliger heeft persoonlijke groei doorgemaakt</li>
<li>Levensomstandigheden veranderen (verhuizing, baan)</li>
<li>Doelen zijn behaald</li>
<li>Natuurlijk einde van een project</li>
</ul>
</div>
<div class="bg-red-50 p-6 rounded-xl">
<h4 class="font-semibold text-red-800 mb-3">Ongezonde uitstroom</h4>
<ul class="text-red-700 space-y-2">
<li>Frustratie over organisatie</li>
<li>Gebrek aan waardering</li>
<li>Conflicten met team</li>
<li>Burn-out</li>
</ul>
</div>
</div>

<p>
Focus je retentie-inspanningen op het voorkomen van ongezonde uitstroom. Gezonde uitstroom is een natuurlijk onderdeel van een levende organisatie.
</p>

<h2 id="retentiestrategie">De DAAR Retentiestrategie</h2>

<p>
Op basis van jarenlang onderzoek en praktijkervaring ontwikkelden wij een retentiestrategie gebaseerd op vier pijlers:
</p>

<h3>1. Verwachtingsmanagement</h3>

<p>Begin bij de werving. Communiceer helder wat vrijwilligers kunnen verwachten:</p>

<ul>
<li>Concrete taken en verantwoordelijkheden</li>
<li>Verwachte tijdsinvestering (minimum en maximum)</li>
<li>Wat de organisatie biedt (training, begeleiding, materialen)</li>
<li>Groeimogelijkheden en doorstroomopties</li>
</ul>

<h3>2. Structurele waardering</h3>

<p>Waardering moet ingebed zijn in je organisatiecultuur, niet een jaarlijks evenement:</p>

<ul>
<li><strong>Dagelijks:</strong> Persoonlijke bedankjes, interesse tonen</li>
<li><strong>Wekelijks:</strong> Successen delen in teamcommunicatie</li>
<li><strong>Maandelijks:</strong> Vrijwilliger in het zonnetje zetten</li>
<li><strong>Jaarlijks:</strong> Formele erkenning, mijlpalen vieren</li>
</ul>

<h3>3. Ontwikkelingsmogelijkheden</h3>

<p>Creëer groeipaden die aansluiten bij verschillende ambities:</p>

<ul>
<li>Vaardigheidstrainingen</li>
<li>Mentor-programma's</li>
<li>Horizontale doorstroom (andere taken)</li>
<li>Verticale doorstroom (coördinerende rollen)</li>
</ul>

<h3>4. Continue feedback</h3>

<p>Meet regelmatig hoe het met je vrijwilligers gaat:</p>

<ul>
<li>Tevredenheidsenquêtes (kwartaal)</li>
<li>Exit-interviews bij vertrek</li>
<li>Informele check-ins</li>
<li>Suggestiemogelijkheden</li>
</ul>

<h2 id="vrijwilligerscheck">De VrijwilligersCheck: Meet Je Retentiepotentieel</h2>

<p>
Hoe weet je waar je organisatie staat? Daarom ontwikkelden wij de VrijwilligersCheck - een gratis scan die binnen 10 minuten inzicht geeft in de sterke en zwakke punten van jouw vrijwilligersbeleid.
</p>

<div class="bg-brandGreen/10 border border-brandGreen/20 p-6 rounded-xl my-8">
<h4 class="font-semibold text-navy mb-3">De VrijwilligersCheck meet 6 dimensies:</h4>
<ol class="list-decimal list-inside space-y-2 text-gray-700">
<li><strong>Beheer & Administratie</strong> - Hoe goed registreer en manage je vrijwilligers?</li>
<li><strong>Communicatie</strong> - Is je communicatie effectief en consistent?</li>
<li><strong>Waardering & Erkenning</strong> - Voelen vrijwilligers zich gewaardeerd?</li>
<li><strong>Planning & Roostering</strong> - Hoe soepel verloopt de coördinatie?</li>
<li><strong>Werving & Onboarding</strong> - Trek je de juiste mensen aan?</li>
<li><strong>Impact & Rapportage</strong> - Meet en toon je de waarde van vrijwilligers?</li>
</ol>
</div>

<p>
Na de check ontvang je een gepersonaliseerd rapport met concrete verbeterpunten en een vergelijking met vergelijkbare organisaties.
</p>

<h2 id="de-geluksmomenten-formule">Impact Meten: De Geluksmomenten Formule</h2>

<p>
Retentie hangt nauw samen met impact. Vrijwilligers die zien dat hun inzet ertoe doet, blijven langer betrokken. Maar hoe meet je impact van vrijwilligerswerk?
</p>

<p>
Wij ontwikkelden de <strong>Geluksmomenten Formule</strong>:
</p>

<div class="bg-navy text-white p-6 rounded-xl my-8 text-center">
<p class="text-lg mb-4">Impact = Soort werk × Doelgroep × Intensiteit × Bereik × Kwaliteit</p>
<p class="text-white/70 text-sm">Een framework om de maatschappelijke waarde van vrijwilligerswerk te kwantificeren</p>
</div>

<p>
Door impact meetbaar te maken, kun je vrijwilligers tonen wat hun inzet concreet oplevert. Dit verhoogt de motivatie en daarmee de retentie.
</p>

<h2 id="aan-de-slag">Direct Aan de Slag</h2>

<p>
Retentie verbeteren begint vandaag. Hier zijn drie acties die je direct kunt ondernemen:
</p>

<div class="space-y-4 my-8">
<div class="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
<span class="flex-shrink-0 w-8 h-8 bg-brandGreen text-white rounded-full flex items-center justify-center font-bold">1</span>
<div>
<h4 class="font-semibold text-navy">Neem de VrijwilligersCheck</h4>
<p class="text-gray-600">Krijg binnen 10 minuten inzicht in je huidige situatie en concrete verbeterpunten.</p>
</div>
</div>
<div class="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
<span class="flex-shrink-0 w-8 h-8 bg-brandGreen text-white rounded-full flex items-center justify-center font-bold">2</span>
<div>
<h4 class="font-semibold text-navy">Voer exit-interviews in</h4>
<p class="text-gray-600">Vraag vertrekkende vrijwilligers naar hun redenen. Je leert meer van vertrek dan van blijven.</p>
</div>
</div>
<div class="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
<span class="flex-shrink-0 w-8 h-8 bg-brandGreen text-white rounded-full flex items-center justify-center font-bold">3</span>
<div>
<h4 class="font-semibold text-navy">Plan een kennismakingsgesprek</h4>
<p class="text-gray-600">Wij denken graag met je mee over een retentiestrategie op maat voor jouw organisatie.</p>
</div>
</div>
</div>

<h2 id="veelgestelde-vragen">Veelgestelde Vragen</h2>

<div class="space-y-6 my-8">
<details class="group">
<summary class="font-semibold text-navy cursor-pointer">Wat is een 'normale' retentiegraad voor vrijwilligers?</summary>
<p class="mt-2 text-gray-600">Dit varieert sterk per sector en type werk. Gemiddeld blijft 60-70% van vrijwilligers langer dan een jaar actief. Voor intensief vrijwilligerswerk (zoals mantelzorg) ligt dit lager, voor evenementenvrijwilligers juist hoger.</p>
</details>
<details class="group">
<summary class="font-semibold text-navy cursor-pointer">Hoeveel tijd kost het opzetten van een retentiestrategie?</summary>
<p class="mt-2 text-gray-600">Een basisstrategie kun je binnen een maand implementeren. Voor een volledige cultuurverandering moet je rekenen op 6-12 maanden. Begin klein met quick wins en bouw van daaruit verder.</p>
</details>
<details class="group">
<summary class="font-semibold text-navy cursor-pointer">Werkt waardering ook voor vrijwilligers die alleen voor de ervaring komen?</summary>
<p class="mt-2 text-gray-600">Absoluut. Onderzoek toont aan dat ook 'transactionele' vrijwilligers (die komen voor CV-opbouw of werkervaring) langer blijven wanneer ze zich gewaardeerd voelen. Erkenning werkt universeel.</p>
</details>
</div>

<h2 id="conclusie">Conclusie</h2>

<p>
Vrijwilligersretentie is geen toevalstreffer - het is het resultaat van bewust beleid. Door te investeren in duidelijke verwachtingen, structurele waardering, ontwikkelmogelijkheden en continue feedback, bouw je aan een organisatie waar vrijwilligers willen blijven.
</p>

<p>
Begin vandaag. Neem de VrijwilligersCheck, implementeer een waarderingsstructuur, of plan een gesprek met ons. Elke stap richting betere retentie is een stap richting meer impact.
</p>

<p class="text-gray-500 text-sm mt-8">
Dit artikel is geschreven door Team DAAR - Vincent, Saviem en Thijs. Wij geloven dat vrijwilligers het fundament vormen van een sterke samenleving en zetten ons dagelijks in om hun werk makkelijker en impactvoller te maken.
</p>

</article>
`

  const pillarPagePlain = `
Waarom vertrekken vrijwilligers terwijl ze eerst zo enthousiast waren? Na jarenlang onderzoek en gesprekken met honderden organisaties ontdekten wij een patroon. In deze complete gids delen wij alles wat we weten over vrijwilligersretentie - onderbouwd door wetenschappelijk onderzoek en getest in de praktijk.

Het Retentieprobleem in Cijfers

Laten we eerlijk zijn: vrijwilligersretentie is een van de grootste uitdagingen voor sociale organisaties. Onderzoek toont aan dat gemiddeld 30-40% van nieuwe vrijwilligers binnen het eerste jaar vertrekt. Dat betekent dat voor elke 10 vrijwilligers die je werft, er 3 tot 4 al weg zijn voordat ze echt waarde kunnen toevoegen.

De kosten? Die zijn hoger dan je denkt:
- Wervingskosten: Gemiddeld 150-300 euro per nieuwe vrijwilliger
- Inwerkkosten: 10-20 uur begeleiding per persoon
- Productiviteitsverlies: 6-12 maanden voordat een vrijwilliger volledig productief is
- Kennisveriles: Onschatbaar - ervaring loopt letterlijk de deur uit

De 7 Redenen Waarom Vrijwilligers Stoppen

Op basis van ons onderzoek onder 2.500 vrijwilligers identificeerden wij zeven hoofdredenen voor vertrek.

1. Onduidelijke verwachtingen (38%)
De nummer één reden voor vertrek is verrassend simpel: vrijwilligers weten niet precies wat er van hen verwacht wordt.

2. Gebrek aan waardering (31%)
Vrijwilligers zoeken geen salaris, maar erkenning. Wanneer hun inzet onopgemerkt blijft, daalt de motivatie snel.

3. Geen ontwikkelmogelijkheden (27%)
Veel vrijwilligers willen groeien - nieuwe vaardigheden leren, meer verantwoordelijkheid krijgen of doorgroeien naar andere rollen.

4. Slechte communicatie (24%)
Vrijwilligers willen betrokken worden, niet alleen als uitvoerders gezien worden.

5. Geen sociale connectie (21%)
Vrijwilligerswerk is vaak een sociale activiteit. Wanneer vrijwilligers geen band opbouwen met collega-vrijwilligers of het team, missen ze de sociale component.

6. Mismatch met taken (18%)
Soms passen vrijwilligers simpelweg niet bij de taken die ze krijgen.

7. Overbelasting (15%)
Burn-out onder vrijwilligers is een reëel probleem. Enthousiaste vrijwilligers nemen vaak te veel hooi op hun vork.

De DAAR Retentiestrategie

Op basis van jarenlang onderzoek en praktijkervaring ontwikkelden wij een retentiestrategie gebaseerd op vier pijlers:
1. Verwachtingsmanagement
2. Structurele waardering
3. Ontwikkelingsmogelijkheden
4. Continue feedback

De VrijwilligersCheck: Meet Je Retentiepotentieel

Hoe weet je waar je organisatie staat? Daarom ontwikkelden wij de VrijwilligersCheck - een gratis scan die binnen 10 minuten inzicht geeft in de sterke en zwakke punten van jouw vrijwilligersbeleid.

Impact Meten: De Geluksmomenten Formule

Retentie hangt nauw samen met impact. Vrijwilligers die zien dat hun inzet ertoe doet, blijven langer betrokken. Wij ontwikkelden de Geluksmomenten Formule: Impact = Soort werk × Doelgroep × Intensiteit × Bereik × Kwaliteit

Conclusie

Vrijwilligersretentie is geen toevalstreffer - het is het resultaat van bewust beleid. Door te investeren in duidelijke verwachtingen, structurele waardering, ontwikkelmogelijkheden en continue feedback, bouw je aan een organisatie waar vrijwilligers willen blijven.

Dit artikel is geschreven door Team DAAR - Vincent, Saviem en Thijs.
`

  const pillarPage = await prisma.article.upsert({
    where: { slug: 'complete-gids-vrijwilligersretentie' },
    update: {},
    create: {
      title: 'De Complete Gids voor Vrijwilligersretentie in 2025',
      slug: 'complete-gids-vrijwilligersretentie',
      content: pillarPageContent,
      contentPlain: pillarPagePlain.trim(),
      excerpt:
        'Waarom vertrekken vrijwilligers? Ontdek de 7 wetenschappelijk bewezen redenen en leer effectieve retentiestrategieën die direct toepasbaar zijn in jouw organisatie.',
      metaTitle: 'Vrijwilligersretentie: De Complete Gids [2025] | DAAR',
      metaDescription:
        'Leer waarom vrijwilligers stoppen en hoe je ze behoudt. Praktische strategieën onderbouwd door onderzoek onder 2.500 vrijwilligers.',
      featuredImage: '/images/kennisbank/vrijwilligersretentie-gids.jpg',
      featuredImageAlt: 'Groep vrijwilligers die samenwerken',
      status: 'PUBLISHED',
      publishedAt: new Date(),
      authorId: teamDaar.id,
      categoryId: retentieCategory?.id,
      readingTime: 12,
      viewCount: 0,
    },
  })

  console.log('Created pillar page:', pillarPage.title)

  // Link tags to article
  const relevantTags = ['vrijwilligerswerk', 'retentie', 'motivatie', 'waardering']
  for (const tagName of relevantTags) {
    const tag = await prisma.tag.findUnique({
      where: { slug: tagName.toLowerCase().replace(/\s+/g, '-') },
    })
    if (tag) {
      await prisma.tagsOnArticles.upsert({
        where: {
          articleId_tagId: {
            articleId: pillarPage.id,
            tagId: tag.id,
          },
        },
        update: {},
        create: {
          articleId: pillarPage.id,
          tagId: tag.id,
        },
      })
    }
  }

  console.log('Linked tags to pillar page')

  // ===========================================
  // ADDITIONAL PILLAR PAGES
  // ===========================================

  // Helper function to create articles
  async function createArticle(articleData: {
    title: string
    slug: string
    content: string
    excerpt: string
    metaTitle: string
    metaDescription: string
    readingTime: number
    categorySlug: string
    tags: string[]
  }) {
    const category = await prisma.category.findUnique({
      where: { slug: articleData.categorySlug },
    })

    // Strip HTML for plain content
    const plainContent = articleData.content
      .replace(/<[^>]*>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()

    const article = await prisma.article.upsert({
      where: { slug: articleData.slug },
      update: {},
      create: {
        title: articleData.title,
        slug: articleData.slug,
        content: articleData.content,
        contentPlain: plainContent,
        excerpt: articleData.excerpt,
        metaTitle: articleData.metaTitle,
        metaDescription: articleData.metaDescription,
        status: 'PUBLISHED',
        publishedAt: new Date(),
        authorId: teamDaar.id,
        categoryId: category?.id,
        readingTime: articleData.readingTime,
        viewCount: 0,
      },
    })

    // Link tags
    for (const tagName of articleData.tags) {
      const tag = await prisma.tag.findUnique({
        where: { slug: tagName.toLowerCase().replace(/\s+/g, '-') },
      })
      if (tag) {
        await prisma.tagsOnArticles.upsert({
          where: {
            articleId_tagId: {
              articleId: article.id,
              tagId: tag.id,
            },
          },
          update: {},
          create: {
            articleId: article.id,
            tagId: tag.id,
          },
        })
      }
    }

    return article
  }

  // Create all additional pillar pages
  const additionalArticles = [
    ARTICLE_IMPACT_METEN,
    ARTICLE_AI_VRIJWILLIGERSBEHEER,
    ARTICLE_VRIJWILLIGERS_WERVEN,
    ARTICLE_VRIJWILLIGERSWELZIJN,
    ARTICLE_ROI_VRIJWILLIGERSWERK,
    ARTICLE_ONBOARDING,
  ]

  for (const articleData of additionalArticles) {
    const article = await createArticle(articleData)
    console.log('Created article:', article.title)
  }

  console.log(`Created ${additionalArticles.length} additional pillar pages`)

  // ===========================================
  // BOOKING TYPES
  // ===========================================
  const bookingTypes = [
    {
      slug: 'kennismaking',
      name: 'Kennismakingsgesprek',
      description:
        'Een vrijblijvend gesprek om kennis te maken en te ontdekken hoe DAAR jouw organisatie kan helpen.',
      duration: 30,
      price: 'Gratis',
      color: '#00A878',
      isActive: true,
    },
    {
      slug: 'demo',
      name: 'Productdemonstratie',
      description:
        'Een uitgebreide demo van onze producten en hoe deze passen bij jouw vrijwilligersorganisatie.',
      duration: 45,
      price: 'Gratis',
      color: '#1E3A5F',
      isActive: true,
    },
    {
      slug: 'adviesgesprek',
      name: 'Adviesgesprek',
      description:
        'Een diepgaand gesprek over jouw uitdagingen op het gebied van vrijwilligersbeheer.',
      duration: 60,
      price: 'Gratis',
      color: '#7C3AED',
      isActive: true,
    },
  ]

  for (const bt of bookingTypes) {
    await prisma.bookingType.upsert({
      where: { slug: bt.slug },
      update: bt,
      create: bt,
    })
  }

  console.log('Created booking types:', bookingTypes.length)

  // ===========================================
  // BUSINESS HOURS
  // ===========================================
  const businessHours = [
    { dayOfWeek: 1, startTime: '09:00', endTime: '17:00', isActive: true }, // Maandag
    { dayOfWeek: 2, startTime: '09:00', endTime: '17:00', isActive: true }, // Dinsdag
    { dayOfWeek: 3, startTime: '09:00', endTime: '17:00', isActive: true }, // Woensdag
    { dayOfWeek: 4, startTime: '09:00', endTime: '17:00', isActive: true }, // Donderdag
    { dayOfWeek: 5, startTime: '09:00', endTime: '17:00', isActive: true }, // Vrijdag
    { dayOfWeek: 6, startTime: '00:00', endTime: '00:00', isActive: false }, // Zaterdag
    { dayOfWeek: 0, startTime: '00:00', endTime: '00:00', isActive: false }, // Zondag
  ]

  for (const bh of businessHours) {
    await prisma.businessHours.upsert({
      where: { dayOfWeek: bh.dayOfWeek },
      update: bh,
      create: bh,
    })
  }

  console.log('Created business hours')

  console.log('\n✅ Database seeding completed!')
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
