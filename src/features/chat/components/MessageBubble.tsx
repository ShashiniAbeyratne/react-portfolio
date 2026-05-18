import { motion } from 'framer-motion'
import type { Message } from '../types/chat.types'

export function MessageBubble({ message }: { message: Message }) {
    const isAi = message.role === 'ai'
    return (
        <motion.div
            className={isAi ? 'msg-bubble-ai' : 'msg-bubble-user'}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
        >
            {message.text}
        </motion.div>
    )
}
