import React, { createContext, useCallback, useContext, useState } from 'react'

interface RootBackgroundContextType {
  isVideoPlayed: boolean
  toggleVideo: (play?: boolean) => void
}

const RootBackgroundContext = createContext<RootBackgroundContextType>({
  isVideoPlayed: false,
  toggleVideo: () => {},
})

export const RootBackgroundProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [isVideoPlayed, setIsVideoPlayed] = useState<boolean>(false)

  const toggleVideo: RootBackgroundContextType['toggleVideo'] = useCallback((play) => {
    setIsVideoPlayed((prev) => (play !== undefined ? play : !prev))
  }, [])

  return <RootBackgroundContext.Provider value={{ isVideoPlayed, toggleVideo }}>{children}</RootBackgroundContext.Provider>
}

export function useRootBackground(): RootBackgroundContextType {
  const context = useContext(RootBackgroundContext)
  if (!context) {
    throw new Error('useRootBackground must be used within a RootBackgroundProvider')
  }
  return context
}
