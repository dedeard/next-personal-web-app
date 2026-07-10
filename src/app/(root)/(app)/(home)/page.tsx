import CurvedLoop from '@/app/components/CurvedLoop'
import { SITE_ALIAS, SITE_DESCRIPTION, SITE_HANDLE, SITE_NAME, SITE_TITLE, SITE_URL, SOCIALS } from '@/constans/common'
import { FaGithub, FaInstagram, FaLinkedin, FaWhatsapp } from 'react-icons/fa'

const skills = [
  'Next.js',
  'React',
  'TypeScript',
  'Tailwind CSS',
  'Node.js',
  'NestJS',
  'Laravel',
  'Firebase',
  'MongoDB',
  'AWS',
  'Docker',
  'AI Prompting',
]
const skillsMarquee = skills.join(' - ') + ' - '

const socialLinks = [
  { href: SOCIALS.IG, label: 'Instagram', Icon: FaInstagram, rel: 'me noopener' },
  { href: SOCIALS.GH, label: 'GitHub', Icon: FaGithub, rel: 'me noopener' },
  { href: SOCIALS.IN, label: 'Linkedin', Icon: FaLinkedin, rel: 'me noopener' },
  { href: SOCIALS.WA, label: 'WhatsApp', Icon: FaWhatsapp, rel: 'noopener' },
]

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
      <div className="relative flex min-h-full w-full flex-col items-center justify-center py-10">
        <div className="relative flex w-full max-w-3xl flex-col items-center text-center">
          <div className="relative inline-block">
            <span
              className="animate-fade-in-up mb-2 ml-[20%] block text-left text-xs font-bold uppercase tracking-[0.45em] opacity-50"
              style={{ animationDelay: '0.1s' }}
            >
              I am
            </span>
            <h1 className="animate-fade-in-up relative block" style={{ animationDelay: '0.2s' }}>
              <span className="block text-[calc(1.825rem+6.9vw)] font-bold leading-[0.85] tracking-tighter whitespace-nowrap">
                Dede Ard
              </span>
            </h1>
          </div>

          <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <div className="mt-6 flex items-center justify-center gap-3 text-[11px] font-bold uppercase tracking-[0.25em] opacity-70 md:gap-4 md:text-xs">
              <span aria-hidden className="hidden h-px w-6 bg-current opacity-30 sm:block md:w-10" />
              <span>Pixel-Perfect Prompter</span>
              <span aria-hidden className="h-3 w-px bg-current opacity-30" />
              <span>Full-Stack Web Dev</span>
              <span aria-hidden className="hidden h-px w-6 bg-current opacity-30 sm:block md:w-10" />
            </div>
          </div>

          <p
            className="animate-fade-in-up mt-7 max-w-xl text-base font-normal leading-8 text-black/95 [font-family:ui-sans-serif,system-ui,sans-serif] md:text-lg dark:text-white/75"
            style={{ animationDelay: '0.4s' }}
          >
            {SITE_NAME}, also known as {SITE_ALIAS}, builds pixel-perfect web interfaces, practical backend systems, and AI-assisted
            workflows for real products.
          </p>

          <div className="animate-fade-in-up mt-6 w-full" style={{ animationDelay: '0.5s' }}>
            <div className="w-full opacity-80">
              <CurvedLoop marqueeText={skillsMarquee} speed={0.6} curveAmount={90} />
            </div>
          </div>

          <div className="animate-fade-in-up mt-10 flex items-center gap-4" style={{ animationDelay: '0.6s' }}>
            {socialLinks.map(({ href, label, Icon, rel }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel={rel}
                className="cursor-target p-3 text-black/40 transition-colors duration-300 hover:text-black dark:text-white/40 dark:hover:text-white"
              >
                <Icon size={20} />
              </a>
            ))}
          </div>

          <span className="animate-fade-in fixed left-1/2 top-[10%] z-50 inline-flex -translate-x-1/2 items-center gap-2.5 rounded-full border border-black/10 bg-white/40 py-2 pl-3 pr-4 text-[11px] font-bold uppercase tracking-[0.2em] text-black/70 backdrop-blur-md dark:border-white/10 dark:bg-white/5 dark:text-white/70">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Available for work
          </span>
        </div>
      </div>
    </>
  )
}
