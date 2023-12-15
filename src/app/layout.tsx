import './globals.css'
import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Lato } from 'next/font/google'
import { HOST } from '@/constans/common'
import noise from '@/assets/noise.gif'
import Providers from './Providers'
import CursorFollower from './components/CursorFollower'

const lato = Lato({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(HOST),
  icons: {
    icon: [
      {
        url: '/favicon.ico',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/favicon-white.ico',
        media: '(prefers-color-scheme: dark)',
      },
    ],
  },
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={'h-full w-full ' + lato.className}>
      <body className="flex min-h-full w-full bg-white text-black antialiased selection:bg-yellow-600 dark:bg-black dark:text-white">
        <i
          aria-hidden="true"
          className="pointer-events-none fixed bottom-0 left-0 right-0 top-0 z-[150] hidden h-full w-full opacity-5 md:block"
          style={{ backgroundImage: `url(${noise.src})` }}
        />
        <Providers>
          <CursorFollower />
          {children}
        </Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
