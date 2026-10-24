'use client'

import { useEffect, useRef } from 'react'

/**
 * Full-screen layer for the mouse-following fighter. Mounted from the root layout so it survives
 * client-side navigation. three.js is imported lazily in the browser, so it stays out of the main bundle.
 */
export default function ShipLayer() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    // a mouse-driven toy: skip it on touch-only devices and for people who prefer reduced motion
    if (!matchMedia('(pointer: fine)').matches || matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let cleanup: (() => void) | undefined
    let cancelled = false
    import('./mountShip').then(({ mountShip }) => {
      if (!cancelled) cleanup = mountShip(container)
    })
    return () => {
      cancelled = true
      cleanup?.()
    }
  }, [])

  return <div ref={containerRef} aria-hidden="true" className="pointer-events-none fixed inset-0 z-50" />
}
