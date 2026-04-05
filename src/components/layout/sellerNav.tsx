import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  BarChart3,
  type LucideIcon,
} from 'lucide-react'

export const SELLER_NAV: { to: string; label: string; icon: LucideIcon }[] = [
  { to: '/vendedor/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/vendedor/productos', label: 'Productos / Stock', icon: Package },
  { to: '/vendedor/ventas', label: 'Ventas', icon: ShoppingCart },
  { to: '/vendedor/reportes', label: 'Reportes', icon: BarChart3 },
]
