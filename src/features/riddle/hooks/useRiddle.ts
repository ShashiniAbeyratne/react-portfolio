import { useMutation } from '@tanstack/react-query'
import { RiddlePhase } from '../types/riddle.types'
import type { Riddle } from '../types/riddle.types'
import { useState } from 'react'

const fetchRiddles = async (): Promise<Riddle[]> => {
    const res = await fetch('/api/riddles')
    if (res.status === 429) throw new Error('RATE_LIMITED')
    if (!res.ok) throw new Error('Failed to fetch riddles')
    const data = await res.json()
    return data.riddles
}

export function useRiddle() {
    const [isOpen, setIsOpen] = useState(false)
    const [riddlesList, setRiddlesList] = useState<Riddle[]>([])
    const [currentIndex, setCurrentIndex] = useState(0)
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
    const [score, setScore] = useState(0)
    const [phase, setPhase] = useState<RiddlePhase>(RiddlePhase.Idle)
    const [errorMessage, setErrorMessage] = useState('')

    const { mutate: doFetch, isPending: isLoading } = useMutation({
        mutationFn: fetchRiddles,
        onSuccess: (data) => {
            if (!data || !Array.isArray(data)) return
            setRiddlesList(data)
            setPhase(RiddlePhase.Playing)
        },
        onError: (error: Error) => {
            setErrorMessage(
                error.message === 'RATE_LIMITED'
                    ? "You've played a lot recently — wait a moment before trying again."
                    : 'Failed to load riddles. Please try again.'
            )
            setPhase(RiddlePhase.Error)
        }
    })

    const toggle = () => {
        setIsOpen(prev => {
            if (!prev && !isLoading) {
                setCurrentIndex(0)
                setScore(0)
                setSelectedAnswer(null)
                setPhase(RiddlePhase.Loading)
                doFetch()
            }

            return !prev
        })
    }

    const next = () => {
        if (currentIndex < riddlesList.length - 1) {
            setCurrentIndex(prev => prev + 1)
            setSelectedAnswer(null)
        } else {
            setPhase(RiddlePhase.Complete)
        }
    }

    const setAnswer = (index: number) => {
        if (phase !== RiddlePhase.Playing || selectedAnswer !== null) return
        setSelectedAnswer(index)
        if (index === riddlesList[currentIndex].answerIndex) {
            setScore(prev => prev + 1)
        }
    }

    const restart = () => {
        setCurrentIndex(0)
        setScore(0)
        setSelectedAnswer(null)
        setPhase(RiddlePhase.Loading)
        doFetch()
    }

    return { riddles: riddlesList, isOpen, isLoading, score, phase, errorMessage, currentIndex, selectedAnswer, toggle, setAnswer, next, restart }
}