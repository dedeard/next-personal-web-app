'use client'
import dedeard from '@/assets/dedeard.jpg'
import Image from 'next/image'
import { useRef } from 'react'

const MAX_TILT = 10

const TiltImage: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null)

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    const rotateY = (px - 0.5) * 2 * MAX_TILT
    const rotateX = -(py - 0.5) * 2 * MAX_TILT
    el.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`
  }

  const handleLeave = () => {
    const el = ref.current
    if (!el) return
    el.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)'
  }

  return (
    <div
      ref={ref}
      className="transform-3d block w-full transition-transform duration-200 ease-out will-change-transform"
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <Image src={dedeard} alt="Dede Ariansya, also known as Dede Ard" className="block w-full" placeholder="blur" />
    </div>
  )
}

export default TiltImage
