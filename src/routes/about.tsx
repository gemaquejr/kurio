import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
    component: AboutPage,
})

function AboutPage() {
    return (
        <main className="flex flex-col items-center gap-6 p-10">
            <h1 className="text-3xl font-bold">Sobre o Kurio</h1>

            <p className="text-neutral-400">
                Página temporária para validar a navegação.
            </p>

            <Link to="/" className="underline">
                Voltar para a página inicial
            </Link>
        </main>
    )
}