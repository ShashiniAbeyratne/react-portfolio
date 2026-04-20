import { cn } from '@/lib/utils'

interface ScreenLayoutProps {
  children: React.ReactNode
  className?: string
}

export function ScreenLayout({ children, className }: ScreenLayoutProps) {
  return (
    <div className={cn('screen-layout-bg h-screen w-screen flex items-center justify-center', className)}>
      {children}
    </div>
  )
}
