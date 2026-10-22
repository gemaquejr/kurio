import featuredArtwork from '@/assets/NFT Artwork 04.png'

export function FeaturedNft() {
    return (
        <article
            aria-label="NFT em destaque"
            className="w-full overflow-hidden bg-[linear-gradient(180deg,rgba(210,138,76,0.1)_0%,rgba(210,138,76,0.03)_100%)] pt-6 pb-1"
        >
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-4">
                    <h2 className="px-5 text-2xl leading-8 font-bold text-[#E89B55]">
                        NFT EM DESTAQUE
                    </h2>

                    <p className="px-5 text-center text-[22px] leading-4 font-bold text-[#F5F1EB]">
                        OFERTA LIMITADA
                    </p>
                </div>

                <img
                    src={featuredArtwork}
                    alt="Obra NFT em destaque"
                    className="h-92 w-full rounded-[22px] object-cover"
                />
            </div>
        </article>
    )
}