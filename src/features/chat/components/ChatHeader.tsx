interface ChatHeaderProps {
    isNewsOpen: boolean
    onToggleNews: () => void
}

export function ChatHeader({ isNewsOpen, onToggleNews }: ChatHeaderProps) {
    return (
        <div className="chat-header">
            <div className="flex items-center gap-2">
                <span className="chat-header-dot" aria-hidden="true" />
                <span className="chat-header-logo">S.</span>
                <span className="chat-header-label">PORTFOLIO · ONLINE</span>
            </div>

            <button className="chat-news-toggle" onClick={onToggleNews} aria-expanded={isNewsOpen}>
                <span className="chat-news-dot" aria-hidden="true" />
                <span className="chat-news-toggle-label">TODAY IN TECH</span>
                <span
                    className="chat-news-chevron"
                    style={{ transform: isNewsOpen ? 'rotate(180deg)' : 'none' }}
                    aria-hidden="true"
                >▼</span>
            </button>
        </div>
    )
}
