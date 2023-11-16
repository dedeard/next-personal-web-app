import { forwardRef, useEffect, useState } from 'react'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { useMount } from '@/hooks/mount'
import Logo from '../icons/Logo'
import { UserIcon, ClipboardIcon, MailIcon, MoonIcon, SunIcon, HomeIcon } from '../icons/Feather'
import ModeTransition from '../animations/ModeTransiton'
import NavigationPointer from '../animations/NavigationPointer'

const Header = forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>((props, ref) => {
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
        {...props}
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
          <button type="button" title="Dark mode toggle" className="flex flex-1 items-center justify-center" onClick={() => setClick(true)}>
            {dark ? <SunIcon height={18} width={18} /> : <MoonIcon height={18} width={18} />}
          </button>
        </div>
      </header>
    </>
  )
})

export default Header
