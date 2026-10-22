import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { QueryTest } from '@/components/query-test'
import { Top } from '@/components/home/top'

export const Route = createFileRoute('/')({
    component: HomePage,
})

function HomePage() {
    return (
        <main className="px-5 pt-6 min-[1440px]:px-30">
            <Top />

            <div className="flex flex-col items-center gap-6 p-10">
                <h2 className="text-3xl font-bold">
                    Kurio Marketplace
                </h2>

                <p className="text-neutral-400">
                    TanStack Router configurado com sucesso.
                </p>

                <Button onClick={() => window.alert('shadcn/ui funcionando!')}>
                    Testar componente
                </Button>

                <QueryTest />
            </div>
        </main>
    )
}