import CircularText from '../components/CircularText'
import Navigation from './components/Navigation'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex flex-1 pb-16 md:pb-0 md:pl-16">
        <Navigation />
        {children}
        <footer className="pointer-events-none fixed bottom-2 right-2 z-100 hidden origin-bottom-right scale-75 select-none text-black/80 md:block md:bottom-4 md:right-4 dark:text-white/80">
          <CircularText text={`© ${new Date().getFullYear()} DEDEARD • ALL RIGHTS RESERVED • `} spinDuration={30} />
        </footer>
      </div>
    </>
  )
}
