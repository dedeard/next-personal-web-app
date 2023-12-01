'use client'
import { memo } from 'react'
import { useMount } from '@/hooks/mount'
import { useSpring, animated } from '@react-spring/web'

const LangBar: React.FC<{ size: number; color?: string; className?: string }> = ({ size, color, className }) => {
  const mount = useMount()

  const props = useSpring({
    from: { width: '0px' },
    to: { width: `${size}%` },
    config: { delay: 1000, duration: 1000 },
  })

  if (!mount) return null

  return <animated.div style={{ ...props, backgroundColor: color }} className={className} />
}

export default memo(LangBar)
