import { app, HttpRequest, HttpResponseInit, InvocationContext } from '@azure/functions'
import { fetchNews } from '../lib/news'

export async function news(_req: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    try {
        return {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(await fetchNews()),
        }
    } catch (err) {
        context.error('news function error:', err)
        return { status: 500, body: JSON.stringify({ error: 'Something went wrong' }) }
    }
}

app.http('news', {
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: news,
})
