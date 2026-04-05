import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Product } from '../types'
import { MOCK_PRODUCTS } from '../data/mockProducts'

function cloneCatalog(): Product[] {
  return MOCK_PRODUCTS.map((p) => ({ ...p }))
}

interface ProductState {
  products: Product[]
  decrementStock: (id: string, qty: number) => void
  updateProduct: (id: string, patch: Partial<Product>) => void
}

export const useProductStore = create<ProductState>()(
  persist(
    (set, get) => ({
      products: cloneCatalog(),
      decrementStock: (id, qty) =>
        set({
          products: get().products.map((p) =>
            p.id === id ? { ...p, stock: Math.max(0, p.stock - qty) } : p,
          ),
        }),
      updateProduct: (id, patch) =>
        set({
          products: get().products.map((p) =>
            p.id === id ? { ...p, ...patch } : p,
          ),
        }),
    }),
    { name: 'aurora-products-v4' },
  ),
)

export function getProductByIdFromStore(
  products: Product[],
  id: string,
): Product | undefined {
  return products.find((p) => p.id === id)
}

export function getProductBySlugFromStore(
  products: Product[],
  slug: string,
): Product | undefined {
  return products.find((p) => p.slug === slug)
}
