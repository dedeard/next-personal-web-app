import './globals.css'
import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import { Lato } from 'next/font/google'
import cn from 'classnames'
import Providers from './Providers'
import CursorFollower from './components/CursorFollower'
import RootBackground from './components/RootBackground'
import Navigation from './components/Navigation'

const lato = Lato({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.VERCEL_URL || 'http://localhsot:3000'),
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

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cn('h-full w-full', lato.className)}>
      <body className="flex min-h-full w-full overflow-y-scroll bg-white pb-16 text-black antialiased selection:bg-yellow-600 dark:bg-black  dark:text-white md:pb-0 md:pl-16">
        <i
          aria-hidden="true"
          className="pointer-events-none fixed bottom-0 left-0 right-0 top-0 z-[150] hidden h-full w-full opacity-5 md:block"
          style={{ backgroundImage: "url('/media/noise.gif')" }}
        />
        <Providers>
          <CursorFollower />
          <Navigation />
          <main className="relative z-10 flex-1 bg-white/60 p-3 dark:bg-black/75 md:px-5 lg:px-10">{children}</main>
          <footer className="invisible fixed bottom-0 right-0 z-[100] select-none p-3 text-xs md:visible md:p-5 lg:px-10">
            <p>© {new Date().getFullYear()} DedeArd. All rights reserved.</p>
          </footer>
          <RootBackground />
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}
