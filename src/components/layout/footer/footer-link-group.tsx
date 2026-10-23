
import type { FooterLinkGroup as FooterLinkGroupType } from './footer-links-data'

type FooterLinkGroupProps = FooterLinkGroupType

export function FooterLinkGroup({
    title,
    items,
}: FooterLinkGroupProps) {
    return (
        <div className="flex min-w-0 flex-col gap-2">
            <h3 className="text-lg leading-4 font-bold text-[#F5F1EB]">
                {title}
            </h3>

            <ul className="flex flex-col">
                {items.map((item) => (
                    <li
                        key={item}
                        className="text-sm leading-7.5 text-[#F5F1EB]"
                    >
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    )
}
