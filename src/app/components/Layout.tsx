'use client'
import { ThemeProvider } from 'next-themes'
import CursorFollower from './CursorFollower'
import NoiseFilter from './NoiseFilter'
import Preloader from './Preloader'
import Header from './Header'
import Footer from './Footer'
import RootBackground from './RootBackground'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <NoiseFilter />
      <CursorFollower />
      <Preloader />
      <Header />
      <main className="relative flex-1 bg-white/60 p-3 dark:bg-black/75 md:px-5 lg:px-10">{children}</main>
      <Footer />
      <RootBackground />
    </ThemeProvider>
  )
}