import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Package, TrendingUp, Calendar } from 'lucide-react'
import { SellerPageShell } from '../components/layout/SellerPageShell'
import { Card, CardContent } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import { formatARS, formatDateTime } from '../lib/format'
import { useDashboardMetrics } from '../hooks/useDashboardMetrics'
import { SALES_BY_DAY_OF_MONTH } from '../data/mockMetrics'
import { useProductStore } from '../stores/productStore'

function MetricCard({
  title,
  value,
  subtitle,
  icon: Icon,
  accent,
}: {
  title: string
  value: string
  subtitle?: string
  icon: typeof Package
  accent: string
}) {
  return (
    <Card>
      <CardContent className="flex items-start gap-4 p-5">
        <span
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${accent}`}
        >
          <Icon className="h-5 w-5 text-white" />
        </span>
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            {title}
          </p>
          <p className="mt-1 font-display text-2xl font-bold text-slate-900">
            {value}
          </p>
          {subtitle ? (
            <p className="mt-1 text-xs text-slate-500">{subtitle}</p>
          ) : null}
        </div>
      </CardContent>
    </Card>
  )
}

export function DashboardPage() {
  const m = useDashboardMetrics()
  const products = useProductStore((s) => s.products)
  const lowStock = products.filter((p) => p.stock > 0 && p.stock <= 5)

  return (
    <SellerPageShell title="Dashboard">
      <div className="mb-8 hidden lg:block">
        <h1 className="font-display text-2xl font-bold text-slate-900">
          Resumen general
        </h1>
        <p className="mt-1 text-sm text-slate-600">
          Métricas calculadas desde pedidos mock + tus ventas simuladas en esta
          sesión.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          title="Ventas del día"
          value={String(m.salesDay)}
          subtitle="Pedidos no cancelados"
          icon={Calendar}
          accent="bg-gradient-to-br from-orange-500 to-amber-500"
        />
        <MetricCard
          title="Ventas del mes"
          value={String(m.salesMonth)}
          icon={TrendingUp}
          accent="bg-gradient-to-br from-violet-600 to-fuchsia-500"
        />
        <MetricCard
          title="Ventas del año"
          value={String(m.salesYear)}
          icon={TrendingUp}
          accent="bg-gradient-to-br from-cyan-500 to-teal-500"
        />
        <MetricCard
          title="Ingresos del día"
          value={formatARS(m.revDay)}
          icon={TrendingUp}
          accent="bg-gradient-to-br from-emerald-500 to-green-600"
        />
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <MetricCard
          title="Ingresos del mes"
          value={formatARS(m.revMonth)}
          icon={TrendingUp}
          accent="bg-gradient-to-br from-sky-500 to-blue-600"
        />
        <MetricCard
          title="Ingresos del año"
          value={formatARS(m.revYear)}
          icon={TrendingUp}
          accent="bg-gradient-to-br from-indigo-500 to-violet-600"
        />
        <Card className="sm:col-span-2 xl:col-span-1">
          <CardContent className="p-5">
            <div className="flex items-center justify-between gap-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Productos con bajo stock
              </p>
              <Package className="h-5 w-5 text-amber-600" />
            </div>
            <p className="mt-2 font-display text-3xl font-bold text-slate-900">
              {lowStock.length}
            </p>
            <p className="mt-1 text-xs text-slate-500">Stock ≤ 5 unidades</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <Card>
          <CardContent className="p-5">
            <h2 className="font-display text-lg font-bold text-slate-900">
              Tendencia de ventas (mock)
            </h2>
            <p className="text-xs text-slate-500">
              Serie ilustrativa en miles de ARS
            </p>
            <div className="mt-4 h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={SALES_BY_DAY_OF_MONTH}>
                  <defs>
                    <linearGradient id="fillVentas" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="day" tick={{ fontSize: 11 }} stroke="#94a3b8" />
                  <YAxis tick={{ fontSize: 11 }} stroke="#94a3b8" />
                  <Tooltip
                    contentStyle={{
                      borderRadius: 12,
                      border: '1px solid #e2e8f0',
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="ventas"
                    stroke="#7c3aed"
                    fill="url(#fillVentas)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <h2 className="font-display text-lg font-bold text-slate-900">
              Últimos pedidos
            </h2>
            <ul className="mt-4 space-y-3">
              {m.recentOrders.map((o) => (
                <li
                  key={o.id}
                  className="flex items-start justify-between gap-3 rounded-xl border border-slate-100 bg-slate-50/80 px-3 py-2.5 text-sm"
                >
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium text-slate-900">
                      {o.customerName}
                    </p>
                    <p className="text-xs text-slate-500">
                      {formatDateTime(o.createdAt)}
                    </p>
                    <p className="mt-1.5 text-xs leading-relaxed text-slate-700">
                      <span className="font-medium text-slate-600">Productos: </span>
                      {o.lines
                        .map((l) =>
                          l.quantity > 1
                            ? `${l.productName} ×${l.quantity}`
                            : l.productName,
                        )
                        .join(' · ')}
                    </p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="font-semibold text-slate-900">
                      {formatARS(o.total)}
                    </p>
                    <Badge
                      variant={
                        o.status === 'cancelado'
                          ? 'danger'
                          : o.status === 'enviado'
                            ? 'success'
                            : 'warning'
                      }
                      className="mt-1"
                    >
                      {o.status}
                    </Badge>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </SellerPageShell>
  )
}
