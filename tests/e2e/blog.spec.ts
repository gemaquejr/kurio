
import { test, expect } from '@playwright/test'

test.describe('Seção Blog', () => {
    test('deve exibir o cabeçalho e os quatro artigos', async ({ page }) => {
        await page.goto('/')

        const blog = page.getByRole('region', {
            name: 'Diário da Cunhagem',
        })

        await expect(blog).toBeVisible()

        await expect(
            blog.getByRole('heading', {
                name: 'Diário da Cunhagem',
            }),
        ).toBeVisible()

        await expect(blog.locator('article')).toHaveCount(4)

        const titles = [
            'Como funciona a propriedade de NFTs',
            '10 artistas digitais para acompanhar',
            'Raridade, atributos e procedência',
            'Como proteger sua carteira',
        ]

        for (const title of titles) {
            await expect(
                blog.getByRole('heading', { name: title }),
            ).toBeVisible()
        }

        const images = blog.locator('article img')

        await expect(images).toHaveCount(4)

        for (const image of await images.all()) {
            await expect(image).toHaveJSProperty('complete', true)

            const loaded = await image.evaluate(
                (element: HTMLImageElement) => element.naturalWidth > 0,
            )

            expect(loaded).toBe(true)
        }
    })

    test('deve adaptar os cards para diferentes tamanhos de tela', async ({
        page,
    }) => {
        for (const width of [375, 768, 1024, 1440]) {
            await page.setViewportSize({
                width,
                height: 900,
            })

            await page.goto('/')

            const blog = page.getByRole('region', {
                name: 'Diário da Cunhagem',
            })

            const cards = blog.locator('article')

            await expect(cards).toHaveCount(4)

            const positions = await cards.evaluateAll((elements) =>
                elements.map((element) => {
                    const rect = element.getBoundingClientRect()

                    return {
                        x: rect.x,
                        y: rect.y,
                        width: rect.width,
                        height: rect.height,
                    }
                }),
            )

            if (width < 640) {
                expect(positions[0].y).toBeLessThan(positions[1].y)
                expect(positions[1].y).toBeLessThan(positions[2].y)
                expect(positions[2].y).toBeLessThan(positions[3].y)
            } else if (width < 1024) {
                expect(positions[0].y).toBe(positions[1].y)
                expect(positions[2].y).toBe(positions[3].y)
                expect(positions[0].y).toBeLessThan(positions[2].y)
            } else {
                for (let index = 1; index < positions.length; index++) {
                    expect(positions[index].y).toBe(positions[0].y)
                    expect(positions[index].x).toBeGreaterThan(
                        positions[index - 1].x,
                    )
                }
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
