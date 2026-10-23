import { createFileRoute } from '@tanstack/react-router'
import { Top } from '@/components/home/top'
import { Products } from '@/components/home/products/products'
import { Promos } from '@/components/home/promos/promos'

export const Route = createFileRoute('/')({
    component: HomePage,
})

function HomePage() {
    return (
        <main className="px-5 pt-6 min-[1440px]:px-30">
            <Top />
            <Products />
            <div className="mt-20">
                <Promos />
            </div>
        </main>
    )
}