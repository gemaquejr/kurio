import { http, HttpResponse, delay } from 'msw'

export const handlers = [
    http.get('/api/health', async ({ request }) => {
        await delay(1200)

        const url = new URL(request.url)
        const shouldFail = url.searchParams.get('fail') === 'true'

        if (shouldFail) {
            return HttpResponse.json(
                { message: 'Falha simulada na API' },
                { status: 500 },
            )
        }

        return HttpResponse.json({
            status: 'ok',
            message: 'MSW + Axios + TanStack Query funcionando!',
        })
    }),
]