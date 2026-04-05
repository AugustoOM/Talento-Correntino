import { type ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '../../lib/cn'

const variants = {
  primary:
    'bg-gradient-to-r from-fuchsia-500 via-violet-500 to-sky-500 text-white shadow-lg shadow-violet-500/25 hover:shadow-xl hover:shadow-violet-500/30 hover:brightness-105 active:scale-[0.98]',
  secondary:
    'bg-white/90 text-aurora-ink border border-white/80 shadow-card hover:bg-white hover:shadow-card-hover',
  outline:
    'border-2 border-violet-400/60 bg-transparent text-violet-800 hover:bg-violet-50',
  ghost: 'bg-transparent text-aurora-ink hover:bg-black/5',
  whatsapp:
    'bg-[#25D366] text-white shadow-lg shadow-green-600/20 hover:bg-[#20bd5a] active:scale-[0.98]',
}

const sizes = {
  sm: 'px-3 py-1.5 text-sm rounded-xl',
  md: 'px-5 py-2.5 text-sm font-semibold rounded-2xl',
  lg: 'px-7 py-3.5 text-base font-semibold rounded-2xl',
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variants
  size?: keyof typeof sizes
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500',
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  ),
)
Button.displayName = 'Button'
