import { useEffect, useRef, useState } from 'react'
import { X } from 'lucide-react'
import { createPortal } from 'react-dom'

import { SignInForm } from './sign-in-form'
import { SignInSocial } from './sign-in-social'
import { SignUpForm } from './sign-up-form'

type SignInModalProps = {
    onClose: () => void
}

export function SignInModal({ onClose }: SignInModalProps) {
    const dialogRef = useRef<HTMLDivElement>(null)
    const [activeTab, setActiveTab] = useState<'sign-in' | 'sign-up'>('sign-in')

    useEffect(() => {
        const previousOverflow = document.body.style.overflow
        const previouslyFocused = document.activeElement as HTMLElement | null

        document.body.style.overflow = 'hidden'
        dialogRef.current?.focus()

        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === 'Escape') {
                onClose()
            }

            if (event.key === 'Tab' && dialogRef.current) {
                const focusableElements = Array.from(
                    dialogRef.current.querySelectorAll<HTMLElement>(
                        'button:not([disabled]), input:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
                    ),
                )

                if (focusableElements.length === 0) {
                    event.preventDefault()
                    dialogRef.current.focus()
                    return
                }

                const first = focusableElements[0]
                const last = focusableElements[focusableElements.length - 1]

                if (event.shiftKey && document.activeElement === first) {
                    event.preventDefault()
                    last.focus()
                } else if (!event.shiftKey && document.activeElement === last) {
                    event.preventDefault()
                    first.focus()
                } else if (!focusableElements.includes(document.activeElement as HTMLElement)) {
                    event.preventDefault()
                    first.focus()
                }
            }
        }

        document.addEventListener('keydown', handleKeyDown)

        return () => {
            document.body.style.overflow = previousOverflow
            document.removeEventListener('keydown', handleKeyDown)
            previouslyFocused?.focus()
        }
    }, [onClose])

    return createPortal(
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) {
                    onClose()
                }
            }}
        >
            <div
                ref={dialogRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby="sign-in-title"
                tabIndex={-1}
                className="relative flex max-h-[calc(100dvh-32px)] w-full max-w-125 flex-col overflow-y-auto bg-[#241612] text-[#F5F1EB] shadow-2xl"
            >
                <h2 id="sign-in-title" className="sr-only">
                    {activeTab === 'sign-in' ? 'Entrar' : 'Criar conta'}
                </h2>

                <button
                    type="button"
                    aria-label="Fechar modal"
                    onClick={onClose}
                    className="absolute top-5 right-5 cursor-pointer text-[#D28A4C] transition-colors hover:text-[#E89B55]"
                >
                    <X size={18} />
                </button>

                <div className="flex flex-col items-center px-8 pt-12">
                    <div
                        role="tablist"
                        aria-label="Autenticação"
                        className="flex items-center justify-center gap-2"
                    >
                        <button
                            type="button"
                            role="tab"
                            id="sign-in-tab"
                            aria-selected={activeTab === 'sign-in'}
                            aria-controls="auth-panel"
                            onClick={() => setActiveTab('sign-in')}
                            className={`cursor-pointer text-xl leading-5 font-medium ${activeTab === 'sign-in'
                                ? 'text-[#E89B55]'
                                : 'text-[#F5F1EB]'
                                }`}
                        >
                            Entrar
                        </button>

                        <span
                            aria-hidden="true"
                            className="h-5 w-px bg-[#F0805F]"
                        />

                        <button
                            type="button"
                            role="tab"
                            id="sign-up-tab"
                            aria-selected={activeTab === 'sign-up'}
                            aria-controls="auth-panel"
                            onClick={() => setActiveTab('sign-up')}
                            className={`cursor-pointer text-xl leading-5 font-medium ${activeTab === 'sign-up'
                                ? 'text-[#E89B55]'
                                : 'text-[#F5F1EB]'
                                }`}
                        >
                            Criar conta
                        </button>
                    </div>

                    <p className="mt-10 max-w-101 text-center text-[13px] leading-4">
                        {activeTab === 'sign-in'
                            ? 'Entre para gerenciar sua carteira, coleção e perfil de criador.'
                            : 'Crie sua conta para começar a explorar o universo Kurio.'}
                    </p>
                </div>

                <div
                    id="auth-panel"
                    role="tabpanel"
                    aria-labelledby={
                        activeTab === 'sign-in' ? 'sign-in-tab' : 'sign-up-tab'
                    }
                >
                    {activeTab === 'sign-in' ? (
                        <SignInForm />
                    ) : (
                        <SignUpForm />
                    )}
                </div>
                <SignInSocial />

                <div aria-hidden="true" className="h-2.5 shrink-0 bg-[#D28A4C]" />
            </div>
        </div>,
        document.body,
    )
}