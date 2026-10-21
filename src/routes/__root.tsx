import { createRootRoute, Link, Outlet } from '@tanstack/react-router'

export const Route = createRootRoute({
    component: RootLayout,
})

function RootLayout() {
    return (
        <div className="min-h-screen bg-neutral-950 text-white">
            <header className="border-b border-neutral-800 p-6">
                <nav className="flex items-center gap-6">
                    <Link to="/" className="font-bold">
                        Kurio
                    </Link>

                    <Link to="/about" className="text-neutral-300">
                        Sobre
                    </Link>
                </nav>
            </header>

            <Outlet />
        </div>
    )
}