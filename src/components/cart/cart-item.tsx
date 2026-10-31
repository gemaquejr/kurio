import { Minus, Plus, Trash2 } from 'lucide-react'

import type { CartItem as CartItemType } from './cart-data'

type CartItemProps = {
    item: CartItemType
    onIncrease: (id: string) => void
    onDecrease: (id: string) => void
    onRemove: (id: string) => void
}

export function CartItem({
    item,
    onIncrease,
    onDecrease,
    onRemove,
}: CartItemProps) {
    const total = item.priceEth * item.quantity

    return (
        <article className="grid min-h-17.5 grid-cols-[250px_77px_75px_87px_24px] items-center justify-between gap-2 bg-[#241612] pr-6">
            <div className="flex min-w-0 items-center gap-4">
                <div className="h-17.5 w-17.5 shrink-0 overflow-hidden rounded-md bg-[#3F2319]">
                    {item.image && (
                        <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover"
                        />
                    )}
                </div>

                <div className="flex min-w-0 flex-col gap-1.5">
                    <h3 className="truncate text-base leading-4 font-bold text-[#F5F1EB]">
                        {item.name}
                    </h3>

                    <p className="text-sm leading-4 text-[#B39463]">
                        ID do token: {item.tokenId}
                    </p>
                </div>
            </div>

            <span className="text-base leading-4 font-bold text-[#CFB28C]">
                {item.priceEth.toFixed(2)} ETH
            </span>

            <div
                className="flex items-center justify-between gap-2"
                aria-label={`Quantidade de ${item.name}`}
            >
                <button
                    type="button"
                    onClick={() => onDecrease(item.id)}
                    disabled={item.quantity <= 1}
                    aria-label={`Diminuir quantidade de ${item.name}`}
                    className="flex h-7.5 w-5 items-center justify-center rounded-full border border-[#140D0A] bg-[#D28A4C] text-black shadow-md disabled:cursor-not-allowed disabled:opacity-40"
                >
                    <Minus size={12} />
                </button>

                <span className="text-[17px] text-[#F5F1EB]">
                    {item.quantity}
                </span>

                <button
                    type="button"
                    onClick={() => onIncrease(item.id)}
                    disabled={item.quantity >= 10}
                    aria-label={`Aumentar quantidade de ${item.name}`}
                    className="flex h-7.5 w-5 items-center justify-center rounded-full border border-[#140D0A] bg-[#D28A4C] text-black shadow-md disabled:cursor-not-allowed disabled:opacity-40"
                >
                    <Plus size={12} />
                </button>
            </div>

            <span className="text-right text-base leading-4 font-bold text-[#E89B55]">
                {total.toFixed(2)} ETH
            </span>

            <button
                type="button"
                onClick={() => onRemove(item.id)}
                aria-label={`Remover ${item.name} do carrinho`}
                className="flex h-6 w-6 items-center justify-center text-[#B39463] transition-colors hover:text-[#F0805F]"
            >
                <Trash2 size={20} strokeWidth={1.5} />
            </button>
        </article>
    )
}