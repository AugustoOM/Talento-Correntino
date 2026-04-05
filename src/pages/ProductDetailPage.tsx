import { useParams, Link } from 'react-router-dom'
import { useState } from 'react'
import { Minus, Plus, ShoppingCart, ChevronLeft } from 'lucide-react'
import { Container } from '../components/ui/Container'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { Card } from '../components/ui/Card'
import { formatARS } from '../lib/format'
import {
  useProductStore,
  getProductBySlugFromStore,
} from '../stores/productStore'
import { useCartStore } from '../stores/cartStore'

export function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const products = useProductStore((s) => s.products)
  const product = slug ? getProductBySlugFromStore(products, slug) : undefined
  const add = useCartStore((s) => s.add)

  const [amount, setAmount] = useState(1)

  if (!product) {
    return (
      <Container className="py-20 text-center">
        <p className="text-aurora-muted">Producto no encontrado.</p>
        <Link
          to="/tienda"
          className="mt-4 inline-block font-semibold text-violet-700"
        >
          ← Volver a la tienda
        </Link>
      </Container>
    )
  }

  const max = Math.max(0, product.stock)
  const safeAmount = Math.min(Math.max(1, amount), max || 1)

  return (
    <Container className="py-8 sm:py-12">
      <Link
        to="/tienda"
        className="mb-8 inline-flex items-center gap-1 text-sm font-semibold text-violet-700 hover:underline"
      >
        <ChevronLeft className="h-4 w-4" />
        Volver al catálogo
      </Link>

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
        <Card className="overflow-hidden">
          <div className="aspect-square bg-gradient-to-br from-violet-100/60 to-cyan-100/50">
            <img
              src={product.imageUrl}
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
        </Card>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-violet-600">
            {product.categoryLabel}
          </p>
          <h1 className="mt-2 font-display text-3xl font-bold text-aurora-ink sm:text-4xl">
            {product.name}
          </h1>
          <p className="mt-4 text-lg text-aurora-muted">{product.description}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            {product.tags.map((t) => (
              <Badge key={t} variant="neutral">
                {t}
              </Badge>
            ))}
          </div>

          <p className="mt-8 font-display text-4xl font-bold text-aurora-ink">
            {formatARS(product.price)}
          </p>
          <p className="mt-2 text-sm text-aurora-muted">
            {product.stock > 0 ? (
              <>
                Stock disponible:{' '}
                <span className="font-semibold text-aurora-ink">
                  {product.stock}
                </span>
              </>
            ) : (
              <span className="text-rose-600">Sin stock por ahora</span>
            )}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <div className="flex items-center rounded-2xl border border-violet-200 bg-white/90 p-1">
              <button
                type="button"
                className="rounded-xl p-3 hover:bg-violet-50 disabled:opacity-40"
                disabled={max === 0 || safeAmount <= 1}
                onClick={() => setAmount((n) => Math.max(1, n - 1))}
                aria-label="Menos"
              >
                <Minus className="h-5 w-5" />
              </button>
              <span className="min-w-[2.5rem] text-center font-semibold">
                {max === 0 ? 0 : safeAmount}
              </span>
              <button
                type="button"
                className="rounded-xl p-3 hover:bg-violet-50 disabled:opacity-40"
                disabled={max === 0 || safeAmount >= max}
                onClick={() => setAmount((n) => Math.min(max, n + 1))}
                aria-label="Más"
              >
                <Plus className="h-5 w-5" />
              </button>
            </div>
            <Button
              type="button"
              size="lg"
              disabled={product.stock === 0}
              onClick={() => add(product.id, max === 0 ? 0 : safeAmount)}
              className="gap-2"
            >
              <ShoppingCart className="h-5 w-5" />
              Agregar al carrito
            </Button>
          </div>
        </div>
      </div>
    </Container>
  )
}
