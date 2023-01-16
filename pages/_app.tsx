import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { GoogleAnalytics } from 'nextjs-google-analytics'
import NextNProgress from 'nextjs-progressbar'
import { ThemeProvider, useTheme } from 'next-themes'
import { ImageProvider } from '@/contexts/ImageContext'
import { IDataBackground } from '@/types'
import Layout from '@/components/Layout'

type PageProps = {
  background: IDataBackground
  title: string
}

export default function App({ Component, pageProps, router }: AppProps<PageProps>) {
  const { theme } = useTheme()
  return (
    <>
      <GoogleAnalytics trackPageViews />
      <ThemeProvider attribute="class">
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon-white.ico" media="(prefers-color-scheme: dark)" />
          <link rel="icon" href="/favicon.ico" media="(prefers-color-scheme: light)" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap" />
        </Head>
        <NextNProgress options={{ showSpinner: false }} color="#ca8a04" />
        <ImageProvider>
          <Layout {...pageProps} router={router}>
            <Component {...pageProps} />
          </Layout>
        </ImageProvider>
      </ThemeProvider>
    </>
  )
}
