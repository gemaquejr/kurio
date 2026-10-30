import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/account/account-sidebar')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/account/account-sidebar"!</div>
}
