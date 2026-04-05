import { Link } from 'react-router-dom'
import { BRAND } from '../../data/constants'
import { Container } from '../ui/Container'
import { Logo } from '../brand/Logo'

export function PublicFooter() {
  return (
    <footer className="mt-auto border-t border-white/50 bg-white/40 py-10 backdrop-blur-sm">
      <Container className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <Logo size="footer" />
            <p className="font-display text-lg font-bold text-aurora-ink">
              {BRAND.name}
            </p>
          </div>
          <p className="mt-1 max-w-md text-sm text-aurora-muted">
            {BRAND.description}
          </p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm">
          <Link to="/tienda" className="font-medium text-violet-700 hover:underline">
            Catálogo
          </Link>
          <Link
            to="/vendedor/login"
            className="font-medium text-aurora-muted hover:text-violet-700"
          >
            Acceso vendedor
          </Link>
        </div>
      </Container>
      <Container className="mt-8 border-t border-white/40 pt-6 text-center text-xs text-aurora-muted">
        Prototipo UI — {new Date().getFullYear()} {BRAND.name}. Sin pagos reales.
      </Container>
    </footer>
  )
}
