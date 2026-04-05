import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CheckoutPayload, Order, OrderLine } from '../types'
import { MOCK_ORDERS_INITIAL } from '../data/mockOrders'
import { useCartStore } from './cartStore'
import { useProductStore } from './productStore'

interface LastOrderPayload {
  order: Order
  simulatedAt: string
}

interface OrderState {
  orders: Order[]
  lastCompleted: LastOrderPayload | null
  placeOrder: (payload: CheckoutPayload) => LastOrderPayload
  clearLastCompleted: () => void
}

function generateOrderId(): string {
  return `ORD-${Date.now().toString(36).toUpperCase()}`
}

export const useOrderStore = create<OrderState>()(
  persist(
    (set, get) => ({
      orders: [...MOCK_ORDERS_INITIAL],
      lastCompleted: null,
      placeOrder: (payload) => {
        const cartLines = useCartStore.getState().lines
        const products = useProductStore.getState().products
        const lines: OrderLine[] = []
        let total = 0
        for (const cl of cartLines) {
          const p = products.find((x) => x.id === cl.productId)
          if (!p) continue
          const sub = p.price * cl.quantity
          total += sub
          lines.push({
            productId: p.id,
            productName: p.name,
            quantity: cl.quantity,
            unitPrice: p.price,
          })
          useProductStore.getState().decrementStock(p.id, cl.quantity)
        }
        const order: Order = {
          id: generateOrderId(),
          customerName: payload.name,
          customerPhone: payload.phone,
          address: payload.address,
          notes: payload.notes || undefined,
          lines,
          total,
          createdAt: new Date().toISOString(),
          status: 'pendiente',
          isGuest: true,
        }
        const simulatedAt = new Intl.DateTimeFormat('es-AR', {
          dateStyle: 'full',
          timeStyle: 'short',
        }).format(new Date())

        const result: LastOrderPayload = { order, simulatedAt }
        set({
          orders: [order, ...get().orders],
          lastCompleted: result,
        })
        useCartStore.getState().clear()
        return result
      },
      clearLastCompleted: () => set({ lastCompleted: null }),
    }),
    {
      name: 'aurora-orders-v4',
      partialize: (s) => ({ orders: s.orders }),
    },
  ),
)
