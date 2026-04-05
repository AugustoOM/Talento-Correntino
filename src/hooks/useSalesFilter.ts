import { useMemo, useState } from 'react'
import type { Order } from '../types'

export type SalesPeriod = 'dia' | 'mes' | 'anio'

export function useFilteredOrders(orders: Order[]) {
  const [period, setPeriod] = useState<SalesPeriod>('mes')
  const [anchor, setAnchor] = useState(() => new Date())

  const filtered = useMemo(() => {
    return orders.filter((o) => {
      const d = new Date(o.createdAt)
      if (period === 'dia') {
        return (
          d.getFullYear() === anchor.getFullYear() &&
          d.getMonth() === anchor.getMonth() &&
          d.getDate() === anchor.getDate()
        )
      }
      if (period === 'mes') {
        return (
          d.getFullYear() === anchor.getFullYear() &&
          d.getMonth() === anchor.getMonth()
        )
      }
      return d.getFullYear() === anchor.getFullYear()
    })
  }, [orders, period, anchor])

  return { period, setPeriod, anchor, setAnchor, filtered }
}
