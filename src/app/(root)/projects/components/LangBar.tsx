'use client'
import { memo } from 'react'
import { useSpring, animated } from '@react-spring/web'

const LangBar: React.FC<{ size: number; color?: string; className?: string }> = ({ size, color, className }) => {
  const props = useSpring({
    from: { width: '0%' },
    to: { width: `${size}%` },
    config: { duration: 1000 },
  })

  return <animated.div style={{ ...props, backgroundColor: color }} className={className} />
}

export default memo(LangBar)
