

export interface NewsItem {
    tag: string
    headline: string
    source: string
    timeAgo: string
    url: string
}

export interface NewsPanelProps {
    news: NewsItem[]
    isOpen: boolean
    onRefresh: () => void
    isRefetching: boolean
    isExhausted: boolean
}