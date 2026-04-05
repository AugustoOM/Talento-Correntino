import { NavLink } from 'react-router-dom'
import { LogOut } from 'lucide-react'
import { BRAND } from '../../data/constants'
import { Logo } from '../brand/Logo'
import { cn } from '../../lib/cn'
import { useSellerAuthStore } from '../../stores/sellerAuthStore'
import { useNavigate } from 'react-router-dom'
import { SELLER_NAV } from './sellerNav'

export function SellerSidebar() {
  const logout = useSellerAuthStore((s) => s.logout)
  const navigate = useNavigate()

  return (
    <aside className="flex h-full w-full flex-col border-r border-slate-200/80 bg-white/95">
      <div className="flex h-16 shrink-0 items-center gap-2 border-b border-slate-100 px-5">
        <Logo size="sidebar" className="min-w-0" />
        <div className="min-w-0">
          <p className="font-display text-sm font-bold text-slate-900">
            {BRAND.name}
          </p>
          <p className="text-[10px] font-medium uppercase tracking-wider text-slate-500">
            Panel vendedor
          </p>
        </div>
      </div>
      <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-3">
        {SELLER_NAV.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-violet-100 text-violet-900'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900',
              )
            }
          >
            <Icon className="h-5 w-5 shrink-0 opacity-80" />
            {label}
          </NavLink>
        ))}
      </nav>
      <div className="shrink-0 border-t border-slate-100 p-3">
        <button
          type="button"
          onClick={() => {
            logout()
            navigate('/vendedor/login', { replace: true })
          }}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-rose-700 transition hover:bg-rose-50"
        >
          <LogOut className="h-5 w-5" />
          Salir
        </button>
      </div>
    </aside>
  )
}
