import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import { Container } from '../components/ui/Container'
import { Input } from '../components/ui/Input'
import { ProductCard } from '../components/shop/ProductCard'
import { useProductStore } from '../stores/productStore'
import type { CategoryId } from '../types'
import { CATEGORY_LABELS } from '../data/constants'
import { cn } from '../lib/cn'

const ALL = 'todas'

export function ShopPage() {
  const products = useProductStore((s) => s.products)
  const [q, setQ] = useState('')
  const [cat, setCat] = useState<string>(ALL)

  const categories = useMemo(() => {
    const ids = new Set(products.map((p) => p.category))
    return Array.from(ids) as CategoryId[]
  }, [products])

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase()
    return products.filter((p) => {
      const matchCat = cat === ALL || p.category === cat
      const matchQ =
        !term ||
        p.name.toLowerCase().includes(term) ||
        p.shortDescription.toLowerCase().includes(term) ||
        p.tags.some((t) => t.includes(term))
      return matchCat && matchQ
    })
  }, [products, q, cat])

  return (
    <Container className="py-10 sm:py-14">
      <div className="mb-10 max-w-2xl">
        <h1 className="font-display text-3xl font-bold text-aurora-ink sm:text-4xl">
          Tienda
        </h1>
        <p className="mt-2 text-aurora-muted">
          Artesanías, cerámica, madera, pintura y más. Buscá o filtrá por
          categoría.
        </p>
      </div>

      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-violet-400" />
          <Input
            placeholder="Buscar productos..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="pl-12"
            aria-label="Buscar"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setCat(ALL)}
            className={cn(
              'rounded-full px-4 py-2 text-sm font-semibold transition',
              cat === ALL
                ? 'bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white shadow-md'
                : 'bg-white/80 text-aurora-muted hover:bg-white',
            )}
          >
            Todas
          </button>
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCat(c)}
              className={cn(
                'rounded-full px-4 py-2 text-sm font-semibold transition',
                cat === c
                  ? 'bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white shadow-md'
                  : 'bg-white/80 text-aurora-muted hover:bg-white',
              )}
            >
              {CATEGORY_LABELS[c] ?? c}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="rounded-3xl bg-white/60 py-16 text-center text-aurora-muted">
          No hay resultados para tu búsqueda. Probá otra palabra o categoría.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </Container>
  )
}
