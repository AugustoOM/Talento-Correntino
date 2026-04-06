import { Link } from 'react-router-dom'
import { Trash2 } from 'lucide-react'
import { Container } from '../components/ui/Container'
import { Button } from '../components/ui/Button'
import { Card, CardContent } from '../components/ui/Card'
import { EmptyState } from '../components/ui/EmptyState'
import { formatARS } from '../lib/format'
import { useCartStore, useCartTotals } from '../stores/cartStore'
import { useProductStore } from '../stores/productStore'

export function CartPage() {
  const { lines, subtotal } = useCartTotals()
  const products = useProductStore((s) => s.products)
  const remove = useCartStore((s) => s.remove)
  const setQty = useCartStore((s) => s.setQty)

  if (lines.length === 0) {
    return (
      <Container className="py-14">
        <EmptyState
          title="Tu carrito está vacío"
          description="Sumá productos desde la tienda para armar tu pedido."
          action={{ label: 'Ir a la tienda', to: '/tienda' }}
        />
      </Container>
    )
  }

  return (
    <Container className="py-10 sm:py-14">
      <h1 className="font-display text-3xl font-bold text-aurora-ink">
        Carrito
      </h1>
      <p className="mt-2 text-aurora-muted">
        Revisá los productos y continuá al checkout como invitado.
      </p>

      <div className="mt-10 grid gap-8 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          {lines.map((line) => {
            const p = products.find((x) => x.id === line.productId)
            if (!p) return null
            return (
              <Card key={line.productId}>
                <CardContent className="flex gap-4 p-4 sm:p-5">
                  <div className="h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-violet-100">
                    <img
                      src={p.imageUrl}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <Link
                      to={`/tienda/${p.slug}`}
                      className="font-display font-bold text-aurora-ink hover:text-violet-700"
                    >
                      {p.name}
                    </Link>
                    <p className="text-sm text-aurora-muted">
                      {formatARS(p.price)} c/u
                    </p>
                    <div className="mt-3 flex flex-wrap items-center gap-3">
                      <input
                        type="number"
                        min={1}
                        max={p.stock}
                        value={line.quantity}
                        onChange={(e) => {
                          const n = parseInt(e.target.value, 10)
                          if (!Number.isNaN(n)) setQty(p.id, n)
                        }}
                        className="w-20 rounded-xl border border-violet-200 px-2 py-1.5 text-center text-sm"
                      />
                      <button
                        type="button"
                        onClick={() => remove(p.id)}
                        className="inline-flex items-center gap-1 text-sm font-medium text-rose-600 hover:underline"
                      >
                        <Trash2 className="h-4 w-4" />
                        Quitar
                      </button>
                    </div>
                  </div>
                  <div className="text-right font-semibold text-aurora-ink">
                    {formatARS(p.price * line.quantity)}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-24 p-6">
            <p className="text-sm font-medium text-aurora-muted">Total estimado</p>
            <p className="mt-1 font-display text-3xl font-bold text-aurora-ink">
              {formatARS(subtotal)}
            </p>
            <p className="mt-2 text-xs text-aurora-muted">
              Envío y pago a coordinar por WhatsApp; en checkout podés elegir
              efectivo/transferencia o datos de débito.
            </p>
            <Link to="/checkout" className="mt-6 block">
              <Button type="button" className="w-full" size="lg">
                Continuar al checkout
              </Button>
            </Link>
            <Link
              to="/tienda"
              className="mt-4 block text-center text-sm font-semibold text-violet-700 hover:underline"
            >
              Seguir comprando
            </Link>
          </Card>
        </div>
      </div>
    </Container>
  )
}
