import type { Metadata } from 'next'
import PageTitle from '../components/PageTitle'
import FormSignGuestbook from './components/FormSignGuestbook'

export const metadata: Metadata = {
  title: 'Guestbook - Dede Ariansya',
  openGraph: {
    title: 'Guestbook - Dede Ariansya',
    url: '/guestbook',
  },
  alternates: {
    canonical: '/guestbook',
  },
}

export default function GuestbookPage() {
  return (
    <>
      <PageTitle title="G-book" />
      <FormSignGuestbook />
      <div className="border border-black/5 bg-white/30 backdrop-blur dark:border-white/5 dark:bg-black/30">
        <div className="divide-y lg:divide-y-0 lg:py-3">
          {Array.from(Array(30)).map((_, i) => (
            <pre
              key={i}
              className="flex flex-col items-start gap-x-2 border-black/5 p-3 text-xs dark:border-white/5 md:!text-sm lg:flex-row lg:py-0"
            >
              <code className="flex w-full shrink-0 items-center justify-between gap-x-2 truncate opacity-75 lg:w-36">
                Samuel Pokam
                <code className="flex shrink-0 items-center justify-center gap-x-2 opacity-75 lg:hidden">
                  <code>02-21-2024 09:28 AM</code>
                </code>
              </code>
              <code className="hidden lg:block">:</code>
              <code className="flex-1 whitespace-pre-line">awesome work</code>
              <code className="hidden shrink-0 items-center justify-center gap-x-2 opacity-75 lg:flex">
                <code>02-21-2024 09:28 AM</code>
              </code>
            </pre>
          ))}
        </div>
      </div>
    </>
  )
}
