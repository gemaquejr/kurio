import { useState } from 'react'
import type { Nft } from '@/components/home/products/nft-card'

type Tab = 'details' | 'reviews'

type NftDescriptionProps = {
    nft: Nft
}

export function NftDescription({ nft }: NftDescriptionProps) {
    const [activeTab, setActiveTab] = useState<Tab>('details')

    return (
        <section className="mt-16" aria-label="Informações adicionais do NFT">
            <div
                role="tablist"
                aria-label="Informações do NFT"
                className="flex flex-wrap gap-6 border-b border-[#3F2319]"
            >
                <button
                    type="button"
                    id="tab-nft-details"
                    role="tab"
                    aria-selected={activeTab === 'details'}
                    aria-controls="panel-nft-details"
                    onClick={() => setActiveTab('details')}
                    className={`border-b-2 pb-4 text-sm font-bold transition-colors focus-visible:outline-2 focus-visible:outline-[#D28A4C] ${activeTab === 'details'
                        ? 'border-[#D28A4C] text-[#F5F1EB]'
                        : 'border-transparent text-[#CFB28C] hover:text-[#F5F1EB]'
                        }`}
                >
                    Detalhes do NFT
                </button>

                <button
                    type="button"
                    id="tab-nft-reviews"
                    role="tab"
                    aria-selected={activeTab === 'reviews'}
                    aria-controls="panel-nft-reviews"
                    onClick={() => setActiveTab('reviews')}
                    className={`border-b-2 pb-4 text-sm font-bold transition-colors focus-visible:outline-2 focus-visible:outline-[#D28A4C] ${activeTab === 'reviews'
                        ? 'border-[#D28A4C] text-[#F5F1EB]'
                        : 'border-transparent text-[#CFB28C] hover:text-[#F5F1EB]'
                        }`}
                >
                    Avaliações de colecionadores ({nft.reviewCount ?? 0})
                </button>
            </div>


            {activeTab === 'details' ? (
                <div
                    id="panel-nft-details"
                    role="tabpanel"
                    aria-labelledby="tab-nft-details"
                    className="pt-6 text-sm leading-7 text-[#CFB28C]"
                >
                    {nft.details ? (
                        <p>{nft.details}</p>
                    ) : (
                        <p>Informações detalhadas ainda não disponíveis para este NFT.</p>
                    )}

                    <dl className="mt-6 grid gap-4">
                        {nft.network && (
                            <div>
                                <dt className="font-bold text-[#F5F1EB]">
                                    Rede
                                </dt>
                                <dd>
                                    {nft.network.charAt(0).toUpperCase() +
                                        nft.network.slice(1)}
                                </dd>
                            </div>
                        )}

                        {nft.storage && (
                            <div>
                                <dt className="font-bold text-[#F5F1EB]">
                                    Armazenamento
                                </dt>
                                <dd>{nft.storage}</dd>
                            </div>
                        )}

                        {nft.contract && (
                            <div>
                                <dt className="font-bold text-[#F5F1EB]">
                                    Contrato
                                </dt>
                                <dd>
                                    {nft.contract} • Contrato inteligente
                                    ERC-721 (dado demonstrativo).
                                </dd>
                            </div>
                        )}

                        {nft.royalties !== undefined && (
                            <div>
                                <dt className="font-bold text-[#F5F1EB]">
                                    Royalties
                                </dt>
                                <dd>{nft.royalties}%</dd>
                            </div>
                        )}
                    </dl>
                </div>
            ) : (
                <div
                    id="panel-nft-reviews"
                    role="tabpanel"
                    aria-labelledby="tab-nft-reviews"
                    className="pt-6"
                >
                    <h3 className="text-base font-bold text-[#F5F1EB]">
                        Avaliações de colecionadores
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-[#CFB28C]">
                        {nft.reviewCount
                            ? `O protótipo apresenta ${nft.reviewCount} avaliações para este NFT. Os comentários individuais ainda não estão disponíveis nesta versão demonstrativa.`
                            : 'Ainda não há avaliações disponíveis para este NFT.'}
                    </p>
                </div>
            )}
        </section>
    )
}
