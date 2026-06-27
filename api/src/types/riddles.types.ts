export interface Riddle {
    riddle: string
    options: [string, string, string, string]
    answerIndex: number
}

export type ReasoningMessage = {
    role: string
    content: string | null
    reasoning: string | null
}