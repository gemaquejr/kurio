import { FooterLinkGroup } from './footer-link-group'
import { footerLinkGroups } from './footer-links-data'
import { FooterSocial } from './footer-social'

export function FooterBottom() {
    return (
        <div className="w-full bg-[#241612] px-5 py-8 lg:min-h-59 lg:px-8">
            <div className="mx-auto grid w-full max-w-284 grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-[repeat(3,minmax(0,1fr))_minmax(0,1.28fr)] lg:gap-8">
                {footerLinkGroups.map((group) => (
                    <FooterLinkGroup
                        key={group.title}
                        {...group}
                    />
                ))}

                <FooterSocial />
            </div>
        </div>
    )
}
