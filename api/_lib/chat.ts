import Groq from 'groq-sdk'
import { SYSTEM_PROMPT } from '../_knowledge'

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

export async function fetchChatReply(message: string): Promise<{ reply: string | null }> {
    const completion = await groq.chat.completions.create({
        model: 'qwen/qwen3-32b',
        messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            { role: 'user', content: message }
        ],
        reasoning_format: 'hidden',
        max_tokens: 1500,
        temperature: 0.7
    })
    return { reply: completion.choices[0].message.content }
}
