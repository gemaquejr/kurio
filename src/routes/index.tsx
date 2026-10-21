import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { QueryTest } from '@/components/query-test'

export const Route = createFileRoute('/')({
    component: HomePage,
})

function HomePage() {
    return (
        <main className="flex flex-col items-center gap-6 p-10">
            <h1 className="text-3xl font-bold">Kurio Marketplace</h1>

            <p className="text-neutral-400">
                TanStack Router configurado com sucesso.
            </p>

            <Button onClick={() => window.alert('shadcn/ui funcionando!')}>
                Testar componente
            </Button>

            <QueryTest />
        </main>
    )
}