'use client'

import { memo, useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { useMount } from '@/contexts/MountContext'
import { NAV_ITEMS } from '@/constans/common'

const pageIndexMap = Object.fromEntries(NAV_ITEMS.map((item, index) => [item.path, index]))

const NavigationPointer: React.FC = () => {
  const [start, setStart] = useState(0)
  const pathname = usePathname()
  const mounted = useMount()

  useEffect(() => {
    let indexName = pathname
    if (pathname.startsWith('/blog')) {
      indexName = '/blog'
    }
    const index = Object.entries(pageIndexMap).findIndex(([path]) => path === indexName)
    setStart(index >= 0 ? index : -1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  const translate = start * 64

  return (
    <>
      {mounted && (
        <>
          <div
            className="z-1 absolute right-0 top-0 hidden h-16 w-[2px] bg-black transition-transform duration-500 dark:bg-white md:block"
            style={{ transform: `translateY(${translate}px)` }}
          />
          <div
            className="z-1 absolute bottom-0 left-0 block h-[2px] w-16 bg-black transition-transform duration-500 dark:bg-white md:hidden"
            style={{ transform: `translateX(${translate}px)` }}
          />
        </>
      )}
    </>
  )
}

export default memo(NavigationPointer)
