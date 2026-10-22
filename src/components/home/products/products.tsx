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

    function handleNetworkToggle(id: string) {
        setSelectedNetworks((current) =>
            current.includes(id)
                ? current.filter((item) => item !== id)
                : [...current, id],
        )
    }

    const filteredNfts = useMemo(() => {
        const selectedNames = selectedCollections.map(
            (id) => collectionNames[id],
        )

        return nfts.filter((nft) => {
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

            return matchesCollection && matchesNetwork && matchesPrice
        })

    }, [selectedCollections, selectedNetworks, appliedPriceRange])

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

    function handleCollectionToggle(id: string) {
        setSelectedCollections((current) =>
            current.includes(id)
                ? current.filter((item) => item !== id)
                : [...current, id],
        )
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
                    onPriceApply={setAppliedPriceRange}
                />
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

                {sortedNfts.length > 0 ? (
                    <NftGrid nfts={sortedNfts} />
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
                        totalPages={4}
                        onPageChange={setCurrentPage}
                    />
                )}
            </div>
        </section>
    )
}