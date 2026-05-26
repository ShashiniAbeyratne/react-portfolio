import type { VercelRequest, VercelResponse } from '@vercel/node'
import Groq from 'groq-sdk'
import { SYSTEM_PROMPT } from './_knowledge'
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') return res.status(405).end()
    try {
        const { message } = req.body as { message?: string }
        if (!message?.trim()) return res.status(400).json({ error: 'message is required' })

        const completion = await groq.chat.completions.create({
            model: 'llama-3.3-70b-versatile',
            messages: [
                { role: 'system', content: SYSTEM_PROMPT },
                { role: 'user', content: message.trim() }
            ],
            max_tokens: 500,
            temperature: 0.7
        })

        res.json({ reply: completion.choices[0].message.content })
    } catch (err) {
        console.error('chat error:', err)
        res.status(500).json({ error: 'Something went wrong' })
    }
}
