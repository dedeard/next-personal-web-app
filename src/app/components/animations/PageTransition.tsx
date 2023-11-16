import { memo, PropsWithChildren, useContext, useRef } from 'react'
import { AnimatePresence, domAnimation, LazyMotion, motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { LayoutRouterContext } from 'next/dist/shared/lib/app-router-context.shared-runtime'

type PropsType = PropsWithChildren<{
  width: number
  height: number
}>

function FrozenRouter(props: PropsWithChildren) {
  const context = useContext(LayoutRouterContext)
  const frozen = useRef(context).current

  return <LayoutRouterContext.Provider value={frozen}>{props.children}</LayoutRouterContext.Provider>
}

const PageTransition = memo(({ width, height, children }: PropsType) => {
  const pathname = usePathname()
  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence initial={false} mode="sync">
        <motion.main
          key={pathname}
          style={{ width, height }}
          className="fixed bottom-16 left-0 overflow-y-scroll bg-white/60 px-3 pb-16 dark:bg-black/75 md:bottom-0 md:left-16 md:px-5 lg:px-10"
          initial={{ translateY: '200vh' }}
          animate={{ translateY: '0vh' }}
          exit={{ translateY: '-120vh' }}
          transition={{ duration: 0.75 }}
        >
          <FrozenRouter>{children}</FrozenRouter>
        </motion.main>
      </AnimatePresence>
    </LazyMotion>
  )
})

PageTransition.displayName = 'PageTransition'

export default PageTransition
