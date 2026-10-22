import { Filters } from './filters'
import { FeaturedNft } from './featured-nft'
import { useMemo, useState } from 'react'
import { ProductToolbar } from './product-toolbar'
import { NftGrid } from './nft-grid'
import { ProductPagination } from './product-pagination'
import { nfts } from './nft-data'

const collectionNames: Record<string, string> = {
    'digital-art': 'Arte digital',
    photography: 'Fotografia',
    music: 'Música',
    '3d-art': 'Arte 3D',
    collectibles: 'Colecionáveis',
    generative: 'Generativa',
    gaming: 'Jogos',
    memberships: 'Assinaturas',
    utility: 'Utilidade',
}

const ITEMS_PER_PAGE = 9

export function Products() {
    const [activeTab, setActiveTab] = useState<
        'all' | 'new' | 'trending'
    >('all')

    const [sortBy, setSortBy] = useState<
        'recent' | 'price-low' | 'price-high'
    >('recent')

    const [currentPage, setCurrentPage] = useState(1)

    const [selectedCollections, setSelectedCollections] = useState<string[]>([])

    const [selectedNetworks, setSelectedNetworks] = useState<string[]>([])

    const [appliedPriceRange, setAppliedPriceRange] = useState<{
        min: number
        max: number
    } | null>(null)

    function handleTabChange(tab: 'all' | 'new' | 'trending') {
        setActiveTab(tab)
        setCurrentPage(1)
    }

    function handleNetworkToggle(id: string) {
        setSelectedNetworks((current) =>
            current.includes(id)
                ? current.filter((item) => item !== id)
                : [...current, id],
        )

        setCurrentPage(1)
    }

    const filteredNfts = useMemo(() => {
        const selectedNames = selectedCollections.map(
            (id) => collectionNames[id],
        )

        return nfts.filter((nft) => {
            const matchesTab =
                activeTab === 'all' ||
                (activeTab === 'new' && nft.isNew === true) ||
                (activeTab === 'trending' && nft.isTrending === true)

            const matchesCollection =
                selectedCollections.length === 0 ||
                (nft.collection !== undefined &&
                    selectedNames.includes(nft.collection))

            const matchesNetwork =
                selectedNetworks.length === 0 ||
                (nft.network !== undefined &&
                    selectedNetworks.includes(nft.network))

            const matchesPrice =
                appliedPriceRange === null ||
                (nft.price !== undefined &&
                    nft.price >= appliedPriceRange.min &&
                    nft.price <= appliedPriceRange.max)

            return matchesTab && matchesCollection && matchesNetwork && matchesPrice
        })

    }, [activeTab, selectedCollections, selectedNetworks, appliedPriceRange])

    const sortedNfts = useMemo(() => {
        const items = [...filteredNfts]

        switch (sortBy) {
            case 'price-low':
                return items.sort(
                    (a, b) => (a.price ?? Infinity) - (b.price ?? Infinity),
                )

            case 'price-high':
                return items.sort(
                    (a, b) => (b.price ?? -Infinity) - (a.price ?? -Infinity),
                )

            default:
                return items
        }
    }, [filteredNfts, sortBy])

    const totalPages = Math.ceil(sortedNfts.length / ITEMS_PER_PAGE)

    const paginatedNfts = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE

        return sortedNfts.slice(
            startIndex,
            startIndex + ITEMS_PER_PAGE,
        )
    }, [sortedNfts, currentPage])

    function handleCollectionToggle(id: string) {
        setSelectedCollections((current) =>
            current.includes(id)
                ? current.filter((item) => item !== id)
                : [...current, id],
        )
        setCurrentPage(1)
    }

    function handlePriceApply(range: { min: number; max: number }) {
        setAppliedPriceRange(range)
        setCurrentPage(1)
    }

    function handleSortChange(
        value: 'recent' | 'price-low' | 'price-high',
    ) {
        setSortBy(value)
        setCurrentPage(1)
    }

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
                <Filters
                    selectedCollections={selectedCollections}
                    onCollectionToggle={handleCollectionToggle}
                    selectedNetworks={selectedNetworks}
                    onNetworkToggle={handleNetworkToggle}
                    onPriceApply={handlePriceApply}
                />
                <FeaturedNft />
            </aside>

            <div
                aria-label="Listagem de NFTs"
                className="flex min-w-0 flex-col gap-8"
            >
                <ProductToolbar
                    activeTab={activeTab}
                    onTabChange={handleTabChange}
                    sortBy={sortBy}
                    onSortChange={handleSortChange}
                />

                {sortedNfts.length > 0 ? (
                    <NftGrid nfts={paginatedNfts} />
                ) : (
                    <div
                        role="status"
                        className="flex min-h-87.5 flex-col items-center justify-center gap-3 rounded-xl bg-[#241612] px-6 text-center"
                    >
                        <h3 className="text-lg font-bold text-[#F5F1EB]">
                            Nenhum NFT encontrado
                        </h3>

                        <p className="max-w-md text-sm leading-6 text-[#CFB28C]">
                            Não encontramos NFTs que correspondam aos filtros selecionados.
                            Experimente alterar sua seleção.
                        </p>
                    </div>
                )}

                {sortedNfts.length > 0 && (
                    <ProductPagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                )}
            </div>
        </section>
    )
}