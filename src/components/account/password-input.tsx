import { useId, useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

type PasswordInputProps = {
    label: string
    name: string
    value: string
    onChange: (value: string) => void
    autoComplete: 'current-password' | 'new-password'
    required?: boolean
}

export function PasswordInput({
    label,
    name,
    value,
    onChange,
    autoComplete,
    required = false,
}: PasswordInputProps) {
    const id = useId()
    const [isVisible, setIsVisible] = useState(false)

    return (
        <div className="flex min-w-0 flex-col gap-3">
            <label
                htmlFor={id}
                className="text-[15px] leading-3.75 text-[#F5F1EB]"
            >
                {label}
            </label>

            <div className="flex h-10 min-w-0 items-center rounded-[3px] border border-[#3F2319] px-4 transition-colors focus-within:border-[#D28A4C] focus-within:ring-1 focus-within:ring-[#D28A4C]">
                <input
                    id={id}
                    name={name}
                    type={isVisible ? 'text' : 'password'}
                    value={value}
                    onChange={(event) => onChange(event.target.value)}
                    autoComplete={autoComplete}
                    required={required}
                    className="h-full min-w-0 flex-1 bg-transparent text-[15px] text-[#F5F1EB] outline-none"
                />

                <button
                    type="button"
                    onClick={() => setIsVisible((previous) => !previous)}
                    aria-label={
                        isVisible ? `Ocultar ${label.toLowerCase()}` : `Mostrar ${label.toLowerCase()}`
                    }
                    aria-pressed={isVisible}
                    aria-controls={id}
                    className="ml-2 flex h-8 w-8 shrink-0 items-center justify-center rounded text-[#B39463] transition-colors hover:text-[#D28A4C] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D28A4C]"
                >
                    {isVisible ? (
                        <Eye size={20} strokeWidth={1.5} aria-hidden="true" />
                    ) : (
                        <EyeOff size={20} strokeWidth={1.5} aria-hidden="true" />
                    )}
                </button>
            </div>
        </div>
    )
}