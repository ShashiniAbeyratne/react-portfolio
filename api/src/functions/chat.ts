import { app, HttpRequest, HttpResponseInit, InvocationContext } from '@azure/functions'
import Groq from 'groq-sdk'
import { SYSTEM_PROMPT } from '../knowledge'

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

export async function chat(req: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    try {
        const body = await req.json() as { message?: string }
        const message = body.message?.trim()

        if (!message) {
            return { status: 400, body: 'message is required' }
        }

        const completion = await groq.chat.completions.create({
            model: 'llama-3.3-70b-versatile',
            messages: [
                { role: 'system', content: SYSTEM_PROMPT },
                { role: 'user', content: message }
            ],
            max_tokens: 500,
            temperature: 0.7
        })

        return {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ reply: completion.choices[0].message.content })
        }
    } catch (err) {
        context.error('chat function error:', err)
        return { status: 500, body: JSON.stringify({ error: 'Something went wrong' }) }
    }
}

app.http('chat', {
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: chat
})
