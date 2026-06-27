import { app, HttpRequest, HttpResponseInit, InvocationContext } from '@azure/functions'
import { fetchRiddles } from '../../_lib/riddles'

export async function riddles(_req: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    try {
        return {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(await fetchRiddles()),
        }
    } catch (err) {
        context.error('riddles function error:', err)
        return { status: 500, body: JSON.stringify({ error: 'Something went wrong' }) }
    }
}

app.http('riddles', {
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: riddles,
})
