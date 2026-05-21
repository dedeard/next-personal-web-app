import { SITE_ALIAS, SITE_DESCRIPTION, SITE_HANDLE, SITE_NAME, SITE_TITLE, SITE_URL, SOCIALS } from '@/constans/common'
import Link from 'next/link'
import { FaGithub, FaInstagram, FaLinkedin, FaWhatsapp } from 'react-icons/fa'

const skills = ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'NestJS', 'Laravel', 'Firebase', 'MongoDB', 'AWS Lambda', 'AI prompting']

const structuredData = [
  {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE_URL}/#person`,
    name: SITE_NAME,
    alternateName: [SITE_ALIAS, SITE_HANDLE, 'Dede'],
    url: SITE_URL,
    jobTitle: 'Pixel-perfect prompter and full-stack web developer',
    description: SITE_DESCRIPTION,
    knowsAbout: skills,
    sameAs: [SOCIALS.GH, SOCIALS.IN, SOCIALS.IG],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: SITE_TITLE,
    alternateName: [SITE_ALIAS, SITE_HANDLE],
    url: SITE_URL,
    publisher: {
      '@id': `${SITE_URL}/#person`,
    },
  },
]

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <div className="relative flex min-h-full w-full flex-col items-center justify-center">
        <div className="relative flex max-w-3xl flex-col items-center justify-center py-3 text-center">
          <h1 className="relative">
            <span className="grid grid-cols-2">
              <span className="block text-center text-sm opacity-90">I AM</span>
            </span>{' '}
            <span className=" z-10 block text-[calc(1.825rem+6.9vw)] font-bold leading-none">Dede Ard</span>{' '}
            <span className="grid grid-cols-2 justify-items-end">
              <span className="block"></span>
              <span className="block text-sm opacity-90">
                PIXEL-PERFECT PROMPTER
                <br /> FULL-STACK WEB DEV
              </span>
            </span>
          </h1>
          <p className="mt-5 max-w-xl text-sm leading-6 opacity-80 md:text-base">
            {SITE_NAME}, also known as {SITE_ALIAS}, builds pixel-perfect web interfaces, practical backend systems, and AI-assisted
            workflows for real products.
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs font-bold uppercase opacity-80">
            <Link href="/about" className="hover:text-yellow-600">
              About Dede
            </Link>
            <Link href="/projects" className="hover:text-yellow-600">
              Projects
            </Link>
            <Link href="/blog" className="hover:text-yellow-600">
              Writing
            </Link>
          </div>
          <div className="mt-6 flex">
            <a
              href={SOCIALS.IG}
              aria-label="Instagram"
              target="_blank"
              rel="me noopener"
              className="mx-2 block p-2 opacity-80 hover:opacity-95"
            >
              <FaInstagram size={20} />
            </a>
            <a
              href={SOCIALS.GH}
              aria-label="GitHub"
              target="_blank"
              rel="me noopener"
              className="mx-2 block p-2 opacity-80 hover:opacity-95"
            >
              <FaGithub size={20} />
            </a>
            <a
              href={SOCIALS.IN}
              aria-label="Linkedin"
              target="_blank"
              rel="me noopener"
              className="mx-2 block p-2 opacity-80 hover:opacity-95"
            >
              <FaLinkedin size={20} />
            </a>
            <a
              href={SOCIALS.WA}
              aria-label="WhatsApp"
              target="_blank"
              rel="noopener"
              className="mx-2 block p-2 opacity-80 hover:opacity-95"
            >
              <FaWhatsapp size={20} />
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
