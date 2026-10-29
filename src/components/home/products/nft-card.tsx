import { Link } from '@tanstack/react-router'

export type Nft = {
    id: string
    name?: string
    price?: number
    previousPrice?: number
    image: string
    collection?: string
    network?: 'ethereum' | 'polygon' | 'solana'
    isNew?: boolean
    isTrending?: boolean
    description?: string
    tokenId?: string
    attributes?: string[]
    reviewCount?: number
    tokenCollection?: string
    storage?: string
    contract?: string
    royalties?: number
    details?: string
}

type NftCardProps = {
    nft: Nft
}


export function NftCard({ nft }: NftCardProps) {
    const image = (
        <div className="flex h-75 items-center justify-center overflow-hidden bg-[#241612]">
            <img
                src={nft.image}
                alt={nft.name ? `Arte do NFT ${nft.name}` : 'Arte NFT'}
                loading="lazy"
                className="h-62.5 w-62.5 max-w-full rounded-[15px] object-cover"
            />
        </div>
    )

    return (
        <article className="flex min-w-0 flex-col gap-3">
            {nft.name ? (
                <Link
                    to="/nft/$nftId"
                    params={{ nftId: nft.id }}
                    className="block focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D28A4C]"
                    aria-label={`Ver detalhes de ${nft.name}`}
                >
                    {image}
                </Link>
            ) : (
                image
            )}

            {nft.name && (
                <h3 className="text-base leading-4 text-[#F5F1EB]">
                    <Link
                        to="/nft/$nftId"
                        params={{ nftId: nft.id }}
                        className="hover:text-[#E89B55] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D28A4C]"
                    >
                        {nft.name}
                    </Link>
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
