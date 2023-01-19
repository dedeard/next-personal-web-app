import { createContext, useContext, useEffect, useState } from 'react'

const MountContext = createContext(false)

export const MountProvider = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  return <MountContext.Provider value={mounted}>{children}</MountContext.Provider>
}

export const useMounted = () => useContext(MountContext)
