import { PromoCard } from './promo-card'

import genesisArtwork from '../../../assets/hero.png'
import curatedArtwork from '../../../assets/NFT Artwork 05.png'

export function Promos() {
    return (
        <section
            aria-label="Promoções do marketplace"
            className="mx-auto grid w-full max-w-300 grid-cols-1 gap-7 lg:grid-cols-2"
        >
            <PromoCard
                title="Lançamentos gênesis de edição limitada"
                description="Colecione edições escassas diretamente dos criadores antes da revelação pública."
                image={genesisArtwork}
                imageAlt="Arte promocional dos lançamentos gênesis"
                action={
                    <a
                        href="#mercado"
                        className="inline-flex h-10 w-35 items-center justify-center gap-2 rounded-md bg-[#D28A4C] text-sm font-medium text-[#140D0A] transition-colors hover:bg-[#E89B55]"
                    >
                        Explorar
                        <span aria-hidden="true">→</span>
                    </a>
                }
            />

            <PromoCard
                title="Arte digital selecionada e muito mais"
                description="Explore novos artistas, coleções verificadas e obras digitais que definem a cultura."
                image={curatedArtwork}
                imageAlt="Arte promocional de coleções digitais"
                action={
                    <a
                        href="#mercado"
                        className="inline-flex h-10 w-35 items-center justify-center gap-2 rounded-md bg-[#D28A4C] text-sm font-medium text-[#140D0A] transition-colors hover:bg-[#E89B55]"
                    >
                        Explorar
                        <span aria-hidden="true">→</span>
                    </a>
                }
            />
        </section>
    )
}