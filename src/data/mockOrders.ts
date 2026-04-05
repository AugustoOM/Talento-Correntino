import type { Order } from '../types'

const baseDate = (daysAgo: number, hour = 14) => {
  const d = new Date()
  d.setDate(d.getDate() - daysAgo)
  d.setHours(hour, 32, 0, 0)
  return d.toISOString()
}

/** Pedidos mock usando solo los cuatro productos del catálogo */
export const MOCK_ORDERS_INITIAL: Order[] = [
  {
    id: 'ORD-24089',
    customerName: 'María López',
    customerPhone: '3794-551122',
    address: 'San Juan 1450, Corrientes',
    notes: 'Tocar timbre 2 veces',
    lines: [
      { productId: 'p2', productName: 'Tabla de cocina de madera', quantity: 1, unitPrice: 38900 },
      { productId: 'p1', productName: 'Bowls de cerámica', quantity: 1, unitPrice: 28900 },
    ],
    total: 67800,
    createdAt: baseDate(0, 10),
    status: 'pendiente',
  },
  {
    id: 'ORD-24088',
    customerName: 'Lucas Ferreyra',
    customerPhone: '3795-889900',
    address: 'Junín 320, Capital',
    lines: [
      { productId: 'p4', productName: 'Pintura abstracta', quantity: 1, unitPrice: 59900 },
    ],
    total: 59900,
    createdAt: baseDate(0, 16),
    status: 'confirmado',
  },
  {
    id: 'ORD-24087',
    customerName: 'Ana Giménez',
    customerPhone: '3796-112233',
    address: 'Av. Costanera 2100',
    lines: [
      { productId: 'p3', productName: 'Cesta de yute', quantity: 2, unitPrice: 18900 },
    ],
    total: 37800,
    createdAt: baseDate(1, 11),
    status: 'enviado',
  },
  {
    id: 'ORD-24086',
    customerName: 'Pedro Ruiz',
    customerPhone: '3794-445566',
    address: 'Mitre 890',
    lines: [
      { productId: 'p1', productName: 'Bowls de cerámica', quantity: 2, unitPrice: 28900 },
    ],
    total: 57800,
    createdAt: baseDate(1, 18),
    status: 'confirmado',
  },
  {
    id: 'ORD-24085',
    customerName: 'Carla Méndez',
    customerPhone: '3795-334455',
    address: 'Paso de la Patria 120',
    lines: [
      { productId: 'p3', productName: 'Cesta de yute', quantity: 1, unitPrice: 18900 },
      { productId: 'p2', productName: 'Tabla de cocina de madera', quantity: 1, unitPrice: 38900 },
    ],
    total: 57800,
    createdAt: baseDate(2, 9),
    status: 'pendiente',
  },
  {
    id: 'ORD-24084',
    customerName: 'Diego Acosta',
    customerPhone: '3796-778899',
    address: 'Ituzaingó 450',
    lines: [
      { productId: 'p4', productName: 'Pintura abstracta', quantity: 1, unitPrice: 59900 },
    ],
    total: 59900,
    createdAt: baseDate(3, 15),
    status: 'enviado',
  },
  {
    id: 'ORD-24083',
    customerName: 'Sofía Ríos',
    customerPhone: '3794-667788',
    address: 'Bella Vista, Mza 4 Lote 12',
    lines: [
      { productId: 'p1', productName: 'Bowls de cerámica', quantity: 1, unitPrice: 28900 },
      { productId: 'p2', productName: 'Tabla de cocina de madera', quantity: 1, unitPrice: 38900 },
    ],
    total: 67800,
    createdAt: baseDate(5, 12),
    status: 'confirmado',
  },
  {
    id: 'ORD-24082',
    customerName: 'Martín Vega',
    customerPhone: '3795-990011',
    address: 'Centenario 780',
    lines: [
      { productId: 'p1', productName: 'Bowls de cerámica', quantity: 1, unitPrice: 28900 },
      { productId: 'p4', productName: 'Pintura abstracta', quantity: 1, unitPrice: 59900 },
    ],
    total: 88800,
    createdAt: baseDate(8, 14),
    status: 'cancelado',
  },
  {
    id: 'ORD-24081',
    customerName: 'Julieta Correa',
    customerPhone: '3796-223344',
    address: 'Güemes 2100',
    lines: [
      { productId: 'p3', productName: 'Cesta de yute', quantity: 2, unitPrice: 18900 },
    ],
    total: 37800,
    createdAt: baseDate(12, 17),
    status: 'enviado',
  },
  {
    id: 'ORD-24080',
    customerName: 'Nico Barrera',
    customerPhone: '3794-556677',
    address: 'Laguna Brava, cabaña 3',
    lines: [
      { productId: 'p2', productName: 'Tabla de cocina de madera', quantity: 1, unitPrice: 38900 },
      { productId: 'p4', productName: 'Pintura abstracta', quantity: 1, unitPrice: 59900 },
    ],
    total: 98800,
    createdAt: baseDate(20, 10),
    status: 'confirmado',
  },
]
