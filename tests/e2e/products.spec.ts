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

test('deve aplicar o filtro de preço somente após clicar em Aplicar', async ({
    page,
}) => {
    await page.goto('/')

    const products = page.getByLabel('Listagem de NFTs')
    const cards = products.locator('article')

    const minPrice = page.getByRole('slider', {
        name: 'Preço mínimo',
    })

    const applyButton = page.getByRole('button', {
        name: 'Aplicar',
    })

    // Inicialmente, todos os NFTs aparecem.
    await expect(cards).toHaveCount(9)

    // Ajustar o preço mínimo para 1,50 ETH.
    await minPrice.evaluate((element: HTMLInputElement) => {
        const nativeSetter = Object.getOwnPropertyDescriptor(
            HTMLInputElement.prototype,
            'value',
        )?.set

        nativeSetter?.call(element, '1.50')

        element.dispatchEvent(new Event('input', { bubbles: true }))
        element.dispatchEvent(new Event('change', { bubbles: true }))
    })

    await expect(minPrice).toHaveValue('1.5')

    // Alterar o slider não deve aplicar o filtro automaticamente.
    await expect(cards).toHaveCount(9)

    // Aplicar o intervalo selecionado.
    await applyButton.click()

    // NFTs com preço abaixo de 1,50 ETH são removidos.
    await expect(cards).toHaveCount(3)

    await expect(products).toContainText('Sage Nomad #009')
    await expect(products).toContainText('Neon Vessel #552')
    await expect(products).toContainText('Ivory Baron #088')

    await expect(products).not.toContainText('Golden Signal #160')
    await expect(products).not.toContainText('Emerald Ape #042')
})

test('deve combinar filtros de coleção, rede e preço', async ({
    page,
}) => {
    await page.goto('/')

    const products = page.getByLabel('Listagem de NFTs')
    const cards = products.locator('article')

    const collections = page.getByRole('group', {
        name: 'Coleções',
    })

    const networks = page.getByRole('group', {
        name: 'Rede',
    })

    const minPrice = page.getByRole('slider', {
        name: 'Preço mínimo',
    })

    await expect(cards).toHaveCount(9)

    // Selecionar Arte digital: Emerald Ape e Violet Nomad.
    await collections.getByRole('checkbox', {
        name: 'Arte digital',
    }).check()

    await expect(cards).toHaveCount(2)

    // Selecionar Polygon: permanece apenas Violet Nomad.
    await networks.getByRole('checkbox', {
        name: 'Polygon',
    }).check()

    await expect(cards).toHaveCount(1)
    await expect(products).toContainText('Violet Nomad #314')

    // Definir preço mínimo de 1,50 ETH.
    await minPrice.evaluate((element: HTMLInputElement) => {
        const nativeSetter = Object.getOwnPropertyDescriptor(
            HTMLInputElement.prototype,
            'value',
        )?.set

        nativeSetter?.call(element, '1.50')

        element.dispatchEvent(new Event('input', { bubbles: true }))
        element.dispatchEvent(new Event('change', { bubbles: true }))
    })

    // Antes de aplicar, Violet Nomad ainda deve aparecer.
    await expect(cards).toHaveCount(1)

    await page.getByRole('button', {
        name: 'Aplicar',
    }).click()

    // Violet Nomad custa 1,39 ETH e deve ser removido.
    await expect(cards).toHaveCount(0)

    await expect(
        products.getByRole('status'),
    ).toContainText('Nenhum NFT encontrado')

    // Remover a coleção e a rede mantém o filtro de preço.
    await collections.getByRole('checkbox', {
        name: 'Arte digital',
    }).uncheck()

    await networks.getByRole('checkbox', {
        name: 'Polygon',
    }).uncheck()

    // Restam os três NFTs com preço a partir de 1,50 ETH.
    await expect(cards).toHaveCount(3)

    await expect(products).toContainText('Sage Nomad #009')
    await expect(products).toContainText('Neon Vessel #552')
    await expect(products).toContainText('Ivory Baron #088')
})

