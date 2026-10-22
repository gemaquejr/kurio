import { expect, test } from '@playwright/test'

test.describe('Marketplace Products', () => {
    test('deve ordenar NFTs por preço crescente e decrescente', async ({
        page,
    }) => {
        await page.goto('/')

        const products = page.getByLabel('Produtos disponíveis')
        const cards = products.locator('article')
        const sort = page.getByLabel('Ordenar por:')

        await expect(cards).toHaveCount(9)

        await sort.selectOption('price-low')

        await expect(cards.first()).toContainText('Golden Signal #160')
        await expect(cards.first()).toContainText('0.39 ETH')

        await sort.selectOption('price-high')

        await expect(cards.first()).toContainText('Neon Vessel #552')
        await expect(cards.first()).toContainText('1.99 ETH')

        await sort.selectOption('recent')

        await expect(cards.first()).toContainText('Emerald Ape #042')
    })
})