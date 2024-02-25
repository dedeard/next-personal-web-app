'use client'

import { AuthProvider } from '@/contexts/AuthContext'
import { CursorFollowerProvider } from '@/contexts/CursorFollowerContext'
import { MountProvider } from '@/contexts/MountContext'
import { NavigationProvider } from '@/contexts/NavigationContext'
import { ProgressBarProvider } from '@/contexts/ProgressBarContext'
import { RootBackgroundProvider } from '@/contexts/RootBackgroundContext'
import { ThemeProvider } from '@/contexts/ThemeContext'

const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <AuthProvider>
      <ProgressBarProvider>
        <MountProvider>
          <NavigationProvider>
            <CursorFollowerProvider>
              <ThemeProvider defaultDark>
                <RootBackgroundProvider>{children}</RootBackgroundProvider>
              </ThemeProvider>
            </CursorFollowerProvider>
          </NavigationProvider>
        </MountProvider>
      </ProgressBarProvider>
    </AuthProvider>
  )
}

export default Providers
