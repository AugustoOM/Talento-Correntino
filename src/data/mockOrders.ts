import type { Order } from '../types'

const baseDate = (daysAgo: number, hour = 14) => {
  const d = new Date()
  d.setDate(d.getDate() - daysAgo)
  d.setHours(hour, 32, 0, 0)
  return d.toISOString()
}

export const MOCK_ORDERS_INITIAL: Order[] = [
  {
    id: 'ORD-24089',
    customerName: 'María López',
    customerPhone: '3794-551122',
    address: 'San Juan 1450, Corrientes',
    notes: 'Tocar timbre 2 veces',
    lines: [
      { productId: 'p2', productName: 'Set Bowls Gres Noche', quantity: 1, unitPrice: 34900 },
      { productId: 'p12', productName: 'Cuaderno Sketch Artesanal', quantity: 2, unitPrice: 8900 },
    ],
    total: 52700,
    createdAt: baseDate(0, 10),
    status: 'pendiente',
  },
  {
    id: 'ORD-24088',
    customerName: 'Lucas Ferreyra',
    customerPhone: '3795-889900',
    address: 'Junín 320, Capital',
    lines: [
      { productId: 'p17', productName: 'Escultura Cerámica Gesto', quantity: 1, unitPrice: 67900 },
    ],
    total: 67900,
    createdAt: baseDate(0, 16),
    status: 'confirmado',
  },
  {
    id: 'ORD-24087',
    customerName: 'Ana Giménez',
    customerPhone: '3796-112233',
    address: 'Av. Costanera 2100',
    lines: [
      { productId: 'p8', productName: 'Perchero Pinotea', quantity: 1, unitPrice: 31900 },
      { productId: 'p20', productName: 'Atrapasueños Macramé', quantity: 1, unitPrice: 18900 },
    ],
    total: 50800,
    createdAt: baseDate(1, 11),
    status: 'enviado',
  },
  {
    id: 'ORD-24086',
    customerName: 'Pedro Ruiz',
    customerPhone: '3794-445566',
    address: 'Mitre 890',
    lines: [
      { productId: 'p16', productName: 'Individuales Bordados', quantity: 4, unitPrice: 12900 },
    ],
    total: 51600,
    createdAt: baseDate(1, 18),
    status: 'confirmado',
  },
  {
    id: 'ORD-24085',
    customerName: 'Carla Méndez',
    customerPhone: '3795-334455',
    address: 'Paso de la Patria 120',
    lines: [
      { productId: 'p15', productName: 'Bolso Yute & Cuero', quantity: 1, unitPrice: 32900 },
      { productId: 'p16', productName: 'Individuales Bordados', quantity: 2, unitPrice: 12900 },
    ],
    total: 58700,
    createdAt: baseDate(2, 9),
    status: 'pendiente',
  },
  {
    id: 'ORD-24084',
    customerName: 'Diego Acosta',
    customerPhone: '3796-778899',
    address: 'Ituzaingó 450',
    lines: [
      { productId: 'p19', productName: 'Cuadro Acrílico Original', quantity: 1, unitPrice: 89900 },
    ],
    total: 89900,
    createdAt: baseDate(3, 15),
    status: 'enviado',
  },
  {
    id: 'ORD-24083',
    customerName: 'Sofía Ríos',
    customerPhone: '3794-667788',
    address: 'Bella Vista, Mza 4 Lote 12',
    lines: [
      { productId: 'p1', productName: 'Lámpara Candil Cerámica', quantity: 1, unitPrice: 28900 },
      { productId: 'p18', productName: 'Máscara Madera Pintada', quantity: 1, unitPrice: 13900 },
    ],
    total: 42800,
    createdAt: baseDate(5, 12),
    status: 'confirmado',
  },
  {
    id: 'ORD-24082',
    customerName: 'Martín Vega',
    customerPhone: '3795-990011',
    address: 'Centenario 780',
    lines: [
      { productId: 'p9', productName: 'Set Acuarelas Pastel', quantity: 1, unitPrice: 19900 },
      { productId: 'p12', productName: 'Cuaderno Sketch Artesanal', quantity: 3, unitPrice: 8900 },
    ],
    total: 46600,
    createdAt: baseDate(8, 14),
    status: 'cancelado',
  },
  {
    id: 'ORD-24081',
    customerName: 'Julieta Correa',
    customerPhone: '3796-223344',
    address: 'Güemes 2100',
    lines: [
      { productId: 'p3', productName: 'Maceta Orgánica XL', quantity: 2, unitPrice: 18900 },
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
      { productId: 'p7', productName: 'Caja Calado Floral', quantity: 1, unitPrice: 19900 },
      { productId: 'p11', productName: 'Lienzo Algodón 50×70 cm', quantity: 2, unitPrice: 15900 },
    ],
    total: 51700,
    createdAt: baseDate(20, 10),
    status: 'confirmado',
  },
]
