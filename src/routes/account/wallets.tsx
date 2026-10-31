import { createFileRoute } from '@tanstack/react-router'

import { AccountSidebar } from '@/components/account/account-sidebar'
import { Header } from '@/components/layout/header'
import { WalletForm } from '@/components/wallets/wallet-form'
import { SecondaryWallet } from '@/components/wallets/secondary-wallet'

export const Route = createFileRoute('/account/wallets')({
    component: WalletsPage,
})

function WalletsPage() {
    return (
        <>
            <Header />

            <main className="mx-auto w-full max-w-300 px-5 pt-8 pb-24 min-[1240px]:px-0">
                <div className="grid min-w-0 grid-cols-1 gap-7 lg:grid-cols-[310px_minmax(0,1fr)]">
                    <AccountSidebar />

                    <section
                        aria-labelledby="wallets-title"
                        className="flex min-w-0 flex-col gap-8"
                    >
                        <WalletForm />
                        <SecondaryWallet />
                    </section>
                </div>
            </main>
        </>
    )
}