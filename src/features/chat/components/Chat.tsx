import { motion } from 'framer-motion'
import { useChat } from '../hooks/useChat'
import { useNews } from '../hooks/useNews'
import { ChatHeader } from './ChatHeader'
import { NewsPanel } from './NewsPanel'
import { MessageList } from './MessageList'
import { QuickChips } from './QuickChips'
import { ChatInput } from './ChatInput'
import { RiddleGame } from '@/features/riddle/components/RiddleGame'

export function Chat() {
    const { messages, isLoading, send, handleChip } = useChat()
    const { news, isOpen, toggle, refetch, isRefetching, isExhausted } = useNews()

    return (
        <motion.div
            className="chat-shell"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
        >
            <ChatHeader isNewsOpen={isOpen} onToggleNews={toggle} />
            <NewsPanel 
                news={news} 
                isOpen={isOpen} 
                onRefresh={refetch} 
                isRefetching={isRefetching}
                isExhausted={isExhausted} />
            <MessageList messages={messages} />
            <QuickChips onChip={handleChip} />
            <ChatInput onSend={send} disabled={isLoading} />
            <RiddleGame />
        </motion.div>
    )
}
