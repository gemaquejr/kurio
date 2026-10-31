
import { CartItem } from './cart-item'
import type { CartItem as CartItemType } from './cart-data'

type CartTableProps = {
    items: CartItemType[]
    onIncrease: (id: string) => void
    onDecrease: (id: string) => void
    onRemove: (id: string) => void
}

export function CartTable({
    items,
    onIncrease,
    onDecrease,
    onRemove,
}: CartTableProps) {
    return (
        <section aria-label="Itens do carrinho" className="min-w-0">
            <div className="overflow-x-auto">
                <div className="min-w-195.5">
                    <div className="grid grid-cols-[250px_77px_75px_87px_24px] items-center justify-between gap-2 pr-6">
                        <span className="text-base font-bold text-[#F5F1EB]">
                            NFTs
                        </span>
                        <span className="text-base font-medium text-[#F5F1EB]">
                            Preço
                        </span>
                        <span className="text-base font-bold text-[#F5F1EB]">
                            Edições
                        </span>
                        <span className="text-base font-medium text-[#F5F1EB]">
                            Total
                        </span>
                        <span aria-hidden="true" />
                    </div>

                    <div className="my-3 border-t border-[#D28A4C]/60" />

                    {items.length > 0 ? (
                        <div className="flex flex-col gap-3">
                            {items.map((item) => (
                                <CartItem
                                    key={item.id}
                                    item={item}
                                    onIncrease={onIncrease}
                                    onDecrease={onDecrease}
                                    onRemove={onRemove}
                                />
                            ))}
                        </div>
                    ) : (
                        <p
                            role="status"
                            className="bg-[#241612] px-4 py-8 text-center text-sm text-[#B39463]"
                        >
                            Seu carrinho está vazio.
                        </p>
                    )}
                </div>
            </div>
        </section>
    )
}
