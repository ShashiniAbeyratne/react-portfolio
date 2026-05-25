import { CHIPS } from '../constants/chat.constants'
import type { ChipOption } from '../types/chat.types'

interface QuickChipsProps {
    onChip: (key: string, label: string) => void
}

export function QuickChips({ onChip }: QuickChipsProps) {
    return (
        <div className="chat-chips-row">
            {CHIPS.map((chip: ChipOption) =>
                chip.href ? (
                    <a
                        key={chip.key}
                        href={chip.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="chat-chip"
                    >
                        {chip.label}
                    </a>
                ) : (
                    <button
                        key={chip.key}
                        className="chat-chip"
                        onClick={() => onChip(chip.key, chip.label)}
                    >
                        {chip.label}
                    </button>
                )
            )}
        </div>
    )
}
