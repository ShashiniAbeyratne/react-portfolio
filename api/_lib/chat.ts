import Groq from 'groq-sdk'
import { SYSTEM_PROMPT } from '../src/knowledge'

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

export async function fetchChatReply(message: string): Promise<{ reply: string | null }> {
    const completion = await groq.chat.completions.create({
        model: 'llama-3.3-70b-versatile',
        messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            { role: 'user', content: message }
        ],
        max_tokens: 500,
        temperature: 0.7
    })
    return { reply: completion.choices[0].message.content }
}
