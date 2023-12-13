'use client'

import { memo } from 'react'
import { animated, useSpring } from '@react-spring/web'
import { useMount } from '@/contexts/MountContext'

const Preloader: React.FC = () => {
  const mounted = useMount()
  const props = useSpring({ opacity: mounted ? 0 : 1 })

  return (
    <animated.div
      style={props}
      className="pointer-events-none fixed bottom-0 left-0 right-0 top-0 z-[130] h-full w-full select-none bg-white dark:bg-black"
    />
  )
}

export default memo(Preloader)
