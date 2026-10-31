import { useState, type FormEvent } from 'react'
import { ChevronDown } from 'lucide-react'

import {
    WalletField,
    walletInputClassName,
    walletSelectClassName,
} from './wallet-field'

type WalletFormValues = {
    displayName: string
    alias: string
    network: string
    profileName: string
    address: string
    secondaryAddress: string
    walletType: string
    referralCode: string
    email: string
    ensName: string
    ensDomain: string
}

const initialValues: WalletFormValues = {
    displayName: '',
    alias: '',
    network: '',
    profileName: '',
    address: '',
    secondaryAddress: '',
    walletType: '',
    referralCode: '',
    email: '',
    ensName: '',
    ensDomain: '.eth',
}

function isValidWalletAddress(
    address: string,
    network: string,
): boolean {
    const normalizedAddress = address.trim()

    if (network === 'ethereum' || network === 'polygon') {
        return /^0x[a-fA-F0-9]{40}$/.test(normalizedAddress)
    }

    if (network === 'solana') {
        return /^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(normalizedAddress)
    }

    return false
}

export function WalletForm() {
    const [values, setValues] = useState(initialValues)
    const [feedback, setFeedback] = useState('')

    function updateField(
        field: keyof WalletFormValues,
        value: string,
    ) {
        setValues((current) => ({
            ...current,
            [field]: value,
        }))
        setFeedback('')
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        if (!isValidWalletAddress(values.address, values.network)) {
            setFeedback(
                values.network === 'solana'
                    ? 'Informe um endereço Solana com formato válido.'
                    : 'Informe um endereço válido com 0x e 40 caracteres hexadecimais.',
            )
            return
        }

        setFeedback(
            'Dados validados localmente. O salvamento de carteiras ainda não está disponível.',
        )
    }

    return (
        <form
            onSubmit={handleSubmit}
            aria-label="Formulário da carteira principal"
            className="flex min-w-0 flex-col gap-8"
        >
            <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between gap-4">
                    <h1
                        id="wallets-title"
                        className="text-[17px] leading-4 font-bold text-[#F5F1EB]"
                    >
                        Carteira principal
                    </h1>

                    <button
                        type="button"
                        className="text-base font-medium text-[#E89B55]"
                        onClick={() =>
                            setFeedback(
                                'A inclusão de outras carteiras estará disponível em uma próxima etapa.',
                            )
                        }
                    >
                        Adicionar
                    </button>
                </div>

                <p className="text-sm leading-5 text-[#CFB28C]">
                    Estas carteiras ficam disponíveis no pagamento e para receber
                    NFTs comprados.
                </p>
            </div>

            <div className="grid min-w-0 grid-cols-1 gap-x-7 gap-y-6 md:grid-cols-2">
                <WalletField id="wallet-display-name" label="Nome de exibição" required>
                    <input
                        id="wallet-display-name"
                        required
                        value={values.displayName}
                        onChange={(event) =>
                            updateField('displayName', event.target.value)
                        }
                        className={walletInputClassName}
                    />
                </WalletField>

                <WalletField id="wallet-alias" label="Apelido da carteira" required>
                    <input
                        id="wallet-alias"
                        required
                        value={values.alias}
                        onChange={(event) =>
                            updateField('alias', event.target.value)
                        }
                        className={walletInputClassName}
                    />
                </WalletField>

                <WalletField id="wallet-network" label="Rede" required>
                    <div className="relative">
                        <select
                            id="wallet-network"
                            required
                            value={values.network}
                            onChange={(event) =>
                                updateField('network', event.target.value)
                            }
                            className={walletSelectClassName}
                        >
                            <option value="" disabled>
                                Selecione uma rede
                            </option>
                            <option value="ethereum">Ethereum</option>
                            <option value="polygon">Polygon</option>
                            <option value="solana">Solana</option>
                        </select>

                        <ChevronDown
                            size={20}
                            aria-hidden="true"
                            className="pointer-events-none absolute top-2.5 right-2 text-[#B39463]"
                        />
                    </div>
                </WalletField>

                <WalletField id="wallet-profile" label="Nome do perfil" required>
                    <input
                        id="wallet-profile"
                        required
                        value={values.profileName}
                        onChange={(event) =>
                            updateField('profileName', event.target.value)
                        }
                        className={walletInputClassName}
                    />
                </WalletField>

                <WalletField id="wallet-address" label="Endereço da carteira" required>
                    <input
                        id="wallet-address"
                        required
                        value={values.address}
                        onChange={(event) =>
                            updateField('address', event.target.value)
                        }
                        placeholder={
                            values.network === 'solana'
                                ? 'Endereço da carteira Solana'
                                : 'Endereço 0x da carteira'
                        }
                        spellCheck={false}
                        autoComplete="off"
                        className={walletInputClassName}
                    />
                </WalletField>

                <div className="flex min-w-0 flex-col justify-end">
                    <input
                        id="wallet-secondary-address"
                        aria-label="ENS ou carteira secundária (opcional)"
                        value={values.secondaryAddress}
                        onChange={(event) =>
                            updateField('secondaryAddress', event.target.value)
                        }
                        placeholder="ENS ou carteira secundária (opcional)"
                        className={walletInputClassName}
                    />
                </div>

                <WalletField id="wallet-type" label="Tipo de carteira" required>
                    <div className="relative">
                        <select
                            id="wallet-type"
                            required
                            value={values.walletType}
                            onChange={(event) =>
                                updateField('walletType', event.target.value)
                            }
                            className={walletSelectClassName}
                        >
                            <option value="" disabled>
                                Selecione uma carteira
                            </option>
                            <option value="metamask">MetaMask</option>
                            <option value="walletconnect">WalletConnect</option>
                            <option value="coinbase">Coinbase Wallet</option>
                            <option value="other">Outra</option>
                        </select>

                        <ChevronDown
                            size={20}
                            aria-hidden="true"
                            className="pointer-events-none absolute top-2.5 right-2 text-[#B39463]"
                        />
                    </div>
                </WalletField>

                <WalletField id="wallet-referral" label="Código de indicação" required>
                    <input
                        id="wallet-referral"
                        required
                        value={values.referralCode}
                        onChange={(event) =>
                            updateField('referralCode', event.target.value)
                        }
                        className={walletInputClassName}
                    />
                </WalletField>

                <WalletField id="wallet-email" label="E-mail" required>
                    <input
                        id="wallet-email"
                        type="email"
                        required
                        value={values.email}
                        onChange={(event) =>
                            updateField('email', event.target.value)
                        }
                        className={walletInputClassName}
                    />
                </WalletField>

                <WalletField id="wallet-ens" label="Nome ENS" required>
                    <div className="flex min-w-0 gap-2.5">
                        <div className="relative w-19.5 shrink-0">
                            <select
                                aria-label="Domínio ENS"
                                value={values.ensDomain}
                                onChange={(event) =>
                                    updateField('ensDomain', event.target.value)
                                }
                                className={`${walletSelectClassName} px-2 pr-6`}
                            >
                                <option value=".eth">.eth</option>
                            </select>

                            <ChevronDown
                                size={14}
                                aria-hidden="true"
                                className="pointer-events-none absolute top-3 right-1 text-[#F5F1EB]"
                            />
                        </div>

                        <input
                            id="wallet-ens"
                            required
                            value={values.ensName}
                            onChange={(event) =>
                                updateField('ensName', event.target.value)
                            }
                            className={walletInputClassName}
                        />
                    </div>
                </WalletField>
            </div>

            <div className="flex flex-col items-start gap-3">
                <button
                    type="submit"
                    className="min-h-10 rounded-[3px] bg-[#D28A4C] px-3 text-sm font-bold text-[#140D0A] hover:bg-[#E89B55] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D28A4C]"
                >
                    Salvar carteira
                </button>

                {feedback && (
                    <p role="status" className="text-sm text-[#CFB28C]">
                        {feedback}
                    </p>
                )}
            </div>
        </form>
    )
}
