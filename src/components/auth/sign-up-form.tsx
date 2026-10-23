import { useState, type FormEvent } from 'react'
import { Eye, EyeOff } from 'lucide-react'

export function SignUpForm() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [message, setMessage] = useState('')

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        if (password !== confirmPassword) {
            setMessage('As senhas não coincidem.')
            return
        }

        setMessage('O cadastro ainda não está disponível nesta versão.')
    }

    const inputClassName =
        'h-10 w-full rounded-[5px] border border-[#3F2319] bg-transparent px-4 text-sm text-[#F5F1EB] placeholder:text-[#B39463] focus:border-[#D28A4C] focus:outline-none'

    return (
        <form
            onSubmit={handleSubmit}
            className="flex w-full flex-col gap-3 px-6 pt-6 sm:px-20"
        >
            <label htmlFor="sign-up-name" className="sr-only">
                Nome completo
            </label>
            <input
                id="sign-up-name"
                type="text"
                autoComplete="name"
                required
                value={name}
                onChange={(event) => {
                    setName(event.target.value)
                    setMessage('')
                }}
                placeholder="Nome completo"
                className={inputClassName}
            />

            <label htmlFor="sign-up-email" className="sr-only">
                E-mail
            </label>
            <input
                id="sign-up-email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(event) => {
                    setEmail(event.target.value)
                    setMessage('')
                }}
                placeholder="contato@email.com"
                className={inputClassName}
            />

            <div className="relative">
                <label htmlFor="sign-up-password" className="sr-only">
                    Senha
                </label>
                <input
                    id="sign-up-password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    required
                    minLength={8}
                    value={password}
                    onChange={(event) => {
                        setPassword(event.target.value)
                        setMessage('')
                    }}
                    placeholder="Senha (mínimo de 8 caracteres)"
                    className={`${inputClassName} pr-12`}
                />
                <button
                    type="button"
                    aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                    aria-pressed={showPassword}
                    onClick={() => setShowPassword((current) => !current)}
                    className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer text-[#B39463] hover:text-[#E89B55]"
                >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
            </div>

            <label htmlFor="sign-up-confirm-password" className="sr-only">
                Confirmar senha
            </label>
            <input
                id="sign-up-confirm-password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                required
                minLength={8}
                value={confirmPassword}
                onChange={(event) => {
                    setConfirmPassword(event.target.value)
                    setMessage('')
                }}
                placeholder="Confirmar senha"
                className={inputClassName}
            />

            <button
                type="submit"
                className="mt-2 h-11.25 w-full cursor-pointer rounded-[5px] bg-[#D28A4C] text-base font-bold text-[#140D0A] hover:bg-[#E89B55]"
            >
                Criar conta
            </button>

            {message && (
                <p
                    role="status"
                    aria-live="polite"
                    className="text-center text-xs leading-5 text-[#CFB28C]"
                >
                    {message}
                </p>
            )}
        </form>
    )
}