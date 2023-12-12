import type { Metadata } from 'next'
import Navigation from './components/Navigation'
import PageTitleAnimation from './components/PageTitleAnimation'
import RootBackground from './components/RootBackground'

export const metadata: Metadata = {
  title: 'Dede Ariansya',
  description: 'I’m Dede Ariansya, Full Stack Web Developer based in Makassar, Indonesia.',
  openGraph: {
    images: '/media/poster.jpg',
    title: 'Dede Ariansya',
    description: 'I’m Dede Ariansya, Full Stack Web Developer based in Makassar, Indonesia.',
    url: '/',
  },
  alternates: {
    canonical: '/',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageTitleAnimation />
      <RootBackground />
      <div className="flex flex-1 pb-16 md:pb-0 md:pl-16">
        <Navigation />
        <main className="relative z-10 flex-1 bg-white/60 p-3 dark:bg-black/75 md:px-5 lg:px-10">{children}</main>
        <footer className="invisible fixed bottom-0 right-0 z-[100] select-none p-3 text-xs md:visible md:p-5 lg:px-10">
          <p>© {new Date().getFullYear()} DedeArd. All rights reserved.</p>
        </footer>
      </div>
    </>
  )
}
