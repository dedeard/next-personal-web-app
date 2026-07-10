import { FORMSPREE_KEY, SOCIALS } from '@/constans/common'
import type { Metadata } from 'next'
import { FiMail, FiMapPin, FiPhone } from 'react-icons/fi'
import PageTitle from '../components/PageTitle'
import ContactForm from './components/ContactForm'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contact Dede Ariansya for web development, software engineering, and collaboration opportunities.',
  openGraph: {
    title: 'Contact Dede Ariansya',
    description: 'Contact Dede Ariansya for web development, software engineering, and collaboration opportunities.',
    url: '/contact',
  },
  alternates: {
    canonical: '/contact',
  },
}

const linkClass = 'transition-colors hover:text-black dark:hover:text-white'

export default function ContactPage() {
  return (
    <>
      <PageTitle title="Contact" />
      <div className="flex flex-col gap-10 lg:flex-row">
        <div className="w-full lg:w-[340px] lg:shrink-0">
          <p className="animate-fade-in-up max-w-sm text-black/70 dark:text-white/70" style={{ animationDelay: '0.1s' }}>
            Have a project, role, or idea in mind? Reach out through the form or any channel below.
          </p>

          <div className="mt-8 space-y-6">
            <div className="animate-fade-in-up flex gap-4" style={{ animationDelay: '0.15s' }}>
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-black/10 dark:border-white/15">
                <FiMapPin size={16} />
              </span>
              <div>
                <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-black/40 dark:text-white/40">Location</h2>
                <p className="mt-1 text-sm leading-6 text-black/70 dark:text-white/70">Bali, Indonesia — 80361</p>
              </div>
            </div>

            <div className="animate-fade-in-up flex gap-4" style={{ animationDelay: '0.2s' }}>
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-black/10 dark:border-white/15">
                <FiMail size={16} />
              </span>
              <div>
                <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-black/40 dark:text-white/40">Email</h2>
                <p className="mt-1 flex flex-col text-sm leading-6 text-black/70 dark:text-white/70">
                  <a href="mailto:me@dedeard.my.id" rel="noopener" className={linkClass}>
                    me@dedeard.my.id
                  </a>
                  <a href="mailto:dedeariansya1@gmail.com" rel="noopener" className={linkClass}>
                    dedeariansya1@gmail.com
                  </a>
                </p>
              </div>
            </div>

            <div className="animate-fade-in-up flex gap-4" style={{ animationDelay: '0.25s' }}>
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-black/10 dark:border-white/15">
                <FiPhone size={16} />
              </span>
              <div>
                <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-black/40 dark:text-white/40">Phone</h2>
                <p className="mt-1 flex flex-col text-sm leading-6 text-black/70 dark:text-white/70">
                  <a href="tel:+6281343912883" target="_blank" rel="noopener" className={linkClass}>
                    Call · +62 813-4391-2883
                  </a>
                  <a href={SOCIALS.WA} target="_blank" rel="noopener" className={linkClass}>
                    WhatsApp · +62 813-4391-2883
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="animate-fade-in-up lg:flex-1" style={{ animationDelay: '0.3s' }}>
          <ContactForm formspreeKey={FORMSPREE_KEY} />
        </div>
      </div>
    </>
  )
}
