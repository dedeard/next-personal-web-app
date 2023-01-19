import { memo, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import { useMounted } from '@/contexts/MountContext'

const NavigationPointer = memo(() => {
  const [start, setStart] = useState(0)
  const { pathname } = useRouter()
  const mounted = useMounted()

  useEffect(() => {
    switch (pathname) {
      case '/':
        setStart(0)
        break
      case '/about':
        setStart(1)
        break
      case '/gallery':
        setStart(2)
        break
      case '/contact':
        setStart(3)
        break
      default:
        setStart(-1)
        break
    }
  }, [pathname])
  return (
    <>
      {mounted && (
        <>
          <motion.div
            animate={{ translateY: start * 64 }}
            className="z-1 absolute top-0 right-0 hidden h-16 w-[2px] bg-black dark:bg-white md:block"
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
