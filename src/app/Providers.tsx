'use client'
import { ThemeProvider as NextThemesProvider } from 'next-themes'

const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <NextThemesProvider attribute="class" defaultTheme="dark">
        {children}
      </NextThemesProvider>
    </>
  )
}

export default Providers
