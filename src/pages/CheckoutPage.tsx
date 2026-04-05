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

export function CheckoutPage() {
  const navigate = useNavigate()
  const { subtotal, lines } = useCartTotals()
  const placeOrder = useOrderStore((s) => s.placeOrder)

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [notes, setNotes] = useState('')
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
    setErrors(next)
    if (Object.keys(next).length) return

    placeOrder({ name: name.trim(), phone: phone.trim(), address: address.trim(), notes: notes.trim() })
    navigate('/confirmacion', { replace: true })
  }

  return (
    <Container className="py-10 sm:py-14">
      <h1 className="font-display text-3xl font-bold text-aurora-ink">
        Checkout invitado
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
