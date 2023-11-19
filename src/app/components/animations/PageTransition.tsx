import { memo, PropsWithChildren, useContext, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { useTransition, animated, easings } from '@react-spring/web'
import { LayoutRouterContext } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { useMount } from '@/hooks/mount'

type PropsType = PropsWithChildren<{
  width: number
  height: number
}>

function FrozenRouter(props: PropsWithChildren) {
  const context = useContext(LayoutRouterContext)
  const frozen = useRef(context).current

  return <LayoutRouterContext.Provider value={frozen}>{props.children}</LayoutRouterContext.Provider>
}

const PageTransition = ({ width, height, children }: PropsType) => {
  const pathname = usePathname()
  const mount = useMount()

  const transitions = useTransition(pathname, {
    from: { transform: 'translateY(100vh) scale(0.9)' },
    enter: [{ transform: 'translateY(0vh) scale(0.9)', delay: 400 }, { transform: 'translateY(0vh) scale(1)' }],
    leave: [{ transform: 'translateY(0vh) scale(0.9)' }, { transform: 'translateY(-100vh) scale(0.9)' }],
    config: { duration: mount ? 400 : 0, easing: easings.easeInOutCubic },
  })

  return transitions((props) => (
    <animated.main
      style={{ ...props, width, height }}
      className="fixed bottom-16 left-0 overflow-y-scroll bg-white/60 px-3 pb-16 dark:bg-black/75 md:bottom-0 md:left-16 md:px-5 lg:px-10"
    >
      <FrozenRouter>{children}</FrozenRouter>
    </animated.main>
  ))
}

export default memo(PageTransition)
