import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import { useInitLoader } from '../../../../src/features/init-loader/hooks/useInitLoader'

describe('useInitLoader', () => {
    let onComplete: ReturnType<typeof vi.fn>
    let result : { current: ReturnType<typeof useInitLoader> }

    const onCompleteExpectation = () => {
        expect(result.current.progress).toBe(100)
        expect(onComplete).toHaveBeenCalledOnce()
        expect(sessionStorage.getItem('portfolio_init_seen')).toBe('1')
    }

    const onIncrementExpectation = (progress: number) => {
        expect(result.current.progress).toBe(progress)
        expect(onComplete).not.toHaveBeenCalled()
        expect(sessionStorage.getItem('portfolio_init_seen')).not.toBe('1')
    }

    beforeEach(() => {
        onComplete = vi.fn()
        sessionStorage.clear()
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    it('progress should be 0 initially', () => {
        result = renderHook(() => useInitLoader(onComplete)).result
        expect(result.current.progress).toBe(0)
        expect(onComplete).not.toHaveBeenCalled()
        expect(sessionStorage.getItem('portfolio_init_seen')).not.toBe('1')
    })

    it('handleSkip should call onComplete immediately', () => {
        result = renderHook(() => useInitLoader(onComplete)).result
        act(() => result.current.handleSkip())
        onCompleteExpectation()
    })

    it('should show all log lines and progress bar should reach 100% on complete', () => {
        // Override matchMedia to simulate reduced motion preference
        window.matchMedia = vi.fn().mockImplementation((query: string) => ({
            matches: query === '(prefers-reduced-motion: reduce)',
            media: query,
            onchange: null,
            addListener: () => {},
            removeListener: () => {},
            addEventListener: () => {},
            removeEventListener: () => {},
            dispatchEvent: () => false,
        }))

        vi.useFakeTimers()
        result = renderHook(() => useInitLoader(onComplete)).result
        act(() => vi.advanceTimersByTime(300))
        onCompleteExpectation()
    })

    it('should show log lines and progress bar should reach 100% incrementally', () => {
        vi.useFakeTimers()
        result = renderHook(() => useInitLoader(onComplete)).result
        onIncrementExpectation(30)

        act(() => vi.advanceTimersByTime(500))
        onIncrementExpectation(58)
        expect(onComplete).not.toHaveBeenCalled()

        act(() => vi.advanceTimersByTime(500))
        onIncrementExpectation(84)
        expect(onComplete).not.toHaveBeenCalled()

        act(() => vi.advanceTimersByTime(500))
        onIncrementExpectation(100)
        expect(onComplete).not.toHaveBeenCalled()

        act(() => vi.advanceTimersByTime(500))
        onCompleteExpectation()
    })
})
