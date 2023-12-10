'use client'

import { MountProvider } from '@/contexts/MountContext'
import { ThemeProvider } from '@/contexts/ThemeContext'

const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <MountProvider>
      <ThemeProvider defaultDark>{children}</ThemeProvider>
    </MountProvider>
  )
}

export default Providers
