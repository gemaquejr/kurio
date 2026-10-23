import {
    FaFacebookF,
    FaInstagram,
    FaTwitter,
    FaLinkedinIn,
    FaDiscord,
} from 'react-icons/fa'

const socialNetworks = [
    { name: 'Facebook', Icon: FaFacebookF },
    { name: 'Instagram', Icon: FaInstagram },
    { name: 'Twitter', Icon: FaTwitter },
    { name: 'LinkedIn', Icon: FaLinkedinIn },
    { name: 'Discord', Icon: FaDiscord },
]

export function FooterSocial() {
    return (
        <div className="flex min-w-0 flex-col gap-8">
            <div className="flex flex-col gap-5">
                <h3 className="text-lg leading-4 font-bold text-[#F5F1EB]">
                    Redes sociais
                </h3>

                <div
                    className="flex flex-wrap gap-2.5"
                    aria-label="Redes sociais"
                >
                    {socialNetworks.map(({ name, Icon }) => (
                        <span
                            key={name}
                            aria-label={name}
                            title={`${name} — link indisponível`}
                            className="flex h-7.5 w-7.5 items-center justify-center rounded-sm border border-[#D28A4C] text-[#D28A4C]"
                        >
                            <Icon aria-hidden="true" size={16} />
                        </span>
                    ))}
                </div>
            </div>

            <div className="flex flex-col gap-3">
                <h3 className="text-lg leading-4 font-bold text-[#F5F1EB]">
                    Carteiras compatíveis
                </h3>

                <div className="flex min-h-6.5 w-fit max-w-full items-center rounded-md border border-[#55321F] bg-[#38220F] px-2">
                    <p className="text-[9px] leading-3 font-bold tracking-[0.1px] text-[#E89B55]">
                        METAMASK&nbsp; • &nbsp;WALLETCONNECT&nbsp; • &nbsp;COINBASE
                    </p>
                </div>
            </div>
        </div>
    )
}
