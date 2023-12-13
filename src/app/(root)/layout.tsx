import type { Metadata } from 'next'
import Navigation from './components/Navigation'

export const metadata: Metadata = {
  robots: 'index, follow',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex flex-1 pb-16 md:pb-0 md:pl-16">
        <Navigation />
        {children}
        <footer className="pointer-events-none invisible fixed bottom-0 right-0 z-[100] select-none p-3 text-xs md:visible md:p-5 lg:px-10">
          <p>© {new Date().getFullYear()} DedeArd. All rights reserved.</p>
        </footer>
      </div>
    </>
  )
}
