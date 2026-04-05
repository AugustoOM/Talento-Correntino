import { cn } from '../../lib/cn'
import { BRAND } from '../../data/constants'

const LOGO_PATH = 'logo.png'

function logoSrc() {
  return `${import.meta.env.BASE_URL}${LOGO_PATH}`
}

type LogoSize = 'navbar' | 'sidebar' | 'login' | 'footer'

const sizeClass: Record<LogoSize, string> = {
  navbar: 'h-9 w-auto max-h-10 max-w-[min(160px,42vw)] sm:max-w-[180px]',
  sidebar: 'h-9 w-auto max-h-10 max-w-[140px]',
  login: 'h-11 w-auto max-h-14 max-w-[200px]',
  footer: 'h-10 w-auto max-h-11 max-w-[160px]',
}

export function Logo({
  size = 'navbar',
  className,
  decorative = true,
}: {
  size?: LogoSize
  className?: string
  /** Si es true, alt vacío (hay texto junto al logo). */
  decorative?: boolean
}) {
  return (
    <img
      src={logoSrc()}
      alt={decorative ? '' : BRAND.name}
      className={cn('shrink-0 object-contain object-left', sizeClass[size], className)}
      decoding="async"
      loading="eager"
    />
  )
}
