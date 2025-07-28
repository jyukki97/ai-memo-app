import * as React from "react"

// Debounce hook for performance optimization
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = React.useState<T>(value)

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

// Throttle hook for scroll/resize events
export function useThrottle<T>(value: T, limit: number): T {
  const [throttledValue, setThrottledValue] = React.useState<T>(value)
  const lastRan = React.useRef(Date.now())

  React.useEffect(() => {
    const handler = setTimeout(() => {
      if (Date.now() - lastRan.current >= limit) {
        setThrottledValue(value)
        lastRan.current = Date.now()
      }
    }, limit - (Date.now() - lastRan.current))

    return () => {
      clearTimeout(handler)
    }
  }, [value, limit])

  return throttledValue
}

// Intersection Observer hook for lazy loading
export function useIntersectionObserver(
  options?: IntersectionObserverInit
) {
  const [isIntersecting, setIsIntersecting] = React.useState(false)
  const [hasBeenVisible, setHasBeenVisible] = React.useState(false)
  const targetRef = React.useRef<HTMLElement>(null)

  React.useEffect(() => {
    const element = targetRef.current
    if (!element) return

    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0]
      if (entry) {
        setIsIntersecting(entry.isIntersecting)
        if (entry.isIntersecting && !hasBeenVisible) {
          setHasBeenVisible(true)
        }
      }
    }, options)

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [options, hasBeenVisible])

  return { targetRef, isIntersecting, hasBeenVisible }
}

// Virtual scrolling for large lists
export function useVirtualList<T>({
  items,
  itemHeight,
  containerHeight,
  overscan = 5
}: {
  items: T[]
  itemHeight: number
  containerHeight: number
  overscan?: number
}) {
  const [scrollTop, setScrollTop] = React.useState(0)

  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan)
  const endIndex = Math.min(
    items.length - 1,
    Math.ceil((scrollTop + containerHeight) / itemHeight) + overscan
  )

  const visibleItems = React.useMemo(() => {
    return items.slice(startIndex, endIndex + 1).map((item, index) => ({
      item,
      index: startIndex + index
    }))
  }, [items, startIndex, endIndex])

  const totalHeight = items.length * itemHeight

  const handleScroll = React.useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop)
  }, [])

  return {
    visibleItems,
    totalHeight,
    startIndex,
    handleScroll
  }
}

// Performance monitoring hook
export function usePerformanceMonitor(componentName: string) {
  const renderCount = React.useRef(0)
  const startTime = React.useRef<number>()

  React.useEffect(() => {
    renderCount.current += 1
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`${componentName} rendered ${renderCount.current} times`)
    }
  }, [componentName])

  React.useEffect(() => {
    startTime.current = performance.now()
    
    return () => {
      if (startTime.current && process.env.NODE_ENV === 'development') {
        const duration = performance.now() - startTime.current
        console.log(`${componentName} mount/unmount took ${duration.toFixed(2)}ms`)
      }
    }
  }, [componentName])

  return { renderCount: renderCount.current }
}

// Bundle size monitoring (for development)
export function reportWebVitals(metric: any) {
  if (process.env.NODE_ENV === 'development') {
    console.log('Web Vitals:', metric)
  }
  
  // Send to analytics in production
  if (process.env.NODE_ENV === 'production') {
    // Example: send to analytics service
    // analytics.track('web-vitals', metric)
  }
}

// Critical CSS inlining helper
export function getCriticalCSS() {
  return `
    /* Critical CSS for above-the-fold content */
    .bg-brand-gradient {
      background: linear-gradient(135deg, oklch(0.45 0.15 260), oklch(0.55 0.18 200));
    }
    
    .text-brand-gradient {
      background: linear-gradient(135deg, oklch(0.45 0.15 260), oklch(0.55 0.18 200));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    
    .transition-all-smooth {
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .animate-fade-in {
      animation: fade-in 0.5s ease-out;
    }
    
    @keyframes fade-in {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `
}

// Tree shaking detection
export function isFeatureEnabled(feature: string): boolean {
  const enabledFeatures = process.env.NEXT_PUBLIC_ENABLED_FEATURES?.split(',') || []
  return enabledFeatures.includes(feature)
} 