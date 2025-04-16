"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@lib/utils"

const trialButtonVariants = cva(
  "relative overflow-hidden rounded-full px-6 py-2 text-sm font-semibold transition-all duration-300 group",
  {
    variants: {
      size: {
        default: "",
        sm: "px-4 py-1.5 text-sm",
        lg: "px-8 py-3 text-base",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

export interface TrialButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof trialButtonVariants> {
  asChild?: boolean
  text?: string
}

const TrialButton = React.forwardRef<HTMLButtonElement, TrialButtonProps>(
  ({ className, size, asChild = false, text = "Start 14-day trial", ...props }, ref) => {
    const Comp = asChild ? Slot : "button"

    return (
      <Comp
        className={cn(
          "bg-primary text-black outline outline-primary",
          trialButtonVariants({ size }),
          className
        )}
        ref={ref}
        {...props}
      >
        {/* Main Text */}
        <span className="relative z-10 transition-colors duration-300 group-hover:text-primary">
          {text}
        </span>

        {/* Hover overlay */}
        <span className="absolute inset-[1px]  inset-x-[2px]  z-0 bg-black scale-x-0 origin-right transition-transform duration-500 ease-out group-hover:scale-x-100 rounded-full ring-2 ring-primary" />
      </Comp>
    )
  }
)

TrialButton.displayName = "TrialButton"
export { TrialButton }
