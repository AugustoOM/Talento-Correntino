import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const MOCK_USER = 'vendedor'
const MOCK_PASS = '1234'

interface SellerAuthState {
  isAuthenticated: boolean
  login: (user: string, password: string) => boolean
  logout: () => void
}

export const useSellerAuthStore = create<SellerAuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      login: (user, password) => {
        if (user === MOCK_USER && password === MOCK_PASS) {
          set({ isAuthenticated: true })
          return true
        }
        return false
      },
      logout: () => set({ isAuthenticated: false }),
    }),
    { name: 'aurora-seller-auth' },
  ),
)
