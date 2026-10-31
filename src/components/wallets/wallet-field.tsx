
import type { ReactNode } from 'react'

type WalletFieldProps = {
    id: string
    label: string
    required?: boolean
    children: ReactNode
}

export function WalletField({
    id,
    label,
    required = false,
    children,
}: WalletFieldProps) {
    return (
        <div className="flex min-w-0 flex-col">
            <label
                htmlFor={id}
                className="flex h-6 items-start gap-1 text-[15px] leading-3.75 text-[#F5F1EB]"
            >
                <span>{label}</span>

                {required && (
                    <span
                        aria-hidden="true"
                        className="text-[22px] leading-5.5 text-[#F0805F]"
                    >
                        *
                    </span>
                )}
            </label>

            {children}
        </div>
    )
}

export const walletInputClassName =
    'h-10 w-full min-w-0 rounded-[3px] border border-[#3F2319] bg-transparent px-3 text-sm text-[#F5F1EB] placeholder:text-[#B39463] outline-none focus-visible:border-[#D28A4C] focus-visible:ring-1 focus-visible:ring-[#D28A4C]'

export const walletSelectClassName =
    `${walletInputClassName} appearance-none pr-10`
