'use client'
import { animated, useSpring } from '@react-spring/web'
import { memo } from 'react'

const LangBar: React.FC<{ size: number; color?: string; className?: string }> = ({ size, color, className }) => {
  const props = useSpring({
    from: { width: '0%' },
    to: { width: `${size}%` },
    config: { duration: 1000 },
  })

  return <animated.div style={{ ...props, backgroundColor: color }} className={className} />
}

export default memo(LangBar)
