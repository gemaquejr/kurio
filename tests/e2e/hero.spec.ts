import { expect, test } from '@playwright/test'

test('exibe o Hero com título, ilustração e CTA', async ({ page }) => {
    await page.goto('/')

    const hero = page.getByRole('region', {
        name: 'Apresentação do Kurio',
    })

    await expect(hero).toBeVisible()

    await expect(
        hero.getByRole('heading', {
            level: 1,
            name: 'Seja dono do futuro da arte digital',
        }),
    ).toBeVisible()

    await expect(
        hero.getByRole('img', {
            name: 'Personagem ilustrado da coleção Kurio',
        }),
    ).toBeVisible()

    await expect(
        hero.getByRole('link', { name: 'EXPLORAR' }),
    ).toBeVisible()
})

test('não apresenta rolagem horizontal no mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto('/')

    const hasHorizontalOverflow = await page.evaluate(
        () => document.documentElement.scrollWidth > window.innerWidth,
    )

    expect(hasHorizontalOverflow).toBe(false)
})