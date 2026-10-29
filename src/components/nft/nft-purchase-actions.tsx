import { useState } from 'react'
import { Heart, ShoppingCart } from 'lucide-react'

type NftPurchaseActionsProps = {
    nftName: string
    quantity: number
    edition: string
}

export function NftPurchaseActions({
    nftName,
    quantity,
    edition,
}: NftPurchaseActionsProps) {
    const [isFavorite, setIsFavorite] = useState(false)
    const [message, setMessage] = useState('')

    function handlePurchase() {
        setMessage(
            `Compra demonstrativa: ${quantity} unidade(s) de ${nftName}, edição ${edition}. O pagamento ainda não está disponível.`,
        )
    }

    function handleFavorite() {
        setIsFavorite((current) => !current)
        setMessage('')
    }

    return (
        <div className="flex flex-col gap-3">
            <div className="flex flex-wrap gap-3">
                <button
                    type="button"
                    onClick={handlePurchase}
                    className="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-md bg-[#D28A4C] px-5 py-3 text-sm font-bold text-[#140D0A] transition-colors hover:bg-[#E89B55] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E89B55]"
                >
                    <ShoppingCart size={18} />
                    Comprar
                </button>

                <button
                    type="button"
                    onClick={handleFavorite}
                    aria-pressed={isFavorite}
                    className={`flex min-h-12 flex-1 items-center justify-center gap-2 rounded-md border px-5 py-3 text-sm font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E89B55] ${isFavorite
                            ? 'border-[#D28A4C] bg-[#38220F] text-[#E89B55]'
                            : 'border-[#594232] bg-[#241612] text-[#F5F1EB] hover:border-[#D28A4C]'
                        }`}
                >
                    <Heart
                        size={18}
                        fill={isFavorite ? 'currentColor' : 'none'}
                    />
                    {isFavorite ? 'Favoritado' : 'Favoritar'}
                </button>
            </div>

            {message && (
                <p
                    role="status"
                    className="rounded-md border border-[#594232] bg-[#241612] p-3 text-sm leading-6 text-[#CFB28C]"
                >
                    {message}
                </p>
            )}
        </div>
    )
}
