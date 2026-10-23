import { useState, type FormEvent } from 'react'

export function FooterNewsletter() {
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        setMessage(
            'O cadastro na newsletter ainda não está disponível.',
        )
    }

    return (
        <div className="flex min-w-0 flex-col gap-3 px-4">
            <h3 className="text-lg leading-8 font-bold text-[#F5F1EB]">
                Antecipe-se ao próximo lançamento
            </h3>

            <form
                onSubmit={handleSubmit}
                className="flex h-10 w-full overflow-hidden rounded-md bg-[#38220F] shadow-[0_0_20px_0_#0A060473]"
            >
                <label htmlFor="newsletter-email" className="sr-only">
                    Seu e-mail para receber novidades
                </label>

                <input
                    id="newsletter-email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="digite seu e-mail..."
                    value={email}
                    onChange={(event) => {
                        setEmail(event.target.value)
                        setMessage('')
                    }}
                    className="min-w-0 flex-1 px-3 text-sm text-[#F5F1EB] placeholder:text-[#B39463] focus:outline-none"
                />

                <button
                    type="submit"
                    className="flex h-10 shrink-0 items-center justify-center rounded-r-md bg-[#D28A4C] px-4 text-lg font-bold text-[#140D0A] transition-colors hover:bg-[#E89B55] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5F1EB]"
                >
                    Enviar
                </button>
            </form>

            {message && (
                <p role="status" className="text-xs leading-5 text-[#E89B55]">
                    {message}
                </p>
            )}

            <p className="text-[13px] leading-5.5 text-[#CFB28C]">
                Receba lançamentos selecionados, histórias de criadores e
                novidades do mercado.
            </p>
        </div>
    )
}
