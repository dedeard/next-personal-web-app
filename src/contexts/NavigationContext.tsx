// NavigationContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { NAV_ITEMS } from '@/constans/common'

type NavigationContextType = {
  index: number
}

const NavigationContext = createContext<NavigationContextType>({
  index: -1,
})

export const NavigationProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [index, setIndex] = useState(0)
  const pathname = usePathname()

  useEffect(() => {
    let indexName = pathname
    if (pathname.startsWith('/blog')) {
      indexName = '/blog'
    }
    const pageIndexMap = Object.fromEntries(NAV_ITEMS.map((item, index) => [item.path, index]))
    const index = Object.entries(pageIndexMap).findIndex(([path]) => path === indexName)
    setIndex(index >= 0 ? index : -1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  return <NavigationContext.Provider value={{ index }}>{children}</NavigationContext.Provider>
}

export const useNavigationIndex = () => useContext(NavigationContext).index
