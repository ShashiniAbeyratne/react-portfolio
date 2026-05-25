import type { RiddleCardProps } from '../types/riddle.types'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'

export function RiddleCard({ riddle, currentIndex, totalRiddles, selectedAnswer, onAnswer, onNext }: RiddleCardProps) {
    const answered = selectedAnswer !== null
    const isCorrect = selectedAnswer === riddle.answerIndex

    const optionClass = (i: number) => {
        if (!answered) return 'riddle-option'
        if (i === riddle.answerIndex) return 'riddle-option riddle-option--correct'
        if (i === selectedAnswer) return 'riddle-option riddle-option--wrong'
        return 'riddle-option riddle-option--dimmed'
    }

    return (
        <div className="riddle-card">
            <div className="riddle-progress-row">
                <span className="riddle-progress-label">
                    Riddle {currentIndex + 1} of {totalRiddles}
                </span>
            </div>

            <Progress
                value={((currentIndex + 1) / totalRiddles) * 100}
                className="riddle-progress-bar"
            />

            <Separator className="my-4 bg-white/10" />

            <p className="riddle-question">{riddle.riddle}</p>

            <div className="riddle-options">
                {riddle.options.map((option, i) => (
                    <Button
                        key={i}
                        variant="outline"
                        className={optionClass(i)}
                        onClick={() => onAnswer(i)}
                        disabled={answered}
                    >
                        <span className="riddle-option-letter">
                            {String.fromCharCode(65 + i)}
                        </span>
                        {option}
                    </Button>
                ))}
            </div>

            {answered && (
                <div className="riddle-feedback">
                    <p className={`riddle-feedback-text ${isCorrect ? 'riddle-feedback--correct' : 'riddle-feedback--wrong'}`}>
                        {isCorrect
                            ? '✓ Correct!'
                            : `✗ The answer was: ${riddle.options[riddle.answerIndex]}`
                        }
                    </p>
                    <Button
                        variant="outline"
                        className="riddle-next-btn"
                        onClick={onNext}
                    >
                        {currentIndex < totalRiddles - 1 ? 'Next →' : 'See Results →'}
                    </Button>
                </div>
            )}
        </div>
    )
}
