import { Filters } from './filters'
import { FeaturedNft } from './featured-nft'

export function Products() {
    return (
        <section
            id="mercado"
            aria-label="Marketplace de NFTs"
            className="mx-auto grid w-full max-w-300 grid-cols-1 gap-8 min-[1200px]:grid-cols-[310px_minmax(0,1fr)] min-[1200px]:gap-12"
        >
            <aside
                aria-label="Filtros do marketplace"
                className="flex min-w-0 flex-col gap-6"
            >
                <Filters />
                <FeaturedNft />
            </aside>

            <div
                aria-label="Listagem de NFTs"
                className="min-w-0"
            />
        </section>
    )
}