"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"
import { cva } from "class-variance-authority"

// Generic Slot Container for flexible composition
interface SlotContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean
  direction?: "row" | "column"
  align?: "start" | "center" | "end" | "stretch"
  justify?: "start" | "center" | "end" | "between" | "around" | "evenly"
  gap?: "none" | "xs" | "sm" | "md" | "lg" | "xl"
  wrap?: boolean
}

const slotContainerVariants = cva(
  "flex transition-all-smooth",
  {
    variants: {
      direction: {
        row: "flex-row",
        column: "flex-col"
      },
      align: {
        start: "items-start",
        center: "items-center", 
        end: "items-end",
        stretch: "items-stretch"
      },
      justify: {
        start: "justify-start",
        center: "justify-center",
        end: "justify-end", 
        between: "justify-between",
        around: "justify-around",
        evenly: "justify-evenly"
      },
      gap: {
        none: "gap-0",
        xs: "gap-1",
        sm: "gap-2",
        md: "gap-4",
        lg: "gap-6",
        xl: "gap-8"
      },
      wrap: {
        true: "flex-wrap",
        false: "flex-nowrap"
      }
    },
    defaultVariants: {
      direction: "row",
      align: "center", 
      justify: "start",
      gap: "md",
      wrap: false
    }
  }
)