test('deve ajustar a paginação conforme os resultados filtrados', async ({
    page,
}) => {
    await page.goto('/')

    const products = page.getByLabel('Listagem de NFTs')
    const cards = products.locator('article')

    const pagination = page.getByRole('navigation', {
        name: 'Paginação dos NFTs',
    })

    // Os nove NFTs devem aparecer na página inicial.
    await expect(cards).toHaveCount(9)

    await expect(products).toContainText('Emerald Ape #042')
    await expect(products).toContainText('Golden Signal #160')

    // Com nove NFTs, existe somente uma página.
    await expect(
        page.getByRole('button', { name: 'Página 1' }),
    ).toHaveAttribute('aria-current', 'page')

    await expect(
        page.getByRole('button', { name: 'Página 2' }),
    ).toHaveCount(0)

    await expect(
        page.getByRole('button', { name: 'Próxima página' }),
    ).toBeDisabled()

    // Aplicar um filtro reduz a quantidade de resultados.
    const collections = page.getByRole('group', {
        name: 'Coleções',
    })

    await collections.getByRole('checkbox', {
        name: 'Arte digital',
    }).check()

    await expect(cards).toHaveCount(2)

    await expect(products).toContainText('Emerald Ape #042')
    await expect(products).toContainText('Violet Nomad #314')

    // A paginação continua consistente.
    await expect(pagination).toBeVisible()

    await expect(
        page.getByRole('button', { name: 'Página 1' }),
    ).toHaveAttribute('aria-current', 'page')
})

test('deve alternar entre as abas e combinar com filtros', async ({
    page,
}) => {
    await page.goto('/')

    const products = page.getByLabel('Listagem de NFTs')
    const cards = products.locator('article')

    const allTab = page.getByRole('button', {
        name: 'Todos os NFTs',
    })

    const newTab = page.getByRole('button', {
        name: 'Novos lançamentos',
    })

    const trendingTab = page.getByRole('button', {
        name: 'Em alta',
    })

    // A aba inicial deve apresentar todos os NFTs.
    await expect(allTab).toHaveAttribute('aria-pressed', 'true')
    await expect(cards).toHaveCount(9)

    // Exibir apenas os novos lançamentos.
    await newTab.click()

    await expect(newTab).toHaveAttribute('aria-pressed', 'true')
    await expect(allTab).toHaveAttribute('aria-pressed', 'false')
    await expect(cards).toHaveCount(4)

    await expect(products).toContainText('Emerald Ape #042')
    await expect(products).toContainText('Sage Nomad #009')
    await expect(products).toContainText('Cosmic Bloom #118')
    await expect(products).toContainText('Golden Beat #207')

    // Exibir apenas os NFTs em alta.
    await trendingTab.click()

    await expect(trendingTab).toHaveAttribute('aria-pressed', 'true')
    await expect(newTab).toHaveAttribute('aria-pressed', 'false')
    await expect(cards).toHaveCount(4)

    await expect(products).toContainText('Emerald Ape #042')
    await expect(products).toContainText('Neon Vessel #552')
    await expect(products).toContainText('Violet Nomad #314')
    await expect(products).toContainText('Golden Signal #160')

    // Combinar a aba Em alta com a coleção Arte digital.
    const collections = page.getByRole('group', {
        name: 'Coleções',
    })

    await collections.getByRole('checkbox', {
        name: 'Arte digital',
    }).check()

    await expect(cards).toHaveCount(2)

    await expect(products).toContainText('Emerald Ape #042')
    await expect(products).toContainText('Violet Nomad #314')

    // Voltar para Todos mantém o filtro de coleção aplicado.
    await allTab.click()

    await expect(allTab).toHaveAttribute('aria-pressed', 'true')
    await expect(cards).toHaveCount(2)

    // Remover o filtro restaura os nove NFTs.
    await collections.getByRole('checkbox', {
        name: 'Arte digital',
    }).uncheck()

    await expect(cards).toHaveCount(9)
})

