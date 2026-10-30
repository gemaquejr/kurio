import { expect, test } from '@playwright/test'

test.describe('Perfil do colecionador', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/account/profile')
    })

    test('deve exibir os campos do perfil', async ({ page }) => {
        await expect(
            page.getByRole('heading', {
                name: 'Perfil do colecionador',
            }),
        ).toBeVisible()

        await expect(page.getByLabel('Nome de exibição')).toBeVisible()
        await expect(page.getByLabel('Nome de usuário')).toBeVisible()
        await expect(page.getByLabel('E-mail')).toBeVisible()
        await expect(page.getByLabel('Nome ENS')).toBeVisible()
        await expect(page.getByLabel('Apelido da carteira')).toBeVisible()
    })

    test('deve exibir a seção de alteração de senha', async ({ page }) => {
        await expect(
            page.getByRole('heading', { name: 'Alterar senha' }),
        ).toBeVisible()

        await expect(
            page.getByLabel('Senha atual', { exact: true }),
        ).toBeVisible()

        await expect(
            page.getByLabel('Nova senha', { exact: true }),
        ).toBeVisible()

        await expect(
            page.getByLabel('Confirmar nova senha', { exact: true }),
        ).toBeVisible()
    })

    test('deve mostrar erro quando as senhas não coincidirem', async ({
        page,
    }) => {
        await page.getByLabel('Nova senha', { exact: true }).fill('Senha123!')
        await page
            .getByLabel('Confirmar nova senha', { exact: true })
            .fill('Senha456!')

        await expect(
            page.getByText('As senhas não coincidem.'),
        ).toBeVisible()
    })

    test('deve permitir mostrar e ocultar a senha', async ({ page }) => {
        const password = page.getByLabel('Nova senha', { exact: true })

        await expect(password).toHaveAttribute('type', 'password')

        await page.getByRole('button', { name: 'Mostrar nova senha' }).click()

        await expect(password).toHaveAttribute('type', 'text')

        await page.getByRole('button', { name: 'Ocultar nova senha' }).click()

        await expect(password).toHaveAttribute('type', 'password')
    })

    test('deve validar os campos obrigatórios antes de salvar', async ({
        page,
    }) => {
        await page.getByRole('button', { name: 'Salvar' }).click()

        await expect(
            page.getByText('Dados validados localmente.', {
                exact: false,
            }),
        ).not.toBeVisible()
    })

    test('deve validar os dados preenchidos localmente', async ({ page }) => {
        await page.getByLabel('Nome de exibição').fill('Colecionador Kurio')
        await page.getByLabel('Nome de usuário').fill('colecionador')
        await page.getByLabel('E-mail').fill('colecionador@example.com')
        await page.getByLabel('Nome ENS').fill('colecionador')
        await page.getByLabel('Apelido da carteira').fill('Minha carteira')

        await page.getByRole('button', { name: 'Salvar' }).click()

        await expect(
            page.getByText('Dados validados localmente.', {
                exact: false,
            }),
        ).toBeVisible()
    })
})