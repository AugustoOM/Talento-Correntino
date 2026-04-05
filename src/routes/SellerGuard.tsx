import { Navigate, useLocation } from 'react-router-dom'
import type { ReactNode } from 'react'
import { useSellerAuthStore } from '../stores/sellerAuthStore'

export function SellerGuard({ children }: { children: ReactNode }) {
  const isAuthenticated = useSellerAuthStore((s) => s.isAuthenticated)
  const location = useLocation()

  if (!isAuthenticated) {
    return (
      <Navigate to="/vendedor/login" replace state={{ from: location }} />
    )
  }

  return children
}
