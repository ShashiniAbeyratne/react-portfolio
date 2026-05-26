export enum MessageRole {
    User = 'user',
    Ai = 'ai',
}

export interface Message {
    id: string
    role: MessageRole
    text: string
    timestamp: number
}

export interface ChipOption {
    label: string
    key: string
    href?: string
}

