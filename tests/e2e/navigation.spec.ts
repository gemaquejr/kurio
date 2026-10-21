import { expect, test } from '@playwright/test'

test('navega entre a página inicial e Sobre', async ({ page }) => {
    await page.goto('/')

    await expect(
        page.getByRole('heading', { name: 'Kurio Marketplace' }),
    ).toBeVisible()

    await page.getByRole('link', { name: 'Sobre' }).click()

    await expect(page).toHaveURL(/\/about$/)

    await expect(
        page.getByRole('heading', { name: 'Sobre o Kurio' }),
    ).toBeVisible()

    await page.getByRole('link', {
        name: 'Voltar para a página inicial',
    }).click()

    await expect(page).toHaveURL(/\/$/)

    await expect(
        page.getByRole('heading', { name: 'Kurio Marketplace' }),
    ).toBeVisible()
})