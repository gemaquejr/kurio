import { useState } from 'react'

import { PasswordInput } from './password-input'

export function ChangePassword() {
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const passwordsDoNotMatch =
        confirmPassword.length > 0 &&
        newPassword !== confirmPassword

    return (
        <section
            aria-labelledby="change-password-title"
            className="flex min-w-0 flex-col gap-6"
        >
            <h2
                id="change-password-title"
                className="text-base font-medium text-[#F5F1EB]"
            >
                Alterar senha
            </h2>

            <div className="flex w-full min-w-0 flex-col gap-6 md:w-[calc((100%-28px)/2)]">
                <PasswordInput
                    label="Senha atual"
                    name="currentPassword"
                    value={currentPassword}
                    onChange={setCurrentPassword}
                    autoComplete="current-password"
                />

                <PasswordInput
                    label="Nova senha"
                    name="newPassword"
                    value={newPassword}
                    onChange={setNewPassword}
                    autoComplete="new-password"
                />

                <div className="flex flex-col gap-2">
                    <PasswordInput
                        label="Confirmar nova senha"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={setConfirmPassword}
                        autoComplete="new-password"
                    />

                    {passwordsDoNotMatch && (
                        <p
                            role="alert"
                            className="text-sm text-[#F0805F]"
                        >
                            As senhas não coincidem.
                        </p>
                    )}
                </div>
            </div>
        </section>
    )
}