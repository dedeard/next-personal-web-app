import { ImageProvider } from './ImageContext'
import { MountProvider } from './MountContext'

export default function ContextProvider({ children }: { children: React.ReactNode }) {
  return (
    <MountProvider>
      <ImageProvider>{children}</ImageProvider>
    </MountProvider>
  )
}
