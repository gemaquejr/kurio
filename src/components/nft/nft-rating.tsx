import { Star } from 'lucide-react'

type NftRatingProps = {
    reviews: number
}

export function NftRating({ reviews }: NftRatingProps) {
    return (
        <div className="flex flex-wrap items-center gap-3">
            <div
                className="flex items-center gap-1"
                role="img"
                aria-label="Avaliação visual de 4 de 5 estrelas"
            >
                {Array.from({ length: 5 }, (_, index) => (
                    <Star
                        key={index}
                        size={18}
                        strokeWidth={1.5}
                        className={
                            index < 4
                                ? 'fill-[#E89B55] text-[#E89B55]'
                                : 'fill-[#594232] text-[#594232]'
                        }
                        aria-hidden="true"
                    />
                ))}
            </div>

            <span className="text-sm text-[#CFB28C]">
                {reviews} avaliações de colecionadores
            </span>
        </div>
    )
}
