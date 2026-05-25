import { motion, AnimatePresence } from 'framer-motion'
import { Brain } from '@phosphor-icons/react'
import { useRiddle } from '../hooks/useRiddle'
import { RiddleCard } from './RiddleCard'

const scoreMessage = (score: number, total: number) => {
    if (score === total) return `Perfect score! You really know your AI. 🧠`
    if (score >= Math.ceil(total / 2)) return `${score}/${total} — not bad. Room to grow.`
    return `${score}/${total} — the machines are still ahead. 🤖`
}

export function RiddleGame() {
    const {
        riddles, isOpen, phase,
        currentIndex, selectedAnswer, score,
        toggle, setAnswer, next, restart
    } = useRiddle()

    return (
        <>
            <button className="riddle-tab" onClick={toggle} aria-label="Open AI Riddle game">
                <Brain size={14} weight="bold" />
                <span className="riddle-tab-label">Riddle Me</span>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="riddle-panel"
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    >
                        <div className="riddle-panel-header">
                            <span className="riddle-panel-title">
                                <Brain size={14} weight="bold" />
                                Riddle Me
                            </span>
                            <button className="riddle-panel-close" onClick={toggle} aria-label="Close">✕</button>
                        </div>

                        <div className="riddle-panel-body">
                            {phase === 'loading' && (
                                <div className="riddle-loading">
                                    <p className="riddle-loading-text">Generating your riddles...</p>
                                    <p className="riddle-loading-sub">Powered by Llama 3.1 ✦</p>
                                </div>
                            )}

                            {phase === 'playing' && riddles[currentIndex] && (
                                <RiddleCard
                                    riddle={riddles[currentIndex]}
                                    currentIndex={currentIndex}
                                    totalRiddles={riddles.length}
                                    selectedAnswer={selectedAnswer}
                                    onAnswer={setAnswer}
                                    onNext={next}
                                />
                            )}

                            {phase === 'complete' && (
                                <div className="riddle-complete">
                                    <p className="riddle-complete-score">{score}/{riddles.length}</p>
                                    <p className="riddle-complete-message">
                                        {scoreMessage(score, riddles.length)}
                                    </p>
                                    <button className="riddle-play-again" onClick={restart}>
                                        Play Again ↺
                                    </button>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
