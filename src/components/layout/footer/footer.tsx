
import { FooterTop } from './footer-top'
import { FooterBrand } from './footer-brand'
import { FooterBottom } from './footer-bottom'

export function Footer() {
    return (
        <footer
            id="footer"
            aria-label="Rodapé do Kurio"
            className="mx-auto w-full max-w-300"
        >
            <FooterTop />
            <FooterBrand />
            <FooterBottom />

            <div className="bg-[#140D0A] px-5 text-center">
                <p className="text-sm leading-7.5 text-[#F5F1EB]">
                    © 2026 Kurio. Propriedade digital para todos.
                </p>
            </div>
        </footer>
    )
}
