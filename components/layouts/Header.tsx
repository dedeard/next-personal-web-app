import { forwardRef, useEffect, useState } from 'react'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import Logo from '@/components/icons/Logo'
import { UserIcon, ClipboardIcon, MailIcon, MoonIcon, SunIcon, HomeIcon } from '@/components/icons/Feather'
import ModeTransition from '../animations/ModeTransiton'
import NavigationPointer from '../animations/NavigationPointer'
import { useMount } from '@/util/mount'

const Header = forwardRef((_, ref: React.ForwardedRef<HTMLDivElement>) => {
  const { theme } = useTheme()
  const [dark, setDark] = useState(false)
  const [click, setClick] = useState(false)
  const mounted = useMount()

  useEffect(() => {
    setDark(theme !== 'light')
  }, [theme])

  return (
    <>
      {mounted && <ModeTransition click={click} setClick={setClick} />}
      <header
        ref={ref}
        className="fixed bottom-0 left-0 right-0 z-[100] flex h-16 w-full flex-row overflow-hidden bg-white/80 backdrop-blur-xl dark:bg-black/80 md:right-auto md:top-0 md:h-full md:w-16 md:flex-col"
      >
        <div className="flex h-16 w-16">
          <Link href="/" title="Home" className="flex flex-1 items-center justify-center">
            <Logo height={18} width={18} />
          </Link>
        </div>
        <nav className="relative m-auto overflow-auto" role="navigation">
          {mounted && <NavigationPointer />}
          <ul className="flex flex-row md:flex-col">
            <li>
              <Link href="/" title="Home" className="flex h-16 w-16 items-center justify-center">
                <HomeIcon height={18} width={18} />
              </Link>
            </li>
            <li>
              <Link href="/about" title="About" className="flex h-16 w-16 items-center justify-center">
                <UserIcon height={18} width={18} />
              </Link>
            </li>
            <li>
              <Link href="/projects" title="Projects" className="flex h-16 w-16 items-center justify-center">
                <ClipboardIcon height={18} width={18} />
              </Link>
            </li>
            <li>
              <Link href="/contact" title="Contact" className="flex h-16 w-16 items-center justify-center">
                <MailIcon height={18} width={18} />
              </Link>
            </li>
          </ul>
        </nav>
        <div className="flex h-16 w-16">
          <button type="button" title="Dark mode toggle" onClick={() => setClick(true)} className="flex flex-1 items-center justify-center">
            {dark ? <SunIcon height={18} width={18} /> : <MoonIcon height={18} width={18} />}
          </button>
        </div>
      </header>
    </>
  )
})

export default Header
