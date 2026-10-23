import { test, expect } from '@playwright/test'

test.describe('Sign Up Modal', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/')

        await page.getByRole('button', { name: 'Entrar' }).first().click()

        const dialog = page.getByRole('dialog')

        await dialog.getByRole('tab', { name: 'Criar conta' }).click()
    })

    test('deve exibir o formulário de cadastro', async ({ page }) => {
        const dialog = page.getByRole('dialog')

        await expect(
            dialog.getByRole('tab', { name: 'Criar conta' }),
        ).toHaveAttribute('aria-selected', 'true')

        await expect(dialog.getByLabel('Nome de usuário')).toBeVisible()
        await expect(dialog.getByLabel('E-mail')).toBeVisible()
        await expect(
            dialog.getByLabel('Senha', { exact: true }),
        ).toBeVisible()
        await expect(dialog.getByLabel('Confirmar senha')).toBeVisible()

        await expect(
            dialog.getByRole('button', {
                name: 'Criar conta',
                exact: true,
            }),
        ).toBeVisible()
    })

    test('deve impedir envio com campos obrigatórios vazios', async ({ page }) => {
        const dialog = page.getByRole('dialog')

        await dialog.getByRole('button', {
            name: 'Criar conta',
            exact: true,
        }).click()

        await expect(dialog.getByLabel('Nome de usuário')).toBeFocused()

        await expect(dialog.getByRole('status')).toHaveCount(0)
    })

    test('deve validar senhas diferentes', async ({ page }) => {
        const dialog = page.getByRole('dialog')

        await dialog.getByLabel('Nome de usuário').fill('Usuário Teste')
        await dialog.getByLabel('E-mail').fill('usuario@exemplo.com')
        await dialog.getByLabel('Senha', { exact: true }).fill('Senha123!')
        await dialog.getByLabel('Confirmar senha').fill('OutraSenha123!')

        await dialog.getByRole('button', {
            name: 'Criar conta',
            exact: true,
        }).click()

        await expect(dialog.getByRole('status')).toHaveText(
            'As senhas não coincidem.',
        )
    })

    test('deve informar indisponibilidade do cadastro válido', async ({ page }) => {
        const dialog = page.getByRole('dialog')

        await dialog.getByLabel('Nome de usuário').fill('Usuário Teste')
        await dialog.getByLabel('E-mail').fill('usuario@exemplo.com')
        await dialog.getByLabel('Senha', { exact: true }).fill('Senha123!')
        await dialog.getByLabel('Confirmar senha').fill('Senha123!')

        await dialog.getByRole('button', {
            name: 'Criar conta',
            exact: true,
        }).click()

        await expect(dialog.getByRole('status')).toHaveText(
            'O cadastro ainda não está disponível nesta versão.',
        )
    })

    test('deve alternar entre cadastro e login', async ({ page }) => {
        const dialog = page.getByRole('dialog')

        await dialog.getByRole('tab', { name: 'Entrar' }).click()

        await expect(
            dialog.getByRole('tab', { name: 'Entrar' }),
        ).toHaveAttribute('aria-selected', 'true')

        await expect(
            dialog.getByLabel('Nome de usuário'),
        ).toHaveCount(0)

        await expect(
            dialog.getByRole('button', { name: 'Entrar', exact: true }),
        ).toBeVisible()

        await dialog.getByRole('tab', { name: 'Criar conta' }).click()

        await expect(dialog.getByLabel('Nome de usuário')).toBeVisible()
    })
})