import Groq from 'groq-sdk'
import { SYSTEM_PROMPT } from '../_knowledge'
import { GROQ_MODEL } from './models'

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

export async function fetchChatReply(message: string): Promise<{ reply: string | null }> {
    const completion = await groq.chat.completions.create({
        model: GROQ_MODEL as string,
        messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            { role: 'user', content: message }
        ],
        max_tokens: 8000,
        temperature: 0.7
    })
    return { reply: completion.choices[0].message.content }
}
