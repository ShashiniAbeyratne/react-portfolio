import { motion } from 'framer-motion'
import { useChat } from '../hooks/useChat'
import { useNews } from '../hooks/useNews'
import { ChatHeader } from './ChatHeader'
import { NewsPanel } from './NewsPanel'
import { MessageList } from './MessageList'
import { QuickChips } from './QuickChips'
import { ChatInput } from './ChatInput'

export function Chat() {
    const { messages, isLoading, usedChips, send, handleChip } = useChat()
    const { news, isOpen, toggle } = useNews()

    return (
        <motion.div
            className="chat-shell"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
        >
            <ChatHeader isNewsOpen={isOpen} onToggleNews={toggle} />
            <NewsPanel news={news} isOpen={isOpen} />
            <MessageList messages={messages} />
            <QuickChips usedChips={usedChips} onChip={handleChip} />
            <ChatInput onSend={send} disabled={isLoading} />
        </motion.div>
    )
}
