import { Outlet } from 'react-router-dom'
import { SellerSidebar } from './SellerSidebar'

export function SellerLayout() {
  return (
    <div className="min-h-svh bg-slate-50 lg:pl-64">
      <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:block lg:w-64">
        <SellerSidebar />
      </div>
      <div className="min-h-svh">
        <Outlet />
      </div>
    </div>
  )
}
