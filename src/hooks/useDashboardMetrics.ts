import { useMemo } from 'react'
import { useOrderStore } from '../stores/orderStore'

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

function isSameMonth(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth()
}

function isSameYear(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear()
}

export function useDashboardMetrics() {
  const orders = useOrderStore((s) => s.orders)

  return useMemo(() => {
    const now = new Date()
    let salesDay = 0
    let revDay = 0
    let salesMonth = 0
    let revMonth = 0
    let salesYear = 0
    let revYear = 0

    for (const o of orders) {
      if (o.status === 'cancelado') continue
      const d = new Date(o.createdAt)
      if (isSameDay(d, now)) {
        salesDay += 1
        revDay += o.total
      }
      if (isSameMonth(d, now)) {
        salesMonth += 1
        revMonth += o.total
      }
      if (isSameYear(d, now)) {
        salesYear += 1
        revYear += o.total
      }
    }

    const recentOrders = [...orders]
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )
      .slice(0, 6)

    return {
      salesDay,
      salesMonth,
      salesYear,
      revDay,
      revMonth,
      revYear,
      recentOrders,
    }
  }, [orders])
}
