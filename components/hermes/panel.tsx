import type * as React from "react"
import { cn } from "@/lib/utils"

/**
 * Panel — the recurring "card" surface used across the cockpit.
 * Provides a consistent border, background and rounded corners.
 */
export function Panel({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <section
      className={cn(
        "rounded-xl border border-border/70 bg-panel/60 backdrop-blur-sm",
        "transition-colors duration-300 hover:border-border",
        className,
      )}
      {...props}
    >
      {children}
    </section>
  )
}

export function PanelHeader({
  title,
  action,
  className,
}: {
  title: React.ReactNode
  action?: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn("flex items-center justify-between gap-2", className)}>
      <h2 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
        {title}
      </h2>
      {action}
    </div>
  )
}
