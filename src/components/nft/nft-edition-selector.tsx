const editions = ['1/1', '1/10', '1/50', 'ABERTA'] as const

type Edition = (typeof editions)[number]

type NftEditionSelectorProps = {
    value: Edition
    onChange: (edition: Edition) => void
}

export function NftEditionSelector({
    value,
    onChange,
}: NftEditionSelectorProps) {

    return (
        <fieldset className="flex flex-col gap-3">
            <legend className="mb-3 text-[15px] font-bold text-[#F5F1EB]">
                Edição
            </legend>

            <div className="grid grid-cols-4 gap-2">
                {editions.map((edition) => (
                    <button
                        key={edition}
                        type="button"
                        aria-pressed={value === edition}
                        onClick={() => onChange(edition)}
                        className={`min-h-11 rounded-md border px-2 py-3 text-xs font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D28A4C] ${value === edition
                            ? 'border-[#D28A4C] bg-[#38220F] text-[#E89B55]'
                            : 'border-[#594232] bg-[#241612] text-[#CFB28C] hover:border-[#D28A4C]'
                            }`}
                    >
                        {edition}
                    </button>
                ))}
            </div>
        </fieldset>
    )
}
