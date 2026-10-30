import { useId } from 'react'

type ProfileFieldProps = {
    label: string
    name: string
    value: string
    onChange: (value: string) => void
    type?: 'text' | 'email' | 'url'
    required?: boolean
    placeholder?: string
    autoComplete?: string
}

export function ProfileField({
    label,
    name,
    value,
    onChange,
    type = 'text',
    required = false,
    placeholder,
    autoComplete,
}: ProfileFieldProps) {
    const id = useId()

    return (
        <div className="flex min-w-0 flex-col gap-2.5">
            <label
                htmlFor={id}
                className="flex items-center gap-1 text-[15px] text-[#F5F1EB]"
            >
                <span>{label}</span>

                {required && (
                    <span
                        aria-hidden="true"
                        className="text-[22px] leading-none text-[#F0805F]"
                    >
                        *
                    </span>
                )}
            </label>

            <input
                id={id}
                name={name}
                type={type}
                value={value}
                onChange={(event) => onChange(event.target.value)}
                required={required}
                placeholder={placeholder}
                autoComplete={autoComplete}
                className="h-10 w-full min-w-0 rounded-[3px] border border-[#3F2319] bg-transparent px-3 text-[15px] text-[#F5F1EB] outline-none transition-colors placeholder:text-[#B39463] focus-visible:border-[#D28A4C] focus-visible:ring-1 focus-visible:ring-[#D28A4C]"
            />
        </div>
    )
}