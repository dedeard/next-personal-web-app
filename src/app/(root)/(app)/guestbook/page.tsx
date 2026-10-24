import { loadMessages } from '@/lib/guestbook'
import type { Metadata } from 'next'
import PageTitle from '../components/PageTitle'
import FormSignGuestbook from './components/FormSignGuestbook'
import GuestbookMessages from './components/GuestbookMessages'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Guestbook',
  description: 'Leave a short message for Dede Ariansya in the guestbook.',
  openGraph: {
    title: 'Guestbook - Dede Ariansya',
    description: 'Leave a short message for Dede Ariansya in the guestbook.',
    url: '/guestbook',
  },
  alternates: {
    canonical: '/guestbook',
  },
}

export default async function GuestbookPage() {
  const messages = await loadMessages()

  return (
    <>
      <PageTitle title="G-book" />
      <FormSignGuestbook />
      <GuestbookMessages initialMessages={messages} />
    </>
  )
}
