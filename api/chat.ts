import type { VercelRequest, VercelResponse } from '@vercel/node'
import { fetchChatReply } from './_lib/chat'

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') return res.status(405).end()
    try {
        const { message } = req.body as { message?: string }
        if (!message?.trim()) return res.status(400).json({ error: 'message is required' })
        res.json(await fetchChatReply(message.trim()))
    } catch (err) {
        console.error('chat error:', err)
        res.status(500).json({ error: 'Something went wrong' })
    }
}
