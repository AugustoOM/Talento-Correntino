import type { PaymentMethod } from '../types'

export function paymentMethodLabel(pm: PaymentMethod | undefined): string {
  switch (pm) {
    case 'tarjeta_debito_credito':
      return 'Tarjeta de débito o crédito'
    case 'mercado_pago':
      return 'Mercado Pago'
    case 'efectivo_transferencia':
    default:
      return 'Efectivo o transferencia'
  }
}

/** Texto corto para tablas / listados */
export function paymentMethodShort(pm: PaymentMethod | undefined): string {
  switch (pm) {
    case 'tarjeta_debito_credito':
      return 'Tarjeta déb./créd.'
    case 'mercado_pago':
      return 'Mercado Pago'
    case 'efectivo_transferencia':
    default:
      return 'Efectivo / transf.'
  }
}

export function isCardPayment(pm: PaymentMethod | undefined): boolean {
  return pm === 'tarjeta_debito_credito'
}
