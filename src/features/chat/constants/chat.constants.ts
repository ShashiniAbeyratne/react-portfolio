import type { ChipOption } from '../types/chat.types'

export const CHIPS: ChipOption[] = [
    { label: 'About Me',     key: 'about'      },
    { label: 'Projects',     key: 'projects'   },
    // { label: 'AI Showcase',  key: 'ai'         },
    { label: 'Experience',   key: 'experience' },
    { label: 'GitHub ↗',    key: 'github',    href: 'https://github.com/ShashiniAbeyratne' },
    { label: 'Hire Me?',     key: 'hire'       },
]

export const INITIAL_MESSAGE = `Hey! I'm Shashini's portfolio assistant 👋\n\nAsk me anything about her experience, projects, or background — or hit one of the quick options below.\n\nKeep in mind: I only share professionally relevant info here.`
