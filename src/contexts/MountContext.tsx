import React, { createContext, useContext, useEffect, useState } from 'react'

interface MountContextType {
  mount: boolean
}

const MountContext = createContext<MountContextType>({ mount: false })

export const MountProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [mount, setMount] = useState<boolean>(false)

  useEffect(() => {
    setMount(true)
  }, [])

  return <MountContext.Provider value={{ mount }}>{children}</MountContext.Provider>
}

// Custom hook to use the mount value
export function useMount(): boolean {
  const context = useContext(MountContext)
  if (!context) {
    throw new Error('useMount must be used within a MountProvider')
  }

  return context.mount
}
