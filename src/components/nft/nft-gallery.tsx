import { useState } from 'react'

type NftGalleryProps = {
    image: string
    name: string
}

export function NftGallery({ image, name }: NftGalleryProps) {
    const images = Array.from({ length: 4 }, (_, index) => ({
        id: index + 1,
        src: image,
    }))

    const [selectedImage, setSelectedImage] = useState(1)

    const activeImage = images.find(
        (item) => item.id === selectedImage,
    ) ?? images[0]

    return (
        <div className="flex flex-col gap-4 sm:flex-row">
            <div
                className="flex max-w-full gap-4 overflow-x-auto pb-2 sm:flex-col sm:overflow-visible sm:pb-0"
                aria-label="Miniaturas do NFT"
            >
                {images.map((item) => (
                    <button
                        key={item.id}
                        type="button"
                        onClick={() => setSelectedImage(item.id)}
                        aria-label={`Visualizar imagem ${item.id} de ${name}`}
                        aria-pressed={selectedImage === item.id}
                        className={`h-20 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition-colors sm:h-25 sm:w-25 ${selectedImage === item.id
                            ? 'border-[#D28A4C]'
                            : 'border-transparent hover:border-[#CFB28C]'
                            }`}
                    >
                        <img
                            src={item.src}
                            alt=""
                            className="h-full w-full object-cover"
                        />
                    </button>
                ))}
            </div>

            <div className="flex min-w-0 flex-1 items-center justify-center bg-[#241612] p-4">
                <img
                    src={activeImage.src}
                    alt={`Arte do NFT ${name}`}
                    className="aspect-square w-full max-w-101 rounded-3xl object-cover"
                />
            </div>
        </div>
    )
}
