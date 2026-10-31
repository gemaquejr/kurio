
import { useState, type FormEvent } from 'react'
import { Link } from '@tanstack/react-router'

import { ESTIMATED_NETWORK_FEE_ETH } from './cart-data'

type CartSummaryProps = {
    subtotal: number
    isEmpty: boolean
}

export function CartSummary({
    subtotal,
    isEmpty,
}: CartSummaryProps) {
    const [promoCode, setPromoCode] = useState('')
    const [promoFeedback, setPromoFeedback] = useState('')
    const [checkoutFeedback, setCheckoutFeedback] = useState('')

    const discount = 0
    const networkFee = isEmpty ? 0 : ESTIMATED_NETWORK_FEE_ETH
    const total = subtotal - discount + networkFee

    function handleApplyPromo(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        setPromoFeedback(
            'A aplicação de códigos promocionais ainda não está disponível.',
        )
    }

    function handleCheckout() {
        setCheckoutFeedback(
            'A conexão com a carteira e a finalização da compra ainda não estão disponíveis.',
        )
    }

    return (
        <aside
            aria-labelledby="cart-summary-title"
            className="flex min-w-0 flex-col gap-6"
        >
            <div className="flex flex-col gap-3">
                <h2
                    id="cart-summary-title"
                    className="text-lg leading-4 font-bold text-[#F5F1EB]"
                >
                    Resumo da carteira
                </h2>

                <div className="border-t border-[#D28A4C]/60" />
            </div>

            <form
                onSubmit={handleApplyPromo}
                className="flex flex-col gap-2"
            >
                <label
                    htmlFor="cart-promo-code"
                    className="text-sm leading-4 font-bold text-[#F5F1EB]"
                >
                    Código promocional
                </label>

                <div className="flex h-10 overflow-hidden rounded-[3px] border border-[#D28A4C]">
                    <input
                        id="cart-promo-code"
                        type="text"
                        value={promoCode}
                        onChange={(event) => {
                            setPromoCode(event.target.value)
                            setPromoFeedback('')
                        }}
                        placeholder="Digite o código promocional..."
                        className="min-w-0 flex-1 bg-transparent px-2 text-xs text-[#F5F1EB] placeholder:text-[#B39463] focus:outline-none"
                    />

                    <button
                        type="submit"
                        disabled={isEmpty || !promoCode.trim()}
                        className="w-25.5 shrink-0 bg-[#D28A4C] text-[15px] font-bold text-[#140D0A] transition-colors hover:bg-[#E89B55] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        Aplicar
                    </button>
                </div>

                {promoFeedback && (
                    <p
                        role="status"
                        className="text-xs text-[#B39463]"
                    >
                        {promoFeedback}
                    </p>
                )}
            </form>

            <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between gap-3">
                    <span className="text-[15px] text-[#F5F1EB]">
                        Subtotal
                    </span>
                    <span className="text-lg text-[#F5F1EB]">
                        {subtotal.toFixed(2)} ETH
                    </span>
                </div>

                <div className="flex items-center justify-between gap-3">
                    <span className="text-[15px] text-[#F5F1EB]">
                        Desconto do lançamento
                    </span>
                    <span className="text-[15px] text-[#F5F1EB]">
                        (-) {discount.toFixed(2)}
                    </span>
                </div>

                <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between gap-3">
                        <span className="text-[15px] text-[#F5F1EB]">
                            Taxa de rede
                        </span>
                        <span className="text-lg text-[#F5F1EB]">
                            {networkFee.toFixed(3)} ETH
                        </span>
                    </div>

                    <p className="text-xs leading-4 text-[#E89B55]">
                        Taxa estimada
                    </p>
                </div>

                <div className="flex items-center justify-between gap-3">
                    <span className="text-base font-bold text-[#F5F1EB]">
                        Total
                    </span>
                    <span className="text-lg font-bold text-[#E89B55]">
                        {total.toFixed(3)} ETH
                    </span>
                </div>
            </div>

            <div className="flex flex-col gap-3">
                <button
                    type="button"
                    onClick={handleCheckout}
                    disabled={isEmpty}
                    className="h-10 w-full rounded-[3px] bg-[#D28A4C] text-[15px] font-bold text-[#140D0A] transition-colors hover:bg-[#E89B55] disabled:cursor-not-allowed disabled:opacity-50"
                >
                    Conectar e finalizar
                </button>

                <Link
                    to="/"
                    className="text-center text-[15px] text-[#E89B55] hover:underline"
                >
                    Continuar explorando
                </Link>

                {checkoutFeedback && (
                    <p
                        role="status"
                        className="text-xs text-[#B39463]"
                    >
                        {checkoutFeedback}
                    </p>
                )}
            </div>
        </aside>
    )
}
