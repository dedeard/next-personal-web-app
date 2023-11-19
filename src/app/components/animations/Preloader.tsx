import { memo } from 'react'
import { animated, useSpring } from '@react-spring/web'

const Preloader = () => {
  const props = useSpring({
    from: { opacity: 1 },
    to: { opacity: 0 },
    config: { duration: 250, delay: 250 },
  })

  return (
    <animated.div
      style={props}
      className="pointer-events-none fixed bottom-0 left-0 right-0 top-0 z-[130] h-full w-full select-none bg-white dark:bg-black"
    />
  )
}

export default memo(Preloader)
