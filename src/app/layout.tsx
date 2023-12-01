import './globals.css'
import { Analytics } from '@vercel/analytics/react'
import { Lato } from 'next/font/google'
import Layout from './components/Layout'

const lato = Lato({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
})

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={'dark h-full w-full ' + lato.className} style={{ colorScheme: 'dark' }}>
      <body className="flex min-h-full w-full overflow-y-scroll bg-white pb-16 text-black antialiased selection:bg-yellow-600 dark:bg-black  dark:text-white md:pb-0 md:pl-16">
        <Layout>{children}</Layout>
        <Analytics />
      </body>
    </html>
  )
}
