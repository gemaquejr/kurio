import { NftCard, type Nft } from './nft-card'

type NftGridProps = {
    nfts: Nft[]
}

export function NftGrid({ nfts }: NftGridProps) {
    return (
        <div
            aria-label="Produtos disponíveis"
            className="grid grid-cols-1 gap-x-8.5 gap-y-18 sm:grid-cols-2 xl:grid-cols-3"
        >
            {nfts.map((nft) => (
                <NftCard key={nft.id} nft={nft} />
            ))}
        </div>
    )
}