import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import { useInitLoader } from '../../../../src/features/init-loader/hooks/useInitLoader'
import { useReducedMotion, useAnimate } from 'framer-motion'

vi.mock('framer-motion')

describe('useInitLoader', () => {
    let onComplete: ReturnType<typeof vi.fn>
    let result : { current: ReturnType<typeof useInitLoader> }
    const progress = [30, 58, 84, 100]

    const onIncrementExpectation = (progress: number) => {
        expect(result.current.progress).toBe(progress)
        expect(onComplete).not.toHaveBeenCalled()
        expect(sessionStorage.getItem('portfolio_init_seen')).not.toBe('1')
    }

    const onCompleteExpectation = () => {
        expect(result.current.progress).toBe(100)
        expect(onComplete).toHaveBeenCalledOnce()
        expect(sessionStorage.getItem('portfolio_init_seen')).toBe('1')
    }

    beforeEach(() => {
        onComplete = vi.fn()
        sessionStorage.clear()
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    it('progress should be 30 initially', () => {
        result = renderHook(() => useInitLoader(onComplete)).result
        expect(result.current.progress).toBe(30)
        expect(onComplete).not.toHaveBeenCalled()
        expect(sessionStorage.getItem('portfolio_init_seen')).not.toBe('1')
    })

    it('handleSkip should call onComplete immediately', () => {
        result = renderHook(() => useInitLoader(onComplete)).result
        act(() => result.current.handleSkip())
        onCompleteExpectation()
    })

    it('should reach 100% and call onComplete when reduced motion is active', async () => {
        vi.mocked(useReducedMotion).mockReturnValueOnce(true)
        vi.useFakeTimers()
        result = renderHook(() => useInitLoader(onComplete)).result
        await act(async () => { vi.advanceTimersByTime(300) })
        onCompleteExpectation()
    })

    it('should advance progress incrementally through the animation sequence', async () => {
        // Each animate() call gets a promise you control manually
        const resolvers: Array<() => void> = []
        const controlledAnimate = vi.fn().mockImplementation(
            () => new Promise<void>(resolve => resolvers.push(resolve))
        )

        vi.mocked(useAnimate).mockReturnValueOnce([
            { current: document.createElement('div') },
            controlledAnimate
        ] as any)
        
        result = renderHook(() => useInitLoader(onComplete)).result
        onIncrementExpectation(progress[0])

        for (let i = 0; i < 4; i++) {
            await act(async () => {resolvers[i](); await Promise.resolve()})
            if (i < 3) onIncrementExpectation(progress[i+1])
        }

        onCompleteExpectation()
    })
})
