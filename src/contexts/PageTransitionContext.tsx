import React, { createContext, useState, useContext, PropsWithChildren } from 'react'

interface PageTransitionContextProps {
  start: boolean
  setStart: React.Dispatch<React.SetStateAction<boolean>>
}

const PageTransitionContext = createContext<PageTransitionContextProps>({
  start: false,
  setStart: () => {},
})

export const PageTransitionProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [start, setStart] = useState(false)

  return <PageTransitionContext.Provider value={{ start, setStart }}>{children}</PageTransitionContext.Provider>
}

export const usePageTransition = (): PageTransitionContextProps => {
  return useContext(PageTransitionContext)
}
