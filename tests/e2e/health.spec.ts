import { expect, test } from '@playwright/test'

test('consulta a API simulada com sucesso', async ({ page }) => {
    await page.goto('/')

    await expect(
        page.getByText('MSW + Axios + TanStack Query funcionando!'),
    ).toBeVisible()

    await page.getByRole('button', {
        name: 'Consultar com sucesso',
    }).click()

    await expect(
        page.getByText('MSW + Axios + TanStack Query funcionando!'),
    ).toBeVisible()
})

test('exibe o erro retornado pela API simulada', async ({ page }) => {
    await page.goto('/')

    await page.getByRole('button', {
        name: 'Simular erro',
    }).click()

    await expect(
        page.getByRole('alert'),
    ).toHaveText('Falha simulada na API')
})