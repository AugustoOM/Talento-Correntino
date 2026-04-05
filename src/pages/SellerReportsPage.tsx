import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from 'recharts'
import { SellerPageShell } from '../components/layout/SellerPageShell'
import { Card, CardContent } from '../components/ui/Card'
import { formatARS } from '../lib/format'
import { REVENUE_COMPARE_MONTHS, CATEGORY_SHARE } from '../data/mockMetrics'
import { useOrderStore } from '../stores/orderStore'
import { useMemo } from 'react'

export function SellerReportsPage() {
  const orders = useOrderStore((s) => s.orders)

  const totals = useMemo(() => {
    let gross = 0
    let count = 0
    for (const o of orders) {
      if (o.status === 'cancelado') continue
      gross += o.total
      count += 1
    }
    return { gross, count }
  }, [orders])

  return (
    <SellerPageShell title="Reportes">
      <div className="mb-8 hidden lg:block">
        <h1 className="font-display text-2xl font-bold text-slate-900">
          Reportes visuales
        </h1>
        <p className="mt-1 text-sm text-slate-600">
          Indicadores destacados y series mock para storytelling del producto.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardContent className="p-5">
            <p className="text-xs font-semibold uppercase text-slate-500">
              Dinero bruto (pedidos no cancelados)
            </p>
            <p className="mt-2 font-display text-3xl font-bold text-slate-900">
              {formatARS(totals.gross)}
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Suma de todos los pedidos en el prototipo ({totals.count} órdenes)
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-xs font-semibold uppercase text-slate-500">
              Ticket promedio (aprox.)
            </p>
            <p className="mt-2 font-display text-3xl font-bold text-slate-900">
              {totals.count > 0
                ? formatARS(Math.round(totals.gross / totals.count))
                : '—'}
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Solo referencia visual
            </p>
          </CardContent>
        </Card>
        <Card className="sm:col-span-2 lg:col-span-1">
          <CardContent className="p-5">
            <p className="text-xs font-semibold uppercase text-slate-500">
              Comparativa temporal
            </p>
            <p className="mt-2 text-sm text-slate-600">
              Mes actual vs. anterior (datos mock para la demo).
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <Card>
          <CardContent className="p-5">
            <h2 className="font-display text-lg font-bold text-slate-900">
              Ingresos por mes (mock)
            </h2>
            <div className="mt-4 h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={REVENUE_COMPARE_MONTHS}>
                  <XAxis dataKey="mes" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip
                    formatter={(value) =>
                      formatARS(typeof value === 'number' ? value : Number(value))
                    }
                    contentStyle={{ borderRadius: 12 }}
                  />
                  <Legend />
                  <Bar dataKey="actual" name="Actual" fill="#7c3aed" radius={[6, 6, 0, 0]} />
                  <Bar
                    dataKey="anterior"
                    name="Anterior"
                    fill="#94a3b8"
                    radius={[6, 6, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <h2 className="font-display text-lg font-bold text-slate-900">
              Mix por categoría (mock)
            </h2>
            <div className="mt-6 space-y-4">
              {CATEGORY_SHARE.map((c) => (
                <div key={c.name}>
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-slate-800">{c.name}</span>
                    <span className="text-slate-500">{c.value}%</span>
                  </div>
                  <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500"
                      style={{ width: `${c.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </SellerPageShell>
  )
}
