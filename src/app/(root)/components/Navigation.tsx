import Link from 'next/link'
import NavigationPointer from './NavigationPointer'
import DarkModeToggle from './DarkModeToggle'
import { NAV_ITEMS } from '@/constans/common'
import Logo from '@/app/components/Logo'

const Navigation: React.FC = () => (
  <header className="fixed bottom-0 left-0 right-0 z-[100] flex h-16 w-full flex-row overflow-hidden bg-white/80 backdrop-blur-xl dark:bg-black/80 md:right-auto md:top-0 md:h-full md:w-16 md:flex-col">
    <div className="flex h-16 w-16">
      <Link href="/" title="Home" className="flex flex-1 items-center justify-center">
        <Logo height={18} width={18} />
      </Link>
    </div>
    <nav className="relative m-auto overflow-auto" role="navigation">
      <NavigationPointer />
      <ul className="flex flex-row md:flex-col">
        {NAV_ITEMS.map(({ path, Icon, label }) => (
          <li key={path}>
            <Link href={path} title={label} className="relative flex h-16 w-16 flex-col items-center justify-center md:pt-1">
              <Icon size={18} />
              <span className="absolute bottom-1 left-0 right-0 block text-center text-[0.5em] md:relative md:bottom-0 md:mt-1">
                {label}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
    <div className="flex h-16 w-16">
      <DarkModeToggle title="Dark mode toggle" className="flex flex-1 items-center justify-center" />
    </div>
  </header>
)

export default Navigation
