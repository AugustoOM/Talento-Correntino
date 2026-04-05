import { cn } from '../../lib/cn'

export function GradientBackdrop({ className }: { className?: string }) {
  return (
    <div
      className={cn('pointer-events-none fixed inset-0 -z-10 overflow-hidden', className)}
      aria-hidden
    >
      <div className="absolute -left-32 top-0 h-[420px] w-[420px] rounded-full bg-gradient-to-br from-orange-300/90 via-amber-200/70 to-transparent blur-3xl" />
      <div className="absolute right-[-80px] top-24 h-[380px] w-[380px] rounded-full bg-gradient-to-bl from-fuchsia-400/80 via-violet-400/60 to-transparent blur-3xl" />
      <div className="absolute bottom-0 left-1/3 h-[360px] w-[480px] rounded-full bg-gradient-to-tr from-cyan-300/70 via-teal-200/50 to-transparent blur-3xl" />
      <div className="absolute bottom-[-80px] right-1/4 h-[280px] w-[280px] rounded-full bg-gradient-to-tl from-pink-300/60 to-transparent blur-2xl" />
    </div>
  )
}

export function OrganicShape({
  className,
  color = 'from-orange-400/30 to-pink-400/20',
}: {
  className?: string
  color?: string
}) {
  return (
    <div
      className={cn(
        'rounded-[40%_60%_70%_30%_/_40%_50%_60%_50%] bg-gradient-to-br opacity-80',
        color,
        className,
      )}
      aria-hidden
    />
  )
}
