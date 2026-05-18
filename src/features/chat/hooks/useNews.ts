import { useState } from 'react'
import type { NewsItem } from '../types/chat.types'

const PLACEHOLDER_NEWS: NewsItem[] = [
    {
        tag: 'AI',
        headline: '"Google DeepMind unveils Gemini Ultra 2 with native multimodal reasoning"',
        source: 'theverge.com',
        timeAgo: '2h ago',
    },
    {
        tag: 'DEV',
        headline: '"OpenAI releases new reasoning model with improved code generation"',
        source: 'techcrunch.com',
        timeAgo: '4h ago',
    },
]

export function useNews() {
    const [isOpen, setIsOpen] = useState(false)

    const toggle = () => setIsOpen(prev => !prev)

    // Structured for TanStack Query swap: replace PLACEHOLDER_NEWS with query data
    return { news: PLACEHOLDER_NEWS, isOpen, toggle }
}
