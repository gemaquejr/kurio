
import { useRef, useState } from 'react'

import { NftCard } from '@/components/home/products/nft-card'
import { nfts } from '@/components/home/products/nft-data'

const relatedNftIds = [
    'cosmic-bloom-118',
    'violet-nomad-314',
    'ivory-baron-088',
    'golden-beat-207',
    'golden-signal-160',
]

const relatedNfts = relatedNftIds
    .map((id) => nfts.find((nft) => nft.id === id))
    .filter((nft) => nft !== undefined)

const carouselPositions = [0, 0.5, 1]

export function CartRelatedProducts() {
    const carouselRef = useRef<HTMLDivElement>(null)
    const [activePage, setActivePage] = useState(0)

    if (relatedNfts.length === 0) {
        return null
    }

    function handleNavigate(index: number) {
        const carousel = carouselRef.current

        if (!carousel) {
            return
        }

        const maxScroll = carousel.scrollWidth - carousel.clientWidth

        carousel.scrollTo({
            left: maxScroll * carouselPositions[index],
            behavior: 'smooth',
        })

        setActivePage(index)
    }

    return (
        <section
            aria-labelledby="cart-related-products-title"
            className="flex min-w-0 flex-col gap-8"
        >
            <div className="flex flex-col gap-3">
                <h2
                    id="cart-related-products-title"
                    className="text-[17px] leading-5 font-bold text-[#E89B55]"
                >
                    Colecionadores também viram
                </h2>

                <div className="border-t border-[#D28A4C]/60" />
            </div>

            <div
                ref={carouselRef}
                className="flex min-w-0 snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-2"
                aria-label="Produtos recomendados"
            >
                {relatedNfts.map((nft) => (
                    <div
                        key={nft.id}
                        className="w-54.75 shrink-0 snap-start"
                    >
                        <NftCard nft={nft} />
                    </div>
                ))}
            </div>

            <div
                className="flex items-center justify-center gap-3"
                aria-label="Navegação dos produtos relacionados"
            >
                {carouselPositions.map((_, index) => (
                    <button
                        key={index}
                        type="button"
                        onClick={() => handleNavigate(index)}
                        aria-label={`Ir para a posição ${index + 1} dos produtos`}
                        aria-pressed={activePage === index}
                        className={`h-2.5 w-2.5 rounded-full transition-colors ${activePage === index
                                ? 'bg-[#D28A4C]'
                                : 'bg-[#594232] hover:bg-[#CFB28C]'
                            }`}
                    />
                ))}
            </div>
        </section>
    )
}
