import Parser from 'rss-parser'
import type { NewsItem } from '../src/types/news.types'

const parser = new Parser()

const FEEDS = [
    { url: 'https://techcrunch.com/tag/artificial-intelligence/feed/', tag: 'AI', source: 'techcrunch.com' },
    { url: 'https://www.theverge.com/ai-artificial-intelligence/rss/index.xml', tag: 'AI', source: 'theverge.com' },
    { url: 'https://feeds.arstechnica.com/arstechnica/technology-lab', tag: 'TECH', source: 'arstechnica.com' },
]

const MAX_ITEMS = 500
const CACHE_TTL = 30 * 60 * 1000

function timeAgo(dateStr: string | undefined): string {
    if (!dateStr) return ''
    const diff = Date.now() - new Date(dateStr).getTime()
    const h = Math.floor(diff / 36e5)
    if (h < 1) return 'just now'
    if (h < 24) return `${h}h ago`
    return `${Math.floor(h / 24)}d ago`
}

let cache: { items: NewsItem[]; expiresAt: number } | null = null

async function fetchFeed(feed: typeof FEEDS[number]): Promise<NewsItem[]> {
    const result = await parser.parseURL(feed.url)
    return result.items.map(item => ({
        tag: feed.tag,
        headline: item.title ?? '',
        source: feed.source,
        timeAgo: timeAgo(item.pubDate),
        url: item.link ?? ''
    }))
}

export async function fetchNews(): Promise<{ items: NewsItem[] }> {
    if (cache && Date.now() < cache.expiresAt) return { items: cache.items }
    const results = await Promise.allSettled(FEEDS.map(fetchFeed))
    const items = results
        .filter((r): r is PromiseFulfilledResult<NewsItem[]> => r.status === 'fulfilled')
        .flatMap(r => r.value)
        .slice(0, MAX_ITEMS)
    cache = { items, expiresAt: Date.now() + CACHE_TTL }
    return { items }
}
