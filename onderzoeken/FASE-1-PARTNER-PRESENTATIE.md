# DAAR Kennisbank & AI Iris - Fase 1 Demo

**Voor: Saviem & Thijs**
**Van: Vincent**
**Datum: Januari 2025**

---

## Executive Summary

We hebben de basis gelegd voor een **data-gedreven content strategie** die:
1. Onze 44 onderzoeksdocumenten omzet naar SEO-geoptimaliseerde content
2. AI Iris transformeert van een chatbot naar een kennisexpert
3. Ons positioneert als thought leader in de vrijwilligerssector

---

## Wat is er gebouwd in Fase 1?

### 1. Brand Voice Systeem (prompts.ts)

Een volledig geïntegreerd prompt systeem met:

```
DAAR_FOUNDERS          → Onze drie-eenheid identiteit
DAAR_CONCEPTS          → USPs (Geluksmomenten Formule, VrijwilligersCheck, etc.)
DAAR_VOICE_RULES       → Schrijfregels (wij-vorm, geen verkleinwoorden)
DAAR_CHAT_SYSTEM_PROMPT → Iris' persoonlijkheid
IRIS_RAG_SYSTEM_PROMPT  → Nieuwe RAG-enabled prompt
DAAR_WRITING_PROMPTS    → Templates voor pillar pages, blogs, emails
SEO_KEYWORD_CLUSTERS    → Primary, secondary, long-tail keywords
RESEARCH_TOPICS         → Mapping naar onze 44 PDFs
```

**Voorbeeld Iris introductie:**
> "Hoi! Ik ben Iris, de AI-assistent van Team DAAR. Achter mij staan Vincent (het sociale hart), Saviem (de tech architect) en Thijs (het zakelijk geweten) - drie ondernemers die geloven dat vrijwilligers het fundament vormen van een sterke samenleving."

### 2. Database Uitbreidingen (Prisma Schema)

Nieuwe models voor het RAG-systeem:

| Model | Doel |
|-------|------|
| `ResearchSource` | Tracking van 44 PDF onderzoeksdocumenten |
| `KnowledgeChunk` | Tekstfragmenten met vector embeddings |
| `ArticleResearchSource` | Koppeling artikelen ↔ onderzoek |

**Categoriën:**
- RETENTIE, WERVING, IMPACT, TECHNOLOGIE, MANAGEMENT, WELZIJN, COMPLIANCE

### 3. Eerste Pillar Page: "De Complete Gids voor Vrijwilligersretentie"

Een **2.000+ woorden** cornerstone artikel met:

- 7 wetenschappelijk onderbouwde redenen waarom vrijwilligers stoppen
- DAAR Retentiestrategie (4 pijlers)
- Integratie van VrijwilligersCheck
- Geluksmomenten Formule uitleg
- SEO geoptimaliseerd (target: "vrijwilligersretentie")
- Interne links naar producten
- Call-to-actions naar kennismakingsgesprek

**Meta:**
- Title: "Vrijwilligersretentie: De Complete Gids [2025] | DAAR"
- Description: "Leer waarom vrijwilligers stoppen en hoe je ze behoudt. Praktische strategieën onderbouwd door onderzoek onder 2.500 vrijwilligers."

### 4. Seed Data

Kant-en-klare database seed met:
- Team DAAR als auteur
- 6 categorieën voor kennisbank
- 15 relevante tags
- 3 booking types (kennismaking, demo, adviesgesprek)
- Openingstijden

---

## Content Strategie Overzicht

### Pillar-Cluster Model

```
                    ┌─────────────────────────────────┐
                    │   PILLAR PAGE                   │
                    │   "Vrijwilligersretentie Gids"  │
                    │   (2000+ woorden, cornerstone)  │
                    └───────────────┬─────────────────┘
                                    │
          ┌─────────────────────────┼─────────────────────────┐
          │                         │                         │
    ┌─────▼─────┐            ┌─────▼─────┐            ┌─────▼─────┐
    │ Supporting │            │ Supporting │            │ Supporting │
    │ Article 1  │            │ Article 2  │            │ Article 3  │
    │ (Waardering)│            │ (Exit-intv)│            │ (Onboarding)│
    └────────────┘            └────────────┘            └────────────┘
```

### Geplande Pillar Pages (8 stuks)

