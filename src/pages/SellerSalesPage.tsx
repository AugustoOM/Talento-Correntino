import { SellerPageShell } from '../components/layout/SellerPageShell'
import { Card, CardContent } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import { formatARS, formatDateTime } from '../lib/format'
import { useOrderStore } from '../stores/orderStore'
import { useFilteredOrders } from '../hooks/useSalesFilter'

export function SellerSalesPage() {
  const orders = useOrderStore((s) => s.orders)
  const { period, setPeriod, anchor, setAnchor, filtered } =
    useFilteredOrders(orders)

  return (
    <SellerPageShell title="Ventas">
      <div className="mb-8 hidden lg:block">
        <h1 className="font-display text-2xl font-bold text-slate-900">
          Pedidos y ventas
        </h1>
        <p className="mt-1 text-sm text-slate-600">
          Filtrá por día, mes o año sobre la fecha de referencia.
        </p>
      </div>

      <Card className="mb-6 p-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-end">
          <div>
            <label className="text-xs font-semibold uppercase text-slate-500">
              Periodo
            </label>
            <div className="mt-2 flex gap-2">
              {(['dia', 'mes', 'anio'] as const).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPeriod(p)}
                  className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                    period === p
                      ? 'bg-violet-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {p === 'dia' ? 'Día' : p === 'mes' ? 'Mes' : 'Año'}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label
              htmlFor="anchor-date"
              className="text-xs font-semibold uppercase text-slate-500"
            >
              Fecha referencia
            </label>
            <input
              id="anchor-date"
              type="date"
              className="mt-2 block rounded-xl border border-slate-200 px-3 py-2 text-sm"
              value={anchor.toISOString().slice(0, 10)}
              onChange={(e) => setAnchor(new Date(e.target.value))}
            />
          </div>
          <p className="text-sm text-slate-600">
            Mostrando{' '}
            <strong className="text-slate-900">{filtered.length}</strong> pedidos
          </p>
        </div>
      </Card>

      <div className="space-y-3 lg:hidden">
        {filtered.map((o) => (
          <Card key={o.id}>
            <CardContent className="p-4 text-sm">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-semibold text-slate-900">{o.id}</p>
                  <p className="text-slate-700">{o.customerName}</p>
                  <p className="text-xs text-slate-500">
                    {o.paymentMethod === 'tarjeta_debito'
                      ? 'Pago: débito'
                      : 'Pago: efectivo / transferencia'}
                  </p>
                  <p className="text-xs text-slate-500">
                    {formatDateTime(o.createdAt)}
                  </p>
                </div>
                <Badge
                  variant={
                    o.status === 'cancelado'
                      ? 'danger'
                      : o.status === 'enviado'
                        ? 'success'
                        : 'warning'
                  }
                >
                  {o.status}
                </Badge>
              </div>
              <ul className="mt-3 space-y-1 border-t border-slate-100 pt-3 text-slate-600">
                {o.lines.map((l) => (
                  <li key={`${o.id}-${l.productId}`}>
                    {l.productName} ×{l.quantity}
                  </li>
                ))}
              </ul>
              <p className="mt-3 font-semibold text-slate-900">
                Total: {formatARS(o.total)}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="hidden overflow-x-auto lg:block">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50/80">
            <tr>
              <th className="px-4 py-3 font-semibold text-slate-700">Pedido</th>
              <th className="px-4 py-3 font-semibold text-slate-700">Cliente</th>
              <th className="px-4 py-3 font-semibold text-slate-700">Fecha</th>
              <th className="px-4 py-3 font-semibold text-slate-700">Productos</th>
              <th className="px-4 py-3 font-semibold text-slate-700">Total</th>
              <th className="px-4 py-3 font-semibold text-slate-700">Estado</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((o) => (
              <tr
                key={o.id}
                className="border-b border-slate-100 hover:bg-slate-50/50"
              >
                <td className="px-4 py-3 font-mono text-xs text-violet-700">
                  {o.id}
                </td>
                <td className="px-4 py-3">
                  <p className="font-medium text-slate-900">{o.customerName}</p>
                  <p className="text-xs text-slate-500">
                    {o.paymentMethod === 'tarjeta_debito'
                      ? 'Débito'
                      : 'Efectivo / transf.'}
                  </p>
                </td>
                <td className="px-4 py-3 text-slate-600">
                  {formatDateTime(o.createdAt)}
                </td>
                <td className="max-w-[220px] px-4 py-3 text-slate-600">
                  {o.lines.map((l) => `${l.productName} (×${l.quantity})`).join(
                    ', ',
                  )}
                </td>
                <td className="px-4 py-3 font-semibold">{formatARS(o.total)}</td>
                <td className="px-4 py-3">
                  <Badge
                    variant={
                      o.status === 'cancelado'
                        ? 'danger'
                        : o.status === 'enviado'
                          ? 'success'
                          : 'warning'
                    }
                  >
                    {o.status}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </SellerPageShell>
  )
}
