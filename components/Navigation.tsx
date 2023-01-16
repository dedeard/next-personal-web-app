import React, { memo } from 'react'
import Link, { LinkProps } from 'next/link'
import { useRouter } from 'next/router'
import { useTheme } from 'next-themes'
import { motion } from 'framer-motion'
import { Brand, UserIcon, ImageIcon, MailIcon, MoonIcon, SunIcon } from './Icons'

const ModeToggle = memo(({ click, setClick }: { click: boolean; setClick: (click: boolean) => void }) => {
  const { theme, setTheme } = useTheme()
  const [dark, setDark] = React.useState(false)
  const [animate, setAnimate] = React.useState<{ translateY: string }>({ translateY: '-110vh' })
  const [duration, setDuration] = React.useState(0.75)

  React.useEffect(() => {
    setDark(theme !== 'light')
  }, [theme, dark])

  React.useEffect(() => {
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
      <motion.div
        initial={{ translateY: '-110vh' }}
        animate={animate}
        transition={{ duration, easings: ['easeIn', 'easeOut'] }}
        className="fixed top-0 left-0 right-0 bottom-0 z-[200] flex select-none items-center justify-center bg-white transition-colors duration-500 dark:bg-black"
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
    </>
  )
})

const NavLink = memo((props: LinkProps & { children: React.ReactElement; className?: string }) => {
  const router = useRouter()
  const active = props.href === router.pathname
  return (
    <Link href={props.href} className={props.className + ' relative flex h-16 w-16 items-center justify-center'}>
      {active && <span className="absolute bottom-0 right-0 block h-[2px] w-full bg-black dark:bg-white md:h-full md:w-[2px]" />}
      {props.children}
    </Link>
  )
})

const Navigation = React.forwardRef((props: {}, ref: React.ForwardedRef<HTMLDivElement>) => {
  const { theme } = useTheme()
  const [dark, setDark] = React.useState(false)
  const [click, setClick] = React.useState(false)

  React.useEffect(() => {
    setDark(theme !== 'light')
  }, [theme, dark])

  return (
    <>
      <ModeToggle click={click} setClick={setClick} />
      <nav
        ref={ref}
        className="fixed top-0 left-0 right-0 z-[100] flex h-16 w-full border-r border-black/5 bg-white/90 shadow dark:border-white/5 dark:bg-black/90 md:top-0 md:right-auto md:h-full md:w-16 md:flex-col"
      >
        <NavLink href="/" className="mr-auto md:mr-0 md:mb-auto">
          <Brand height={18} width={18} />
        </NavLink>
        <NavLink href="/about">
          <UserIcon height={18} width={18} />
        </NavLink>
        <NavLink href="/gallery">
          <ImageIcon height={18} width={18} />
        </NavLink>
        <NavLink href="/contact">
          <MailIcon height={18} width={18} />
        </NavLink>
        <button onClick={() => setClick(true)} className="relative ml-auto flex h-16 w-16 items-center justify-center md:ml-0 md:mt-auto">
          {dark ? <SunIcon height={18} width={18} /> : <MoonIcon height={18} width={18} />}
        </button>
      </nav>
    </>
  )
})

export default Navigation
