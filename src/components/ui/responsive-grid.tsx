"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { cva } from "class-variance-authority"

// Responsive Container with optimized breakpoints
interface ResponsiveContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "full" | "none"
  padding?: "none" | "xs" | "sm" | "md" | "lg" | "xl"
  center?: boolean
  gutter?: "none" | "xs" | "sm" | "md" | "lg" | "xl"
}

const containerVariants = cva(
  "w-full mx-auto transition-all-smooth",
  {
    variants: {
      maxWidth: {
        xs: "max-w-xs",
        sm: "max-w-sm", 
        md: "max-w-md",
        lg: "max-w-lg",
        xl: "max-w-xl",
        "2xl": "max-w-2xl",
        full: "max-w-full",
        none: ""
      },
      padding: {
        none: "px-0",
        xs: "px-2",
        sm: "px-4",
        md: "px-6",
        lg: "px-8",
        xl: "px-12"
      },
      center: {
        true: "mx-auto",
        false: ""
      },
      gutter: {
        none: "",
        xs: "px-2",
        sm: "px-4", 
        md: "px-6",
        lg: "px-8",
        xl: "px-12"
      }
    },
    defaultVariants: {
      maxWidth: "full",
      padding: "md",
      center: true,
      gutter: "md"
    }
  }
)

