import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { GoogleAnalytics } from 'nextjs-google-analytics'
import { Analytics } from '@vercel/analytics/react'
import NextNProgress from 'nextjs-progressbar'
import { ThemeProvider } from 'next-themes'
import Layout from '@/components/layouts/Layout'
import ContextProvider from '@/contexts/ContextProvider'

type PageProps = {
  title: string
}

export default function App({ Component, pageProps, router }: AppProps<PageProps>) {
  return (
    <>
      <GoogleAnalytics trackPageViews />
      <Analytics />
      <ThemeProvider attribute="class" enableSystem={false} defaultTheme="dark" storageKey="mode">
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon-white.ico" media="(prefers-color-scheme: dark)" />
          <link rel="icon" href="/favicon.ico" media="(prefers-color-scheme: light)" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap" />
          <meta name="og:image" content={process.env.NEXT_PUBLIC_HOST + '/media/poster.jpg'} />
        </Head>
        <NextNProgress options={{ showSpinner: false }} color="#ca8a04" />
        <ContextProvider>
          <Layout {...pageProps} router={router}>
            <Component {...pageProps} />
          </Layout>
        </ContextProvider>
      </ThemeProvider>
    </>
  )
}
