import { useState } from 'react'

const MIN_PRICE = 0.02
const MAX_PRICE = 12.3
const STEP = 0.01

type PriceRange = {
    min: number
    max: number
}

type PriceFilterProps = {
    onApply?: (range: PriceRange) => void
}

function formatPrice(value: number) {
    return value.toFixed(2).replace('.', ',')
}

export function PriceFilter({ onApply }: PriceFilterProps) {
    const [minPrice, setMinPrice] = useState(MIN_PRICE)
    const [maxPrice, setMaxPrice] = useState(MAX_PRICE)

    const minPercent =
        ((minPrice - MIN_PRICE) / (MAX_PRICE - MIN_PRICE)) * 100

    const maxPercent =
        ((maxPrice - MIN_PRICE) / (MAX_PRICE - MIN_PRICE)) * 100

    return (
        <fieldset className="flex flex-col gap-3">
            <legend className="mb-3 text-lg leading-4 font-bold text-[#F5F1EB]">
                Faixa de preço
            </legend>

            <div className="flex flex-col gap-3 pl-3">
                <div className="relative h-5.25 w-full">
                    <div className="absolute top-1/2 h-1 w-full -translate-y-1/2 rounded-full bg-[#3F2319]" />

                    <div
                        className="absolute top-1/2 h-1 -translate-y-1/2 rounded-full bg-[#D28A4C]"
                        style={{
                            left: `${minPercent}%`,
                            right: `${100 - maxPercent}%`,
                        }}
                    />

                    <input
                        aria-label="Preço mínimo"
                        type="range"
                        min={MIN_PRICE}
                        max={MAX_PRICE}
                        step={STEP}
                        value={minPrice}
                        onChange={(event) => {
                            const value = Number(event.target.value)
                            setMinPrice(Math.min(value, maxPrice))
                        }}
                        className="pointer-events-none absolute inset-0 h-full w-full appearance-none bg-transparent [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:size-3.75 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-[3px] [&::-moz-range-thumb]:border-[#140D0A] [&::-moz-range-thumb]:bg-[#D28A4C] [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:size-3.75 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-[3px] [&::-webkit-slider-thumb]:border-[#140D0A] [&::-webkit-slider-thumb]:bg-[#D28A4C]"
                    />

                    <input
                        aria-label="Preço máximo"
                        type="range"
                        min={MIN_PRICE}
                        max={MAX_PRICE}
                        step={STEP}
                        value={maxPrice}
                        onChange={(event) => {
                            const value = Number(event.target.value)
                            setMaxPrice(Math.max(value, minPrice))
                        }}
                        className="pointer-events-none absolute inset-0 h-full w-full appearance-none bg-transparent [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:size-3.75 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-[3px] [&::-moz-range-thumb]:border-[#140D0A] [&::-moz-range-thumb]:bg-[#D28A4C] [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:size-3.75 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-[3px] [&::-webkit-slider-thumb]:border-[#140D0A] [&::-webkit-slider-thumb]:bg-[#D28A4C]"
                    />
                </div>

                <p className="text-[15px] leading-5 text-[#F5F1EB]">
                    Preço: {formatPrice(minPrice)} - {formatPrice(maxPrice)} ETH
                </p>

                <button
                    type="button"
                    onClick={() => onApply?.({ min: minPrice, max: maxPrice })}
                    className="h-9 w-23 cursor-pointer rounded-md bg-[#D28A4C] px-3 py-2 text-base leading-5 font-bold text-[#140D0A] transition-opacity hover:opacity-90"
                >
                    Aplicar
                </button>
            </div>
        </fieldset>
    )
}