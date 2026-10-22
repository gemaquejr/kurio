import { expect, test } from '@playwright/test'

test('exibe a navegação principal no desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto('/')

    const navigation = page.getByRole('navigation', {
        name: 'Navegação principal',
    })

    await expect(navigation).toBeVisible()
    await expect(
        navigation.getByRole('link', { name: 'Início' }),
    ).toBeVisible()
    await expect(
        navigation.getByRole('link', { name: 'Mercado' }),
    ).toBeVisible()
    await expect(
        page.getByRole('button', { name: 'Entrar' }),
    ).toBeVisible()
})

test('abre e fecha o menu mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto('/')

    const openMenu = page.getByRole('button', { name: 'Abrir menu' })

    await expect(openMenu).toBeVisible()
    await openMenu.click()

    const mobileNavigation = page.getByRole('navigation', {
        name: 'Navegação móvel',
    })

    await expect(mobileNavigation).toBeVisible()
    await expect(
        mobileNavigation.getByRole('link', { name: 'Criadores' }),
    ).toBeVisible()

    await page.getByRole('button', { name: 'Fechar menu' }).click()

    await expect(mobileNavigation).not.toBeVisible()
})