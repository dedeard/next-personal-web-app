import { memo, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import { useMount } from '@/util/mount'
import * as pages from '@/constans/pages'

const NavigationPointer = memo(() => {
  const [start, setStart] = useState(0)
  const { pathname } = useRouter()
  const mounted = useMount()

  const pageIndexMap = {
    [pages.HOME_PAGE.path]: 0,
    [pages.ABOUT_PAGE.path]: 1,
    [pages.PROJECTS_PAGE.path]: 2,
    [pages.CONTACT_PAGE.path]: 3,
  }

  useEffect(() => {
    const index = Object.entries(pageIndexMap).findIndex(([path]) => path === pathname)
    setStart(index >= 0 ? index : -1)
  }, [pathname])

  return (
    <>
      {mounted && (
        <>
          <motion.div
            animate={{ translateY: start * 64 }}
            className="z-1 absolute right-0 top-0 hidden h-16 w-[2px] bg-black dark:bg-white md:block"
          />
          <motion.div
            animate={{ translateX: start * 64 }}
            className="z-1 absolute bottom-0 left-0 block h-[2px] w-16 bg-black dark:bg-white md:hidden"
          />
        </>
      )}
    </>
  )
})

export default NavigationPointer
