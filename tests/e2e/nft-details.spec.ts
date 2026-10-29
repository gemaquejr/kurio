import { test, expect } from '@playwright/test'

test.describe('Página de detalhes do NFT', () => {
    test('exibe os dados do Emerald Ape', async ({ page }) => {
        await page.goto('/nft/emerald-ape-042')

        await expect(
            page.getByRole('heading', {
                name: 'Emerald Ape #042',
                level: 1,
            }),
        ).toBeVisible()

        await expect(page.getByText('1.19 ETH')).toBeVisible()

        await expect(
            page.getByText('Kurio Apes', { exact: true }),
        ).toBeVisible()

        await expect(page.getByText('#0042')).toBeVisible()
    })

    test('não exibe metadados do Emerald Ape em outro NFT', async ({
        page,
    }) => {
        await page.goto('/nft/golden-beat-207')

        await expect(
            page.getByRole('heading', {
                name: 'Golden Beat #207',
                level: 1,
            }),
        ).toBeVisible()

        await expect(page.getByText('Kurio Apes')).toHaveCount(0)

        await expect(page.getByText('#0042')).toHaveCount(0)
    })
})


test('permite selecionar uma edição do NFT', async ({ page }) => {
    await page.goto('/nft/emerald-ape-042')

    const edition = page.getByRole('button', {
        name: '1/10',
        exact: true,
    })

    await edition.click()

    await expect(edition).toHaveAttribute('aria-pressed', 'true')
})


test('permite aumentar e diminuir a quantidade do NFT', async ({ page }) => {
    await page.goto('/nft/emerald-ape-042')

    const increaseButton = page.getByRole('button', {
        name: 'Aumentar quantidade',
    })

    const decreaseButton = page.getByRole('button', {
        name: 'Diminuir quantidade',
    })

    const quantity = page.getByRole('status', {
        name: 'Quantidade selecionada',
    })

    await expect(quantity).toHaveText('1')
    await expect(decreaseButton).toBeDisabled()

    await increaseButton.click()

    await expect(quantity).toHaveText('2')
    await expect(decreaseButton).toBeEnabled()

    await decreaseButton.click()

    await expect(quantity).toHaveText('1')
    await expect(decreaseButton).toBeDisabled()
})

test('respeita o limite máximo de 10 unidades', async ({ page }) => {
    await page.goto('/nft/emerald-ape-042')

    const increaseButton = page.getByRole('button', {
        name: 'Aumentar quantidade',
    })

    const quantity = page.getByRole('status', {
        name: 'Quantidade selecionada',
    })

    for (let index = 1; index < 10; index++) {
        await increaseButton.click()
    }

    await expect(quantity).toHaveText('10')
    await expect(increaseButton).toBeDisabled()
})


test('permite favoritar e desfavoritar um NFT', async ({ page }) => {
    await page.goto('/nft/emerald-ape-042')

    const favoriteButton = page.getByRole('button', {
        name: 'Favoritar',
        exact: true,
    })

    await expect(favoriteButton).toHaveAttribute('aria-pressed', 'false')

    // Adicionar aos favoritos
    await favoriteButton.click()

    const favoritedButton = page.getByRole('button', {
        name: 'Favoritado',
        exact: true,
    })

    await expect(favoritedButton).toHaveAttribute('aria-pressed', 'true')

    // Remover dos favoritos
    await favoritedButton.click()

    await expect(favoriteButton).toHaveAttribute('aria-pressed', 'false')
})


test('exibe a edição e a quantidade na compra demonstrativa', async ({
    page,
}) => {
    await page.goto('/nft/emerald-ape-042')

    // Selecionar a edição 1/10
    await page.getByRole('button', {
        name: '1/10',
        exact: true,
    }).click()

    // Aumentar a quantidade para 3
    const increaseButton = page.getByRole('button', {
        name: 'Aumentar quantidade',
    })

    await increaseButton.click()
    await increaseButton.click()

    // Iniciar a compra demonstrativa
    await page.getByRole('button', {
        name: 'Comprar',
        exact: true,
    }).click()

    // Conferir os dados apresentados
    await expect(
        page.getByRole('status').filter({
            hasText: 'Compra demonstrativa:',
        }),
    ).toHaveText(
        'Compra demonstrativa: 3 unidade(s) de Emerald Ape #042, edição 1/10. O pagamento ainda não está disponível.',
    )
})

