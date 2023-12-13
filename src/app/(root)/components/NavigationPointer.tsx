'use client'

import { memo } from 'react'
import { useMount } from '@/contexts/MountContext'
import { useNavigationIndex } from '@/contexts/NavigationContext'

const NavigationPointer: React.FC = () => {
  const mounted = useMount()
  const index = useNavigationIndex()

  return (
    <>
      {mounted && (
        <>
          <div
            className="z-1 absolute right-0 top-0 hidden h-16 w-[2px] bg-black transition-transform duration-500 dark:bg-white md:block"
            style={{ transform: `translateY(${index * 64}px)` }}
          />
          <div
            className="z-1 absolute bottom-0 left-0 block h-[2px] w-16 bg-black transition-transform duration-500 dark:bg-white md:hidden"
            style={{ transform: `translateX(${index * 64}px)` }}
          />
        </>
      )}
    </>
  )
}

export default memo(NavigationPointer)
