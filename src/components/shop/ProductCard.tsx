import { Link } from 'react-router-dom'
import { ShoppingCart } from 'lucide-react'
import type { Product } from '../../types'
import { formatARS } from '../../lib/format'
import { Card } from '../ui/Card'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'
import { useCartStore } from '../../stores/cartStore'
import { useCartAddModalStore } from '../../stores/cartAddModalStore'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const add = useCartStore((s) => s.add)
  const showAfterAdd = useCartAddModalStore((s) => s.showAfterAdd)
  const low = product.stock <= 5

  return (
    <Card className="group flex flex-col overflow-hidden transition duration-300 hover:-translate-y-0.5 hover:shadow-card-hover">
      <Link to={`/tienda/${product.slug}`} className="relative block aspect-square overflow-hidden bg-gradient-to-br from-violet-100/50 to-cyan-100/40">
        <img
          src={product.imageUrl}
          alt=""
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {low ? (
          <span className="absolute left-3 top-3">
            <Badge variant="warning">Últimas unidades</Badge>
          </span>
        ) : null}
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-violet-600/90">
          {product.categoryLabel}
        </p>
        <Link to={`/tienda/${product.slug}`}>
          <h3 className="mt-1 font-display text-lg font-bold text-aurora-ink transition group-hover:text-violet-700">
            {product.name}
          </h3>
        </Link>
        <p className="mt-1 line-clamp-2 text-sm text-aurora-muted">
          {product.shortDescription}
        </p>
        <div className="mt-auto flex items-end justify-between gap-3 pt-4">
          <p className="font-display text-xl font-bold text-aurora-ink">
            {formatARS(product.price)}
          </p>
          <Button
            type="button"
            size="sm"
            variant="primary"
            className="shrink-0"
            disabled={product.stock === 0}
            onClick={(e) => {
              e.preventDefault()
              add(product.id, 1)
              showAfterAdd(product.name)
            }}
          >
            <ShoppingCart className="h-4 w-4" />
            <span className="hidden sm:inline">Agregar</span>
          </Button>
        </div>
      </div>
    </Card>
  )
}

export function ProductCardSkeleton() {
  return (
    <Card className="overflow-hidden animate-pulse">
      <div className="aspect-square bg-slate-200/80" />
      <div className="space-y-3 p-4">
        <div className="h-3 w-1/3 rounded bg-slate-200" />
        <div className="h-5 w-3/4 rounded bg-slate-200" />
        <div className="h-3 w-full rounded bg-slate-200" />
        <div className="flex justify-between pt-2">
          <div className="h-8 w-24 rounded bg-slate-200" />
          <div className="h-9 w-24 rounded-2xl bg-slate-200" />
        </div>
      </div>
    </Card>
  )
}
