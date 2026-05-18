import { CHIPS } from '../constants/chat.constants'
import type { ChipOption } from '../types/chat.types'

interface QuickChipsProps {
    usedChips: Set<string>
    onChip: (key: string, label: string) => void
}

export function QuickChips({ usedChips, onChip }: QuickChipsProps) {
    const visible = CHIPS.filter((c: ChipOption) => !usedChips.has(c.key))
    if (visible.length === 0) return null

    return (
        <div className="chat-chips-row">
            {visible.map(chip => (
                <button
                    key={chip.key}
                    className="chat-chip"
                    onClick={() => onChip(chip.key, chip.label)}
                >
                    {chip.label}
                </button>
            ))}
        </div>
    )
}
