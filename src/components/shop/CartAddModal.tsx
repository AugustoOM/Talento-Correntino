import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckCircle2 } from 'lucide-react'
import { Button } from '../ui/Button'
import { Card, CardContent } from '../ui/Card'
import { useCartAddModalStore } from '../../stores/cartAddModalStore'

export function CartAddModal() {
  const navigate = useNavigate()
  const open = useCartAddModalStore((s) => s.open)
  const productName = useCartAddModalStore((s) => s.productName)
  const close = useCartAddModalStore((s) => s.close)

  useEffect(() => {
    if (!open) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open, close])

  if (!open || !productName) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/45 p-4 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-add-modal-title"
    >
      <button
        type="button"
        className="absolute inset-0 cursor-default"
        aria-label="Cerrar"
        onClick={close}
      />
      <Card className="relative z-10 w-full max-w-md overflow-hidden shadow-card-hover">
        <CardContent className="p-6 sm:p-8">
          <div className="flex justify-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 text-white shadow-lg">
              <CheckCircle2 className="h-8 w-8" aria-hidden />
            </span>
          </div>
          <h2
            id="cart-add-modal-title"
            className="mt-4 text-center font-display text-xl font-bold text-aurora-ink"
          >
            Agregado al carrito
          </h2>
          <p className="mt-2 text-center text-sm text-aurora-muted">
            <span className="font-semibold text-aurora-ink">{productName}</span>{' '}
            se sumó a tu pedido.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button
              type="button"
              className="w-full sm:w-auto"
              size="lg"
              onClick={() => {
                close()
                navigate('/checkout')
              }}
            >
              Ir a pagar
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto"
              onClick={close}
            >
              Seguir comprando
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
