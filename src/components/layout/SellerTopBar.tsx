import { Menu, X, LogOut } from 'lucide-react'
import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Button } from '../ui/Button'
import { SELLER_NAV } from './sellerNav'
import { cn } from '../../lib/cn'
import { useSellerAuthStore } from '../../stores/sellerAuthStore'

export function SellerTopBar({ title }: { title: string }) {
  const [open, setOpen] = useState(false)
  const logout = useSellerAuthStore((s) => s.logout)
  const navigate = useNavigate()

  return (
    <>
      <div className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur lg:hidden">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => setOpen(true)}
          aria-label="Abrir menú"
        >
          <Menu className="h-6 w-6 text-slate-800" />
        </Button>
        <h1 className="font-display text-base font-bold text-slate-900">
          {title}
        </h1>
        <Link to="/" className="text-xs font-semibold text-violet-600">
          Tienda
        </Link>
      </div>

      {open ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/40"
            aria-label="Cerrar menú"
            onClick={() => setOpen(false)}
          />
          <div className="absolute left-0 top-0 flex h-full w-[min(100%,300px)] flex-col bg-white shadow-2xl">
            <div className="flex h-14 items-center justify-between border-b border-slate-100 px-3">
              <span className="text-sm font-semibold text-slate-800">Menú</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-lg p-2 hover:bg-slate-100"
                aria-label="Cerrar"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto py-2">
              {SELLER_NAV.map(({ to, label, icon: Icon }) => (
                <NavLink
                  key={to}
                  to={to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-3 px-4 py-3 text-sm font-medium',
                      isActive
                        ? 'bg-violet-50 text-violet-900'
                        : 'text-slate-700 hover:bg-slate-50',
                    )
                  }
                >
                  <Icon className="h-5 w-5 shrink-0" />
                  {label}
                </NavLink>
              ))}
            </nav>
            <button
              type="button"
              className="flex items-center gap-3 border-t border-slate-100 px-4 py-3 text-sm font-medium text-rose-700"
              onClick={() => {
                setOpen(false)
                logout()
                navigate('/vendedor/login', { replace: true })
              }}
            >
              <LogOut className="h-5 w-5" />
              Salir
            </button>
          </div>
        </div>
      ) : null}
    </>
  )
}
