import { PriceFilter } from './price-filter'

const collections = [
    { id: 'digital-art', name: 'Arte digital', count: 33 },
    { id: 'photography', name: 'Fotografia', count: 12 },
    { id: 'music', name: 'Música', count: 65 },
    { id: '3d-art', name: 'Arte 3D', count: 39 },
    { id: 'collectibles', name: 'Colecionáveis', count: 23 },
    { id: 'generative', name: 'Generativa', count: 17 },
    { id: 'gaming', name: 'Jogos', count: 19 },
    { id: 'memberships', name: 'Assinaturas', count: 13 },
    { id: 'utility', name: 'Utilidade', count: 18 },
]

const networks = [
    { id: 'ethereum', name: 'Ethereum', count: 119 },
    { id: 'polygon', name: 'Polygon', count: 78 },
    { id: 'solana', name: 'Solana', count: 78 },
]

type FilterOption = {
    id: string
    name: string
    count: number
}

type FilterGroupProps = {
    title: string
    options: FilterOption[]
    selected: string[]
    onToggle: (id: string) => void
}

function FilterGroup({
    title,
    options,
    selected,
    onToggle,
}: FilterGroupProps) {
    return (
        <fieldset>
            <legend className="mb-3 text-lg leading-4 font-bold text-[#F5F1EB]">
                {title}
            </legend>

            <div className="px-3">
                {options.map((option) => {
                    const isSelected = selected.includes(option.id)

                    return (
                        <label
                            key={option.id}
                            className="flex min-h-10 cursor-pointer items-center justify-between gap-3"
                        >
                            <span className="flex min-w-0 items-center gap-2.5">
                                <input
                                    type="checkbox"
                                    checked={isSelected}
                                    onChange={() => onToggle(option.id)}
                                    className="size-4 accent-[#D28A4C]"
                                />

                                <span
                                    className={`text-[15px] ${isSelected
                                        ? 'text-[#E89B55]'
                                        : 'text-[#CFB28C]'
                                        }`}
                                >
                                    {option.name}
                                </span>
                            </span>

                            <span
                                className={`text-[15px] ${isSelected
                                    ? 'font-bold text-[#E89B55]'
                                    : 'text-[#CFB28C]'
                                    }`}
                            >
                                ({option.count})
                            </span>
                        </label>
                    )
                })}
            </div>
        </fieldset>
    )
}

type FiltersProps = {
    selectedCollections: string[]
    onCollectionToggle: (id: string) => void
    selectedNetworks: string[]
    onNetworkToggle: (id: string) => void
    onPriceApply: (range: { min: number; max: number }) => void
}

export function Filters({
    selectedCollections,
    onCollectionToggle,
    selectedNetworks,
    onNetworkToggle,
    onPriceApply,
}: FiltersProps) {
    return (
        <div className="w-full bg-[#241612] p-5">
            <div className="flex flex-col gap-10">
                <FilterGroup
                    title="Coleções"
                    options={collections}
                    selected={selectedCollections}
                    onToggle={onCollectionToggle}
                />

                <PriceFilter onApply={onPriceApply} />

                <FilterGroup
                    title="Rede"
                    options={networks}
                    selected={selectedNetworks}
                    onToggle={onNetworkToggle}
                />
            </div>
        </div>
    )
}