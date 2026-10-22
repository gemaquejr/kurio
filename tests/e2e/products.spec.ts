import { expect, test } from '@playwright/test'

test.describe('Marketplace Products', () => {
    test('deve ordenar NFTs por preço crescente e decrescente', async ({
        page,
    }) => {
        await page.goto('/')

        const products = page.getByLabel('Listagem de NFTs')
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

test('deve filtrar NFTs pelas coleções selecionadas', async ({ page }) => {
    await page.goto('/')

    const products = page.getByLabel('Produtos disponíveis')
    const cards = products.locator('article')
    const collections = page.getByRole('group', { name: 'Coleções' })

    await expect(cards).toHaveCount(9)

    await collections.getByRole('checkbox', { name: 'Arte digital' }).check()

    await expect(cards).toHaveCount(2)
    await expect(products).toContainText('Emerald Ape #042')
    await expect(products).toContainText('Violet Nomad #314')

    await collections.getByRole('checkbox', { name: 'Fotografia' }).check()

    await expect(cards).toHaveCount(3)
    await expect(products).toContainText('Sage Nomad #009')

    await collections.getByRole('checkbox', { name: 'Arte digital' }).uncheck()

    await expect(cards).toHaveCount(1)
    await expect(products).toContainText('Sage Nomad #009')

    await collections.getByRole('checkbox', { name: 'Fotografia' }).uncheck()

    await expect(cards).toHaveCount(9)
})

test('deve combinar filtros de coleção e rede', async ({ page }) => {
    await page.goto('/')

    const products = page.getByLabel('Produtos disponíveis')
    const cards = products.locator('article')

    const collections = page.getByRole('group', {
        name: 'Coleções',
    })

    const networks = page.getByRole('group', {
        name: 'Rede',
    })

    await expect(cards).toHaveCount(9)

    // Filtrar pela rede Ethereum
    await networks.getByRole('checkbox', {
        name: 'Ethereum',
    }).check()

    await expect(cards).toHaveCount(4)

    // Combinar Ethereum com Arte digital
    await collections.getByRole('checkbox', {
        name: 'Arte digital',
    }).check()

    await expect(cards).toHaveCount(1)
    await expect(products).toContainText('Emerald Ape #042')

    // Adicionar Polygon à seleção
    await networks.getByRole('checkbox', {
        name: 'Polygon',
    }).check()

    await expect(cards).toHaveCount(2)
    await expect(products).toContainText('Violet Nomad #314')

    // Remover Ethereum
    await networks.getByRole('checkbox', {
        name: 'Ethereum',
    }).uncheck()

    await expect(cards).toHaveCount(1)
    await expect(products).toContainText('Violet Nomad #314')

    // Limpar os filtros
    await networks.getByRole('checkbox', {
        name: 'Polygon',
    }).uncheck()

    await collections.getByRole('checkbox', {
        name: 'Arte digital',
    }).uncheck()

    await expect(cards).toHaveCount(9)
})

test('deve exibir estado vazio quando nenhum NFT corresponder aos filtros', async ({
    page,
}) => {
    await page.goto('/')

    const products = page.getByLabel('Listagem de NFTs')

    const collections = page.getByRole('group', {
        name: 'Coleções',
    })

    const networks = page.getByRole('group', {
        name: 'Rede',
    })

    await collections.getByRole('checkbox', {
        name: 'Fotografia',
    }).check()

    await networks.getByRole('checkbox', {
        name: 'Solana',
    }).check()

    await expect(
        products.getByRole('status'),
    ).toContainText('Nenhum NFT encontrado')

    await expect(products.locator('article')).toHaveCount(0)

    await expect(
        page.getByRole('navigation', {
            name: 'Paginação dos NFTs',
        }),
    ).toHaveCount(0)

    // Remover o filtro incompatível deve restaurar os resultados.
    await networks.getByRole('checkbox', {
        name: 'Solana',
    }).uncheck()

    await expect(products.locator('article')).toHaveCount(1)

    await expect(
        products.getByRole('status'),
    ).toHaveCount(0)
})