export type Nft = {
    id: string
    name?: string
    price?: number
    previousPrice?: number
    image: string
}

type NftCardProps = {
    nft: Nft
}

export function NftCard({ nft }: NftCardProps) {
    return (
        <article className="flex min-w-0 flex-col gap-3">
            <div className="flex h-75 items-center justify-center overflow-hidden bg-[#241612]">
                <img
                    src={nft.image}
                    alt={nft.name ? `Arte do NFT ${nft.name}` : 'Arte NFT'}
                    loading="lazy"
                    className="h-62.5 w-62.5 max-w-full rounded-[15px] object-cover"
                />
            </div>

            {nft.name && (
                <h3 className="text-base leading-4 text-[#F5F1EB]">
                    {nft.name}
                </h3>
            )}

            {nft.price !== undefined && (
                <div className="flex flex-wrap items-center gap-3">
                    <span className="text-lg leading-4 font-bold text-[#E89B55]">
                        {nft.price.toFixed(2)} ETH
                    </span>

                    {nft.previousPrice !== undefined && (
                        <span className="text-lg leading-4 text-[#B39463]">
                            {nft.previousPrice.toFixed(2)} ETH
                        </span>
                    )}
                </div>
            )}
        </article>
    )
}