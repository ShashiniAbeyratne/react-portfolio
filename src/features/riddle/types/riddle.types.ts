export interface Riddle {
    riddle: string
    options: [string, string, string, string]
    answerIndex: number
}

export type RiddlePhase = 'idle' | 'loading' | 'playing' | 'complete'

export interface RiddleState {
    riddles: Riddle[]
    currentIndex: number
    selectedAnswer: number | null
    score: number
    phase: RiddlePhase
}

export interface RiddleCardProps {
    riddle: Riddle
    currentIndex: number
    totalRiddles: number
    selectedAnswer: number | null
    onAnswer: (index: number) => void
    onNext: () => void
}
