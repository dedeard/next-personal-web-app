import { memo, useEffect, useState } from 'react'
import { animated, useSpring } from '@react-spring/web'
import cn from 'classnames'

const CursorFollower = () => {
  const [start, setStart] = useState(false)
  const [scaling, setScaling] = useState(false)
  const [click, setClick] = useState(false)
  const [circle, setCircle] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const mousemove = (e: MouseEvent) => {
      setStart(true)
      setCircle({ x: e.clientX, y: e.clientY })
      // @ts-ignore
      setScaling(e.target?.closest('a') || e.target?.closest('button') ? true : false)
    }

    const onClick = () => {
      if (!click) {
        setClick(true)
        setTimeout(() => {
          setClick(false)
        }, 100)
      }
    }

    window.addEventListener('mousemove', mousemove)
    window.addEventListener('click', onClick)
    return () => {
      window.removeEventListener('mousemove', mousemove)
      window.removeEventListener('click', onClick)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const wrapperStyles = useSpring({
    to: { x: circle.x - 16, y: circle.y - 16 },
    config: {
      mass: 3,
    },
  })

  const circleStyles = useSpring({
    to: { scale: scaling ? 1.5 : 1 },
    config: {
      mass: 3,
      duration: 100,
    },
  })

  return (
    <>
      {start && (
        <animated.div
          style={{
            ...wrapperStyles,
          }}
          className="pointer-events-none fixed left-0 top-0 z-[140] hidden h-8 w-8 select-none md:block"
        >
          <animated.div
            style={{
              ...circleStyles,
            }}
            className={cn(click ? ' bg-opacity-50' : ' bg-opacity-0', 'h-full w-full rounded-full bg-yellow-600 ring-2 ring-yellow-600')}
          ></animated.div>
        </animated.div>
      )}
    </>
  )
}

export default memo(CursorFollower)
