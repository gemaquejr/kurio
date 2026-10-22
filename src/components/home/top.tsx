import { Header } from '@/components/layout/header'
import { Hero } from '@/components/home/hero'

export function Top() {
    return (
        <div className="mx-auto flex w-full max-w-300 flex-col gap-8">
            <Header />
            <Hero />
        </div>
    )
}