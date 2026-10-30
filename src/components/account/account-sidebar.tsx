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
    { label: 'Dados do perfil', icon: UserRound, active: true },
    { label: 'Carteiras', icon: MapPin, active: false },
    { label: 'Atividade', icon: ShoppingBag, active: false },
    { label: 'Lista de interesse', icon: Heart, active: false },
    { label: 'Ofertas', icon: Activity, active: false },
    { label: 'Arquivos baixados', icon: Download, active: false },
    { label: 'Suporte', icon: TriangleAlert, active: false },
]

export function AccountSidebar() {
    return (
        <aside
            aria-label="Menu da conta"
            className="w-full min-w-0 bg-[#241612] py-2"
        >
            <h2 className="px-4 py-3 text-lg font-bold text-[#F5F1EB]">
                Meu perfil
            </h2>

            <nav aria-label="Navegação da conta">
                {menuItems.map(({ label, icon: Icon, active }) => (
                    <div
                        key={label}
                        aria-current={active ? 'page' : undefined}
                        className={`flex h-11.25 items-center gap-4 border-l-[6px] px-4 text-[15px] ${active
                                ? 'border-[#D28A4C] text-[#E89B55]'
                                : 'border-transparent text-[#E89B55]'
                            }`}
                    >
                        <Icon
                            size={18}
                            strokeWidth={1.5}
                            className={
                                active
                                    ? 'text-[#D28A4C]'
                                    : 'text-[#B39463]'
                            }
                            aria-hidden="true"
                        />

                        <span>{label}</span>
                    </div>
                ))}
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