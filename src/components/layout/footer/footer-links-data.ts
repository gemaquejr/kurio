
export type FooterLinkGroup = {
    title: string
    items: string[]
}

export const footerLinkGroups: FooterLinkGroup[] = [
    {
        title: 'Meu perfil',
        items: [
            'Meu perfil',
            'Minha coleção',
            'Atividade',
            'Estúdio do criador',
            'Lista de interesse',
        ],
    },
    {
        title: 'Central de ajuda',
        items: [
            'Central de ajuda',
            'Como comprar NFTs',
            'Carteira e segurança',
            'Política do mercado',
            'Denunciar item',
        ],
    },
    {
        title: 'Coleções',
        items: [
            'Arte digital',
            'Fotografia',
            'Música',
            'Arte 3D',
            'Utilidade',
        ],
    },
]
