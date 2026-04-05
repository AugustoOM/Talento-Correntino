import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Button } from './Button'

export function EmptyState({
  icon,
  title,
  description,
  action,
}: {
  icon?: ReactNode
  title: string
  description?: string
  action?: { label: string; to?: string; onClick?: () => void }
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-violet-200 bg-white/60 px-6 py-16 text-center">
      {icon ? <div className="mb-4 text-violet-500">{icon}</div> : null}
      <h3 className="font-display text-lg font-bold text-aurora-ink">{title}</h3>
      {description ? (
        <p className="mt-2 max-w-sm text-sm text-aurora-muted">{description}</p>
      ) : null}
      {action ? (
        <div className="mt-6">
          {action.to ? (
            <Link to={action.to}>
              <Button type="button">{action.label}</Button>
            </Link>
          ) : (
            <Button type="button" onClick={action.onClick}>
              {action.label}
            </Button>
          )}
        </div>
      ) : null}
    </div>
  )
}
