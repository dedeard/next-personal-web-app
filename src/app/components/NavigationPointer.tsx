import { memo, useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { useSpring, animated } from '@react-spring/web'
import { useMount } from '@/contexts/MountContext'
import * as pages from '@/constans/pages'

const NavigationPointer: React.FC<{ pageIndexMap: Record<string, number> }> = ({ pageIndexMap }) => {
  const [start, setStart] = useState(0)
  const pathname = usePathname()
  const mounted = useMount()

  useEffect(() => {
    const index = Object.entries(pageIndexMap).findIndex(([path]) => path === pathname)
    setStart(index >= 0 ? index : -1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  const props = useSpring({ to: { transform: `translateY(${start * 64}px)` } })
  const propsX = useSpring({ to: { transform: `translateX(${start * 64}px)` } })

  return (
    <>
      {mounted && (
        <>
          <animated.div style={props} className="z-1 absolute right-0 top-0 hidden h-16 w-[2px] bg-black dark:bg-white md:block" />
          <animated.div style={propsX} className="z-1 absolute bottom-0 left-0 block h-[2px] w-16 bg-black dark:bg-white md:hidden" />
        </>
      )}
    </>
  )
}

export default memo(NavigationPointer)