test('permite selecionar as miniaturas da galeria', async ({ page }) => {
    await page.goto('/nft/emerald-ape-042')

    const firstImage = page.getByRole('button', {
        name: 'Visualizar imagem 1 de Emerald Ape #042',
    })

    const thirdImage = page.getByRole('button', {
        name: 'Visualizar imagem 3 de Emerald Ape #042',
    })

    const fourthImage = page.getByRole('button', {
        name: 'Visualizar imagem 4 de Emerald Ape #042',
    })

    // A primeira imagem deve começar selecionada
    await expect(firstImage).toHaveAttribute('aria-pressed', 'true')
    await expect(thirdImage).toHaveAttribute('aria-pressed', 'false')

    // Selecionar a terceira imagem
    await thirdImage.click()

    await expect(thirdImage).toHaveAttribute('aria-pressed', 'true')
    await expect(firstImage).toHaveAttribute('aria-pressed', 'false')

    // Selecionar a quarta imagem
    await fourthImage.click()

    await expect(fourthImage).toHaveAttribute('aria-pressed', 'true')
    await expect(thirdImage).toHaveAttribute('aria-pressed', 'false')

    // A imagem principal continua visível
    await expect(
        page.getByRole('img', {
            name: 'Arte do NFT Emerald Ape #042',
        }),
    ).toBeVisible()
})


test('permite alternar entre detalhes e avaliações do NFT', async ({ page }) => {
    await page.goto('/nft/emerald-ape-042')

    const detailsTab = page.getByRole('tab', {
        name: 'Detalhes do NFT',
    })

    const reviewsTab = page.getByRole('tab', {
        name: 'Avaliações de colecionadores (19)',
    })

    // A aba de detalhes começa selecionada
    await expect(detailsTab).toHaveAttribute('aria-selected', 'true')
    await expect(reviewsTab).toHaveAttribute('aria-selected', 'false')

    await expect(
        page.getByRole('tabpanel', { name: 'Detalhes do NFT' }),
    ).toBeVisible()

    // Abrir a aba de avaliações
    await reviewsTab.click()

    await expect(reviewsTab).toHaveAttribute('aria-selected', 'true')
    await expect(detailsTab).toHaveAttribute('aria-selected', 'false')

    await expect(
        page.getByRole('tabpanel', {
            name: 'Avaliações de colecionadores (19)',
        }),
    ).toBeVisible()

    await expect(
        page.getByText('O protótipo apresenta 19 avaliações para este NFT.', {
            exact: false,
        }),
    ).toBeVisible()

    // Voltar para os detalhes
    await detailsTab.click()

    await expect(detailsTab).toHaveAttribute('aria-selected', 'true')

    await expect(
        page.getByRole('tabpanel', { name: 'Detalhes do NFT' }),
    ).toBeVisible()
})


test('exibe zero avaliações quando o NFT não possui avaliações cadastradas', async ({ page }) => {
    await page.goto('/nft/golden-beat-207')

    const reviewsTab = page.getByRole('tab', {
        name: 'Avaliações de colecionadores (0)',
    })

    await expect(reviewsTab).toBeVisible()

    await reviewsTab.click()

    await expect(reviewsTab).toHaveAttribute('aria-selected', 'true')

    await expect(
        page.getByText('Ainda não há avaliações disponíveis para este NFT.'),
    ).toBeVisible()
})


test('permite navegar para um NFT relacionado', async ({ page }) => {
    await page.goto('/nft/emerald-ape-042')

    const relatedSection = page.getByRole('region', {
        name: 'Mais desta coleção',
    })

    await expect(relatedSection).toBeVisible()

    const relatedNftLink = relatedSection.getByRole('link', {
        name: 'Ver detalhes de Cosmic Bloom #118',
    })

    await expect(relatedNftLink).toBeVisible()

    // Navegar para o NFT relacionado
    await relatedNftLink.click()

    // Verificar se a rota foi atualizada
    await expect(page).toHaveURL(/\/nft\/cosmic-bloom-118\/?$/)

    // Verificar se o novo NFT foi carregado
    await expect(
        page.getByRole('heading', {
            name: 'Cosmic Bloom #118',
            level: 1,
        }),
    ).toBeVisible()

    // Confirmar que não estamos mais nos detalhes do Emerald Ape
    await expect(
        page.getByRole('heading', {
            name: 'Emerald Ape #042',
            level: 1,
        }),
    ).toHaveCount(0)
})


test('exibe a página de detalhes corretamente em dispositivos móveis', async ({ page }) => {
    await page.setViewportSize({
        width: 375,
        height: 812,
    })

    await page.goto('/nft/emerald-ape-042')

    // O título do NFT deve continuar visível
    await expect(
        page.getByRole('heading', {
            name: 'Emerald Ape #042',
            level: 1,
        }),
    ).toBeVisible()

    // A imagem principal deve continuar acessível
    await expect(
        page.getByRole('img', {
            name: 'Arte do NFT Emerald Ape #042',
        }),
    ).toBeVisible()

    // Os controles de compra devem estar disponíveis
    await expect(
        page.getByRole('button', {
            name: 'Comprar',
            exact: true,
        }),
    ).toBeVisible()

    // Verificar se não existe rolagem horizontal indesejada
    const hasHorizontalOverflow = await page.evaluate(() => {
        return (
            document.documentElement.scrollWidth >
            document.documentElement.clientWidth
        )
    })

    expect(hasHorizontalOverflow).toBe(false)
})
