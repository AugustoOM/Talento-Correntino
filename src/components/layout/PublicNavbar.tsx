import { Link, NavLink } from 'react-router-dom'
import { LayoutDashboard, ShoppingBag } from 'lucide-react'
import { BRAND } from '../../data/constants'
import { Logo } from '../brand/Logo'
import { useCartStore } from '../../stores/cartStore'
import { cn } from '../../lib/cn'

const navClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    'rounded-xl px-3 py-2 text-sm font-medium transition-colors',
    isActive
      ? 'bg-white/80 text-violet-800 shadow-sm'
      : 'text-aurora-muted hover:text-aurora-ink hover:bg-white/50',
  )

export function PublicNavbar() {
  const count = useCartStore((s) =>
    s.lines.reduce((a, l) => a + l.quantity, 0),
  )

  return (
    <header className="sticky top-0 z-50 border-b border-white/40 bg-aurora-cream/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="flex min-w-0 items-center gap-2 sm:gap-3 font-display text-lg font-bold tracking-tight text-aurora-ink"
        >
          <Logo size="navbar" className="drop-shadow-sm" />
          <span className="hidden truncate sm:inline">{BRAND.name}</span>
        </Link>

        <nav className="flex flex-1 items-center justify-center gap-1 sm:gap-2">
          <NavLink to="/" end className={navClass}>
            Inicio
          </NavLink>
          <NavLink to="/tienda" className={navClass}>
            Tienda
          </NavLink>
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <Link
            to="/vendedor/login"
            className="flex items-center gap-2 rounded-2xl border border-violet-200/90 bg-white/80 px-3 py-2 text-sm font-semibold text-violet-800 shadow-sm transition hover:bg-white hover:shadow-card sm:px-4"
            aria-label="Acceso vendedor"
          >
            <LayoutDashboard className="h-5 w-5 shrink-0 text-violet-600" aria-hidden />
            <span className="hidden sm:inline">Acceso vendedor</span>
          </Link>
          <Link
            to="/carrito"
            className="relative flex items-center gap-2 rounded-2xl bg-white/90 px-3 py-2 text-sm font-semibold text-aurora-ink shadow-card transition hover:shadow-card-hover sm:px-4"
            aria-label={count > 0 ? `Carrito, ${count} productos` : 'Carrito'}
          >
            <ShoppingBag className="h-5 w-5 text-violet-600" aria-hidden />
            <span className="hidden sm:inline">Carrito</span>
            {count > 0 ? (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-pink-500 px-1 text-[10px] font-bold text-white">
                {count > 99 ? '99+' : count}
              </span>
            ) : null}
          </Link>
        </div>
      </div>
    </header>
  )
}
