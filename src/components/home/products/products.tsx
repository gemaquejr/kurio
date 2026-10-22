import { Filters } from './filters'
import { FeaturedNft } from './featured-nft'
import { useState } from 'react'
import { ProductToolbar } from './product-toolbar'
import { NftGrid } from './nft-grid'
import { ProductPagination } from './product-pagination'

export function Products() {
    const [activeTab, setActiveTab] = useState<
        'all' | 'new' | 'trending'
    >('all')

    const [sortBy, setSortBy] = useState<
        'recent' | 'price-low' | 'price-high'
    >('recent')

    const [currentPage, setCurrentPage] = useState(1)

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
                className="flex min-w-0 flex-col gap-8"
            >
                <ProductToolbar
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                    sortBy={sortBy}
                    onSortChange={setSortBy}
                />

                <NftGrid />

                <ProductPagination
                    currentPage={currentPage}
                    totalPages={4}
                    onPageChange={setCurrentPage}
                />
            </div>
        </section>
    )
}