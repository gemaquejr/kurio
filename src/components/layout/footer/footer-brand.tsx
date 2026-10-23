
export function FooterBrand() {
    return (
        <div className="w-full bg-[#38220F] px-5 py-8 lg:min-h-22 lg:px-8">
            <div className="mx-auto grid w-full max-w-284 grid-cols-1 items-center gap-6 sm:grid-cols-2 lg:grid-cols-[repeat(3,minmax(0,1fr))_minmax(0,1.1fr)] lg:gap-4">
                <a
                    href="/"
                    aria-label="Kurio — voltar para o início"
                    className="w-fit py-2 text-sm font-bold tracking-widest text-[#F5F1EB] transition-colors hover:text-[#D28A4C] focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D28A4C]"
                >
                    KURIO
                </a>

                <p className="max-w-55 text-sm leading-5.5 text-[#F5F1EB]">
                    Feito para colecionadores, criadores e cultura
                </p>

                <a
                    href="mailto:contato@email.com"
                    className="w-fit text-sm leading-5.5 text-[#F5F1EB] transition-colors hover:text-[#D28A4C] focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D28A4C]"
                >
                    contato@email.com
                </a>

                <a
                    href="tel:+551140028922"
                    className="w-fit text-sm leading-5.5 text-[#F5F1EB] transition-colors hover:text-[#D28A4C] focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D28A4C]"
                >
                    +55 11 4002 8922
                </a>
            </div>
        </div>
    )
}
