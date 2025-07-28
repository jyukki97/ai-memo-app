import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full border px-3 py-1 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1.5 [&>svg]:pointer-events-none focus-visible:outline-2 focus-visible:outline-brand-accent focus-visible:outline-offset-2 transition-all-smooth overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90 [a&]:hover:shadow-md",
        brand:
          "border-transparent bg-brand-gradient text-white [a&]:hover:shadow-brand [a&]:hover:-translate-y-0.5",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90 [a&]:hover:shadow-sm",
        destructive:
          "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 [a&]:hover:shadow-md focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40",
        outline:
          "text-foreground border-border [a&]:hover:bg-accent [a&]:hover:text-accent-foreground [a&]:hover:border-brand-accent [a&]:hover:shadow-sm",
        success:
          "border-transparent bg-green-500 text-white [a&]:hover:bg-green-600 [a&]:hover:shadow-md",
        warning:
          "border-transparent bg-yellow-500 text-white [a&]:hover:bg-yellow-600 [a&]:hover:shadow-md",
        info:
          "border-transparent bg-blue-500 text-white [a&]:hover:bg-blue-600 [a&]:hover:shadow-md",
        glass:
          "glass border-brand-accent/30 text-foreground [a&]:hover:border-brand-accent/50 [a&]:hover:shadow-lg",
        gradient:
          "border-transparent bg-gradient-to-r from-brand-primary to-brand-accent text-white [a&]:hover:from-brand-primary/90 [a&]:hover:to-brand-accent/90 [a&]:hover:shadow-brand",
      },
      size: {
        sm: "px-2 py-0.5 text-[10px]",
        default: "px-3 py-1 text-xs",
        lg: "px-4 py-1.5 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Badge({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
