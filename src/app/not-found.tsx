import Link from 'next/link'
import Logo from './components/Logo'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '404 - Not found',
  robots: 'noindex, nofollow',
}

export default function NotFoundPage() {
  return (
    <div className="flex min-h-full w-full items-center justify-center p-10">
      <div className="fixed left-10 top-10">
        <Link href="/">
          <Logo width={40} height={40} />
        </Link>
      </div>
      <div className="m-auto flex flex-col items-center justify-center">
        <h1 className="mb-3 flex gap-5 text-9xl font-bold">
          <span className="block">4</span>
          <span className="block text-yellow-600">0</span>
          <span className="block">4</span>
        </h1>
        <p className="mb-6 flex flex-col items-center justify-center text-3xl uppercase">
          <span className="text-yellow-600">Sorry, there's</span>
          <span>nothing here</span>
        </p>

        <div className="flex items-center justify-center">
          <Link href="/" className="block bg-black px-5 py-3 text-white dark:bg-white dark:text-black">
            GO HOME
          </Link>
        </div>
      </div>
    </div>
  )
}
