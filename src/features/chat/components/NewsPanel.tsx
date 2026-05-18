import type { NewsItem } from '../types/chat.types'

export function NewsPanel({ news, isOpen }: { news: NewsItem[], isOpen: boolean }) {
    return (
        <div className="chat-news-panel" style={{ maxHeight: isOpen ? '110px' : '0' }}>
            {news.map((item, i) => (
                <div key={i} className="chat-news-item">
                    <div className="chat-news-tag">{item.tag}</div>
                    <div>
                        <p className="chat-news-headline">{item.headline}</p>
                        <p className="chat-news-meta">{item.source} · {item.timeAgo} · <em className="chat-news-credit">via Shashini's News Agent ✦</em></p>
                    </div>
                </div>
            ))}
        </div>
    )
}
