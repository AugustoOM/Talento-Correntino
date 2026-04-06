import { create } from 'zustand'

interface CartAddModalState {
  open: boolean
  productName: string | null
  showAfterAdd: (productName: string) => void
  close: () => void
}

export const useCartAddModalStore = create<CartAddModalState>((set) => ({
  open: false,
  productName: null,
  showAfterAdd: (productName) =>
    set({ open: true, productName }),
  close: () => set({ open: false, productName: null }),
}))
