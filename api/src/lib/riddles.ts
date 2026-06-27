import Groq from 'groq-sdk'
import type { Riddle, ReasoningMessage } from '../types/riddles.types'

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

export async function fetchRiddles(): Promise<{ riddles: Riddle[] }> {
    const completion = await groq.chat.completions.create({
        model: 'openai/gpt-oss-20b',
        messages: [{ role: 'user', content: PROMPT }],
        temperature: 0.9,
        max_tokens: 4000,
        seed: Math.floor(Math.random() * 1_000_000)
    })
    const choice = completion.choices[0]
    // Reasoning models put chain-of-thought in .reasoning; final answer goes in .content
    const text = (choice.message as ReasoningMessage).content
        || (choice.message as ReasoningMessage).reasoning
        || ''
    const match = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/) ?? text.match(/(\{[\s\S]*\})/)
    return JSON.parse(match ? match[1] ?? match[0] : '{}') as { riddles: Riddle[] }
}
