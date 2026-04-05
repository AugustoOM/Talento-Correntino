import { type TextareaHTMLAttributes, forwardRef } from 'react'
import { cn } from '../../lib/cn'

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const nid = id ?? props.name
    return (
      <label className="block w-full text-left">
        {label ? (
          <span className="mb-1.5 block text-sm font-medium text-aurora-muted">
            {label}
          </span>
        ) : null}
        <textarea
          ref={ref}
          id={nid}
          className={cn(
            'min-h-[100px] w-full resize-y rounded-2xl border border-violet-200/80 bg-white/95 px-4 py-3 text-aurora-ink placeholder:text-aurora-muted/70 shadow-inner shadow-violet-500/5 transition focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-300/50',
            error && 'border-rose-400 focus:ring-rose-200',
            className,
          )}
          {...props}
        />
        {error ? (
          <span className="mt-1 block text-xs text-rose-600">{error}</span>
        ) : null}
      </label>
    )
  },
)
Textarea.displayName = 'Textarea'
