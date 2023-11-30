'use client'
import { PageTransitionProvider } from '@/contexts/PageTransitionContext'
import { ThemeProvider as NextThemesProvider } from 'next-themes'

const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <NextThemesProvider attribute="class" defaultTheme="dark">
      <PageTransitionProvider>{children}</PageTransitionProvider>
    </NextThemesProvider>
  )
}

export default Providers
