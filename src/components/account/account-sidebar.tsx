
import { Link, useRouterState } from '@tanstack/react-router'
import {
    Activity,
    Download,
    Heart,
    LogOut,
    MapPin,
    ShoppingBag,
    TriangleAlert,
    UserRound,
} from 'lucide-react'

const menuItems = [
    {
        label: 'Dados do perfil',
        icon: UserRound,
        path: '/account/profile',
    },
    {
        label: 'Carteiras',
        icon: MapPin,
        path: '/account/wallets',
    },
    {
        label: 'Atividade',
        icon: ShoppingBag,
    },
    {
        label: 'Lista de interesse',
        icon: Heart,
    },
    {
        label: 'Ofertas',
        icon: Activity,
    },
    {
        label: 'Arquivos baixados',
        icon: Download,
    },
    {
        label: 'Suporte',
        icon: TriangleAlert,
    },
]

export function AccountSidebar() {
    const pathname = useRouterState({
        select: (state) => state.location.pathname,
    })

    return (
        <aside
            aria-label="Menu da conta"
            className="w-full min-w-0 bg-[#241612] py-2"
        >
            <h2 className="px-4 py-3 text-lg font-bold text-[#F5F1EB]">
                Meu perfil
            </h2>

            <nav aria-label="Navegação da conta">
                {menuItems.map(({ label, icon: Icon, path }) => {
                    const active = path === pathname

                    const content = (
                        <>
                            <Icon
                                size={18}
                                strokeWidth={1.5}
                                className={
                                    active ? 'text-[#D28A4C]' : 'text-[#B39463]'
                                }
                                aria-hidden="true"
                            />
                            <span>{label}</span>
                        </>
                    )

                    const className = `flex h-11.25 items-center gap-4 border-l-[6px] px-4 text-[15px] ${active
                            ? 'border-[#D28A4C] text-[#E89B55]'
                            : 'border-transparent text-[#E89B55]'
                        }`

                    return path ? (
                        <Link
                            key={label}
                            to={path}
                            aria-current={active ? 'page' : undefined}
                            className={className}
                        >
                            {content}
                        </Link>
                    ) : (
                        <div key={label} className={className}>
                            {content}
                        </div>
                    )
                })}
            </nav>

            <div className="mt-2 border-t border-[#D28A4C]/50 pt-2">
                <div className="flex h-10 items-center gap-2 px-4 text-[15px] font-bold text-[#E89B55]">
                    <LogOut
                        size={20}
                        strokeWidth={1.5}
                        className="text-[#D28A4C]"
                        aria-hidden="true"
                    />
                    <span>Sair</span>
                </div>
            </div>
        </aside>
    )
}
