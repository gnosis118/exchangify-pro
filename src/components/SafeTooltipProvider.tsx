import * as React from "react"
import { TooltipProvider } from "@/components/ui/tooltip"

interface SafeTooltipProviderProps {
  children: React.ReactNode
  delayDuration?: number
}

export function SafeTooltipProvider({ children, delayDuration = 0 }: SafeTooltipProviderProps) {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  // Render children without TooltipProvider during SSR/initial mount to prevent React context issues
  if (!mounted) {
    return <>{children}</>
  }

  // Once mounted on client, provide tooltip context
  try {
    return (
      <TooltipProvider delayDuration={delayDuration}>
        {children}
      </TooltipProvider>
    )
  } catch (error) {
    console.warn('TooltipProvider failed, rendering without tooltips:', error)
    return <>{children}</>
  }
}