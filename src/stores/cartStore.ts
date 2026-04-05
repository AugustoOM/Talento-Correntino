import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartLine } from '../types'
import { useProductStore } from './productStore'

interface CartState {
  lines: CartLine[]
  add: (productId: string, qty?: number) => void
  remove: (productId: string) => void
  setQty: (productId: string, quantity: number) => void
  clear: () => void
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      lines: [],
      add: (productId, qty = 1) => {
        const lines = get().lines
        const existing = lines.find((l) => l.productId === productId)
        if (existing) {
          set({
            lines: lines.map((l) =>
              l.productId === productId
                ? { ...l, quantity: l.quantity + qty }
                : l,
            ),
          })
        } else {
          set({ lines: [...lines, { productId, quantity: qty }] })
        }
      },
      remove: (productId) =>
        set({ lines: get().lines.filter((l) => l.productId !== productId) }),
      setQty: (productId, quantity) => {
        if (quantity <= 0) {
          get().remove(productId)
          return
        }
        set({
          lines: get().lines.map((l) =>
            l.productId === productId ? { ...l, quantity } : l,
          ),
        })
      },
      clear: () => set({ lines: [] }),
    }),
    { name: 'aurora-cart' },
  ),
)

export function useCartTotals() {
  const lines = useCartStore((s) => s.lines)
  const products = useProductStore((s) => s.products)
  let subtotal = 0
  let count = 0
  for (const line of lines) {
    const p = products.find((x) => x.id === line.productId)
    if (p) {
      subtotal += p.price * line.quantity
      count += line.quantity
    }
  }
  return { subtotal, count, lines }
}
