import { app, HttpRequest, HttpResponseInit, InvocationContext } from '@azure/functions'

export async function ping(_req: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    try {
        const key = process.env.GROQ_API_KEY ?? ''
        const res = await fetch('https://api.groq.com/openai/v1/models', {
            headers: { Authorization: `Bearer ${key}` }
        })
        const body = await res.text()
        return {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ groqStatus: res.status, groqBody: body.slice(0, 300) })
        }
    } catch (err) {
        context.error('ping error:', err)
        const message = err instanceof Error ? err.message : String(err)
        return { status: 200, body: JSON.stringify({ networkError: message }) }
    }
}

app.http('ping', {
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: ping
})
