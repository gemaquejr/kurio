import { useState } from 'react'
import { FaFacebookF, FaGoogle } from 'react-icons/fa'

export function SignInSocial() {
    const [message, setMessage] = useState('')

    function handleSocialLogin(provider: string) {
        setMessage(`A autenticação com ${provider} ainda não está disponível.`)
    }

    return (
        <div className="w-full pt-6">
            <div className="flex items-center gap-3">
                <span
                    aria-hidden="true"
                    className="h-px flex-1 bg-[#3F2319]"
                />

                <span className="shrink-0 text-[13px] leading-4 text-[#F5F1EB]">
                    Ou continue com
                </span>

                <span
                    aria-hidden="true"
                    className="h-px flex-1 bg-[#3F2319]"
                />
            </div>

            <div className="flex flex-col gap-3 px-6 pt-3 sm:px-20">
                <button
                    type="button"
                    onClick={() => handleSocialLogin('Google')}
                    className="flex h-10 w-full cursor-pointer items-center justify-center gap-3 rounded-[5px] border border-[#3F2319] text-[13px] font-medium text-[#CFB28C] transition-colors hover:border-[#D28A4C]"
                >
                    <FaGoogle
                        size={20}
                        aria-hidden="true"
                        className="text-[#4285F4]"
                    />
                    Continuar com Google
                </button>

                <button
                    type="button"
                    onClick={() => handleSocialLogin('Facebook')}
                    className="flex h-10 w-full cursor-pointer items-center justify-center gap-3 rounded-[5px] border border-[#3F2319] text-[13px] font-medium text-[#CFB28C] transition-colors hover:border-[#D28A4C]"
                >
                    <FaFacebookF
                        size={20}
                        aria-hidden="true"
                        className="text-[#3B5999]"
                    />
                    Continuar com Facebook
                </button>

                {message && (
                    <p
                        role="status"
                        className="text-center text-xs leading-5 text-[#CFB28C]"
                    >
                        {message}
                    </p>
                )}
            </div>
        </div>
    )
}