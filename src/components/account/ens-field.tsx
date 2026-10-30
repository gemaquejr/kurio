import { useId } from 'react'
import { ChevronDown } from 'lucide-react'

type EnsFieldProps = {
    value: string
    onChange: (value: string) => void
}

export function EnsField({ value, onChange }: EnsFieldProps) {
    const id = useId()

    return (
        <div className="flex min-w-0 flex-col gap-2.5">
            <label
                htmlFor={id}
                className="flex items-center gap-1 text-[15px] text-[#F5F1EB]"
            >
                <span>Nome ENS</span>
                <span
                    aria-hidden="true"
                    className="text-[22px] leading-none text-[#F0805F]"
                >
                    *
                </span>
            </label>

            <div className="flex min-w-0 gap-2.5">
                <div
                    aria-label="Extensão ENS: .eth"
                    className="flex h-10 w-19.5 shrink-0 items-center justify-between rounded-[3px] border border-[#3F2319] px-2.5 text-[15px] text-[#F5F1EB]"
                >
                    <span>.eth</span>
                    <ChevronDown
                        size={16}
                        strokeWidth={1.5}
                        aria-hidden="true"
                    />
                </div>

                <input
                    id={id}
                    name="ensName"
                    type="text"
                    value={value}
                    onChange={(event) => onChange(event.target.value)}
                    required
                    autoCapitalize="none"
                    autoComplete="off"
                    spellCheck={false}
                    aria-describedby={`${id}-hint`}
                    className="h-10 min-w-0 flex-1 rounded-[3px] border border-[#3F2319] bg-transparent px-3 text-[15px] text-[#F5F1EB] outline-none transition-colors focus-visible:border-[#D28A4C] focus-visible:ring-1 focus-visible:ring-[#D28A4C]"
                />
            </div>

            <span id={`${id}-hint`} className="sr-only">
                Digite apenas o nome, sem a extensão .eth.
            </span>
        </div>
    )
}