import { ReactNode, useEffect, useRef, useState } from 'react'
import { Router } from 'next/router'
import NoiseFilter from './NoiseFilter'
import Preloader from '../animations/Preloader'
import CursorFollower from '../animations/CursorFollower'
import Header from './Header'
import RootBackground from './RootBackground'
import PageTransition from '../animations/PageTransition'
import Footer from './Footer'

type PropsType = {
  router: Router
  children: ReactNode
}

export default function Layout({ router, children }: PropsType) {
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
      <Header ref={navRef} />
      <PageTransition width={screen.w} height={screen.h} router={router}>
        {children}
      </PageTransition>
      <Footer />
      <RootBackground />
    </>
  )
}
