import { api } from '@/lib/api'

export type HealthResponse = {
    status: 'ok'
    message: string
}

export async function getHealth(
    shouldFail = false,
): Promise<HealthResponse> {
    const response = await api.get<HealthResponse>('/health', {
        params: {
            fail: shouldFail,
        },
    })

    return response.data
}