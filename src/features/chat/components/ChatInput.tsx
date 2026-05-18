import { useState } from 'react'

interface ChatInputProps {
    onSend: (text: string) => void
    disabled?: boolean
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
    const [value, setValue] = useState('')

    const submit = () => {
        if (!value.trim() || disabled) return
        onSend(value.trim())
        setValue('')
    }

    return (
        <div className="chat-input-row">
            <input
                className="chat-input"
                placeholder="Ask me anything about Shashini..."
                value={value}
                onChange={e => setValue(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') submit() }}
                disabled={disabled}
            />
            <button className="chat-send-btn" onClick={submit} disabled={disabled}>
                →
            </button>
        </div>
    )
}
