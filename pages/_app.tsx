import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { Lato } from 'next/font/google'
import { GoogleAnalytics } from 'nextjs-google-analytics'
import { Analytics } from '@vercel/analytics/react'
import NextNProgress from 'nextjs-progressbar'
import { ThemeProvider } from 'next-themes'
import Layout from '@/components/layouts/Layout'

type PageProps = {
  title: string
}

const lato = Lato({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
})

export default function App({ Component, pageProps, router }: AppProps<PageProps>) {
  return (
    <>
      <style jsx global>
        {`
          :root {
            --font-lato: ${lato.style.fontFamily};
          }
        `}
      </style>
      <GoogleAnalytics trackPageViews />
      <Analytics />
      <ThemeProvider attribute="class" enableSystem={false} defaultTheme="dark" storageKey="mode">
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon-white.ico" media="(prefers-color-scheme: dark)" />
          <link rel="icon" href="/favicon.ico" media="(prefers-color-scheme: light)" />
          <meta name="og:image" content={process.env.NEXT_PUBLIC_HOST + '/media/poster.jpg'} />
        </Head>
        <NextNProgress options={{ showSpinner: false }} color="#ca8a04" />
        <Layout {...pageProps} router={router}>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </>
  )
}
