import { memo, ReactNode } from 'react'
import { Router } from 'next/router'
import { AnimatePresence, domAnimation, LazyMotion, motion } from 'framer-motion'

type PropsType = {
  width: number
  height: number
  router: Router
  children: ReactNode
}

const PageTransition = memo(({ width, height, router, children }: PropsType) => (
  <LazyMotion features={domAnimation}>
    <AnimatePresence initial={false} mode="sync">
      <motion.main
        key={router.route}
        style={{ width, height }}
        className="fixed bottom-16 left-0 overflow-y-scroll bg-white/60 px-3 pb-16 dark:bg-black/75 md:bottom-0 md:left-16 md:px-5 lg:px-10"
        initial={{ translateY: '200vh' }}
        animate={{ translateY: '0vh' }}
        exit={{ translateY: '-120vh' }}
        transition={{ duration: 0.75 }}
      >
        {children}
      </motion.main>
    </AnimatePresence>
  </LazyMotion>
))

export default PageTransition
