'use client'
import { ReactNode, useEffect, useRef, useState } from 'react'
import NoiseFilter from './NoiseFilter'
import Preloader from '../animations/Preloader'
import CursorFollower from '../animations/CursorFollower'
import Header from './Header'
import RootBackground from './RootBackground'
import Footer from './Footer'

type PropsType = {
  children: ReactNode
}

export default function Layout({ children }: PropsType) {
  const navRef = useRef<HTMLElement>(null)
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
      <main className="relative flex-1 bg-white/60 p-3 dark:bg-black/75 md:px-5 lg:px-10">{children}</main>
      <Footer />
      <RootBackground />
    </>
  )
}
