import { usePathname } from 'next/navigation'
import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'

export const EFFECT_COUNT = 8
/** Remembers that the visitor switched the music off, so the first click doesn't turn it back on. */
const OFF_KEY = 'bg-audio-off'
/** The on/off button carries this attribute; its own click must not also count as the "first click" auto-start. */
const TOGGLE_SELECTOR = '[data-bg-audio-toggle]'

interface RootBackgroundContextType {
  /** 0 = off, 1..EFFECT_COUNT = the currently displayed effect. */
  effectIndex: number
  /** Whether the audio-reactive background is on. */
  isActive: boolean
  /** Turn the background on/off. Omit the argument to toggle. */
  toggle: (on?: boolean) => void
  /** Back-compat alias for consumers still reading a boolean. */
  isVideoPlayed: boolean
  /** Back-compat alias: toggles on/off. */
  toggleVideo: (play?: boolean) => void
}

const RootBackgroundContext = createContext<RootBackgroundContextType | null>(null)

function randomEffect(exclude: number): number {
  if (EFFECT_COUNT <= 1) return 1
  let next = exclude
  while (next === exclude) {
    next = Math.floor(Math.random() * EFFECT_COUNT) + 1
  }
  return next
}

function rememberOff(off: boolean) {
  try {
    if (off) localStorage.setItem(OFF_KEY, '1')
    else localStorage.removeItem(OFF_KEY)
  } catch {}
}

export const RootBackgroundProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [effectIndex, setEffectIndex] = useState<number>(0)
  const isActive = effectIndex > 0
  const pathname = usePathname()
  const lastPathname = useRef(pathname)

  const toggle = useCallback((on?: boolean) => {
    setEffectIndex((prev) => {
      const shouldBeOn = on !== undefined ? on : prev === 0
      rememberOff(!shouldBeOn)
      if (!shouldBeOn) return 0
      if (prev > 0) return prev
      return randomEffect(0)
    })
  }, [])

  // Browsers block audio until the visitor interacts, so start the music on their first click anywhere
  // (unless they turned it off on an earlier visit, or the click is on the on/off button itself).
  useEffect(() => {
    let off = false
    try {
      off = localStorage.getItem(OFF_KEY) === '1'
    } catch {}
    if (off) return

    const onFirstPointer = (e: PointerEvent) => {
      window.removeEventListener('pointerdown', onFirstPointer)
      if (e.target instanceof Element && e.target.closest(TOGGLE_SELECTOR)) return
      setEffectIndex((prev) => (prev > 0 ? prev : randomEffect(0)))
    }
    window.addEventListener('pointerdown', onFirstPointer)
    return () => window.removeEventListener('pointerdown', onFirstPointer)
  }, [])

  // While active, every page change switches to a different effect (and its track).
  useEffect(() => {
    if (pathname === lastPathname.current) return
    lastPathname.current = pathname
    setEffectIndex((prev) => (prev > 0 ? randomEffect(prev) : prev))
  }, [pathname])

  const toggleVideo = useCallback(
    (play?: boolean) => {
      toggle(play)
    },
    [toggle],
  )

  const value = useMemo<RootBackgroundContextType>(
    () => ({
      effectIndex,
      isActive,
      toggle,
      isVideoPlayed: isActive,
      toggleVideo,
    }),
    [effectIndex, isActive, toggle, toggleVideo],
  )

  return <RootBackgroundContext.Provider value={value}>{children}</RootBackgroundContext.Provider>
}

export function useRootBackground(): RootBackgroundContextType {
  const context = useContext(RootBackgroundContext)
  if (!context) {
    throw new Error('useRootBackground must be used within a RootBackgroundProvider')
  }
  return context
}
