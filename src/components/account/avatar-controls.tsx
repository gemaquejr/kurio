import { useEffect, useId, useRef, useState } from 'react'
import { Image as ImageIcon } from 'lucide-react'

export function AvatarControls() {
    const inputId = useId()
    const inputRef = useRef<HTMLInputElement>(null)

    const [previewUrl, setPreviewUrl] = useState<string | null>(null)
    const [error, setError] = useState('')

    useEffect(() => {
        return () => {
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl)
            }
        }
    }, [previewUrl])

    function handleFileChange(
        event: React.ChangeEvent<HTMLInputElement>,
    ) {
        const file = event.target.files?.[0]

        if (!file) return

        if (!['image/png', 'image/jpeg', 'image/webp'].includes(file.type)) {
            setError('Selecione uma imagem PNG, JPEG ou WebP.')
            event.target.value = ''
            return
        }

        if (file.size > 2 * 1024 * 1024) {
            setError('A imagem deve ter no máximo 2 MB.')
            event.target.value = ''
            return
        }

        setError('')
        setPreviewUrl(URL.createObjectURL(file))
    }

    function handleRemove() {
        setPreviewUrl(null)
        setError('')

        if (inputRef.current) {
            inputRef.current.value = ''
        }
    }

    return (
        <div className="flex min-w-0 flex-col gap-2.5">
            <label
                htmlFor={inputId}
                className="text-[15px] text-[#F5F1EB]"
            >
                Avatar
            </label>

            <div className="flex flex-wrap items-center gap-6">
                <div className="flex h-12.5 w-12.5 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#3F2319] bg-[#2F1D15]">
                    {previewUrl ? (
                        <img
                            src={previewUrl}
                            alt="Prévia do avatar selecionado"
                            className="h-full w-full object-cover"
                        />
                    ) : (
                        <ImageIcon
                            size={24}
                            strokeWidth={1.5}
                            className="text-[#D28A4C]"
                            aria-hidden="true"
                        />
                    )}
                </div>

                <div className="flex items-center gap-5">
                    <button
                        type="button"
                        onClick={() => inputRef.current?.click()}
                        className="h-10 rounded-[3px] bg-[#D28A4C] px-5 text-sm font-bold text-[#140D0A] transition-colors hover:bg-[#E89B55] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E89B55]"
                    >
                        Alterar
                    </button>

                    <button
                        type="button"
                        onClick={handleRemove}
                        disabled={!previewUrl}
                        className="text-sm text-[#F5F1EB] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        Remover
                    </button>
                </div>
            </div>

            <input
                ref={inputRef}
                id={inputId}
                type="file"
                accept="image/png,image/jpeg,image/webp"
                onChange={handleFileChange}
                className="sr-only"
                aria-describedby={error ? `${inputId}-error` : undefined}
            />

            {error && (
                <p
                    id={`${inputId}-error`}
                    role="alert"
                    className="text-sm text-[#F0805F]"
                >
                    {error}
                </p>
            )}
        </div>
    )
}