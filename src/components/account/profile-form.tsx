import { useState, type FormEvent } from 'react'

import { ProfileField } from './profile-field'
import { EnsField } from './ens-field'
import { AvatarControls } from './avatar-controls'
import { ChangePassword } from './change-password'

type ProfileFormData = {
    displayName: string
    username: string
    email: string
    ensName: string
    walletNickname: string
}

export function ProfileForm() {
    const [feedback, setFeedback] = useState('')
    const [formData, setFormData] = useState<ProfileFormData>({
        displayName: '',
        username: '',
        email: '',
        ensName: '',
        walletNickname: '',
    })

    function updateField(
        field: keyof ProfileFormData,
        value: string,
    ) {
        setFormData((previous) => ({
            ...previous,
            [field]: value,
        }))

        setFeedback('')
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        setFeedback(
            'Dados validados localmente. O salvamento estará disponível após a integração com a API.',
        )
    }

    return (
        <div className="flex min-w-0 flex-col gap-8">
            <h1
                id="collector-profile-title"
                className="text-base font-bold text-[#F5F1EB]"
            >
                Perfil do colecionador
            </h1>

            <form
                id="collector-profile-form"
                aria-label="Dados do perfil do colecionador"
                onSubmit={handleSubmit}
                className="flex min-w-0 flex-col gap-8"
            >
                <div className="grid min-w-0 grid-cols-1 gap-x-7 gap-y-6 md:grid-cols-2">
                    <ProfileField
                        label="Nome de exibição"
                        name="displayName"
                        value={formData.displayName}
                        onChange={(value) =>
                            updateField('displayName', value)
                        }
                        autoComplete="nickname"
                        required
                    />

                    <ProfileField
                        label="Nome de usuário"
                        name="username"
                        value={formData.username}
                        onChange={(value) =>
                            updateField('username', value)
                        }
                        autoComplete="username"
                        required
                    />

                    <ProfileField
                        label="E-mail"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={(value) =>
                            updateField('email', value)
                        }
                        autoComplete="email"
                        required
                    />

                    <EnsField
                        value={formData.ensName}
                        onChange={(value) => updateField('ensName', value)}
                    />

                    <ProfileField
                        label="Apelido da carteira"
                        name="walletNickname"
                        value={formData.walletNickname}
                        onChange={(value) =>
                            updateField('walletNickname', value)
                        }
                        required
                    />

                    <AvatarControls />

                </div>
            </form>

            <ChangePassword />

            <div className="flex flex-col items-start gap-4">
                <button
                    type="submit"
                    form="collector-profile-form"
                    className="flex h-10 w-32.75 items-center justify-center rounded-[3px] bg-[#D28A4C] text-[15px] font-bold text-[#140D0A] transition-colors hover:bg-[#E89B55] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E89B55]"
                >
                    Salvar
                </button>

                {feedback && (
                    <p
                        role="status"
                        aria-live="polite"
                        className="max-w-xl text-sm text-[#B39463]"
                    >
                        {feedback}
                    </p>
                )}
            </div>
        </div>
    )
}