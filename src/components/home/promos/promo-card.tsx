import type { ReactNode } from 'react'

type PromoCardProps = {
    title: string
    description: string
    image: string
    imageAlt: string
    action: ReactNode
}

export function PromoCard({
    title,
    description,
    image,
    imageAlt,
    action,
}: PromoCardProps) {
    return (
        <article className="relative flex min-h-62.5 w-full flex-col overflow-hidden rounded-lg bg-[#241612] sm:h-62.5 sm:flex-row">
            {/* Imagem à esquerda */}
            <div className="relative h-50 w-full shrink-0 overflow-hidden sm:h-full sm:w-1/2">
                <img
                    src={image}
                    alt={imageAlt}
                    loading="lazy"
                    className="h-full w-full object-cover"
                />
            </div>

            {/* Conteúdo à direita */}
            <div className="relative z-10 flex min-w-0 flex-1 flex-col items-end px-5 py-7 text-right sm:justify-start sm:py-9 sm:pr-7 sm:pl-0">
                <h3 className="max-w-65 text-lg leading-6 font-bold text-[#F5F1EB]">
                    {title}
                </h3>

                <p className="mt-2 max-w-65 text-sm leading-6 text-[#CFB28C]">
                    {description}
                </p>

                <div className="mt-5 sm:mt-auto">
                    {action}
                </div>
            </div>
        </article>
    )
}