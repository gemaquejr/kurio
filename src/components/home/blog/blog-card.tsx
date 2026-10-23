type BlogCardProps = {
    title: string
    description: string
    date: string
    readingTime: string
    image: string
    imageAlt: string
    href?: string
}

export function BlogCard({
    title,
    description,
    date,
    readingTime,
    image,
    imageAlt,
    href,
}: BlogCardProps) {
    return (
        <article className="flex min-h-92.25 w-full min-w-0 flex-col overflow-hidden rounded-lg bg-[#241612] lg:max-w-67">
            <img
                src={image}
                alt={imageAlt}
                loading="lazy"
                className="h-48.75 w-full shrink-0 object-cover"
            />

            <div className="flex flex-1 flex-col gap-2 px-4 pt-3 pb-4">
                <p className="text-xs leading-4 font-medium text-[#CFB28C]">
                    {date} | Leitura de {readingTime}
                </p>

                <h3 className="text-base leading-5 font-bold text-[#F5F1EB]">
                    {title}
                </h3>

                <p className="text-xs leading-4 font-medium text-[#CFB28C]">
                    {description}
                </p>

                {href && (
                    <a
                        href={href}
                        className="mt-auto inline-flex w-fit items-center gap-1 pt-2 text-xs leading-4 font-bold text-[#E89B55] transition-colors hover:text-[#F5B477] focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E89B55]"
                        aria-label={`Ler mais sobre ${title}`}
                    >
                        Ler mais
                        <span aria-hidden="true">→</span>
                    </a>
                )}
            </div>
        </article>
    )
}
