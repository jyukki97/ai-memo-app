"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

// Layout Context for sharing state between compound components
interface LayoutContextType {
  variant: "default" | "fluid" | "centered" | "sidebar"
  spacing: "tight" | "normal" | "relaxed"
}

const LayoutContext = React.createContext<LayoutContextType>({
  variant: "default",
  spacing: "normal"
})

// Main Layout Variants
const layoutVariants = cva(
  "min-h-screen flex flex-col bg-background transition-all-smooth",
  {
    variants: {
      variant: {
        default: "max-w-full",
        fluid: "w-full",
        centered: "items-center justify-center",
        sidebar: "lg:grid lg:grid-cols-[280px_1fr]"
      },
      spacing: {
        tight: "gap-2",
        normal: "gap-4", 
        relaxed: "gap-8"
      }
    },
    defaultVariants: {
      variant: "default",
      spacing: "normal"
    }
  }
)

// Root Layout Component
interface AppLayoutProps extends 
  React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof layoutVariants> {}

function AppLayout({ 
  children, 
  className, 
  variant = "default", 
  spacing = "normal",
  ...props 
}: AppLayoutProps) {
  const contextValue = React.useMemo(() => ({ 
    variant: variant || "default", 
    spacing: spacing || "normal" 
  }), [variant, spacing])
  
  return (
    <LayoutContext.Provider value={contextValue}>
      <div 
        className={cn(layoutVariants({ variant, spacing }), className)}
        {...props}
      >
        {children}
      </div>
    </LayoutContext.Provider>
  )
}

// Header Component
const headerVariants = cva(
  "sticky top-0 z-50 w-full border-b transition-all-smooth",
  {
    variants: {
      variant: {
        default: "bg-background/80 backdrop-blur-sm",
        glass: "glass",
        solid: "bg-background",
        transparent: "bg-transparent border-transparent"
      },
      size: {
        sm: "h-14",
        default: "h-16", 
        lg: "h-20"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
)

interface HeaderProps extends 
  React.HTMLAttributes<HTMLElement>,
  VariantProps<typeof headerVariants> {}

function Header({ 
  children, 
  className, 
  variant = "default", 
  size = "default",
  ...props 
}: HeaderProps) {
  return (
    <header 
      className={cn(headerVariants({ variant, size }), className)}
      {...props}
    >
      <div className="container-custom h-full flex items-center justify-between">
        {children}
      </div>
    </header>
  )
}

// Main Content Area
const mainVariants = cva(
  "flex-1 transition-all-smooth",
  {
    variants: {
      padding: {
        none: "p-0",
        sm: "p-4",
        default: "p-6 lg:p-8",
        lg: "p-8 lg:p-12"
      },
      maxWidth: {
        none: "w-full",
        sm: "max-w-screen-sm mx-auto",
        md: "max-w-screen-md mx-auto", 
        lg: "max-w-screen-lg mx-auto",
        xl: "max-w-screen-xl mx-auto",
        full: "container-custom"
      }
    },
    defaultVariants: {
      padding: "default",
      maxWidth: "full"
    }
  }
)

interface MainProps extends 
  React.HTMLAttributes<HTMLElement>,
  VariantProps<typeof mainVariants> {}

function Main({ 
  children, 
  className, 
  padding = "default", 
  maxWidth = "full",
  ...props 
}: MainProps) {
  return (
    <main 
      className={cn(mainVariants({ padding, maxWidth }), className)}
      {...props}
    >
      {children}
    </main>
  )
}

// Sidebar Component
const sidebarVariants = cva(
  "bg-background border-r transition-all-smooth",
  {
    variants: {
      variant: {
        default: "bg-background",
        glass: "glass",
        accent: "bg-muted/50"
      },
      width: {
        sm: "w-64",
        default: "w-72",
        lg: "w-80"
      },
      position: {
        left: "order-first",
        right: "order-last"
      }
    },
    defaultVariants: {
      variant: "default",
      width: "default",
      position: "left"
    }
  }
)

interface SidebarProps extends 
  React.HTMLAttributes<HTMLElement>,
  VariantProps<typeof sidebarVariants> {}

function Sidebar({ 
  children, 
  className, 
  variant = "default", 
  width = "default",
  position = "left",
  ...props 
}: SidebarProps) {
  return (
    <aside 
      className={cn(
        sidebarVariants({ variant, width, position }),
        "hidden lg:block",
        className
      )}
      {...props}
    >
      <div className="sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto p-6">
        {children}
      </div>
    </aside>
  )
}

// Footer Component
const footerVariants = cva(
  "border-t mt-auto transition-all-smooth",
  {
    variants: {
      variant: {
        default: "bg-background",
        glass: "glass",
        muted: "bg-muted/30"
      },
      size: {
        sm: "py-6",
        default: "py-8",
        lg: "py-12"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
)

interface FooterProps extends 
  React.HTMLAttributes<HTMLElement>,
  VariantProps<typeof footerVariants> {}

function Footer({ 
  children, 
  className, 
  variant = "default", 
  size = "default",
  ...props 
}: FooterProps) {
  return (
    <footer 
      className={cn(footerVariants({ variant, size }), className)}
      {...props}
    >
      <div className="container-custom">
        {children}
      </div>
    </footer>
  )
}

// Content Section Component (for organizing main content)
const sectionVariants = cva(
  "transition-all-smooth",
  {
    variants: {
      spacing: {
        none: "space-y-0",
        sm: "space-y-4",
        default: "space-y-6",
        lg: "space-y-8",
        xl: "space-y-12"
      },
      width: {
        auto: "w-auto",
        full: "w-full",
        fit: "w-fit"
      }
    },
    defaultVariants: {
      spacing: "default",
      width: "full"
    }
  }
)

interface SectionProps extends 
  React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof sectionVariants> {}

function Section({ 
  children, 
  className, 
  spacing = "default",
  width = "full",
  ...props 
}: SectionProps) {
  return (
    <section 
      className={cn(sectionVariants({ spacing, width }), className)}
      {...props}
    >
      {children}
    </section>
  )
}

// Brand/Logo Component Slot
interface BrandProps extends React.HTMLAttributes<HTMLDivElement> {
  href?: string
  asLink?: boolean
}

function Brand({ children, className, href, asLink, ...props }: BrandProps) {
  const content = (
    <div 
      className={cn(
        "flex items-center gap-3 transition-all-smooth",
        asLink && "hover:opacity-80 cursor-pointer",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )

  if (asLink && href) {
    return <a href={href}>{content}</a>
  }

  return content
}

// Navigation Slot
function Navigation({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <nav 
      className={cn("flex items-center gap-4", className)}
      {...props}
    >
      {children}
    </nav>
  )
}

// Actions Slot (for buttons, user menu, etc.)
function Actions({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div 
      className={cn("flex items-center gap-3", className)}
      {...props}
    >
      {children}
    </div>
  )
}

// Compound Layout Export
const Layout = Object.assign(AppLayout, {
  Header,
  Main,
  Sidebar,
  Footer,
  Section,
  Brand,
  Navigation,
  Actions
})

// Hook to access layout context
function useLayout() {
  const context = React.useContext(LayoutContext)
  if (!context) {
    throw new Error("useLayout must be used within Layout component")
  }
  return context
}

export { 
  Layout, 
  useLayout,
  type AppLayoutProps,
  type HeaderProps,
  type MainProps,
  type SidebarProps,
  type FooterProps,
  type SectionProps,
  type BrandProps
} 