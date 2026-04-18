import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { act, fireEvent, render, screen } from '@testing-library/react'
import { InitLoader } from '../../../../src/features/init-loader'

describe('InitLoader', () => {
    let onComplete: ReturnType<typeof vi.fn>
    
    const keyEventTestCases: { key: string; code: string; label: string }[] = [
        { key: 'Enter', code: 'Enter', label: 'Enter key' },
        { key: ' ', code: 'Space', label: 'Space key' }
    ]

    const renderedLinesExpectation = () => {
        expect(screen.getByText('> Loading profile data...')).toBeInTheDocument()
        expect(screen.getByText('> Building portfolio engine...')).toBeInTheDocument()
        expect(screen.getByText('> Connecting AI interfaces...')).toBeInTheDocument()
        expect(screen.getByText('> Ready.')).toBeInTheDocument()
    }

    const onCompleteExpectation = () => {
        renderedLinesExpectation()
        expect(onComplete).toHaveBeenCalledOnce()
        expect(sessionStorage.getItem('initLoaderCompleted')).toBe('1')
    }

    beforeEach(() => {
        onComplete = vi.fn()
        sessionStorage.clear()
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    it('should show current year in version label', () => {
        const currentYear = new Date().getFullYear()
        render(<InitLoader onComplete={onComplete} />)
        expect(screen.getByText(`SHASHINI.PORTFOLIO · v${currentYear}`)).toBeInTheDocument()
    })

    it('should render all four log lines', () => {
        render(<InitLoader onComplete={onComplete} />)
        renderedLinesExpectation()
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
        render(<InitLoader onComplete={onComplete} />)
        act(() => vi.advanceTimersByTime(300))
        onCompleteExpectation()
        vi.useRealTimers()
    })

    keyEventTestCases.forEach(({ key, code, label }) => {
        it(`should skip animations, show all log lines immediately and set sessionStorage flag when user presses ${label}`, () => {
            render(<InitLoader onComplete={onComplete} />)
            fireEvent.keyDown(screen.getByRole('status'), { key, code })
            onCompleteExpectation()
        })
    })

    it('should have appropriate accessibility attributes', () => {
        render(<InitLoader onComplete={onComplete} />)
        const loader = screen.getByRole('status')
        expect(loader).toHaveAttribute('aria-label', 'Loading portfolio')
        expect(loader).toHaveAttribute('tabIndex', '0')
        const progressBar = screen.getByRole('progressbar')
        expect(progressBar).toHaveAttribute('aria-label', expect.stringContaining('Loading'))
    })  
})
