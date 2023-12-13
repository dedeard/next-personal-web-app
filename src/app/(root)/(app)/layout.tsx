import type { Metadata } from 'next'
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
      <RootBackground />
      <PageTitleAnimation />
      <main className="relative z-10 flex-1 bg-white/60 p-3 dark:bg-black/75 md:px-5 md:pb-10 lg:px-10">{children}</main>
    </>
  )
}
