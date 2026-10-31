import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'

import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer/footer'
import { CartTable } from '@/components/cart/cart-table'
import {
    calculateCartSubtotal,
    initialCartItems,
    type CartItem,
} from '@/components/cart/cart-data'

import { CartSummary } from '@/components/cart/cart-summary'
import { CartRelatedProducts } from '@/components/cart/cart-related-products'

export const Route = createFileRoute('/cart/')({
    component: CartPage,
})

function CartPage() {
    const [items, setItems] = useState<CartItem[]>(initialCartItems)

    function handleIncrease(id: string) {
        setItems((previous) =>
            previous.map((item) =>
                item.id === id
                    ? { ...item, quantity: Math.min(item.quantity + 1, 10) }
                    : item,
            ),
        )
    }

    function handleDecrease(id: string) {
        setItems((previous) =>
            previous.map((item) =>
                item.id === id
                    ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
                    : item,
            ),
        )
    }

    function handleRemove(id: string) {
        setItems((previous) =>
            previous.filter((item) => item.id !== id),
        )
    }

    const subtotal = calculateCartSubtotal(items)

    return (
        <>
            <Header />

            <main className="mx-auto flex w-full max-w-300 flex-col gap-24 px-5 pt-8 pb-24 min-[1240px]:px-0">
                <section
                    aria-label="Carrinho de NFTs"
                    className="flex min-w-0 flex-col gap-3"
                >
                    <nav
                        aria-label="Navegação estrutural"
                        className="text-[15px] font-bold leading-4 text-[#F5F1EB]"
                    >
                        Início / Mercado / Carrinho
                    </nav>

                    <div className="grid min-w-0 grid-cols-1 gap-8 lg:grid-cols-[minmax(0,782px)_minmax(0,332px)] lg:justify-between">
                        <CartTable
                            items={items}
                            onIncrease={handleIncrease}
                            onDecrease={handleDecrease}
                            onRemove={handleRemove}
                        />

                        <CartSummary
                            subtotal={subtotal}
                            isEmpty={items.length === 0}
                        />
                    </div>
                </section>

                <CartRelatedProducts />
            </main>

            <Footer />
        </>
    )
}
