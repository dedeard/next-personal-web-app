import { memo, useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { useSpring, animated } from '@react-spring/web'
import { useMount } from '@/hooks/mount'
import { MoonIcon, SunIcon } from '../icons/Feather'

type ModeTransitonTypes = {
  click: boolean
  setClick: (click: boolean) => void
}

const ModeTransition = ({ click, setClick }: ModeTransitonTypes) => {
  const { theme, setTheme } = useTheme()
  const [dark, setDark] = useState(false)
  const mounted = useMount()

  useEffect(() => setDark(theme !== 'light'), [theme])

  const { y } = useSpring({
    to: async (next, cancel) => {
      if (click) {
        await next({ y: '0vh' })
        setTheme(dark ? 'light' : 'dark')
        await next({ y: '110vh' })
        setClick(false)
      } else {
        await next({ y: '-110vh' })
      }
    },
    from: { y: '-110vh' },
  })

  return (
    <>
      {mounted && (
        <animated.div
          style={{ transform: y.to((v) => `translateY(${v})`) }}
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
        </animated.div>
      )}
    </>
  )
}

export default memo(ModeTransition)
