import { test, expect } from '@playwright/test'

test.describe('Footer', () => {
    test('deve exibir todas as seções do rodapé', async ({ page }) => {
        await page.goto('/')

        const footer = page.locator('footer')

        await expect(footer).toBeVisible()

        await expect(
            footer.getByRole('heading', { name: 'Segurança da carteira' }),
        ).toBeVisible()

        await expect(
            footer.getByRole('heading', { name: 'Criadores em destaque' }),
        ).toBeVisible()

        await expect(
            footer.getByRole('heading', { name: 'Alertas de lançamentos' }),
        ).toBeVisible()

        await expect(
            footer.getByRole('heading', {
                name: 'Antecipe-se ao próximo lançamento',
            }),
        ).toBeVisible()

        await expect(
            footer.getByRole('heading', { name: 'Meu perfil' }),
        ).toBeVisible()

        await expect(
            footer.getByRole('heading', { name: 'Central de ajuda' }),
        ).toBeVisible()

        await expect(
            footer.getByRole('heading', { name: 'Coleções' }),
        ).toBeVisible()

        await expect(
            footer.getByRole('heading', { name: 'Redes sociais' }),
        ).toBeVisible()

        await expect(
            footer.getByRole('heading', { name: 'Carteiras compatíveis' }),
        ).toBeVisible()

        await expect(
            footer.getByText('© 2026 Kurio. Propriedade digital para todos.'),
        ).toBeVisible()
    })

    test('deve validar o e-mail e informar indisponibilidade da newsletter', async ({
        page,
    }) => {
        await page.goto('/')

        const footer = page.locator('footer')
        const email = footer.getByRole('textbox', {
            name: 'Seu e-mail para receber novidades',
        })
        const submit = footer.getByRole('button', { name: 'Enviar' })

        await submit.click()

        await expect(email).toBeFocused()

        await expect(
            footer.getByRole('status'),
        ).toHaveCount(0)

        await email.fill('email-invalido')
        await submit.click()

        await expect(
            footer.getByRole('status'),
        ).toHaveCount(0)

        await email.fill('colecionador@example.com')
        await submit.click()

        await expect(
            footer.getByRole('status'),
        ).toHaveText(
            'O cadastro na newsletter ainda não está disponível.',
        )

        await email.fill('outro@example.com')

        await expect(
            footer.getByRole('status'),
        ).toHaveCount(0)
    })

    test('deve adaptar o rodapé sem rolagem horizontal', async ({ page }) => {
        const widths = [375, 768, 1024, 1440]

        for (const width of widths) {
            await page.setViewportSize({
                width,
                height: 900,
            })

            await page.goto('/')

            const footer = page.locator('footer')

            await expect(footer).toBeVisible()

            const footerBox = await footer.boundingBox()

            expect(footerBox).not.toBeNull()
            expect(footerBox!.width).toBeLessThanOrEqual(width)

            const hasHorizontalOverflow = await page.evaluate(() => {
                return (
                    document.documentElement.scrollWidth >
                    document.documentElement.clientWidth
                )
            })

            expect(
                hasHorizontalOverflow,
                `Rolagem horizontal encontrada em ${width}px`,
            ).toBe(false)
        }
    })
})
