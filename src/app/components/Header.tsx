import { useTheme } from 'next-themes'
import Link from 'next/link'
import { useMount } from '@/hooks/mount'
import { UserIcon, ClipboardIcon, MailIcon, MoonIcon, SunIcon, HomeIcon } from '@/components/Feather'
import Logo from '@/components/Logo'
import NavigationPointer from './NavigationPointer'

const Header: React.FC = () => {
  const { theme, setTheme } = useTheme()
  const mounted = useMount()
  const dark = theme === 'dark'

  return (
    <header className="fixed bottom-0 left-0 right-0 z-[100] flex h-16 w-full flex-row overflow-hidden bg-white/80 backdrop-blur-xl dark:bg-black/80 md:right-auto md:top-0 md:h-full md:w-16 md:flex-col">
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
        <button
          type="button"
          title="Dark mode toggle"
          className="flex flex-1 items-center justify-center"
          onClick={() => setTheme(dark ? 'light' : 'dark')}
        >
          {dark ? <SunIcon height={18} width={18} /> : <MoonIcon height={18} width={18} />}
        </button>
      </div>
    </header>
  )
}

export default Header
