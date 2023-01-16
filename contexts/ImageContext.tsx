import ImagePreviewer from '@/components/ImagePreviewer'
import { createContext, ReactNode, useContext, useState } from 'react'

type InitialContextType = {
  images: string[]
  setImages: (image: string[]) => void
}
const initialContext: InitialContextType = {
  images: [],
  setImages: () => {},
}

const ImageContext = createContext<InitialContextType>(initialContext)

export const ImageProvider = ({ children }: { children: ReactNode }) => {
  const [images, setImages] = useState<string[]>([])

  return (
    <ImageContext.Provider value={{ images, setImages }}>
      <ImagePreviewer images={images} />
      {children}
    </ImageContext.Provider>
  )
}

export const useImage = () => useContext(ImageContext)
