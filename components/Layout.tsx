import { ReactNode, useEffect, useRef, useState } from 'react'
import { Router } from 'next/router'
import { AnimatePresence, domAnimation, LazyMotion, motion } from 'framer-motion'
import Background from './Background'
import Navigation from './Navigation'
import Copyright from './Copyright'
import CursorFollower from './CursorFollower'
import NoiseFilter from './NoiseFilter'
import Preloader from './Preloader'

type PropsType = {
  title: string
  router: Router
  children: ReactNode
}

export default function Layout({ title, router, children }: PropsType) {
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
      <NoiseFilter />
      <CursorFollower />
      <Preloader />
      <Background title={title} />
      <Navigation ref={navRef} />
      <Copyright />
      <LazyMotion features={domAnimation}>
        <AnimatePresence initial={false} mode="sync">
          <motion.div
            key={router.route}
            style={{ width: screen.w, height: screen.h }}
            className="fixed top-16 left-0 overflow-y-scroll bg-white/60 px-3 pt-5 pb-16 dark:bg-black/75 md:left-16 md:top-0 md:px-5 lg:px-10"
            initial={{ translateY: '200vh' }}
            animate={{ translateY: '0vh' }}
            exit={{ translateY: '-120vh' }}
            transition={{ duration: 0.75 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </LazyMotion>
    </>
  )
}