export function SlotContainer({
  children,
  className,
  asChild = false,
  direction = "row",
  align = "center",
  justify = "start", 
  gap = "md",
  wrap = false,
  ...props
}: SlotContainerProps) {
  const Comp = asChild ? Slot : "div"
  
  return (
    <Comp
      className={cn(
        slotContainerVariants({ 
          direction, 
          align, 
          justify, 
          gap, 
          wrap 
        }),
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  )
}

// Stack Component for vertical layouts
interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  spacing?: "none" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl"
  align?: "start" | "center" | "end" | "stretch"
  divider?: React.ReactNode
}

const stackVariants = cva(
  "flex flex-col",
  {
    variants: {
      spacing: {
        none: "space-y-0",
        xs: "space-y-1",
        sm: "space-y-2", 
        md: "space-y-4",
        lg: "space-y-6",
        xl: "space-y-8",
        "2xl": "space-y-12"
      },
      align: {
        start: "items-start",
        center: "items-center",
        end: "items-end", 
        stretch: "items-stretch"
      }
    },
    defaultVariants: {
      spacing: "md",
      align: "stretch"
    }
  }
)

export function Stack({ 
  children, 
  className, 
  spacing = "md", 
  align = "stretch",
  divider,
  ...props 
}: StackProps) {
  const childrenArray = React.Children.toArray(children)
  
  return (
    <div 
      className={cn(stackVariants({ spacing, align }), className)}
      {...props}
    >
      {divider
        ? childrenArray.map((child, index) => (
            <React.Fragment key={index}>
              {child}
              {index < childrenArray.length - 1 && divider}
            </React.Fragment>
          ))
        : children
      }
    </div>
  )
}

// Inline Component for horizontal layouts
interface InlineProps extends React.HTMLAttributes<HTMLDivElement> {
  spacing?: "none" | "xs" | "sm" | "md" | "lg" | "xl"
  align?: "start" | "center" | "end" | "baseline"
  wrap?: boolean
}

const inlineVariants = cva(
  "flex flex-row",
  {
    variants: {
      spacing: {
        none: "gap-0",
        xs: "gap-1",
        sm: "gap-2",
        md: "gap-4", 
        lg: "gap-6",
        xl: "gap-8"
      },
      align: {
        start: "items-start",
        center: "items-center",
        end: "items-end",
        baseline: "items-baseline"
      },
      wrap: {
        true: "flex-wrap",
        false: "flex-nowrap"
      }
    },
    defaultVariants: {
      spacing: "md",
      align: "center",
      wrap: false
    }
  }
)

export function Inline({ 
  children, 
  className, 
  spacing = "md", 
  align = "center",
  wrap = false,
  ...props 
}: InlineProps) {
  return (
    <div 
      className={cn(
        inlineVariants({ 
          spacing, 
          align, 
          wrap 
        }),
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

// Center Component for centering content
interface CenterProps extends React.HTMLAttributes<HTMLDivElement> {
  axis?: "both" | "horizontal" | "vertical"
  minHeight?: string
}

const centerVariants = cva(
  "flex",
  {
    variants: {
      axis: {
        both: "items-center justify-center",
        horizontal: "justify-center",
        vertical: "items-center"
      }
    },
    defaultVariants: {
      axis: "both"
    }
  }
)

export function Center({ 
  children, 
  className, 
  axis = "both",
  minHeight,
  style,
  ...props 
}: CenterProps) {
  return (
    <div 
      className={cn(centerVariants({ axis }), className)}
      style={{ 
        minHeight,
        ...style 
      }}
      {...props}
    >
      {children}
    </div>
  )
}

// Grid Component for grid layouts
interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  cols?: 1 | 2 | 3 | 4 | 5 | 6 | 12 | "auto-fit" | "auto-fill"
  gap?: "none" | "xs" | "sm" | "md" | "lg" | "xl"
  minItemWidth?: string
  responsive?: {
    sm?: number
    md?: number
    lg?: number
    xl?: number
  }
}

function getGridCols(cols: GridProps["cols"], responsive?: GridProps["responsive"]) {
  let classes = ""
  
  if (typeof cols === "number") {
    classes += `grid-cols-${cols} `
  } else if (cols === "auto-fit") {
    classes += "grid-cols-[repeat(auto-fit,minmax(250px,1fr))] "
  } else if (cols === "auto-fill") {
    classes += "grid-cols-[repeat(auto-fill,minmax(250px,1fr))] "
  }
  
  if (responsive) {
    if (responsive.sm) classes += `sm:grid-cols-${responsive.sm} `
    if (responsive.md) classes += `md:grid-cols-${responsive.md} `
    if (responsive.lg) classes += `lg:grid-cols-${responsive.lg} `
    if (responsive.xl) classes += `xl:grid-cols-${responsive.xl} `
  }
  
  return classes.trim()
}

const gridVariants = cva(
  "grid",
  {
    variants: {
      gap: {
        none: "gap-0",
        xs: "gap-1",
        sm: "gap-2",
        md: "gap-4",
        lg: "gap-6", 
        xl: "gap-8"
      }
    },
    defaultVariants: {
      gap: "md"
    }
  }
)

export function Grid({ 
  children, 
  className, 
  cols = 1,
  gap = "md",
  minItemWidth,
  responsive,
  style,
  ...props 
}: GridProps) {
  const gridColsClass = getGridCols(cols, responsive)
  
  return (
    <div 
      className={cn(
        gridVariants({ gap }),
        gridColsClass,
        className
      )}
      style={{
        gridTemplateColumns: minItemWidth 
          ? `repeat(auto-fit, minmax(${minItemWidth}, 1fr))`
          : undefined,
        ...style
      }}
      {...props}
    >
      {children}
    </div>
  )
}

// Spacer Component for flexible spacing
interface SpacerProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl"
  axis?: "horizontal" | "vertical"
  flex?: boolean
}



export function Spacer({ 
  size = "md", 
  axis = "vertical", 
  flex = false 
}: SpacerProps) {
  const getSizeClass = () => {
    const sizeMap = {
      xs: axis === "vertical" ? "h-1" : "w-1",
      sm: axis === "vertical" ? "h-2" : "w-2", 
      md: axis === "vertical" ? "h-4" : "w-4",
      lg: axis === "vertical" ? "h-6" : "w-6",
      xl: axis === "vertical" ? "h-8" : "w-8",
      "2xl": axis === "vertical" ? "h-12" : "w-12"
    }
    return sizeMap[size]
  }
  
  return (
    <div 
      className={cn(
        getSizeClass(),
        flex && "flex-1"
      )}
      aria-hidden="true"
    />
  )
}

// Conditional Wrapper for conditional rendering
interface ConditionalWrapperProps {
  condition: boolean
  wrapper: (children: React.ReactNode) => React.ReactElement
  children: React.ReactNode
}

export function ConditionalWrapper({ 
  condition, 
  wrapper, 
  children 
}: ConditionalWrapperProps) {
  return condition ? wrapper(children) : <>{children}</>
}

export type {
  SlotContainerProps,
  StackProps,
  InlineProps,
  CenterProps,
  GridProps,
  SpacerProps,
  ConditionalWrapperProps
} 