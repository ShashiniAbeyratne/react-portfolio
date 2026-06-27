import type { VercelRequest, VercelResponse } from '@vercel/node'
import { fetchNews } from './src/lib/news'

export default async function handler(_req: VercelRequest, res: VercelResponse) {
    try {
        res.json(await fetchNews())
    } catch (err) {
        console.error('news error:', err)
        res.status(500).json({ error: 'Something went wrong' })
    }
}
