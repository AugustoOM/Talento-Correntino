export type CategoryId =
  | 'ceramica'
  | 'madera'
  | 'pintura'
  | 'textil'
  | 'arte'

export interface Product {
  id: string
  name: string
  slug: string
  description: string
  shortDescription: string
  price: number
  category: CategoryId
  categoryLabel: string
  stock: number
  imageUrl: string
  tags: string[]
}

export interface CartLine {
  productId: string
  quantity: number
}

export type OrderStatus = 'pendiente' | 'confirmado' | 'enviado' | 'cancelado'

export interface OrderLine {
  productId: string
  productName: string
  quantity: number
  unitPrice: number
}

export interface Order {
  id: string
  customerName: string
  customerPhone: string
  address: string
  notes?: string
  lines: OrderLine[]
  total: number
  createdAt: string
  status: OrderStatus
  isGuest?: boolean
}

export interface CheckoutPayload {
  name: string
  phone: string
  address: string
  notes: string
}

export interface SalesFilter {
  period: 'dia' | 'mes' | 'anio'
  date: Date
}
