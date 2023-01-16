import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect, useRef, useState } from 'react'
import Head from 'next/head'
import { ThemeProvider } from 'next-themes'
import { AnimatePresence, domAnimation, LazyMotion, motion } from 'framer-motion'
import Navigation from '@/components/Navigation'
import Background from '@/components/Background'
import ImagePreviewer from '@/components/ImagePreviewer'
import Copyright from '@/components/Copyright'
import { ImageProvider } from '@/contexts/ImageContext'
import { IDataBackground } from '@/types'
import { BackgroundProvider } from '@/contexts/BackgroundContext'
import CursorFollower from '@/components/CursorFollower'

type PageProps = {
  background: IDataBackground
  title: string
}

export default function App({ Component, pageProps, router }: AppProps<PageProps>) {
  const navRef = useRef<HTMLDivElement>(null)
  const [screen, setScreen] = useState({ w: 0, h: 0 })

  useEffect(() => {
    const update = () => {
      const navRect = navRef.current?.getBoundingClientRect()
      if (navRect) {
        let w: number, h: number
        if (navRect.width <= 65) {
          w = window.innerWidth - 64
          h = window.innerHeight
        } else {
          w = window.innerWidth
          h = window.innerHeight - 64
        }
        setScreen({ w, h })
      }
    }
    update()
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('resize', update)
    }
  }, [])

  return (
    <>
      <ThemeProvider attribute="class">
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
          <link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap" />
        </Head>
        <div
          className="w-full] pointer-events-none fixed top-0 left-0 right-0 bottom-0 z-[250] h-full opacity-5"
          style={{
            backgroundImage: "url('/media/noise2.gif')",
          }}
        />
        <CursorFollower />
        <BackgroundProvider>
          <ImageProvider>
            <motion.div
              initial={{ translateY: '0vh' }}
              animate={{ translateY: '-120vh' }}
              transition={{ duration: 0.25 }}
              className="fixed left-0 top-0 right-0 bottom-0 z-[200] h-full w-full bg-white dark:bg-black"
            />
            <Background {...pageProps.background} title={pageProps.title} />
            <ImagePreviewer />
            <Navigation ref={navRef} />
            <Copyright />
            <LazyMotion features={domAnimation}>
              <AnimatePresence initial={false} mode="sync">
                <motion.div
                  key={router.route}
                  style={{
                    width: screen.w,
                    height: screen.h,
                  }}
                  className="fixed top-16 left-0 overflow-y-scroll bg-white/60 px-3 pt-5 pb-16 dark:bg-black/75 md:left-16 md:top-0 md:px-5 lg:px-10"
                  initial={{
                    translateY: '200vh',
                    opacity: 1,
                  }}
                  animate={{
                    translateY: '0vh',
                    opacity: 1,
                  }}
                  exit={{
                    translateY: '-120vh',
                    opacity: 0,
                  }}
                  transition={{
                    duration: 0.75,
                  }}
                >
                  <Component {...pageProps} />
                </motion.div>
              </AnimatePresence>
            </LazyMotion>
          </ImageProvider>
        </BackgroundProvider>
      </ThemeProvider>
    </>
  )
}
