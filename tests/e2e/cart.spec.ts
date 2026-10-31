
import { expect, test } from '@playwright/test'

test.describe('Carrinho de NFTs', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/cart')
    })

    test('deve exibir os três NFTs iniciais', async ({ page }) => {
        const cart = page.getByRole('region', {
            name: 'Itens do carrinho',
        })

        for (const name of [
            'Emerald Ape #042',
            'Violet Nomad #314',
            'Ivory Baron #088',
        ]) {
            await expect(
                cart.getByRole('heading', {
                    name,
                    exact: true,
                }),
            ).toBeVisible()
        }
    })

    test('deve calcular o subtotal e o total corretamente', async ({
        page,
    }) => {
        const summary = page.getByRole('complementary', {
            name: 'Resumo da carteira',
        })

        await expect(summary).toContainText('26.83 ETH')
        await expect(summary).toContainText('0.016 ETH')
        await expect(summary).toContainText('26.846 ETH')
    })

    test('deve aumentar a quantidade e atualizar o total', async ({
        page,
    }) => {
        await page
            .getByRole('button', {
                name: 'Aumentar quantidade de Emerald Ape #042',
            })
            .click()

        const summary = page.getByRole('complementary', {
            name: 'Resumo da carteira',
        })

        await expect(summary).toContainText('28.02 ETH')
        await expect(summary).toContainText('28.036 ETH')
    })

    test('não deve permitir quantidade menor que um', async ({
        page,
    }) => {
        const decreaseButton = page.getByRole('button', {
            name: 'Diminuir quantidade de Emerald Ape #042',
        })

        await decreaseButton.click()

        await expect(decreaseButton).toBeDisabled()

        await expect(
            page.getByRole('complementary', {
                name: 'Resumo da carteira',
            }),
        ).toContainText('25.64 ETH')
    })

    test('não deve permitir quantidade maior que dez', async ({
        page,
    }) => {
        const increaseButton = page.getByRole('button', {
            name: 'Aumentar quantidade de Ivory Baron #088',
        })

        await increaseButton.click()

        await expect(
            page.getByRole('complementary', {
                name: 'Resumo da carteira',
            }),
        ).toContainText('28.62 ETH')

        await expect(increaseButton).toBeDisabled()

        await expect(
            page.getByRole('complementary', {
                name: 'Resumo da carteira',
            }),
        ).toContainText('28.62 ETH')
    })

    test('deve remover um NFT do carrinho', async ({ page }) => {
        await page
            .getByRole('button', {
                name: 'Remover Emerald Ape #042 do carrinho',
            })
            .click()

        await expect(
            page.getByRole('heading', { name: 'Emerald Ape #042' }),
        ).toHaveCount(0)

        await expect(
            page.getByRole('complementary', {
                name: 'Resumo da carteira',
            }),
        ).toContainText('24.45 ETH')
    })

    test('deve exibir o estado vazio e desabilitar checkout', async ({
        page,
    }) => {
        for (const name of [
            'Emerald Ape #042',
            'Violet Nomad #314',
            'Ivory Baron #088',
        ]) {
            await page
                .getByRole('button', {
                    name: `Remover ${name} do carrinho`,
                })
                .click()
        }

        await expect(
            page.getByText('Seu carrinho está vazio.'),
        ).toBeVisible()

        await expect(
            page.getByRole('button', { name: 'Conectar e finalizar' }),
        ).toBeDisabled()

        await expect(
            page.getByRole('button', { name: 'Aplicar' }),
        ).toBeDisabled()
    })

    test('deve informar que o checkout ainda não está disponível', async ({
        page,
    }) => {
        await page
            .getByRole('button', { name: 'Conectar e finalizar' })
            .click()

        await expect(
            page.getByText(
                'A conexão com a carteira e a finalização da compra ainda não estão disponíveis.',
            ),
        ).toBeVisible()
    })

    test('deve exibir os cinco NFTs recomendados', async ({ page }) => {
        const recommendations = page.getByRole('region', {
            name: 'Colecionadores também viram',
        })

        for (const name of [
            'Cosmic Bloom #118',
            'Violet Nomad #314',
            'Ivory Baron #088',
            'Golden Beat #207',
            'Golden Signal #160',
        ]) {
            await expect(
                recommendations.getByRole('link', {
                    name,
                    exact: true,
                }),
            ).toBeVisible()
        }
    })

    test('não deve causar overflow horizontal no mobile', async ({
        page,
    }) => {
        await page.setViewportSize({
            width: 390,
            height: 844,
        })

        const hasHorizontalOverflow = await page.evaluate(() => {
            return (
                document.documentElement.scrollWidth >
                document.documentElement.clientWidth
            )
        })

        expect(hasHorizontalOverflow).toBe(false)
    })
})
