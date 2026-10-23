import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { LogOut, Menu, Search, ShoppingCart, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { SignInModal } from '@/components/auth/sign-in-modal'

type ActivePage = 'home' | 'market' | 'creators' | 'learn'

type HeaderProps = {
    showDivider?: boolean
    activePage?: ActivePage
    cartCount?: number
}

const navigation: {
    label: string
    href: string
    page: ActivePage
}[] = [
        { label: 'Início', href: '/', page: 'home' },
        { label: 'Mercado', href: '/#mercado', page: 'market' },
        { label: 'Criadores', href: '/#criadores', page: 'creators' },
        { label: 'Aprenda', href: '/#aprenda', page: 'learn' },
    ]

export function Header({
    showDivider = true,
    activePage = 'home',
    cartCount = 6,
}: HeaderProps) {
    const [menuOpen, setMenuOpen] = useState(false)
    const [signInOpen, setSignInOpen] = useState(false)

    function openSignIn() {
        setMenuOpen(false)
        setSignInOpen(true)
    }

    return (
        <header className="w-full bg-background text-foreground">
            <div className="mx-auto w-full max-w-300 px-5 lg:px-0">
                <div className="flex min-h-11.25 items-center justify-between gap-6 py-3 lg:h-11.25 lg:py-0">
                    <Link
                        to="/"
                        className="relative block h-[34.3px] w-40 shrink-0 text-foreground"
                        aria-label="Kurio — página inicial"
                    >
                        <span className="absolute top-[8.15px] left-0 text-[14px] leading-none font-bold tracking-widest">
                            KURIO
                        </span>
                    </Link>


                    <nav
                        aria-label="Navegação principal"
                        className="hidden h-11.25 w-100.25 shrink-0 items-center justify-start gap-10 lg:flex"
                    >
                        {navigation.map((item) => (
                            <a
                                key={item.label}
                                href={item.href}
                                className="group relative flex h-11.25 items-center whitespace-nowrap text-[16px] leading-none font-normal tracking-normal text-foreground transition-colors duration-200 hover:text-primary focus-visible:text-primary"
                            >
                                {item.label}

                                <span
                                    aria-hidden="true"
                                    className="absolute right-0 bottom-0 left-0 h-0.5 origin-center scale-x-0 bg-primary transition-transform duration-200 ease-in-out group-hover:scale-x-100 group-focus-visible:scale-x-100"
                                />
                            </a>
                        ))}
                    </nav>


                    <div className="hidden h-8.75 w-51.75 shrink-0 items-center gap-7 lg:flex">
                        <button
                            type="button"
                            aria-label="Pesquisar"
                            className="flex h-5 w-5 shrink-0 cursor-pointer items-center justify-center text-foreground transition-colors hover:text-primary"
                        >
                            <Search size={20} />
                        </button>

                        <button
                            type="button"
                            aria-label={`Carrinho, ${cartCount} itens`}
                            className="relative flex h-6 w-7.75 shrink-0 cursor-pointer items-center justify-center text-foreground transition-colors hover:text-primary"
                        >
                            <ShoppingCart size={20} strokeWidth={2} />

                            {cartCount > 0 && (
                                <span
                                    aria-hidden="true"
                                    className="absolute -top-2 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] leading-none font-semibold text-primary-foreground"
                                >
                                    {cartCount}
                                </span>
                            )}
                        </button>

                        <Button
                            type="button"
                            className="h-8.75 w-25 shrink-0 gap-2 rounded-[6px] bg-primary px-0 text-[16px] leading-none font-medium tracking-normal text-[#140D0A] hover:bg-primary/90 hover:text-[#140D0A]"
                            onClick={openSignIn}
                        >
                            <LogOut size={20} strokeWidth={1.75} aria-hidden="true" />
                            <span>Entrar</span>
                        </Button>
                    </div>

                    <button
                        type="button"
                        className="cursor-pointer text-foreground lg:hidden"
                        aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
                        aria-expanded={menuOpen}
                        aria-controls="mobile-navigation"
                        onClick={() => setMenuOpen((current) => !current)}
                    >
                        {menuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {showDivider && (
                    <div
                        aria-hidden="true"
                        className="w-full border-t-[0.3px] border-primary"
                    />
                )}

                {menuOpen && (
                    <nav
                        id="mobile-navigation"
                        aria-label="Navegação móvel"
                        className="flex flex-col gap-5 py-6 lg:hidden"
                    >
                        {navigation.map((item) => (
                            <a
                                key={item.label}
                                href={item.href}
                                aria-current={activePage === item.page ? 'page' : undefined}
                                className={`flex h-11.25 items-center gap-6 whitespace-nowrap transition-colors hover:text-text-accent ${activePage === item.page
                                    ? 'text-[16px] leading-none font-bold tracking-normal text-text-accent'
                                    : 'text-sm text-foreground/80'
                                    }`}
                            >
                                {item.label}
                            </a>
                        ))}

                        <Button
                            type="button"
                            className="h-8.75 w-25 shrink-0 rounded-[6px] bg-primary px-0 text-[16px] leading-none font-medium tracking-normal text-[#140D0A] hover:bg-primary/90 hover:text-[#140D0A]"
                            onClick={openSignIn}
                        >
                            Entrar
                        </Button>
                    </nav>
                )}
            </div>
            {signInOpen && (
                <SignInModal onClose={() => setSignInOpen(false)} />
            )}
        </header>
    )
}
