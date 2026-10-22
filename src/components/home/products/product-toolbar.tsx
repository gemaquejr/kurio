type ProductTab = 'all' | 'new' | 'trending'

type SortOption = 'recent' | 'price-low' | 'price-high'

type ProductToolbarProps = {
    activeTab: ProductTab
    onTabChange: (tab: ProductTab) => void
    sortBy: SortOption
    onSortChange: (sort: SortOption) => void
}

const tabs: { id: ProductTab; label: string }[] = [
    { id: 'all', label: 'Todos os NFTs' },
    { id: 'new', label: 'Novos lançamentos' },
    { id: 'trending', label: 'Em alta' },
]

export function ProductToolbar({
    activeTab,
    onTabChange,
    sortBy,
    onSortChange,
}: ProductToolbarProps) {
    return (
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div
                role="group"
                aria-label="Categorias de NFTs"
                className="flex flex-wrap items-center gap-5"
            >
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        type="button"
                        aria-pressed={activeTab === tab.id}
                        onClick={() => onTabChange(tab.id)}
                        className={`cursor-pointer whitespace-nowrap text-[15px] leading-4 font-medium transition-colors ${activeTab === tab.id
                                ? 'text-[#E89B55]'
                                : 'text-[#F5F1EB] hover:text-[#E89B55]'
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="flex items-center gap-2 text-[15px] text-[#F5F1EB]">
                <label htmlFor="product-sort" className="shrink-0">
                    Ordenar por:
                </label>

                <select
                    id="product-sort"
                    value={sortBy}
                    onChange={(event) =>
                        onSortChange(event.target.value as SortOption)
                    }
                    className="min-w-0 cursor-pointer bg-transparent text-[15px] text-[#F5F1EB] outline-none focus-visible:ring-2 focus-visible:ring-[#D28A4C] [&>option]:bg-[#241612]"
                >
                    <option value="recent">Listados recentemente</option>
                    <option value="price-low">Menor preço</option>
                    <option value="price-high">Maior preço</option>
                </select>
            </div>
        </div>
    )
}