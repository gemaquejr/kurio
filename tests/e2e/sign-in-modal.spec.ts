import { test, expect } from '@playwright/test'

test.describe('Sign In Modal', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/')
        await page.getByRole('button', { name: 'Entrar' }).first().click()
    })

    test('deve abrir o modal com todos os elementos', async ({ page }) => {
        const dialog = page.getByRole('dialog', { name: 'Entrar' })

        await expect(dialog).toBeVisible()
        await expect(dialog.getByRole('heading', { name: 'Entrar' })).toBeVisible()
        await expect(dialog.getByLabel('E-mail')).toBeVisible()
        await expect(dialog.getByLabel('Senha', { exact: true })).toBeVisible()
        await expect(dialog.getByRole('button', { name: 'Continuar com Google' })).toBeVisible()
        await expect(dialog.getByRole('button', { name: 'Continuar com Facebook' })).toBeVisible()
    })

    test('deve mostrar e ocultar a senha', async ({ page }) => {
        const dialog = page.getByRole('dialog')
        const password = dialog.getByLabel('Senha', { exact: true })

        await password.fill('Senha123!')

        await expect(password).toHaveAttribute('type', 'password')

        await dialog.getByRole('button', { name: 'Mostrar senha' }).click()
        await expect(password).toHaveAttribute('type', 'text')

        await dialog.getByRole('button', { name: 'Ocultar senha' }).click()
        await expect(password).toHaveAttribute('type', 'password')
    })

    test('deve validar o formulário e informar indisponibilidade', async ({ page }) => {
        const dialog = page.getByRole('dialog')

        await dialog.getByRole('button', { name: 'Entrar', exact: true }).click()

        await expect(dialog.getByLabel('E-mail')).toBeFocused()

        await dialog.getByLabel('E-mail').fill('usuario@exemplo.com')
        await dialog.getByLabel('Senha', { exact: true }).fill('Senha123!')

        await dialog.getByRole('button', { name: 'Entrar', exact: true }).click()

        await expect(
            dialog.getByRole('status'),
        ).toHaveText('A autenticação ainda não está disponível nesta versão.')
    })

    test('deve informar indisponibilidade dos provedores sociais', async ({ page }) => {
        const dialog = page.getByRole('dialog')

        await dialog.getByRole('button', { name: 'Continuar com Google' }).click()

        await expect(dialog.getByRole('status')).toHaveText(
            'A autenticação com Google ainda não está disponível.',
        )

        await dialog.getByRole('button', { name: 'Continuar com Facebook' }).click()

        await expect(dialog.getByRole('status')).toHaveText(
            'A autenticação com Facebook ainda não está disponível.',
        )
    })

    test('deve fechar pelo botão X e pela tecla Escape', async ({ page }) => {
        await page.getByRole('dialog').getByRole('button', { name: 'Fechar modal' }).click()

        await expect(page.getByRole('dialog')).toHaveCount(0)

        await page.getByRole('button', { name: 'Entrar' }).first().click()
        await page.keyboard.press('Escape')

        await expect(page.getByRole('dialog')).toHaveCount(0)
    })

    test('deve manter o modal dentro da tela em dispositivos menores', async ({ page }) => {
        for (const width of [375, 768, 1440]) {
            await page.setViewportSize({ width, height: 800 })

            const dialog = page.getByRole('dialog')
            const bounds = await dialog.boundingBox()

            expect(bounds).not.toBeNull()
            expect(bounds!.width).toBeLessThanOrEqual(width)

            const horizontalOverflow = await page.evaluate(
                () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
            )

            expect(horizontalOverflow).toBe(false)
        }
    })
})