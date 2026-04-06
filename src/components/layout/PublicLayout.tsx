import { Outlet } from 'react-router-dom'
import { GradientBackdrop } from '../ui/GradientBackdrop'
import { PublicNavbar } from './PublicNavbar'
import { PublicFooter } from './PublicFooter'
import { CartAddModal } from '../shop/CartAddModal'

export function PublicLayout() {
  return (
    <div className="relative flex min-h-svh flex-col">
      <GradientBackdrop />
      <PublicNavbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <PublicFooter />
      <CartAddModal />
    </div>
  )
}
