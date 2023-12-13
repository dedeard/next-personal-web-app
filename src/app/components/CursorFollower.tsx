'use client'

import { memo } from 'react'
import { animated, useSpring } from '@react-spring/web'
import { useCursorFollower } from '@/contexts/CursorFollowerContext'

const CursorFollower: React.FC = () => {
  const { circle, start, scaling, click } = useCursorFollower()

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
            className={`${click ? 'bg-opacity-50' : 'bg-opacity-0'} h-full w-full rounded-full bg-yellow-600 ring-2 ring-yellow-600`}
          ></animated.div>
        </animated.div>
      )}
    </>
  )
}

export default memo(CursorFollower)
