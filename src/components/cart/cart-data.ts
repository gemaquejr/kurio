import { nfts } from '@/components/home/products/nft-data'

export type CartItem = {
    id: string
    name: string
    tokenId: string
    priceEth: number
    quantity: number
    image: string
}

function getNftImage(id: string): string {
    return nfts.find((nft) => nft.id === id)?.image ?? ''
}

export const initialCartItems: CartItem[] = [
    {
        id: 'emerald-ape-042',
        name: 'Emerald Ape #042',
        tokenId: '#0042',
        priceEth: 1.19,
        quantity: 2,
        image: getNftImage('emerald-ape-042'),
    },
    {
        id: 'violet-nomad-314',
        name: 'Violet Nomad #314',
        tokenId: '#0009',
        priceEth: 1.39,
        quantity: 6,
        image: getNftImage('violet-nomad-314'),
    },
    {
        id: 'ivory-baron-088',
        name: 'Ivory Baron #088',
        tokenId: '#0552',
        priceEth: 1.79,
        quantity: 9,
        image: getNftImage('ivory-baron-088'),
    },
]

export const ESTIMATED_NETWORK_FEE_ETH = 0.016

export function calculateCartSubtotal(items: CartItem[]): number {
    return items.reduce(
        (subtotal, item) => subtotal + item.priceEth * item.quantity,
        0,
    )
}