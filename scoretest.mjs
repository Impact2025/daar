import { scoreProspect } from './lib/lead-machine/scorer.ts'

const tests = [
  { name: 'Stichting Welzijn Utrecht', domain: 'welzijnutrecht.nl',
    snippet: 'Stichting Welzijn Utrecht verbindt buurtbewoners en zet vrijwilligers in voor eenzaamheid en participatie in de wijk.',
    city: 'Utrecht' },
  { name: 'Medicura Thuiszorg', domain: 'medicura.nl',
    snippet: 'Medische hulpmiddelen die bijdragen aan uw kwaliteit van leven. Alles voor een fijn thuis.',
    city: '' },
]

for (const t of tests) {
  const r = await scoreProspect(t)
  console.log(JSON.stringify(t.name), '=>', JSON.stringify(r))
}
