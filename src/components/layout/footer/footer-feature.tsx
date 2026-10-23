type FooterFeatureProps = {
    symbol: string
    title: string
    description: string
}

export function FooterFeature({
    symbol,
    title,
    description,
}: FooterFeatureProps) {
    return (
        <div className="flex min-w-0 flex-col gap-3 px-4">
            <div
                className="flex h-18.5 w-18.5 shrink-0 items-center justify-center rounded-full bg-[#D28A4C]"
                aria-hidden="true"
            >
                <span className="text-2xl font-bold text-[#140D0A]">
                    {symbol}
                </span>
            </div>

            <h3 className="text-[17px] leading-5 font-bold text-[#F5F1EB]">
                {title}
            </h3>

            <p className="max-w-51 text-sm leading-5.5 text-[#CFB28C]">
                {description}
            </p>
        </div>
    )
}
