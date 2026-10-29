import type { Nft } from './nft-card'

import hero from '@/assets/hero.png'
import artwork04 from '@/assets/NFT Artwork 04.png'
import artwork05 from '@/assets/NFT Artwork 05.png'
import artwork09 from '@/assets/NFT Artwork 09.png'

export const nfts: Nft[] = [
    {
        id: 'emerald-ape-042',
        name: 'Emerald Ape #042',
        price: 1.19,
        image: hero,
        collection: 'Arte digital',
        network: 'ethereum',
        isNew: true,
        isTrending: true,
        description:
            'Um colecionável digital finalizado à mão da coleção Kurio Editions, verificado na Ethereum, com arte desbloqueável e acesso para colecionadores.',
        tokenId: '#0042',
        attributes: ['Óculos', 'Esmeralda', 'Raro'],
        reviewCount: 19,
        tokenCollection: 'Kurio Apes',
        storage: 'IPFS',
        contract: '0x7A42...19E8',
        royalties: 5,
        details:
            'Emerald Ape #042 faz parte da coleção Kurio Apes, uma seleção de colecionáveis digitais com identidade visual própria. Esta edição demonstra os recursos de apresentação de NFTs da plataforma Kurio.',
    },
    {
        id: 'sage-nomad-009',
        name: 'Sage Nomad #009',
        price: 1.69,
        image: artwork04,
        collection: 'Fotografia',
        network: 'polygon',
        isNew: true,
    },
    {
        id: 'neon-vessel-552',
        name: 'Neon Vessel #552',
        price: 1.99,
        previousPrice: 2.29,
        image: artwork05,
        collection: 'Arte 3D',
        network: 'solana',
        isTrending: true,
    },
    {
        id: 'cosmic-bloom-118',
        name: 'Cosmic Bloom #118',
        price: 1.29,
        image: artwork04,
        collection: 'Generativa',
        network: 'ethereum',
        isNew: true,
    },
    {
        id: 'violet-nomad-314',
        name: 'Violet Nomad #314',
        price: 1.39,
        image: artwork04,
        collection: 'Arte digital',
        network: 'polygon',
        isTrending: true,
    },
    {
        id: 'ivory-baron-088',
        name: 'Ivory Baron #088',
        price: 1.79,
        image: artwork05,
        collection: 'Colecionáveis',
        network: 'ethereum',
    },
    {
        id: 'golden-beat-207',
        name: 'Golden Beat #207',
        price: 0.99,
        image: artwork09,
        collection: 'Música',
        network: 'solana',
        isNew: true,
    },
    {
        id: 'artwork-09',
        image: artwork09,
        collection: 'Jogos',
        network: 'ethereum',
    },
    {
        id: 'golden-signal-160',
        name: 'Golden Signal #160',
        price: 0.39,
        image: artwork09,
        collection: 'Utilidade',
        network: 'polygon',
        isTrending: true,
    },
]