import { createContext, ReactNode, useContext, useState } from 'react'

type InitialContextType = {
  images: string[]
  set: (image: string[]) => void
  add: (image: string) => void
  remove: (image: string) => void
}
const initialContext: InitialContextType = {
  images: [],
  set: () => {},
  add: () => {},
  remove: () => {},
}

const ImageContext = createContext<InitialContextType>(initialContext)

export const ImageProvider = ({ children }: { children: ReactNode }) => {
  const [images, set] = useState<string[]>([])

  const add = (image: string) => {
    set([...images, image])
  }

  const remove = (image: string) => {
    set([...images.filter((el) => el !== image)])
  }

  return <ImageContext.Provider value={{ images, set, add, remove }}>{children}</ImageContext.Provider>
}

export const useImage = () => useContext(ImageContext)
