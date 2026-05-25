export interface Riddle {
    riddle: string
    options: [string, string, string, string]
    answerIndex: number  // 0-3
}