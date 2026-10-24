import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'

export const EFFECT_COUNT = 8
const MIN_INTERVAL_MS = 3000
const MAX_INTERVAL_MS = 15000

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

export const RootBackgroundProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [effectIndex, setEffectIndex] = useState<number>(0)
  const timerRef = useRef<number | null>(null)
  const isActive = effectIndex > 0

  const toggle = useCallback((on?: boolean) => {
    setEffectIndex((prev) => {
      const shouldBeOn = on !== undefined ? on : prev === 0
      if (!shouldBeOn) return 0
      if (prev > 0) return prev
      return randomEffect(0)
    })
  }, [])

  // While active, jump to a random effect every 3-15s.
  useEffect(() => {
    if (!isActive) return

    const schedule = () => {
      const delay = MIN_INTERVAL_MS + Math.random() * (MAX_INTERVAL_MS - MIN_INTERVAL_MS)
      timerRef.current = window.setTimeout(() => {
        setEffectIndex((prev) => (prev > 0 ? randomEffect(prev) : prev))
        schedule()
      }, delay)
    }
    schedule()

    return () => {
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current)
        timerRef.current = null
      }
    }
  }, [isActive])

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
