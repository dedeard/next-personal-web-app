import { memo, useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { motion } from 'framer-motion'
import { useMount } from '@/util/mount'
import { MoonIcon, SunIcon } from '@/components/icons/Feather'

type ModeTransitonTypes = {
  click: boolean
  setClick: (click: boolean) => void
}

const ModeTransition = memo(({ click, setClick }: ModeTransitonTypes) => {
  const { theme, setTheme } = useTheme()
  const [dark, setDark] = useState(false)
  const [animate, setAnimate] = useState({ translateY: '-110vh' })
  const [duration, setDuration] = useState(0.75)
  const mounted = useMount()

  useEffect(() => setDark(theme !== 'light'), [theme])

  useEffect(() => {
    if (click) {
      setDuration(0.75)
      setAnimate({ translateY: '0vh' })
      setTimeout(() => {
        setTheme(dark ? 'light' : 'dark')
        setTimeout(() => {
          setAnimate({ translateY: '110vh' })
          setTimeout(() => {
            setClick(false)
            setDuration(0)
            setAnimate({ translateY: '-110vh' })
          }, 750)
        }, 500)
      }, 750)
    }
  }, [click])

  return (
    <>
      {mounted && (
        <motion.div
          initial={{ translateY: '-110vh' }}
          animate={animate}
          transition={{ duration, easings: ['easeIn', 'easeOut'] }}
          className="fixed bottom-0 left-0 right-0 top-0 z-[200] flex select-none items-center justify-center bg-white transition-colors duration-500 dark:bg-black"
        >
          {click && (
            <div className="relative grid h-14 w-36 grid-cols-2 rounded-full bg-black transition-all duration-500 dark:bg-white">
              <div className="absolute left-0 top-0 flex h-14 w-1/2  p-1 transition-all duration-500 dark:left-1/2">
                <div className="flex-1 rounded-full bg-white transition-all duration-500 dark:bg-black"></div>
              </div>
              <div className="relative z-10 flex items-center justify-center text-black">
                <SunIcon height={30} width={30} strokeWidth={3} />
              </div>
              <div className="relative z-10 flex items-center justify-center text-white ">
                <MoonIcon height={30} width={30} strokeWidth={3} />
              </div>
            </div>
          )}
        </motion.div>
      )}
    </>
  )
})

export default ModeTransition
