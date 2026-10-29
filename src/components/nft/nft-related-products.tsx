import { useState } from 'react'
import { NftCard } from '@/components/home/products/nft-card'
import { nfts } from '@/components/home/products/nft-data'

type NftRelatedProductsProps = {
    currentNftId: string
}

export function NftRelatedProducts({
    currentNftId,
}: NftRelatedProductsProps) {
    const relatedNftIds = [
        'cosmic-bloom-118',
        'violet-nomad-314',
        'ivory-baron-088',
        'golden-beat-207',
        'golden-signal-160',
    ]

    const relatedNfts = relatedNftIds
        .filter((id) => id !== currentNftId)
        .map((id) => nfts.find((nft) => nft.id === id))
        .filter((nft) => nft !== undefined)

    const [activePage, setActivePage] = useState(0)

    if (relatedNfts.length === 0) return null

    const pageSize = 5
    const totalPages = Math.ceil(relatedNfts.length / pageSize)
    const visibleNfts = relatedNfts.slice(
        activePage * pageSize,
        (activePage + 1) * pageSize,
    )

    return (
        <section
            aria-labelledby="related-nfts-title"
            className="mt-20"
        >
            <h2
                id="related-nfts-title"
                className="mb-8 text-2xl font-bold text-[#F5F1EB]"
            >
                Mais desta coleção
            </h2>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                {visibleNfts.map((nft) => (
                    <NftCard key={nft.id} nft={nft} />
                ))}
            </div>

            {totalPages > 1 && (
                <div
                    className="mt-8 flex justify-center gap-3"
                    aria-label="Paginação dos NFTs relacionados"
                >
                    {Array.from(
                        { length: totalPages },
                        (_, index) => (
                            <button
                                key={index}
                                type="button"
                                onClick={() => setActivePage(index)}
                                aria-label={`Página ${index + 1}`}
                                aria-current={
                                    activePage === index
                                        ? 'page'
                                        : undefined
                                }
                                className={`h-2.5 w-2.5 rounded-full transition-colors ${activePage === index
                                        ? 'bg-[#D28A4C]'
                                        : 'bg-[#594232] hover:bg-[#CFB28C]'
                                    }`}
                            />
                        ),
                    )}
                </div>
            )}
        </section>
    )
}
