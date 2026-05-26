import { useState } from 'react'
import { MessageRole } from '../types/chat.types'
import type { Message } from '../types/chat.types'
import { INITIAL_MESSAGE } from '../constants/chat.constants'
import { useMutation } from '@tanstack/react-query'

const sendToApi = async (text: string): Promise<string> => {
    const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text })
    })
    if (!res.ok) throw new Error('Failed to get response')
    const data = await res.json()
    return data.reply
}

function createMessage(role: MessageRole, text: string): Message {
    return { id: crypto.randomUUID(), role, text, timestamp: Date.now() }
}

export function useChat() {
    const [messages, setMessages] = useState<Message[]>([
        createMessage(MessageRole.Ai, INITIAL_MESSAGE)
    ])

    const mutation = useMutation({
        mutationFn: sendToApi,
        onSuccess: (reply) => {
            setMessages(prev => [...prev, createMessage(MessageRole.Ai, reply)])
        },
        onError: () => {
            setMessages(prev => [...prev, createMessage(MessageRole.Ai, 'Something went wrong. Please try again.')])
        }
    })

    const send = (text: string) => {
        if (!text.trim() || mutation.isPending) return
        setMessages(prev => [...prev, createMessage(MessageRole.User, text)])
        mutation.mutate(text)
    }

    const handleChip = (_key: string, label: string) => {
        send(label)
    }

    return { messages, isLoading: mutation.isPending, send, handleChip }
}
