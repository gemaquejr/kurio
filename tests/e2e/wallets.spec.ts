
import { expect, test, type Page } from '@playwright/test'

const ethereumAddress = `0x${'a'.repeat(40)}`
const solanaAddress = '11111111111111111111111111111111'

async function fillWalletForm(
    page: Page,
    network = 'ethereum',
    address = ethereumAddress,
) {
    await page.getByLabel('Nome de exibição').fill('Minha carteira')
    await page.getByLabel('Apelido da carteira').fill('Principal')
    await page.locator('#wallet-network').selectOption(network)
    await page.getByLabel('Nome do perfil').fill('Colecionador')
    await page.getByLabel('Endereço da carteira').fill(address)
    await page.getByLabel('Tipo de carteira').selectOption('metamask')
    await page.getByLabel('Código de indicação').fill('KURIO123')
    await page.getByLabel('E-mail').fill('colecionador@example.com')
    await page.getByLabel('Nome ENS').fill('colecionador')
}

test.describe('Desktop / Carteiras', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/account/wallets')
    })

    test('exibe o formulário principal e a carteira secundária', async ({
        page,
    }) => {
        await expect(
            page.getByRole('heading', { name: 'Carteira principal' }),
        ).toBeVisible()

        await expect(
            page.getByRole('heading', { name: 'Carteira secundária' }),
        ).toBeVisible()

        await expect(
            page.getByText(
                'Você ainda não adicionou uma carteira secundária.',
            ),
        ).toBeVisible()
    })

    test('destaca Carteiras no menu lateral', async ({ page }) => {
        const accountNav = page.getByRole('navigation', {
            name: 'Navegação da conta',
        })

        await expect(
            accountNav.getByRole('link', { name: 'Carteiras' }),
        ).toHaveAttribute('aria-current', 'page')
    })

    test('navega entre Carteiras e Dados do perfil', async ({ page }) => {
        const accountNav = page.getByRole('navigation', {
            name: 'Navegação da conta',
        })

        await accountNav.getByRole('link', { name: 'Dados do perfil' }).click()

        await expect(page).toHaveURL(/\/account\/profile$/)

        await accountNav.getByRole('link', { name: 'Carteiras' }).click()

        await expect(page).toHaveURL(/\/account\/wallets$/)
    })

    test('impede envio com campos obrigatórios vazios', async ({ page }) => {
        await page.getByRole('button', { name: 'Salvar carteira' }).click()

        await expect(
            page.getByLabel('Nome de exibição'),
        ).toBeFocused()

        const valid = await page
            .getByLabel('Nome de exibição')
            .evaluate((element: HTMLInputElement) => element.validity.valid)

        expect(valid).toBe(false)
    })

    test('rejeita endereço Ethereum inválido', async ({ page }) => {
        await fillWalletForm(page, 'ethereum', '0x123')

        await page.getByRole('button', { name: 'Salvar carteira' }).click()

        await expect(
            page.getByRole('status'),
        ).toContainText('Informe um endereço válido')
    })

    test('aceita formato de endereço Ethereum', async ({ page }) => {
        await fillWalletForm(page)

        await page.getByRole('button', { name: 'Salvar carteira' }).click()

        await expect(page.getByRole('status')).toContainText(
            'Dados validados localmente',
        )
    })

    test('aceita formato de endereço Solana', async ({ page }) => {
        await fillWalletForm(page, 'solana', solanaAddress)

        await page.getByRole('button', { name: 'Salvar carteira' }).click()

        await expect(page.getByRole('status')).toContainText(
            'Dados validados localmente',
        )
    })

    test('mantém código de indicação e nome ENS obrigatórios', async ({
        page,
    }) => {
        await fillWalletForm(page)

        await page.getByLabel('Código de indicação').fill('')
        await page.getByRole('button', { name: 'Salvar carteira' }).click()

        const referralIsValid = await page
            .getByLabel('Código de indicação')
            .evaluate((element: HTMLInputElement) => element.validity.valid)

        expect(referralIsValid).toBe(false)

        await page.getByLabel('Código de indicação').fill('KURIO123')
        await page.getByLabel('Nome ENS').fill('')

        await page.getByRole('button', { name: 'Salvar carteira' }).click()

        const ensIsValid = await page
            .getByLabel('Nome ENS')
            .evaluate((element: HTMLInputElement) => element.validity.valid)

        expect(ensIsValid).toBe(false)
    })

    test('permite marcar e desmarcar carteira secundária', async ({
        page,
    }) => {
        const checkbox = page.getByRole('checkbox', {
            name: 'Igual à carteira principal',
        })

        await expect(checkbox).not.toBeChecked()

        await checkbox.check()
        await expect(checkbox).toBeChecked()

        await checkbox.uncheck()
        await expect(checkbox).not.toBeChecked()
    })

    test('informa que adicionar carteira secundária é demonstrativo', async ({
        page,
    }) => {
        const secondaryWallet = page.getByRole('region', {
            name: 'Carteira secundária',
        })

        await secondaryWallet
            .getByRole('button', { name: 'Adicionar' })
            .click()

        await expect(
            secondaryWallet.getByRole('status'),
        ).toContainText('ainda não está disponível')
    })

    test('não apresenta rolagem horizontal no mobile', async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 812 })
        await page.reload()

        const hasHorizontalOverflow = await page.evaluate(() => {
            return document.documentElement.scrollWidth > window.innerWidth
        })

        expect(hasHorizontalOverflow).toBe(false)
    })
})
