'use client'
import { motion, useAnimation, useMotionValue, type Transition } from 'motion/react'
import { useEffect } from 'react'
import './CircularText.css'

type OnHoverBehavior = 'slowDown' | 'speedUp' | 'pause' | 'goBonkers'

interface CircularTextProps {
  text: string
  spinDuration?: number
  onHover?: OnHoverBehavior
  className?: string
}

const getRotationTransition = (duration: number, from: number, loop = true): Transition => ({
  from,
  ease: 'linear',
  duration,
  type: 'tween',
  repeat: loop ? Infinity : 0,
})

const getTransition = (duration: number, from: number): Transition => ({
  rotate: getRotationTransition(duration, from),
  scale: {
    type: 'spring',
    damping: 20,
    stiffness: 300,
  },
})

const CircularText: React.FC<CircularTextProps> = ({ text, spinDuration = 20, onHover = 'speedUp', className = '' }) => {
  const letters = Array.from(text)
  const controls = useAnimation()
  const rotation = useMotionValue(0)

  useEffect(() => {
    const start = rotation.get()
    controls.start({
      rotate: start + 360,
      scale: 1,
      transition: getTransition(spinDuration, start),
    })
  }, [spinDuration, text, onHover, controls, rotation])

  const handleHoverStart = () => {
    const start = rotation.get()
    if (!onHover) return

    let transitionConfig: Transition
    let scaleVal = 1

    switch (onHover) {
      case 'slowDown':
        transitionConfig = getTransition(spinDuration * 2, start)
        break
      case 'speedUp':
        transitionConfig = getTransition(spinDuration / 4, start)
        break
      case 'pause':
        transitionConfig = {
          rotate: { type: 'spring', damping: 20, stiffness: 300 },
          scale: { type: 'spring', damping: 20, stiffness: 300 },
        }
        scaleVal = 1
        break
      case 'goBonkers':
        transitionConfig = getTransition(spinDuration / 20, start)
        scaleVal = 0.8
        break
      default:
        transitionConfig = getTransition(spinDuration, start)
    }

    controls.start({
      rotate: start + 360,
      scale: scaleVal,
      transition: transitionConfig,
    })
  }

  const handleHoverEnd = () => {
    const start = rotation.get()
    controls.start({
      rotate: start + 360,
      scale: 1,
      transition: getTransition(spinDuration, start),
    })
  }

  return (
    <motion.div
      className={`circular-text ${className}`}
      style={{ rotate: rotation }}
      initial={{ rotate: 0 }}
      animate={controls}
      onMouseEnter={handleHoverStart}
      onMouseLeave={handleHoverEnd}
    >
      {letters.map((letter, i) => {
        const rotationDeg = (360 / letters.length) * i
        const factor = Math.PI / letters.length
        const x = factor * i
        const y = factor * i
        const transform = `rotateZ(${rotationDeg}deg) translate3d(${x}px, ${y}px, 0)`

        return (
          <span key={i} style={{ transform, WebkitTransform: transform }}>
            {letter}
          </span>
        )
      })}
    </motion.div>
  )
}

export default CircularText
