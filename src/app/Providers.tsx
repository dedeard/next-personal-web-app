'use client'
import { MountProvider } from '@/contexts/MountContext'

const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <MountProvider>{children}</MountProvider>
}

export default Providers
