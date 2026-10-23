import { useState, type FormEvent } from 'react'
import { Eye, EyeOff } from 'lucide-react'

export function SignInForm() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [message, setMessage] = useState('')

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        setMessage(
            'A autenticação ainda não está disponível nesta versão.',
        )
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="flex w-full flex-col gap-3 px-6 pt-6 sm:px-20"
        >
            <label htmlFor="sign-in-email" className="sr-only">
                E-mail
            </label>

            <input
                id="sign-in-email"
                type="email"
                name="email"
                autoComplete="email"
                required
                value={email}
                onChange={(event) => {
                    setEmail(event.target.value)
                    setMessage('')
                }}
                placeholder="contato@email.com"
                className="h-10 w-full rounded-[5px] border border-[#3F2319] bg-transparent px-4 text-sm text-[#F5F1EB] placeholder:text-[#B39463] focus:border-[#D28A4C] focus:outline-none"
            />

            <div className="relative">
                <label htmlFor="sign-in-password" className="sr-only">
                    Senha
                </label>

                <input
                    id="sign-in-password"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(event) => {
                        setPassword(event.target.value)
                        setMessage('')
                    }}
                    placeholder="**********"
                    className="h-10 w-full rounded-[5px] border border-[#3F2319] bg-transparent px-4 pr-12 text-sm text-[#F5F1EB] placeholder:text-[#B39463] focus:border-[#D28A4C] focus:outline-none"
                />

                <button
                    type="button"
                    aria-label={
                        showPassword ? 'Ocultar senha' : 'Mostrar senha'
                    }
                    aria-pressed={showPassword}
                    onClick={() => setShowPassword((current) => !current)}
                    className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer text-[#B39463] transition-colors hover:text-[#E89B55]"
                >
                    {showPassword ? (
                        <EyeOff size={20} aria-hidden="true" />
                    ) : (
                        <Eye size={20} aria-hidden="true" />
                    )}
                </button>
            </div>

            <button
                type="button"
                onClick={() =>
                    setMessage(
                        'A recuperação de senha ainda não está disponível.',
                    )
                }
                className="self-end cursor-pointer text-sm leading-4 text-[#E89B55] hover:underline"
            >
                Esqueceu a senha?
            </button>

            <button
                type="submit"
                className="mt-2 h-11.25 w-full cursor-pointer rounded-[5px] bg-[#D28A4C] text-base font-bold text-[#140D0A] transition-colors hover:bg-[#E89B55]"
            >
                Entrar
            </button>

            {message && (
                <p
                    role="status"
                    className="text-center text-xs leading-5 text-[#CFB28C]"
                >
                    {message}
                </p>
            )}
        </form>
    )
}