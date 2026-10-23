import { FooterFeature } from './footer-feature'
import { FooterNewsletter } from './footer-newsletter'

const features = [
    {
        symbol: 'W',
        title: 'Segurança da carteira',
        description:
            'Proteja sua carteira e colecione arte digital verificada com confiança.',
    },
    {
        symbol: 'C',
        title: 'Criadores em destaque',
        description:
            'Conheça artistas, estúdios e comunidades que moldam a cultura digital na rede.',
    },
    {
        symbol: 'D',
        title: 'Alertas de lançamentos',
        description:
            'Receba calendários de cunhagem, novidades de listas de acesso e análises do mercado.',
    },
]

export function FooterTop() {
    return (
        <div className="w-full bg-[#241612] px-5 py-8 lg:min-h-62.5 lg:px-8">
            <div className="mx-auto grid w-full max-w-284 grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-[repeat(3,minmax(0,1fr))_minmax(0,1.35fr)] lg:gap-0">
                {features.map((feature) => (
                    <div
                        key={feature.symbol}
                        className="min-w-0 lg:border-r lg:border-[#D28A4C]"
                    >
                        <FooterFeature {...feature} />
                    </div>
                ))}

                <div className="min-w-0">
                    <FooterNewsletter />
                </div>
            </div>
        </div>
    )
}
