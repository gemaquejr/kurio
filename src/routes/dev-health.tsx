import { createFileRoute } from '@tanstack/react-router'
import { QueryTest } from '@/components/query-test'

export const Route = createFileRoute('/dev-health')({
    component: DevHealthPage,
})

function DevHealthPage() {
    if (!import.meta.env.DEV) {
        return null
    }

    return (
        <main className="flex min-h-screen items-center justify-center p-6">
            <QueryTest />
        </main>
    )
}