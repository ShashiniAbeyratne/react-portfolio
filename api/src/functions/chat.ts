import { app, HttpRequest, HttpResponseInit, InvocationContext } from '@azure/functions'
import { fetchChatReply } from '../lib/chat'

export async function chat(req: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    try {
        const body = await req.json() as { message?: string }
        const message = body.message?.trim()
        if (!message) return { status: 400, body: 'message is required' }
        return {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(await fetchChatReply(message)),
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
