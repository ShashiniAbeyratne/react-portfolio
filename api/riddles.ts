import type { VercelRequest, VercelResponse } from '@vercel/node'
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

export default async function handler(_req: VercelRequest, res: VercelResponse) {
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
        res.setHeader('Content-Type', 'application/json')
        res.send(body)
    } catch (err) {
        console.error('riddles error:', err)
        res.status(500).json({ error: 'Something went wrong' })
    }
}
