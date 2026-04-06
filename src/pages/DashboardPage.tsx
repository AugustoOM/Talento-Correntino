import { useMemo } from 'react'
import { Link } from 'react-router-dom'
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
import { Button } from '../components/ui/Button'
import { formatARS, formatDateTime } from '../lib/format'
import { useDashboardMetrics } from '../hooks/useDashboardMetrics'
import { SALES_BY_DAY_OF_MONTH } from '../data/mockMetrics'
import { useProductStore } from '../stores/productStore'
import { useOrderStore } from '../stores/orderStore'
import type { Order, OrderStatus } from '../types'

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

function sortOrdersByDateDesc(orders: Order[]) {
  return [...orders].sort(
    (a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  )
}

function OrderStatusCard({
  title,
  accent,
  orders,
  emptyLabel,
  column,
  setOrderStatus,
}: {
  title: string
  accent: string
  orders: Order[]
  emptyLabel: string
  column: 'pendiente' | 'confirmado' | 'enviado'
  setOrderStatus?: (orderId: string, status: OrderStatus) => void
}) {
  return (
    <Card className="flex flex-col overflow-hidden">
      <div
        className={`border-b border-slate-100 px-4 py-3 ${accent}`}
      >
        <h3 className="font-display text-sm font-bold text-slate-900">
          {title}
        </h3>
        <p className="text-xs text-slate-600">{orders.length} pedido(s)</p>
      </div>
      <CardContent className="max-h-[min(420px,55vh)] flex-1 overflow-y-auto p-3">
        {orders.length === 0 ? (
          <p className="py-6 text-center text-sm text-slate-500">{emptyLabel}</p>
        ) : (
          <ul className="space-y-3">
            {orders.map((o) => (
              <li
                key={o.id}
                className="rounded-xl border border-slate-100 bg-slate-50/90 p-3 text-sm"
              >
                <p className="truncate font-medium text-slate-900">
                  {o.customerName}
                </p>
                <p className="text-xs text-slate-500">
                  {formatDateTime(o.createdAt)}
                </p>
                <p className="mt-1 line-clamp-2 text-xs text-slate-600">
                  {o.lines
                    .map((l) =>
                      l.quantity > 1
                        ? `${l.productName} ×${l.quantity}`
                        : l.productName,
                    )
                    .join(' · ')}
                </p>
                <p className="mt-2 font-semibold text-slate-900">
                  {formatARS(o.total)}
                </p>
                {column === 'pendiente' && setOrderStatus ? (
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    className="mt-2 w-full"
                    onClick={() => setOrderStatus(o.id, 'confirmado')}
                  >
                    Confirmar
                  </Button>
                ) : null}
                {column === 'confirmado' && setOrderStatus ? (
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    className="mt-2 w-full"
                    onClick={() => setOrderStatus(o.id, 'enviado')}
                  >
                    Marcar enviado
                  </Button>
                ) : null}
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  )
}

export function DashboardPage() {
  const m = useDashboardMetrics()
  const products = useProductStore((s) => s.products)
  const orders = useOrderStore((s) => s.orders)
  const setOrderStatus = useOrderStore((s) => s.setOrderStatus)
  const lowStock = products.filter((p) => p.stock > 0 && p.stock <= 5)

  const { pendientes, confirmados, enviados } = useMemo(() => {
    const active = orders.filter((o) => o.status !== 'cancelado')
    return {
      pendientes: sortOrdersByDateDesc(
        active.filter((o) => o.status === 'pendiente'),
      ),
      confirmados: sortOrdersByDateDesc(
        active.filter((o) => o.status === 'confirmado'),
      ),
      enviados: sortOrdersByDateDesc(
        active.filter((o) => o.status === 'enviado'),
      ),
    }
  }, [orders])

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

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Ventas (cantidad de pedidos)
          </p>
          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
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
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Ingresos
          </p>
          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            <MetricCard
              title="Ingresos del día"
              value={formatARS(m.revDay)}
              icon={TrendingUp}
              accent="bg-gradient-to-br from-emerald-500 to-green-600"
            />
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
          </div>
        </div>
      </div>

      <div className="mt-4 max-w-md">
        <Card>
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

      <div className="mt-8">
        <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-display text-lg font-bold text-slate-900">
              Pedidos por estado
            </h2>
            <p className="text-sm text-slate-600">
              Pendiente, confirmado y enviado. Los pedidos cancelados no se
              muestran aquí.
            </p>
          </div>
          <Link
            to="/vendedor/ventas"
            className="text-sm font-semibold text-violet-700 hover:underline"
          >
            Ver historial completo →
          </Link>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          <OrderStatusCard
            title="Pendiente"
            accent="bg-amber-50"
            orders={pendientes}
            emptyLabel="No hay pedidos pendientes."
            column="pendiente"
            setOrderStatus={setOrderStatus}
          />
          <OrderStatusCard
            title="Confirmado"
            accent="bg-violet-50"
            orders={confirmados}
            emptyLabel="No hay pedidos confirmados."
            column="confirmado"
            setOrderStatus={setOrderStatus}
          />
          <OrderStatusCard
            title="Enviado"
            accent="bg-emerald-50"
            orders={enviados}
            emptyLabel="Aún no hay envíos registrados."
            column="enviado"
          />
        </div>
      </div>

      <div className="mt-8">
        <Card>
          <CardContent className="p-5">
            <h2 className="font-display text-lg font-bold text-slate-900">
              Tendencia de ventas
            </h2>
            <p className="text-xs text-slate-500">
              Serie ilustrativa en miles de ARS
            </p>
            <div className="mt-4 h-56 w-full max-w-3xl">
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
      </div>
    </SellerPageShell>
  )
}