| # | Pillar Page | Primary Keyword | Onderzoeken |
|---|-------------|-----------------|-------------|
| 1 | ✅ Vrijwilligersretentie | vrijwilligersretentie | 8 PDFs |
| 2 | Impact Meten | impact vrijwilligerswerk | 6 PDFs |
| 3 | AI in Vrijwilligersbeheer | AI vrijwilligersmanagement | 5 PDFs |
| 4 | Werving Strategieën | vrijwilligers werven | 4 PDFs |
| 5 | Vrijwilligerswelzijn | welzijn vrijwilligers | 5 PDFs |
| 6 | Gamification | gamification vrijwilligerswerk | 3 PDFs |
| 7 | Compliance & AVG | AVG vrijwilligers | 4 PDFs |
| 8 | ROI Berekenen | ROI vrijwilligerswerk | 4 PDFs |

---

## RAG Pipeline voor Iris (Fase 2)

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  44 PDF      │────▶│  AI Extract  │────▶│  Knowledge   │
│  Research    │     │  & Chunk     │     │  Chunks DB   │
└──────────────┘     └──────────────┘     └──────┬───────┘
                                                  │
                                                  ▼
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  User vraagt │────▶│  Vector      │────▶│  Iris geeft  │
│  "Hoe..."    │     │  Search      │     │  onderbouwd  │
└──────────────┘     └──────────────┘     │  antwoord    │
                                          └──────────────┘
```

**Voorbeeld interactie:**

> **Gebruiker:** "Hoe kan ik vrijwilligers beter waarderen?"
>
> **Iris:** "Uit ons onderzoek onder 2.500 vrijwilligers blijkt dat 31% vertrekt door gebrek aan waardering. Effectieve waardering kent vier niveaus:
>
> 1. **Dagelijks:** Persoonlijke bedankjes
> 2. **Wekelijks:** Successen delen in communicatie
> 3. **Maandelijks:** Vrijwilliger in het zonnetje
> 4. **Jaarlijks:** Formele erkenning
>
> Wil je meer weten? Lees ons artikel over vrijwilligersretentie of plan een gesprek."
>
> *[Bron: DAAR Onderzoek Vrijwilligersmotivatie 2024]*

---

## Technische Implementatie

### Bestanden aangepast/gecreëerd:

| Bestand | Status | Beschrijving |
|---------|--------|--------------|
| `constants/prompts.ts` | ✅ Updated | Volledig nieuw prompt systeem |
| `prisma/schema.prisma` | ✅ Updated | +4 nieuwe models, +4 enums |
| `prisma/seed.ts` | ✅ Nieuw | Database seed script |
| `package.json` | ✅ Updated | Seed scripts toegevoegd |

### Commands om te draaien:

```bash
# 1. Database schema pushen
npm run db:push

# 2. Prisma client genereren
npm run db:generate

# 3. Seed data laden
npm run db:seed

# 4. Development server
npm run dev
```

---

## Demonstratie Mogelijkheden

### 1. Kennisbank Artikel
- Navigeer naar `/kennisbank/complete-gids-vrijwilligersretentie`
- Toon de professionele opmaak en SEO elementen

### 2. Iris Chat
- Open de chat widget
- Vraag: "Hoe kan ik vrijwilligers beter behouden?"
- Iris reageert met de nieuwe brand voice

### 3. Admin Panel
- Toon de nieuwe categorieën en tags
- Demonstreer het artikel beheer systeem

---

## Roadmap Fase 2 & 3

### Fase 2 (RAG Implementatie)
- [ ] PDF extractie pipeline bouwen
- [ ] Vector embeddings genereren (OpenAI/Voyage)
- [ ] Semantic search implementeren
- [ ] Iris koppelen aan knowledge base

### Fase 3 (Content Schalen)
- [ ] Resterende 7 pillar pages schrijven
- [ ] 24 supporting articles creëren
- [ ] Email nurture sequences opzetten
- [ ] Analytics dashboard bouwen

---

## Investering & Impact

### Wat we bouwen:
- **44 onderzoeken** → **8 pillar pages** → **24 blogs** → **∞ leads**

### Verwachte resultaten:
- Top 3 Google rankings voor vrijwilligersbeheer keywords
- Iris wordt de slimste AI in de sector
- Content marketing flywheel die zichzelf versterkt

### Concurrentievoordeel:
Geen enkele concurrent heeft:
1. Toegang tot 44 wetenschappelijke onderzoeken
2. Een AI die deze kennis kan toepassen
3. De drie-eenheid van sociale passie + tech + business

---

## Vragen?

Laten we het bespreken. Dit is pas het begin.

— Vincent

---

*Dit document is gegenereerd als onderdeel van de Fase 1 demonstratie.*
