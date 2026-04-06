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

export type PaymentMethod = 'efectivo_transferencia' | 'tarjeta_debito'

/** Sin número completo: solo lo necesario para el pedido y la UI. */
export interface DebitCardSnapshot {
  cardholderName: string
  /** DNI del titular, solo dígitos. */
  dni: string
  last4: string
  expiryMonth: string
  expiryYear: string
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
  paymentMethod?: PaymentMethod
  debitCard?: DebitCardSnapshot
}

export interface CheckoutPayload {
  name: string
  phone: string
  address: string
  notes: string
  paymentMethod: PaymentMethod
  debitCard?: DebitCardSnapshot
}

export interface SalesFilter {
  period: 'dia' | 'mes' | 'anio'
  date: Date
}
