import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "accent"
  size?: "sm" | "md" | "lg"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 cursor-pointer",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500",
          "disabled:pointer-events-none disabled:opacity-50",

          // Variants
          variant === "default" &&
            "bg-purple-600 text-white hover:bg-purple-500 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:-translate-y-0.5 active:translate-y-0",
          variant === "outline" &&
            "border border-white/20 text-white/80 hover:border-purple-500/60 hover:text-purple-300 hover:bg-purple-500/10 hover:-translate-y-0.5",
          variant === "ghost" &&
            "text-white/70 hover:text-white hover:bg-white/10",
          variant === "accent" &&
            "bg-cyan-500 text-slate-900 font-bold hover:bg-cyan-400 shadow-lg shadow-cyan-500/25 hover:-translate-y-0.5",

          // Sizes
          size === "sm" && "h-8 px-3 text-xs",
          size === "md" && "h-10 px-5 text-sm",
          size === "lg" && "h-12 px-8 text-base",

          className
        )}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
