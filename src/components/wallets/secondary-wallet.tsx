
import { useState } from 'react'

export function SecondaryWallet() {
    const [sameAsPrimary, setSameAsPrimary] = useState(false)
    const [feedback, setFeedback] = useState('')

    function handleAdd() {
        setFeedback(
            'A inclusão de carteiras secundárias ainda não está disponível.',
        )
    }

    return (
        <section
            aria-labelledby="secondary-wallet-title"
            className="flex min-w-0 flex-col gap-3"
        >
            <div className="flex flex-wrap items-center justify-between gap-3">
                <h2
                    id="secondary-wallet-title"
                    className="text-[17px] leading-4 font-bold text-[#F5F1EB]"
                >
                    Carteira secundária
                </h2>

                <div className="flex flex-wrap items-center gap-5">
                    <label className="flex cursor-pointer items-center gap-2 text-sm text-[#F5F1EB]">
                        <input
                            type="checkbox"
                            checked={sameAsPrimary}
                            onChange={(event) => {
                                setSameAsPrimary(event.target.checked)
                                setFeedback('')
                            }}
                            className="h-4 w-4 cursor-pointer accent-[#D28A4C]"
                        />
                        Igual à carteira principal
                    </label>

                    <button
                        type="button"
                        onClick={handleAdd}
                        className="text-base font-medium text-[#E89B55] hover:text-[#F5F1EB] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D28A4C]"
                    >
                        Adicionar
                    </button>
                </div>
            </div>

            <p className="text-sm leading-3.75 text-[#CFB28C]">
                Você ainda não adicionou uma carteira secundária.
            </p>

            {feedback && (
                <p role="status" className="text-sm text-[#CFB28C]">
                    {feedback}
                </p>
            )}
        </section>
    )
}