export function ResponsiveContainer({
  children,
  className,
  maxWidth = "full",
  padding = "md",
  center = true,
  gutter = "md",
  ...props
}: ResponsiveContainerProps) {
  return (
    <div
      className={cn(
        containerVariants({ maxWidth, padding, center, gutter }),
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

// Advanced Grid with container queries support
interface FlexGridProps extends React.HTMLAttributes<HTMLDivElement> {
  cols?: {
    xs?: number
    sm?: number
    md?: number
    lg?: number
    xl?: number
    "2xl"?: number
  }
  gap?: "none" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl"
  autoFit?: {
    minWidth: string
    maxWidth?: string
  }
  equalHeight?: boolean
  dense?: boolean
}

function getFlexGridClasses(cols?: FlexGridProps["cols"], autoFit?: FlexGridProps["autoFit"]) {
  if (autoFit) {
    const { minWidth, maxWidth = "1fr" } = autoFit
    return {
      gridTemplateColumns: `repeat(auto-fit, minmax(${minWidth}, ${maxWidth}))`
    }
  }

  let classes = "grid-cols-1"
  if (cols) {
    if (cols.xs) classes = `grid-cols-${cols.xs}`
    if (cols.sm) classes += ` sm:grid-cols-${cols.sm}`
    if (cols.md) classes += ` md:grid-cols-${cols.md}`
    if (cols.lg) classes += ` lg:grid-cols-${cols.lg}`
    if (cols.xl) classes += ` xl:grid-cols-${cols.xl}`
    if (cols["2xl"]) classes += ` 2xl:grid-cols-${cols["2xl"]}`
  }

  return { className: classes }
}

const flexGridVariants = cva(
  "grid w-full",
  {
    variants: {
      gap: {
        none: "gap-0",
        xs: "gap-1",
        sm: "gap-2",
        md: "gap-4",
        lg: "gap-6",
        xl: "gap-8",
        "2xl": "gap-12"
      },
      equalHeight: {
        true: "grid-rows-[repeat(auto-fit,1fr)]",
        false: ""
      },
      dense: {
        true: "grid-auto-flow-dense",
        false: ""
      }
    },
    defaultVariants: {
      gap: "md",
      equalHeight: false,
      dense: false
    }
  }
)

export function FlexGrid({
  children,
  className,
  cols,
  gap = "md",
  autoFit,
  equalHeight = false,
  dense = false,
  style,
  ...props
}: FlexGridProps) {
  const gridConfig = getFlexGridClasses(cols, autoFit)
  
  return (
    <div
      className={cn(
        flexGridVariants({ gap, equalHeight, dense }),
        "gridConfig" in gridConfig ? gridConfig.className : "",
        className
      )}
      style={{
        ...("gridTemplateColumns" in gridConfig ? { gridTemplateColumns: gridConfig.gridTemplateColumns } : {}),
        ...style
      }}
      {...props}
    >
      {children}
    </div>
  )
}

// Masonry Layout for Pinterest-style grids
interface MasonryProps extends React.HTMLAttributes<HTMLDivElement> {
  cols?: {
    xs?: number
    sm?: number
    md?: number
    lg?: number
    xl?: number
  }
  gap?: "none" | "xs" | "sm" | "md" | "lg" | "xl"
}

export function Masonry({
  children,
  className,
  cols = { xs: 1, sm: 2, md: 3, lg: 4, xl: 5 },
  gap = "md",
  ...props
}: MasonryProps) {
  const [mounted, setMounted] = React.useState(false)
  
  React.useEffect(() => {
    setMounted(true)
  }, [])

  const gapClasses = {
    none: "gap-0",
    xs: "gap-1",
    sm: "gap-2",
    md: "gap-4",
    lg: "gap-6",
    xl: "gap-8"
  }

  const colClasses = {
    xs: cols.xs ? `columns-${cols.xs}` : "columns-1",
    sm: cols.sm ? `sm:columns-${cols.sm}` : "",
    md: cols.md ? `md:columns-${cols.md}` : "",
    lg: cols.lg ? `lg:columns-${cols.lg}` : "",
    xl: cols.xl ? `xl:columns-${cols.xl}` : ""
  }

  if (!mounted) {
    return <div className="animate-pulse bg-muted rounded h-64" />
  }

  return (
    <div
      className={cn(
        "w-full",
        gapClasses[gap],
        Object.values(colClasses).join(" "),
        "[&>*]:break-inside-avoid [&>*]:mb-4",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

// Responsive Aspect Ratio Container
interface AspectRatioProps extends React.HTMLAttributes<HTMLDivElement> {
  ratio?: "square" | "video" | "wide" | "portrait" | "golden" | string
  responsive?: {
    xs?: string
    sm?: string
    md?: string
    lg?: string
    xl?: string
  }
}

const aspectRatioVariants = cva(
  "relative w-full overflow-hidden",
  {
    variants: {
      ratio: {
        square: "aspect-square",
        video: "aspect-video",
        wide: "aspect-[21/9]",
        portrait: "aspect-[3/4]",
        golden: "aspect-[1.618/1]"
      }
    },
    defaultVariants: {
      ratio: "video"
    }
  }
)

export function AspectRatio({
  children,
  className,
  ratio = "video",
  responsive,
  style,
  ...props
}: AspectRatioProps) {
  const getResponsiveRatios = () => {
    if (!responsive) return {}
    
    const styles: Record<string, string> = {}
    
    // Use CSS custom properties for responsive aspect ratios
    if (responsive.xs) styles["--aspect-ratio-xs"] = responsive.xs
    if (responsive.sm) styles["--aspect-ratio-sm"] = responsive.sm
    if (responsive.md) styles["--aspect-ratio-md"] = responsive.md
    if (responsive.lg) styles["--aspect-ratio-lg"] = responsive.lg
    if (responsive.xl) styles["--aspect-ratio-xl"] = responsive.xl
    
    return styles
  }

  return (
    <div
      className={cn(
        typeof ratio === "string" && ["square", "video", "wide", "portrait", "golden"].includes(ratio)
          ? aspectRatioVariants({ ratio: ratio as any })
          : "relative w-full overflow-hidden",
        className
      )}
      style={{
        ...(typeof ratio === "string" && !["square", "video", "wide", "portrait", "golden"].includes(ratio)
          ? { aspectRatio: ratio }
          : {}),
        ...getResponsiveRatios(),
        ...style
      }}
      {...props}
    >
      <div className="absolute inset-0">
        {children}
      </div>
    </div>
  )
}

// Breakpoint Hook for responsive behavior
export function useBreakpoint() {
  const [breakpoint, setBreakpoint] = React.useState<string>("xs")
  
  React.useEffect(() => {
    const updateBreakpoint = () => {
      const width = window.innerWidth
      if (width >= 1536) setBreakpoint("2xl")
      else if (width >= 1280) setBreakpoint("xl")
      else if (width >= 1024) setBreakpoint("lg")
      else if (width >= 768) setBreakpoint("md")
      else if (width >= 640) setBreakpoint("sm")
      else setBreakpoint("xs")
    }
    
    updateBreakpoint()
    window.addEventListener("resize", updateBreakpoint)
    return () => window.removeEventListener("resize", updateBreakpoint)
  }, [])
  
  return {
    breakpoint,
    isXs: breakpoint === "xs",
    isSm: breakpoint === "sm",
    isMd: breakpoint === "md", 
    isLg: breakpoint === "lg",
    isXl: breakpoint === "xl",
    is2Xl: breakpoint === "2xl",
    isDesktop: ["lg", "xl", "2xl"].includes(breakpoint),
    isMobile: ["xs", "sm"].includes(breakpoint),
    isTablet: breakpoint === "md"
  }
}

// Container Query Hook (for modern browsers)
export function useContainerQuery(ref: React.RefObject<HTMLElement>) {
  const [size, setSize] = React.useState({ width: 0, height: 0 })
  
  React.useEffect(() => {
    if (!ref.current) return
    
    const observer = new ResizeObserver(entries => {
      for (const entry of entries) {
        setSize({
          width: entry.contentRect.width,
          height: entry.contentRect.height
        })
      }
    })
    
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [ref])
  
  return {
    ...size,
    isSmall: size.width < 480,
    isMedium: size.width >= 480 && size.width < 768,
    isLarge: size.width >= 768
  }
}

// Export types
export type {
  ResponsiveContainerProps,
  FlexGridProps,
  MasonryProps,
  AspectRatioProps
} 