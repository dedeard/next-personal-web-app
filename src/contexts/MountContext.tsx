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

  return (
    <MountContext.Provider value={{ mount }}>
      <i
        style={{ opacity: mount ? 0 : 1 }}
        className="pointer-events-none fixed bottom-0 left-0 right-0 top-0 z-[130] block h-full w-full select-none bg-white transition-opacity delay-[1s] duration-[1s] dark:bg-black"
      />
      {children}
    </MountContext.Provider>
  )
}

// Custom hook to use the mount value
export function useMount(): boolean {
  const context = useContext(MountContext)
  if (!context) {
    throw new Error('useMount must be used within a MountProvider')
  }

  return context.mount
}
