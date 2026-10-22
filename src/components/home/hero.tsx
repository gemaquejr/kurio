import heroImage from '@/assets/hero.png'

export function Hero() {
    return (
        <section
            aria-label="Apresentação do Kurio"
className="grid w-full grid-cols-1 items-center gap-8 min-[1440px]:h-112.5 min-[1440px]:grid-cols-[600px_450px] min-[1440px]:justify-between min-[1440px]:gap-0 min-[1440px]:pl-10"        >
            <div className="flex w-full max-w-150 flex-col items-start gap-11 lg:h-91">
                <div className="flex w-full flex-col items-start gap-8">
                    <div className="flex w-full flex-col items-start gap-1">
                        <div className="flex w-full flex-col items-start gap-2">
                            <p className="w-full text-[14px] leading-4 font-medium tracking-widest text-foreground">
                                Bem-vindo à Kurio
                            </p>

                            <h1 className="w-full text-[43px] leading-17.5 font-bold tracking-normal text-foreground">
                                SEJA DONO DO FUTURO
                                <br />
                                DA ARTE DIGITAL
                            </h1>
                        </div>

                        <p className="w-full max-w-139.25 text-[14px] leading-6 font-normal tracking-normal text-text-secondary">
                            Descubra NFTs selecionados de criadores emergentes e consagrados.
                            Colecione arte digital rara, apoie artistas e tenha uma parte da
                            cultura da internet.
                        </p>
                    </div>

                    <a
                        href="#mercado"
                        className="inline-flex h-10 w-35 items-center justify-center gap-2.5 rounded-[6px] bg-primary pt-2.5 pr-9 pb-2.5 pl-7 text-[16px] leading-5 font-bold text-[#140D0A] transition-opacity hover:opacity-90"
                    >
                        EXPLORAR
                    </a>
                </div>

                <div
                    aria-hidden="true"
                    className="flex h-2 w-10 items-center gap-2"
                >
                    <span className="h-2 w-2 rounded-full bg-primary" />
                    <span className="h-2 w-2 rounded-full bg-primary" />
                    <span className="h-2 w-2 rounded-full bg-primary" />
                </div>
            </div>

            <div className="flex items-center justify-center lg:h-112.5 lg:w-112.5">
                <img
                    src={heroImage}
                    alt="Personagem ilustrado da coleção Kurio"
                    className="h-auto w-full max-w-112.5 rounded-[24px] object-contain lg:h-112.5"
                />
            </div>
        </section>
    )
}