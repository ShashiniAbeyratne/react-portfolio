import type { VercelRequest, VercelResponse } from '@vercel/node'
import { fetchRiddles } from './_lib/riddles'

export default async function handler(_req: VercelRequest, res: VercelResponse) {
    try {
        res.json(await fetchRiddles())
    } catch (err) {
        console.error('riddles error:', err)
        res.status(500).json({ error: 'Something went wrong' })
    }
}
