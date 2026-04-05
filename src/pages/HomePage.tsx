import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles, Truck, ShieldCheck } from 'lucide-react'
import { BRAND } from '../data/constants'
import { Container } from '../components/ui/Container'
import { Button } from '../components/ui/Button'
import { OrganicShape } from '../components/ui/GradientBackdrop'
import { ProductCard } from '../components/shop/ProductCard'
import { useProductStore } from '../stores/productStore'

export function HomePage() {
  const products = useProductStore((s) => s.products)
  const featured = products.slice(0, 4)

  return (
    <>
      <section className="relative overflow-hidden py-14 sm:py-20 lg:py-28">
        <OrganicShape
          className="absolute -right-16 top-10 h-48 w-48 blur-sm"
          color="from-fuchsia-400/40 to-orange-300/30"
        />
        <OrganicShape
          className="absolute -left-10 bottom-8 h-40 w-40 blur-sm"
          color="from-cyan-300/40 to-teal-200/30"
        />
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-violet-700 shadow-sm backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" />
              Nuevos ingresos cada semana
            </p>
            <h1 className="mt-6 font-display text-4xl font-extrabold leading-tight tracking-tight text-aurora-ink sm:text-5xl lg:text-6xl">
              <span className="block bg-gradient-to-r from-orange-500 via-fuchsia-500 to-cyan-500 bg-clip-text text-transparent">
                {BRAND.name}
              </span>
              <span className="mt-3 block text-2xl font-semibold tracking-normal text-aurora-ink sm:text-3xl">
                {BRAND.tagline}
              </span>
            </h1>
            <p className="mt-5 text-lg text-aurora-muted sm:text-xl">
              {BRAND.description}
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link to="/tienda">
                <Button size="lg" className="gap-2">
                  Ir a la tienda
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/tienda">
                <Button variant="secondary" size="lg">
                  Ver ofertas
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-y border-white/50 bg-white/30 py-10 backdrop-blur-sm">
        <Container>
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              {
                icon: Truck,
                title: 'Envíos en la ciudad',
                text: 'Coordinamos entrega o retiro sin vueltas.',
              },
              {
                icon: ShieldCheck,
                title: 'Compra tranquila',
                text: 'Atención humana por WhatsApp para cada pedido.',
              },
              {
                icon: Sparkles,
                title: 'Hecho a mano',
                text: 'Cerámica, madera, pintura y textiles de talleres locales.',
              },
            ].map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="flex gap-4 rounded-3xl bg-white/70 p-5 shadow-card"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-sky-400 text-white">
                  <Icon className="h-6 w-6" />
                </span>
                <div>
                  <h2 className="font-display font-bold text-aurora-ink">
                    {title}
                  </h2>
                  <p className="mt-1 text-sm text-aurora-muted">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-14 sm:py-20">
        <Container>
          <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 className="font-display text-3xl font-bold text-aurora-ink">
                Destacados de la semana
              </h2>
              <p className="mt-2 text-aurora-muted">
                Una muestra de lo que podés encontrar en el catálogo completo.
              </p>
            </div>
            <Link
              to="/tienda"
              className="text-sm font-semibold text-violet-700 hover:underline"
            >
              Ver todo →
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}
