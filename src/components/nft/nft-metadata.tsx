type NftMetadataProps = {
    tokenId: string
    collection: string
    attributes: string[]
}

export function NftMetadata({
    tokenId,
    collection,
    attributes,
}: NftMetadataProps) {
    return (
        <dl className="flex flex-col gap-3 border-t border-[#3F2319] pt-5 text-sm">
            <div className="flex flex-wrap gap-2">
                <dt className="font-bold text-[#F5F1EB]">
                    ID do token:
                </dt>
                <dd className="text-[#CFB28C]">{tokenId}</dd>
            </div>

            <div className="flex flex-wrap gap-2">
                <dt className="font-bold text-[#F5F1EB]">
                    Coleção:
                </dt>
                <dd className="text-[#CFB28C]">{collection}</dd>
            </div>

            <div className="flex flex-wrap gap-2">
                <dt className="font-bold text-[#F5F1EB]">
                    Atributos:
                </dt>
                <dd className="text-[#CFB28C]">
                    {attributes.join(', ')}
                </dd>
            </div>
        </dl>
    )
}
