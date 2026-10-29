import { Minus, Plus } from 'lucide-react'

type NftQuantitySelectorProps = {
    value: number
    min?: number
    max?: number
    onChange: (quantity: number) => void
}

export function NftQuantitySelector({
    value,
    min = 1,
    max = 10,
    onChange,
}: NftQuantitySelectorProps) {
    function updateQuantity(nextQuantity: number) {
        if (nextQuantity < min || nextQuantity > max) return

        onChange(nextQuantity)
    }

    return (
        <div className="flex flex-col gap-3">
            <span className="text-[15px] font-bold text-[#F5F1EB]">
                Quantidade
            </span>

            <div className="flex h-11 w-fit items-center overflow-hidden rounded-md border border-[#594232] bg-[#241612]">
                <button
                    type="button"
                    onClick={() => updateQuantity(value - 1)}
                    disabled={value <= min}
                    aria-label="Diminuir quantidade"
                    className="flex h-full w-11 items-center justify-center text-[#CFB28C] transition-colors hover:bg-[#38220F] disabled:cursor-not-allowed disabled:opacity-40"
                >
                    <Minus size={16} />
                </button>

                <output
                    aria-label="Quantidade selecionada"
                    className="flex h-full min-w-12 items-center justify-center border-x border-[#594232] text-sm font-bold text-[#F5F1EB]"
                >
                    {value}
                </output>

                <button
                    type="button"
                    onClick={() => updateQuantity(value + 1)}
                    disabled={value >= max}
                    aria-label="Aumentar quantidade"
                    className="flex h-full w-11 items-center justify-center text-[#CFB28C] transition-colors hover:bg-[#38220F] disabled:cursor-not-allowed disabled:opacity-40"
                >
                    <Plus size={16} />
                </button>
            </div>
        </div>
    )
}
