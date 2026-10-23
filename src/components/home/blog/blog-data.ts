import ownership from '../../../assets/NFT Artwork 05.png'
import digitalArtists from '../../../assets/hero.png'
import rarity from '../../../assets/NFT Artwork 04.png'
import walletSecurity from '../../../assets/NFT Artwork 04.png'

export type BlogPost = {
    id: string
    title: string
    description: string
    date: string
    readingTime: string
    image: string
    imageAlt: string
    href?: string
}

export const blogPosts: BlogPost[] = [
    {
        id: 'nft-ownership',
        title: 'Como funciona a propriedade de NFTs',
        description:
            'Aprenda a colecionar, negociar e verificar ativos digitais.',
        date: '12 de setembro',
        readingTime: '6 min',
        image: ownership,
        imageAlt: 'Ilustração sobre propriedade de NFTs',
    },
    {
        id: 'digital-artists',
        title: '10 artistas digitais para acompanhar',
        description:
            'Conheça criadores que moldam a cultura digital.',
        date: '13 de setembro',
        readingTime: '2 min',
        image: digitalArtists,
        imageAlt: 'Ilustração sobre artistas digitais',
    },
    {
        id: 'nft-rarity',
        title: 'Raridade, atributos e procedência',
        description:
            'Entenda raridade, procedência, direitos autorais e utilidade.',
        date: '15 de setembro',
        readingTime: '3 min',
        image: rarity,
        imageAlt: 'Ilustração sobre raridade de NFTs',
    },
    {
        id: 'wallet-security',
        title: 'Como proteger sua carteira',
        description:
            'Proteja sua carteira, seus ativos e sua identidade.',
        date: '15 de setembro',
        readingTime: '2 min',
        image: walletSecurity,
        imageAlt: 'Ilustração sobre segurança de carteiras digitais',
    },
]
