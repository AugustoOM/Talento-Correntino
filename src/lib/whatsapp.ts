import { SELLER_WHATSAPP_E164 } from '../data/constants'

export function buildWhatsAppOrderUrl(payload: {
  customerName: string
  customerPhone: string
  address: string
  notes?: string
  lines: { name: string; qty: number; subtotal: number }[]
  total: number
  simulatedAt: string
  orderId: string
}): string {
  const linesText = payload.lines
    .map((l) => `• ${l.name} x${l.qty} → ${l.subtotal.toLocaleString('es-AR')}`)
    .join('\n')

  const message = [
    'Hola, realicé esta compra y quiero validarla.',
    '',
    `Pedido: ${payload.orderId}`,
    `Fecha/hora (simulada): ${payload.simulatedAt}`,
    '',
    'Datos del comprador:',
    `Nombre: ${payload.customerName}`,
    `Teléfono: ${payload.customerPhone}`,
    `Dirección: ${payload.address}`,
    payload.notes ? `Observaciones: ${payload.notes}` : '',
    '',
    'Resumen:',
    linesText,
    '',
    `Total: ${payload.total.toLocaleString('es-AR')} ARS`,
  ]
    .filter(Boolean)
    .join('\n')

  const encoded = encodeURIComponent(message)
  return `https://wa.me/${SELLER_WHATSAPP_E164}?text=${encoded}`
}
