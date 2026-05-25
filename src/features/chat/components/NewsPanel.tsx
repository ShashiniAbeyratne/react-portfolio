import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import type { NewsPanelProps } from '../types/newsPanel.types'
import { Button } from '@/components/ui/button'

export function NewsPanel({ news, isOpen, onRefresh, isRefetching, isExhausted }: NewsPanelProps) {
    const disabled = isRefetching || isExhausted

    return (
        <div className="chat-news-panel" style={{ maxHeight: isOpen ? '300px' : '0', overflowY: isOpen ? 'auto' : 'hidden' }}>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <span className="chat-news-refresh-wrapper">
                            <Button
                                className={`chat-news-refresh${isRefetching ? ' chat-news-refresh--spinning' : ''}`}
                                onClick={onRefresh}
                                disabled={disabled}
                                aria-label="Refresh news"
                            >
                                {isRefetching ? '↻' : '↺'}
                            </Button>
                        </span>
                    </TooltipTrigger>
                    {isExhausted && (
                        <TooltipContent side="left">
                            <p>All caught up — new stories in ~30 min</p>
                        </TooltipContent>
                    )}
                </Tooltip>
            </TooltipProvider>

            {news.map((item, i) => (
                <div key={i} className="chat-news-item">
                    <div className="chat-news-tag">{item.tag}</div>
                    <div>
                        <a href={item.url} target="_blank" rel="noopener noreferrer" className="chat-news-headline">
                            {item.headline}
                        </a>
                        <p className="chat-news-meta">{item.source} · {item.timeAgo} · <em className="chat-news-credit">via Shashini's News Agent ✦</em></p>
                    </div>
                </div>
            ))}
        </div>
    )
}
