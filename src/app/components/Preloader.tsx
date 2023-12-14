'use client'

import { memo, useEffect, useState } from 'react'
import { useMount } from '@/contexts/MountContext'

const Preloader: React.FC = () => {
  const mounted = useMount()
  const [hide, setHide] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setHide(true)
    }, 2200)
  }, [])

  if (hide) return null

  return (
    <i
      style={{ opacity: mounted ? 0 : 1 }}
      className="pointer-events-none fixed bottom-0 left-0 right-0 top-0 z-[130] block h-full w-full select-none bg-white transition-opacity delay-[1s] duration-[1s] dark:bg-black"
    />
  )
}

export default memo(Preloader)
