import type { ReactNode } from 'react'
import { SellerTopBar } from './SellerTopBar'

export function SellerPageShell({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <>
      <SellerTopBar title={title} />
      <div className="p-4 sm:p-6 lg:max-w-7xl lg:mx-auto lg:p-8">{children}</div>
    </>
  )
}
