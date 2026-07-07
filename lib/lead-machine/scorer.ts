export interface ScoreInput {
  name: string;
  snippet?: string;
  domain?: string;
  city?: string;
}

export interface ScoreResult {
  // null = scoren mislukt; nooit een verzonnen middenscore teruggeven
  score: number | null;
  rationale: string;
}

// Default context voor DAAR — overrideme per aanroep via scoringContext param.
export const DEFAULT_SCORING_CONTEXT = `Je bent een lead qualifier voor DAAR. DAAR levert software en ondersteuning aan vrijwilligersorganisaties en organisaties in het sociaal domein (welzijn, zorg, buurt, cultuur, jeugd).

Ideale klanten (score 8-10): stichtingen, verenigingen, welzijnsorganisaties, buurt- en wijkorganisaties, gemeenten (sociaal domein), zorginstellingen met vrijwilligers, goede doelen.
Minder relevant (score 0-4): puur commerciële onderneming zonder maatschappelijke doelstelling, eenmanszaak, niet-Nederlands.`;

const BASE_PROMPT = `Geef ALLEEN geldige JSON: {"score": <0-10>, "rationale": "<max 12 woorden in het Nederlands>"}`;

export async function scoreProspect(
  input: ScoreInput,
  scoringContext = DEFAULT_SCORING_CONTEXT,
): Promise<ScoreResult> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  // Probeer eerst de geconfigureerde model; val terug op een bekend-geldige
  // slug als die 404 geeft (bv. een verouderde OPENROUTER_MODEL in .env).
  const modelsToTry = [
    process.env.OPENROUTER_MODEL || 'anthropic/claude-haiku-4.5',
    'anthropic/claude-haiku-4.5',
    'openai/gpt-4o-mini',
  ];

  const userMsg = [
    `Naam: ${input.name}`,
    input.domain ? `Website: ${input.domain}` : null,
    input.city ? `Stad: ${input.city}` : null,
    input.snippet ? `Beschrijving: ${input.snippet.slice(0, 200)}` : null,
  ]
    .filter(Boolean)
    .join('\n');

  for (const model of modelsToTry) {
    try {
      const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model,
          messages: [
            { role: 'system', content: `${scoringContext}\n\n${BASE_PROMPT}` },
            { role: 'user', content: userMsg },
          ],
          max_tokens: 120,
          temperature: 0.2,
          response_format: { type: 'json_object' },
        }),
      });

      if (!res.ok) continue; // probeer volgende model (bv. 404 verouderde slug)

      const data = await res.json() as { choices?: Array<{ message?: { content?: string } }> };
      const raw = data.choices?.[0]?.message?.content ?? '{}';
      const parsed = parseScoreJson(raw);
      const n = Number(parsed.score);
      return {
        score: Number.isFinite(n) ? Math.max(0, Math.min(10, Math.round(n))) : null,
        rationale: String(parsed.rationale ?? 'Score niet beschikbaar').slice(0, 120),
      };
    } catch {
      // probeer volgende model
    }
  }
  return { score: null, rationale: 'Scoren mislukt — handmatig beoordelen' };
}

// OpenRouter modellen geven soms een gefenced JSON-blok terug (```json ... ```)
// of extra tekst. Strip dat en parse alleen het eerste geldige {...}-object.
function parseScoreJson(raw: string): { score?: unknown; rationale?: unknown } {
  let s = raw.trim();
  // verwijder markdown codefences
  s = s.replace(/^```(?:json)?\s*/i, '').replace(/```\s*$/i, '');
  // probeer eerst de hele string
  try { return JSON.parse(s); } catch { /* val door naar extractie */ }
  // anders: eerste {...} blok eruit halen
  const m = s.match(/\{[\s\S]*\}/);
  if (m) {
    try { return JSON.parse(m[0]); } catch { /* negeer */ }
  }
  return {};
}

export async function scoreMany(
  inputs: ScoreInput[],
  scoringContext = DEFAULT_SCORING_CONTEXT,
  concurrency = 5,
): Promise<ScoreResult[]> {
  const results: ScoreResult[] = new Array(inputs.length);
  const queue = inputs.map((input, i) => ({ input, i }));

  async function worker() {
    while (queue.length > 0) {
      const item = queue.shift()!;
      results[item.i] = await scoreProspect(item.input, scoringContext);
    }
  }

  await Promise.all(Array.from({ length: Math.min(concurrency, inputs.length) }, worker));
  return results;
}
