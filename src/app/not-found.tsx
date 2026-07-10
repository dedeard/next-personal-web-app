import { Metadata } from 'next'
import { Permanent_Marker } from 'next/font/google'
import Link from 'next/link'
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi'
import Fuzzy404 from './components/Fuzzy404'
import Logo from './components/Logo'

const marker = Permanent_Marker({ weight: '400', subsets: ['latin'], display: 'swap' })

export const metadata: Metadata = {
  title: '404 - Not found',
  robots: 'noindex, nofollow',
}

export default function NotFoundPage() {
  return (
    <div className="flex min-h-full w-full items-center justify-center p-10">
      <div className="fixed left-10 top-10">
        <Link href="/" className="cursor-target">
          <Logo width={40} height={40} />
        </Link>
      </div>
      <div className="m-auto flex flex-col items-center justify-center">
        <Fuzzy404 notFoundFont={marker.style.fontFamily} />

        <p className="mt-6 max-w-xs text-center text-sm leading-6 text-black/50 dark:text-white/50">
          The page you’re looking for doesn’t exist or may have been moved.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          <Link href="/" className="cursor-target group inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider">
            <FiArrowLeft size={16} className="transition-transform duration-300 group-hover:-translate-x-1" />
            <span className="relative">
              Go home
              <span className="absolute -bottom-0.5 left-0 h-px w-full origin-right scale-x-0 bg-current transition-transform duration-300 group-hover:origin-left group-hover:scale-x-100" />
            </span>
          </Link>
          <Link
            href="/blog"
            className="cursor-target group inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-black/60 transition-colors hover:text-black dark:text-white/60 dark:hover:text-white"
          >
            <span className="relative">
              Read blog
              <span className="absolute -bottom-0.5 left-0 h-px w-full origin-right scale-x-0 bg-current transition-transform duration-300 group-hover:origin-left group-hover:scale-x-100" />
            </span>
            <FiArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  )
}
