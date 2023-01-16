import { createContext, ReactNode, useContext, useState } from 'react'

type InitialStateType = {
  image: string
  video: string
}

type InitialContextType = {
  background: InitialStateType
  set: (background: { image: string; video: string }) => void
}

const initialState: InitialStateType = {
  image: '',
  video: '',
}

const initialContext: InitialContextType = {
  background: { ...initialState },
  set: () => {},
}

const BackgroundContext = createContext<InitialContextType>(initialContext)

export const BackgroundProvider = ({ children }: { children: ReactNode }) => {
  const [background, set] = useState<InitialStateType>(initialState)
  return <BackgroundContext.Provider value={{ background, set }}>{children}</BackgroundContext.Provider>
}

export const useBackground = () => useContext(BackgroundContext)
