import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { PartyPopper } from 'lucide-react'
import { Container } from '../components/ui/Container'
import { Button } from '../components/ui/Button'
import { Card, CardContent } from '../components/ui/Card'
import { formatARS } from '../lib/format'
import { useOrderStore } from '../stores/orderStore'

export function ConfirmationPage() {
  const navigate = useNavigate()
  const lastCompleted = useOrderStore((s) => s.lastCompleted)

  useEffect(() => {
    if (!lastCompleted) {
      navigate('/tienda', { replace: true })
    }
  }, [lastCompleted, navigate])

  if (!lastCompleted) return null

  const { order, simulatedAt } = lastCompleted

  return (
    <Container className="py-12 sm:py-20">
      <div className="mx-auto max-w-xl text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-emerald-400 to-cyan-500 text-white shadow-lg">
          <PartyPopper className="h-9 w-9" />
        </div>
        <h1 className="mt-6 font-display text-3xl font-bold text-aurora-ink">
          ¡Pedido registrado!
        </h1>
        <p className="mt-3 text-aurora-muted">
          Guardamos tu compra como{' '}
          <span className="font-semibold text-aurora-ink">{order.id}</span>.
        </p>
        <p className="mt-4 text-base font-medium text-aurora-ink">
          Recibirás la confirmación por WhatsApp.
        </p>
      </div>

      <Card className="mx-auto mt-10 max-w-lg">
        <CardContent className="space-y-3 p-6 text-left text-sm">
          <p>
            <span className="text-aurora-muted">Nombre:</span>{' '}
            <span className="font-medium">{order.customerName}</span>
          </p>
          <p>
            <span className="text-aurora-muted">Teléfono:</span>{' '}
            <span className="font-medium">{order.customerPhone}</span>
          </p>
          <p>
            <span className="text-aurora-muted">Dirección:</span>{' '}
            <span className="font-medium">{order.address}</span>
          </p>
          {order.notes ? (
            <p>
              <span className="text-aurora-muted">Observaciones:</span>{' '}
              <span className="font-medium">{order.notes}</span>
            </p>
          ) : null}
          <p>
            <span className="text-aurora-muted">Total:</span>{' '}
            <span className="font-semibold text-aurora-ink">
              {formatARS(order.total)}
            </span>
          </p>
          <p className="text-xs text-aurora-muted">{simulatedAt}</p>
        </CardContent>
      </Card>

      <div className="mx-auto mt-10 flex max-w-lg justify-center">
        <Link to="/tienda" className="w-full sm:w-auto">
          <Button type="button" variant="secondary" size="lg" className="w-full">
            Seguir explorando la tienda
          </Button>
        </Link>
      </div>
    </Container>
  )
}
