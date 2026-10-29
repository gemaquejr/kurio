import { useState } from 'react'
import { MessageCircle } from 'lucide-react'
import { FaLinkedinIn, FaXTwitter } from 'react-icons/fa6'

type NftShareProps = {
    nftName: string
}

export function NftShare({ nftName }: NftShareProps) {
    const [message, setMessage] = useState('')

    const shareText = `Confira o NFT ${nftName} na Kurio!`

    function shareLinkedin() {
        const url = encodeURIComponent(window.location.href)

        window.open(
            `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
            '_blank',
            'noopener,noreferrer',
        )
    }

    function shareWhatsApp() {
        const text = encodeURIComponent(
            `${shareText} ${window.location.href}`,
        )

        window.open(
            `https://wa.me/?text=${text}`,
            '_blank',
            'noopener,noreferrer',
        )
    }

    function shareTwitter() {
        const text = encodeURIComponent(shareText)
        const url = encodeURIComponent(window.location.href)

        window.open(
            `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
            '_blank',
            'noopener,noreferrer',
        )
    }

    async function copyLink() {
        try {
            await navigator.clipboard.writeText(window.location.href)
            setMessage('Link copiado!')
        } catch {
            setMessage('Não foi possível copiar o link.')
        }
    }

    return (
        <div className="flex flex-col gap-3">
            <span className="text-sm font-bold text-[#F5F1EB]">
                Compartilhar:
            </span>

            <div className="flex flex-wrap items-center gap-3">
                <button
                    type="button"
                    onClick={shareLinkedin}
                    aria-label="Compartilhar no LinkedIn"
                    className="text-[#CFB28C] transition-colors hover:text-[#E89B55]"
                >
                    <FaLinkedinIn size={20} />
                </button>

                <button
                    type="button"
                    onClick={shareWhatsApp}
                    aria-label="Compartilhar no WhatsApp"
                    className="text-[#CFB28C] transition-colors hover:text-[#E89B55]"
                >
                    <MessageCircle size={20} />
                </button>

                <button
                    type="button"
                    onClick={shareTwitter}
                    aria-label="Compartilhar no X"
                    className="text-[#CFB28C] transition-colors hover:text-[#E89B55]"
                >
                    <FaXTwitter size={20} />
                </button>

                <button
                    type="button"
                    onClick={copyLink}
                    className="text-xs font-bold text-[#E89B55] hover:underline"
                >
                    Copiar link
                </button>
            </div>

            {message && (
                <p role="status" className="text-xs text-[#CFB28C]">
                    {message}
                </p>
            )}
        </div>
    )
}
