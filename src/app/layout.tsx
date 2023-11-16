import './globals.css'
import { Analytics } from '@vercel/analytics/react'
import { Lato } from 'next/font/google'
import Providers from './Providers'
import Layout from './components/layout/Layout'

const lato = Lato({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
})

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={'dark h-full w-full ' + lato.className} style={{ colorScheme: 'dark' }}>
      <body className="h-full w-full bg-white text-black antialiased selection:bg-yellow-600 dark:bg-black dark:text-white">
        <Providers>
          <Layout>{children}</Layout>
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}
