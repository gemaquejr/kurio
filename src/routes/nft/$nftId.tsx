import { useState } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { nfts } from '@/components/home/products/nft-data'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer/footer'

import { NftGallery } from '@/components/nft/nft-gallery'
import { NftRating } from '@/components/nft/nft-rating'
import { NftEditionSelector } from '@/components/nft/nft-edition-selector'
import { NftQuantitySelector } from '@/components/nft/nft-quantity-selector'
import { NftPurchaseActions } from '@/components/nft/nft-purchase-actions'
import { NftMetadata } from '@/components/nft/nft-metadata'
import { NftShare } from '@/components/nft/nft-share'
import { NftDescription } from '@/components/nft/nft-description'
import { NftRelatedProducts } from '@/components/nft/nft-related-products'

export const Route = createFileRoute('/nft/$nftId')({
    component: NftDetailsPage,
})

function NftDetailsPage() {
    const { nftId } = Route.useParams()

    const nft = nfts.find((item) => item.id === nftId)
    const [edition, setEdition] = useState<
        '1/1' | '1/10' | '1/50' | 'ABERTA'
    >('1/50')

    const [quantity, setQuantity] = useState(1)

    if (!nft) {
        return (
            <>
                <Header />

                <main className="mx-auto min-h-[60vh] w-full max-w-300 px-5 py-12">
                    <h1 className="text-2xl font-bold">
                        NFT não encontrado
                    </h1>

                    <p className="mt-4 text-[#CFB28C]">
                        O NFT solicitado não está disponível no catálogo.
                    </p>

                    <Link
                        to="/"
                        hash="mercado"
                        className="mt-6 inline-block text-[#E89B55] underline"
                    >
                        Voltar ao mercado
                    </Link>
                </main>

                <Footer />
            </>
        )
    }

    return (
        <>
            <Header />

            <main className="mx-auto w-full max-w-300 px-5 pt-8 pb-20 min-[1240px]:px-0">
                <nav
                    aria-label="Navegação estrutural"
                    className="mb-3 text-[15px] font-bold text-[#F5F1EB]"
                >
                    <Link to="/" className="hover:text-[#E89B55]">
                        Início
                    </Link>

                    <span className="mx-2">/</span>

                    <Link
                        to="/"
                        hash="mercado"
                        className="hover:text-[#E89B55]"
                    >
                        Mercado
                    </Link>
                </nav>

                <section className="grid min-w-0 grid-cols-[minmax(0,1fr)] gap-8 lg:grid-cols-2">
                    <NftGallery
                        image={nft.image}
                        name={nft.name ?? nft.id}
                    />

                    <div className="flex flex-col gap-5">
                        <h1 className="text-[28px] leading-none font-bold text-[#F5F1EB]">
                            {nft.name ?? 'NFT sem título'}
                        </h1>

                        {nft.price !== undefined && (
                            <p className="text-[22px] font-bold text-[#E89B55]">
                                {nft.price.toFixed(2)} ETH
                            </p>
                        )}


                        {nft.reviewCount !== undefined && (
                            <NftRating reviews={nft.reviewCount} />
                        )}

                        {nft.description && (
                            <p className="text-sm leading-6 text-[#CFB28C]">
                                {nft.description}
                            </p>
                        )}

                        <NftEditionSelector
                            value={edition}
                            onChange={setEdition}
                        />

                        <NftQuantitySelector
                            value={quantity}
                            onChange={setQuantity}
                        />

                        <NftPurchaseActions
                            nftName={nft.name ?? nft.id}
                            quantity={quantity}
                            edition={edition}
                        />

                        {nft.tokenId && nft.tokenCollection && (
                            <NftMetadata
                                tokenId={nft.tokenId}
                                collection={nft.tokenCollection}
                                attributes={nft.attributes ?? []}
                            />
                        )}

                        <NftShare nftName={nft.name ?? nft.id} />

                    </div>
                </section>

                <NftDescription nft={nft} />

                <NftRelatedProducts currentNftId={nft.id} />
            </main>

            <Footer />
        </>
    )
}
