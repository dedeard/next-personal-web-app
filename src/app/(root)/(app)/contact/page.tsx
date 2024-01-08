import type { Metadata } from 'next'
import { FORMSPREE_KEY, SOCIALS } from '@/constans/common'
import ContactForm from './components/ContactForm'
import PageTitle from '../components/PageTitle'

export const metadata: Metadata = {
  title: 'Contact - Dede Ariansya',
  openGraph: {
    title: 'Contact - Dede Ariansya',
    url: '/contact',
  },
  alternates: {
    canonical: '/contact',
  },
}

export default function ContactPage() {
  return (
    <>
      <PageTitle title="Contact" />
      <div className="flex flex-col lg:flex-row">
        <div className="mb-4 w-full text-center lg:w-[480px] lg:text-left">
          <div className="mb-8">
            <h2 className="mb-3 text-lg font-bold">STREET ADDRESS</h2>
            <p className="text-sm leading-5">
              Sintra <br />
              Lisbon, Portugal
            </p>
          </div>
          <div className="mb-8">
            <h2 className="mb-3 text-lg font-bold">EMAIL ADDRESS</h2>
            <p className="text-sm leading-5">
            
              <a href="mailto:anaisapnogueira@gmail.com" rel="noopener" className="hover:text-yellow-600">
              anaisapnogueira@gmail.com
              </a>
            </p>
          </div>
          <div className="mb-8">
            <h2 className="mb-3 text-lg font-bold">MOBILE PHONE</h2>
            <p className="text-sm leading-5">
              <span>Call: </span>
              <a href="tel:+351939528317" target="_blank" rel="noopener" className="hover:text-yellow-600">
              +351 939 528 317
              </a>
              <br />
              <span>WhatsApp: </span>
              <a href={SOCIALS.WA} target="_blank" rel="noopener" className="hover:text-yellow-600">
              +351 939 528 317
              </a>
            </p>
          </div>
        </div>
        <div className="lg:flex-1">
          <ContactForm formspreeKey={FORMSPREE_KEY} />
        </div>
      </div>
    </>
  )
}
