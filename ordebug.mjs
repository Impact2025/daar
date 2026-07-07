import { readFileSync } from 'fs'
const env = readFileSync('.env.local', 'utf8').split('\n').forEach(l => {
  const m = l.match(/^([A-Z_]+)=(.*)$/); if (m) process.env[m[1]] = m[2]
})
const key = process.env.OPENROUTER_API_KEY
async function tryModel(model, snippet) {
  try {
    const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model,
        messages: [
          { role: 'system', content: 'Return JSON {"score":<0-10>,"rationale":"<nl>"}' },
          { role: 'user', content: `Naam: Stichting Welzijn Utrecht\nBeschrijving: ${snippet}` },
        ],
        max_tokens: 80, response_format: { type: 'json_object' },
      }),
    })
    const txt = await res.text()
    if (!res.ok) return `ERR ${res.status} ${txt.slice(0,120)}`
    const p = JSON.parse(txt)
    return `OK score=${JSON.parse(p.choices[0].message.content).score}`
  } catch (e) { return `THROW ${String(e).slice(0,100)}` }
}
const snippet = 'Stichting Welzijn Utrecht verbindt buurtbewoners en zet vrijwilligers in voor eenzaamheid en participatie in de wijk.'
console.log('haiku-4.5 :', await tryModel('anthropic/claude-haiku-4.5', snippet))
console.log('gpt-4o-mini:', await tryModel('openai/gpt-4o-mini', snippet))
