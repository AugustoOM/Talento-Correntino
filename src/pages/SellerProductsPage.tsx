import { useState } from 'react'
import { Pencil, Plus } from 'lucide-react'
import { SellerPageShell } from '../components/layout/SellerPageShell'
import { Card, CardContent } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { Input } from '../components/ui/Input'
import { formatARS } from '../lib/format'
import { useProductStore } from '../stores/productStore'
import type { Product } from '../types'

function StockBadge({ stock }: { stock: number }) {
  if (stock === 0)
    return <Badge variant="danger">Sin stock</Badge>
  if (stock <= 5)
    return <Badge variant="warning">Bajo</Badge>
  return <Badge variant="success">OK</Badge>
}

export function SellerProductsPage() {
  const products = useProductStore((s) => s.products)
  const updateProduct = useProductStore((s) => s.updateProduct)
  const [editing, setEditing] = useState<Product | null>(null)
  const [draftPrice, setDraftPrice] = useState('')
  const [draftStock, setDraftStock] = useState('')

  function openEdit(p: Product) {
    setEditing(p)
    setDraftPrice(String(p.price))
    setDraftStock(String(p.stock))
  }

  function saveEdit() {
    if (!editing) return
    const price = parseFloat(draftPrice.replace(',', '.'))
    const stock = parseInt(draftStock, 10)
    const patch: Partial<Product> = {}
    if (!Number.isNaN(price) && price >= 0) patch.price = price
    if (!Number.isNaN(stock) && stock >= 0) patch.stock = stock
    updateProduct(editing.id, patch)
    setEditing(null)
  }

  return (
    <SellerPageShell title="Productos / Stock">
      <div className="mb-8 hidden items-center justify-between lg:flex">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-900">
            Catálogo y stock
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            Vista administrativa. Los cambios se guardan en el navegador
            (prototipo).
          </p>
        </div>
        <Button type="button" variant="secondary" className="gap-2" disabled>
          <Plus className="h-4 w-4" />
          Nuevo producto
        </Button>
      </div>

      <div className="grid gap-4 md:hidden">
        {products.map((p) => (
          <Card key={p.id}>
            <CardContent className="flex gap-4 p-4">
              <img
                src={p.imageUrl}
                alt=""
                className="h-20 w-20 shrink-0 rounded-xl object-cover"
              />
              <div className="min-w-0 flex-1">
                <p className="font-medium text-slate-900">{p.name}</p>
                <p className="text-xs text-slate-500">{p.categoryLabel}</p>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <StockBadge stock={p.stock} />
                  <span className="text-sm font-semibold">
                    {formatARS(p.price)}
                  </span>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="mt-3 gap-1"
                  onClick={() => openEdit(p)}
                >
                  <Pencil className="h-3.5 w-3.5" />
                  Editar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="hidden overflow-x-auto md:block">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50/80">
            <tr>
              <th className="px-4 py-3 font-semibold text-slate-700">Producto</th>
              <th className="px-4 py-3 font-semibold text-slate-700">Categoría</th>
              <th className="px-4 py-3 font-semibold text-slate-700">Precio</th>
              <th className="px-4 py-3 font-semibold text-slate-700">Stock</th>
              <th className="px-4 py-3 font-semibold text-slate-700">Estado</th>
              <th className="px-4 py-3 font-semibold text-slate-700">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-b border-slate-100 hover:bg-slate-50/50">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={p.imageUrl}
                      alt=""
                      className="h-11 w-11 rounded-lg object-cover"
                    />
                    <span className="font-medium text-slate-900">{p.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-slate-600">{p.categoryLabel}</td>
                <td className="px-4 py-3 font-medium">{formatARS(p.price)}</td>
                <td className="px-4 py-3">{p.stock}</td>
                <td className="px-4 py-3">
                  <StockBadge stock={p.stock} />
                </td>
                <td className="px-4 py-3">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="gap-1 text-violet-700"
                    onClick={() => openEdit(p)}
                  >
                    <Pencil className="h-4 w-4" />
                    Editar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {editing ? (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-4 sm:items-center">
          <Card className="max-h-[90vh] w-full max-w-md overflow-y-auto p-6">
            <h2 className="font-display text-lg font-bold text-slate-900">
              Editar {editing.name}
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              Cambios locales para demostración.
            </p>
            <div className="mt-4 space-y-3">
              <Input
                label="Precio (ARS)"
                value={draftPrice}
                onChange={(e) => setDraftPrice(e.target.value)}
              />
              <Input
                label="Stock"
                type="number"
                min={0}
                value={draftStock}
                onChange={(e) => setDraftStock(e.target.value)}
              />
            </div>
            <div className="mt-6 flex gap-3">
              <Button type="button" className="flex-1" onClick={saveEdit}>
                Guardar
              </Button>
              <Button
                type="button"
                variant="secondary"
                className="flex-1"
                onClick={() => setEditing(null)}
              >
                Cancelar
              </Button>
            </div>
          </Card>
        </div>
      ) : null}
    </SellerPageShell>
  )
}
