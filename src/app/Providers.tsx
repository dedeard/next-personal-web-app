'use client'

import { MountProvider } from '@/contexts/MountContext'
import { ProgressBarProvider } from '@/contexts/ProgressBarContext'
import { ThemeProvider } from '@/contexts/ThemeContext'

const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <ProgressBarProvider>
      <MountProvider>
        <ThemeProvider defaultDark>{children}</ThemeProvider>
      </MountProvider>
    </ProgressBarProvider>
  )
}

export default Providers