test('deve adaptar a grade de NFTs aos diferentes tamanhos de tela', async ({
    page,
}) => {
    const viewports = [
        { width: 375, height: 812, columns: 1 },
        { width: 768, height: 1024, columns: 2 },
        { width: 1440, height: 900, columns: 3 },
    ]

    for (const viewport of viewports) {
        await page.setViewportSize({
            width: viewport.width,
            height: viewport.height,
        })

        await page.goto('/')

        const grid = page.getByLabel('Produtos disponíveis')

        await expect(grid).toBeVisible()

        const actualColumns = await grid.evaluate((element) => {
            const styles = window.getComputedStyle(element)
            return styles.gridTemplateColumns.split(' ').length
        })

        expect(actualColumns).toBe(viewport.columns)

        const hasHorizontalOverflow = await page.evaluate(() => {
            return (
                document.documentElement.scrollWidth >
                document.documentElement.clientWidth
            )
        })

        expect(
            hasHorizontalOverflow,
            `Rolagem horizontal detectada em ${viewport.width}px`,
        ).toBe(false)
    }
})

test('deve manter os filtros acessíveis em diferentes larguras', async ({
    page,
}) => {
    const viewports = [
        { width: 375, height: 812, sideBySide: false },
        { width: 768, height: 1024, sideBySide: false },
        { width: 1200, height: 900, sideBySide: true },
        { width: 1440, height: 900, sideBySide: true },
    ]

    for (const viewport of viewports) {
        await page.setViewportSize({
            width: viewport.width,
            height: viewport.height,
        })

        await page.goto('/')

        const sidebar = page.getByLabel('Filtros do marketplace')
        const products = page.getByLabel('Listagem de NFTs')

        await expect(sidebar).toBeVisible()
        await expect(products).toBeVisible()

        const sidebarBox = await sidebar.boundingBox()
        const productsBox = await products.boundingBox()

        expect(sidebarBox).not.toBeNull()
        expect(productsBox).not.toBeNull()

        if (!sidebarBox || !productsBox) {
            throw new Error('Não foi possível medir o layout')
        }

        if (viewport.sideBySide) {
            // Sidebar posicionada à esquerda da listagem.
            expect(sidebarBox.x + sidebarBox.width).toBeLessThanOrEqual(
                productsBox.x,
            )
        } else {
            // Sidebar posicionada acima da listagem.
            expect(sidebarBox.y + sidebarBox.height).toBeLessThanOrEqual(
                productsBox.y,
            )
        }

        // Os filtros devem permanecer dentro da largura da tela.
        expect(sidebarBox.x).toBeGreaterThanOrEqual(0)

        expect(
            sidebarBox.x + sidebarBox.width,
        ).toBeLessThanOrEqual(viewport.width)

        // Os campos devem permanecer disponíveis.
        await expect(
            sidebar.getByRole('group', { name: 'Coleções' }),
        ).toBeVisible()

        await expect(
            sidebar.getByRole('group', { name: 'Rede' }),
        ).toBeVisible()
    }
})

test('deve manter os cards dentro da grade em larguras intermediárias', async ({
    page,
}) => {
    for (const width of [1200, 1240, 1279, 1280]) {
        await page.setViewportSize({
            width,
            height: 900,
        })

        await page.goto('/')

        const grid = page.getByLabel('Produtos disponíveis')
        const cards = grid.locator('article')

        await expect(cards).toHaveCount(9)

        const layout = await grid.evaluate((element) => {
            const gridRect = element.getBoundingClientRect()

            return {
                gridLeft: gridRect.left,
                gridRight: gridRect.right,
                cards: Array.from(element.querySelectorAll('article')).map(
                    (card) => {
                        const cardRect = card.getBoundingClientRect()
                        const image = card.querySelector('img')
                        const imageRect = image?.getBoundingClientRect()

                        return {
                            left: cardRect.left,
                            right: cardRect.right,
                            imageWidth: imageRect?.width ?? 0,
                            imageHeight: imageRect?.height ?? 0,
                        }
                    },
                ),
            }
        })

        for (const card of layout.cards) {
            expect(card.left).toBeGreaterThanOrEqual(layout.gridLeft - 1)
            expect(card.right).toBeLessThanOrEqual(layout.gridRight + 1)

            expect(card.imageWidth).toBeGreaterThan(0)
            expect(card.imageHeight).toBeGreaterThan(0)
        }

        const hasHorizontalOverflow = await page.evaluate(
            () =>
                document.documentElement.scrollWidth >
                document.documentElement.clientWidth,
        )

        expect(
            hasHorizontalOverflow,
            `Rolagem horizontal em ${width}px`,
        ).toBe(false)
    }
})