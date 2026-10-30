import { createFileRoute } from '@tanstack/react-router'

import { Header } from '@/components/layout/header'
import { AccountSidebar } from '@/components/account/account-sidebar'
import { ProfileForm } from '@/components/account/profile-form'

export const Route = createFileRoute('/account/profile')({
  component: CollectorProfilePage,
})

function CollectorProfilePage() {
  return (
    <>
      <Header />

      <main className="mx-auto w-full max-w-300 px-5 pt-8 pb-24 min-[1240px]:px-0">
        <div className="grid min-w-0 grid-cols-1 gap-7 lg:grid-cols-[310px_minmax(0,1fr)]">
          <AccountSidebar />

          <section
            aria-labelledby="collector-profile-title"
            className="min-w-0"
          >
            <ProfileForm />
          </section>
        </div>
      </main>
    </>
  )
}