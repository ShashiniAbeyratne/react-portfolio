export type MessageRole = 'user' | 'ai'

export interface Message {
    id: string
    role: MessageRole
    text: string
    timestamp: number
}

export interface NewsItem {
    tag: string
    headline: string
    source: string
    timeAgo: string
}

export interface ChipOption {
    label: string
    key: string
}
