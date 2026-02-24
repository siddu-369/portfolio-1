import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline" | "accent"
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold transition-colors",
        variant === "default" && "bg-purple-500/20 text-purple-300 border border-purple-500/30 hover:bg-purple-500/30",
        variant === "secondary" && "bg-white/10 text-white/70 border border-white/10 hover:bg-white/20",
        variant === "outline" && "border border-white/20 text-white/60 hover:border-purple-500/50 hover:text-purple-300",
        variant === "accent" && "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/30",
        className
      )}
      {...props}
    />
  )
}

export { Badge }
