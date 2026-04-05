import { useState, useEffect } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { BRAND } from '../data/constants'
import { Logo } from '../components/brand/Logo'
import { Container } from '../components/ui/Container'
import { Card, CardContent } from '../components/ui/Card'
import { Input } from '../components/ui/Input'
import { Button } from '../components/ui/Button'
import { GradientBackdrop } from '../components/ui/GradientBackdrop'
import { useSellerAuthStore } from '../stores/sellerAuthStore'

export function SellerLoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const login = useSellerAuthStore((s) => s.login)
  const isAuthenticated = useSellerAuthStore((s) => s.isAuthenticated)

  const from =
    (location.state as { from?: { pathname?: string } })?.from?.pathname ??
    '/vendedor/dashboard'

  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true })
    }
  }, [isAuthenticated, from, navigate])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    const ok = login(user, password)
    if (!ok) {
      setError('Usuario o contraseña incorrectos (probá vendedor / 1234).')
    }
  }

  if (isAuthenticated) {
    return (
      <div className="flex min-h-svh items-center justify-center bg-slate-50 text-sm text-slate-500">
        Redirigiendo…
      </div>
    )
  }

  return (
    <div className="relative min-h-svh">
      <GradientBackdrop />
      <Container className="flex min-h-svh flex-col items-center justify-center py-12">
        <Link
          to="/"
          className="mb-8 flex flex-col items-center gap-3 font-display text-xl font-bold text-aurora-ink sm:flex-row sm:gap-4"
        >
          <Logo size="login" className="drop-shadow" />
          <span className="text-center sm:text-left">{BRAND.name}</span>
        </Link>

        <Card className="w-full max-w-md overflow-hidden shadow-card-hover">
          <div className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-orange-400 px-6 py-8 text-white">
            <h1 className="font-display text-2xl font-bold">Acceso vendedor</h1>
            <p className="mt-2 text-sm text-white/90">
              Panel administrativo (demo). Usuario: <strong>vendedor</strong> ·
              Clave: <strong>1234</strong>
            </p>
          </div>
          <CardContent className="p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Usuario"
                name="user"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                autoComplete="username"
              />
              <Input
                label="Contraseña"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
              {error ? (
                <p className="text-sm text-rose-600" role="alert">
                  {error}
                </p>
              ) : null}
              <Button type="submit" className="w-full" size="lg">
                Ingresar al panel
              </Button>
            </form>
            <Link
              to="/"
              className="mt-6 block text-center text-sm font-medium text-violet-700 hover:underline"
            >
              ← Volver a la tienda pública
            </Link>
          </CardContent>
        </Card>
      </Container>
    </div>
  )
}
