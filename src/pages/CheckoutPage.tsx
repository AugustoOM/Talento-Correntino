import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Container } from '../components/ui/Container'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { Textarea } from '../components/ui/Textarea'
import { Card } from '../components/ui/Card'
import { formatARS } from '../lib/format'
import { useCartTotals } from '../stores/cartStore'
import { useOrderStore } from '../stores/orderStore'
import type { PaymentMethod } from '../types'
import {
  expiryNotExpired,
  last4FromPan,
  luhnValid,
  normalizeDni,
  normalizePan,
  formatExpiryMmYyInput,
  parseExpiryMmYy,
  validateArDni,
  validateCardholder,
  validateDebitCvv,
} from '../lib/cardValidation'

const PM_OPTIONS: { value: PaymentMethod; title: string; hint: string }[] = [
  {
    value: 'efectivo_transferencia',
    title: 'Efectivo o transferencia',
    hint: 'Coordinás el pago como hasta ahora (WhatsApp).',
  },
  {
    value: 'tarjeta_debito',
    title: 'Tarjeta de débito',
    hint: 'Completá los datos de la tarjeta; validamos el número antes de confirmar.',
  },
]

export function CheckoutPage() {
  const navigate = useNavigate()
  const { subtotal, lines } = useCartTotals()
  const placeOrder = useOrderStore((s) => s.placeOrder)

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [notes, setNotes] = useState('')
  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>('efectivo_transferencia')
  const [cardholderName, setCardholderName] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [cardExpiry, setCardExpiry] = useState('')
  const [cardCvv, setCardCvv] = useState('')
  const [cardDni, setCardDni] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})

  if (lines.length === 0) {
    return (
      <Container className="py-16 text-center">
        <p className="text-aurora-muted">No hay productos para finalizar.</p>
        <Link to="/tienda" className="mt-4 inline-block font-semibold text-violet-700">
          Ir a la tienda
        </Link>
      </Container>
    )
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const next: Record<string, string> = {}
    if (!name.trim()) next.name = 'Requerido'
    if (!phone.trim()) next.phone = 'Requerido'
    if (!address.trim()) next.address = 'Requerido'

    if (paymentMethod === 'tarjeta_debito') {
      if (!validateCardholder(cardholderName)) {
        next.cardholderName = 'Ingresá el nombre como figura en la tarjeta'
      }
      const pan = normalizePan(cardNumber)
      if (!luhnValid(pan)) {
        next.cardNumber = 'Número de tarjeta inválido'
      }
      const exp = parseExpiryMmYy(cardExpiry)
      if (!exp || !expiryNotExpired(exp.mm, exp.yy)) {
        next.cardExpiry = 'Vencimiento inválido o vencido (MM/AA)'
      }
      if (!validateDebitCvv(cardCvv)) {
        next.cardCvv = 'Código de seguridad de 3 dígitos'
      }
      if (!validateArDni(cardDni)) {
        next.cardDni = 'DNI del titular: 7 u 8 dígitos'
      }
    }

    setErrors(next)
    if (Object.keys(next).length) return

    const pan = normalizePan(cardNumber)
    const exp = parseExpiryMmYy(cardExpiry)

    placeOrder({
      name: name.trim(),
      phone: phone.trim(),
      address: address.trim(),
      notes: notes.trim(),
      paymentMethod,
      debitCard:
        paymentMethod === 'tarjeta_debito' && exp
          ? {
              cardholderName: cardholderName.trim(),
              dni: normalizeDni(cardDni),
              last4: last4FromPan(pan),
              expiryMonth: exp.mm,
              expiryYear: exp.yy,
            }
          : undefined,
    })
    navigate('/confirmacion', { replace: true })
  }

  return (
    <Container className="py-10 sm:py-14">
      <h1 className="font-display text-3xl font-bold text-aurora-ink">
        Finaliza tu compra
      </h1>
      <p className="mt-2 text-aurora-muted">
        No necesitás crear cuenta. Completá tus datos y confirmá el pedido.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-10 grid gap-10 lg:grid-cols-2"
      >
        <Card className="p-6 sm:p-8">
          <h2 className="font-display text-xl font-bold text-aurora-ink">
            Datos de contacto y entrega
          </h2>
          <div className="mt-6 space-y-4">
            <Input
              label="Nombre y apellido"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={errors.name}
              autoComplete="name"
            />
            <Input
              label="Teléfono"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              error={errors.phone}
              autoComplete="tel"
              placeholder="Ej: 3794-123456"
            />
            <Input
              label="Dirección de entrega"
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              error={errors.address}
              autoComplete="street-address"
              placeholder="Calle, número, barrio"
            />
            <Textarea
              label="Observaciones"
              name="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Horario preferido, referencias, etc."
            />
          </div>

          <fieldset className="mt-10 border-0 p-0">
            <legend className="font-display text-xl font-bold text-aurora-ink">
              Método de pago
            </legend>
            <p className="mt-1 text-sm text-aurora-muted">
              Elegí cómo vas a abonar el pedido.
            </p>
            <div className="mt-4 space-y-3">
              {PM_OPTIONS.map((opt) => (
                <label
                  key={opt.value}
                  className={`flex cursor-pointer gap-3 rounded-2xl border px-4 py-3 transition has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-violet-300/50 ${
                    paymentMethod === opt.value
                      ? 'border-violet-400 bg-violet-50/60 shadow-inner shadow-violet-500/10'
                      : 'border-violet-200/80 bg-white/95 hover:border-violet-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={opt.value}
                    checked={paymentMethod === opt.value}
                    onChange={() => {
                      setPaymentMethod(opt.value)
                      setErrors((prev) => {
                        const rest = { ...prev }
                        delete rest.cardholderName
                        delete rest.cardNumber
                        delete rest.cardExpiry
                        delete rest.cardCvv
                        delete rest.cardDni
                        return rest
                      })
                    }}
                    className="mt-1 h-4 w-4 shrink-0 accent-violet-600"
                  />
                  <span className="text-left">
                    <span className="block font-semibold text-aurora-ink">
                      {opt.title}
                    </span>
                    <span className="mt-0.5 block text-sm text-aurora-muted">
                      {opt.hint}
                    </span>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          {paymentMethod === 'tarjeta_debito' ? (
            <div className="mt-8 space-y-4 border-t border-violet-100 pt-8">
              <h3 className="text-sm font-semibold text-aurora-ink">
                Datos de la tarjeta de débito
              </h3>
              <p className="text-xs text-aurora-muted">
                El número se valida con algoritmo Luhn. No guardamos el número
                completo, solo los últimos 4 dígitos en el pedido.
              </p>
              <Input
                label="Titular de la tarjeta"
                name="cardholderName"
                value={cardholderName}
                onChange={(e) => setCardholderName(e.target.value)}
                error={errors.cardholderName}
                autoComplete="cc-name"
                placeholder="Como figura en la tarjeta"
              />
              <Input
                label="DNI del titular"
                name="cardDni"
                value={cardDni}
                onChange={(e) => setCardDni(e.target.value)}
                error={errors.cardDni}
                autoComplete="off"
                inputMode="numeric"
                placeholder="Ej: 12.345.678"
              />
              <Input
                label="Número de tarjeta"
                name="cardNumber"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                error={errors.cardNumber}
                autoComplete="cc-number"
                inputMode="numeric"
                placeholder="0000 0000 0000 0000"
              />
              <div className="grid gap-4 sm:grid-cols-2">
                <Input
                  label="Vencimiento"
                  name="cardExpiry"
                  value={cardExpiry}
                  onChange={(e) =>
                    setCardExpiry(formatExpiryMmYyInput(e.target.value))
                  }
                  error={errors.cardExpiry}
                  autoComplete="cc-exp"
                  inputMode="numeric"
                  maxLength={5}
                  placeholder="06/04"
                />
                <Input
                  label="Código de seguridad"
                  name="cardCvv"
                  value={cardCvv}
                  onChange={(e) => setCardCvv(e.target.value)}
                  error={errors.cardCvv}
                  autoComplete="cc-csc"
                  inputMode="numeric"
                  maxLength={3}
                  placeholder="CVV"
                />
              </div>
            </div>
          ) : null}
        </Card>

        <div>
          <Card className="p-6 sm:p-8">
            <h2 className="font-display text-xl font-bold text-aurora-ink">
              Resumen
            </h2>
            <p className="mt-2 text-3xl font-bold text-aurora-ink">
              {formatARS(subtotal)}
            </p>
            <p className="mt-2 text-sm text-aurora-muted">
              {lines.length} ítem(s) en tu pedido. Validación por WhatsApp.
            </p>
            <Button type="submit" className="mt-8 w-full" size="lg">
              Confirmar compra
            </Button>
            <Link
              to="/carrito"
              className="mt-4 block text-center text-sm font-semibold text-violet-700 hover:underline"
            >
              Volver al carrito
            </Link>
          </Card>
        </div>
      </form>
    </Container>
  )
}
