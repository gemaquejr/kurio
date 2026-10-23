import { test, expect } from '@playwright/test'

test.describe('Seção Promos', () => {
    test('deve exibir os dois cards promocionais', async ({ page }) => {
        await page.goto('/')

        const promos = page.getByRole('region', {
            name: 'Promoções do marketplace',
        })

        await expect(promos).toBeVisible()
        await expect(promos.locator('article')).toHaveCount(2)

        await expect(
            promos.getByRole('heading', {
                name: 'Lançamentos gênesis de edição limitada',
            }),
        ).toBeVisible()

        await expect(
            promos.getByRole('heading', {
                name: 'Arte digital selecionada e muito mais',
            }),
        ).toBeVisible()

        const links = promos.getByRole('link', { name: /Explorar/ })

        await expect(links).toHaveCount(2)

        for (const link of await links.all()) {
            await expect(link).toHaveAttribute('href', '#mercado')
        }
    })

    test('deve adaptar os cards para mobile e desktop', async ({ page }) => {
        for (const width of [375, 768, 1024, 1440]) {
            await page.setViewportSize({ width, height: 900 })
            await page.goto('/')

            const promos = page.getByRole('region', {
                name: 'Promoções do marketplace',
            })

            const cards = promos.locator('article')

            const first = await cards.nth(0).boundingBox()
            const second = await cards.nth(1).boundingBox()

            expect(first).not.toBeNull()
            expect(second).not.toBeNull()

            if (!first || !second) {
                throw new Error('Não foi possível medir os cards')
            }

            if (width < 1024) {
                // Cards empilhados
                expect(first.y + first.height).toBeLessThanOrEqual(second.y)
            } else {
                // Cards lado a lado
                expect(first.x + first.width).toBeLessThanOrEqual(second.x)
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
})