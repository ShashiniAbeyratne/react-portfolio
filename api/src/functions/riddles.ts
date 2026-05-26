import { app, HttpRequest, HttpResponseInit, InvocationContext } from '@azure/functions'
import Groq from 'groq-sdk'
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

const PROMPT = `Generate exactly 3 riddles about AI, machine learning, or software engineering concepts.

Return ONLY a JSON object in this exact shape:
{
  "riddles": [
    {
      "riddle": "the riddle question",
      "options": ["option A", "option B", "option C", "option D"],
      "answerIndex": 0
    }
  ]
}

Rules:
- Each riddle must be clever and conceptual, not trivial
- Vary the difficulty across the 3 riddles
- answerIndex must be the index (0-3) of the correct option in the options array
- Do not include explanations, only the JSON`

export async function riddles(_req: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    try {
        const completion = await groq.chat.completions.create({
            model: 'llama-3.1-8b-instant',
            messages: [{ role: 'user', content: PROMPT }],
            response_format: { type: 'json_object' },
            temperature: 0.9,
            max_tokens: 600,
            seed: Math.floor(Math.random() * 1_000_000)
        })

        const body = completion.choices[0].message.content ?? '{}'
        return {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
            body,
        }
    } catch (err) {
        context.error('riddles function error:', err)
        return { status: 500, body: JSON.stringify({ error: 'Something went wrong' }) }
    }
}

app.http('riddles', {
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: riddles,
})
