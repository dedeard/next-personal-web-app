'use client'

import { ThemeProvider } from 'next-themes'
import { MountProvider } from '@/contexts/MountContext'

const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <MountProvider>
      <ThemeProvider attribute="class" defaultTheme="dark">
        {children}
      </ThemeProvider>
    </MountProvider>
  )
}

export default Providers
