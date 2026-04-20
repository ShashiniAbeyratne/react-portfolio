import { vi } from 'vitest'

const actual = await vi.importActual<typeof import('framer-motion')>('framer-motion')

export const useReducedMotion = vi.fn().mockReturnValue(false)
export const useAnimate = vi.fn().mockReturnValue([
    { current: document.createElement('div') },
    vi.fn().mockResolvedValue(undefined)
])

export const motion = actual.motion
export const AnimatePresence = actual.AnimatePresence
