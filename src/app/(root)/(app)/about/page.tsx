import { RESUME_URL } from '@/constans/common'
import type { Metadata } from 'next'
import Link from 'next/link'
import { FiArrowUpRight, FiDownload, FiMapPin } from 'react-icons/fi'
import PageTitle from '../components/PageTitle'
import TiltImage from './components/TiltImage'

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn more about Dede Ariansya, a pixel-perfect prompter and full-stack web developer based in Makassar, Indonesia.',
  openGraph: {
    title: 'About Dede Ariansya',
    description: 'Learn more about Dede Ariansya, a pixel-perfect prompter and full-stack web developer based in Makassar, Indonesia.',
    url: '/about',
  },
  alternates: {
    canonical: '/about',
  },
}

const skillGroups = [
  { label: 'Frontend', items: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'MDX', 'Vite'] },
  { label: 'Backend', items: ['Node.js', 'NestJS', 'Express', 'Laravel', 'Firebase', 'MongoDB', 'MySQL'] },
  { label: 'Cloud & DevOps', items: ['AWS', 'Serverless', 'Docker', 'REST APIs'] },
  { label: 'Workflow', items: ['AI Prompting', 'SEO', 'Git'] },
]

export default function AboutPage() {
  return (
    <>
      <PageTitle title="About" />
      <div className="md:flex md:gap-10">
        <div className="animate-fade-in-up mb-8 md:mb-0 md:w-60 md:shrink-0" style={{ animationDelay: '0.1s' }}>
          <div className="md:sticky md:top-8">
            <TiltImage />
            <div className="mt-4 flex items-center gap-2 text-sm text-black/60 dark:text-white/60">
              <FiMapPin size={15} />
              <span>Makassar, Indonesia</span>
            </div>
            <div className="mt-2 flex items-center gap-2 text-sm text-black/60 dark:text-white/60">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span>Available for work</span>
            </div>
          </div>
        </div>

        <div className="md:flex-1">
          <p
            className="animate-fade-in-up text-xs font-bold uppercase tracking-[0.25em] text-black/40 dark:text-white/40"
            style={{ animationDelay: '0.15s' }}
          >
            Full-Stack Web Dev
          </p>
          <h1 className="animate-fade-in-up mt-2 text-3xl font-bold tracking-tight md:text-4xl" style={{ animationDelay: '0.2s' }}>
            Dede Ariansya
          </h1>
          <p
            className="animate-fade-in-up mt-4 max-w-2xl text-lg leading-8 text-black/80 dark:text-white/80"
            style={{ animationDelay: '0.25s' }}
          >
            I also go by <span className="font-bold text-black dark:text-white">Dede Ard</span> — a pixel-perfect prompter and full-stack
            web developer. I build polished interfaces, practical backends, and AI-assisted workflows while keeping code easy to read and
            understand.
          </p>

          <div className="animate-fade-in-up mt-8 border-t border-black/10 pt-6 dark:border-white/10" style={{ animationDelay: '0.3s' }}>
            <h2 className="mb-2 flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-black/50 dark:text-white/50">
              <span className="rounded border border-black/15 px-1.5 py-0.5 text-[10px] dark:border-white/20">ID</span>
              Tentang Saya
            </h2>
            <p className="max-w-2xl leading-7 text-black/70 dark:text-white/70">
              Pixel-perfect prompter dan full-stack web developer berbasis di Makassar, Indonesia. Saya membangun interface yang rapi,
              backend yang praktis, dan workflow berbantuan AI sambil tetap menjaga kode mudah dibaca.
            </p>
          </div>

          <div className="animate-fade-in-up mt-8 border-t border-black/10 pt-6 dark:border-white/10" style={{ animationDelay: '0.35s' }}>
            <h2 className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-black/50 dark:text-white/50">Skills</h2>
            <div className="space-y-4">
              {skillGroups.map(({ label, items }) => (
                <div key={label} className="sm:flex sm:items-start sm:gap-4">
                  <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-black/40 sm:mb-0 sm:w-32 sm:shrink-0 sm:pt-1.5 dark:text-white/40">
                    {label}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {items.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-black/10 bg-black/3 px-3 py-1 text-sm text-black/80 dark:border-white/15 dark:bg-white/4 dark:text-white/80"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="animate-fade-in-up mt-10 flex flex-wrap gap-3" style={{ animationDelay: '0.4s' }}>
            <a
              download
              target="_blank"
              rel="nofollow"
              href={RESUME_URL}
              className="cursor-target group inline-flex items-center gap-2 bg-black px-6 py-3 font-bold text-white transition-colors hover:bg-black/80 dark:bg-white dark:text-black dark:hover:bg-white/80"
            >
              <FiDownload size={17} className="transition-transform group-hover:translate-y-0.5" />
              Resume
            </a>
            <Link
              href="/contact"
              rel="nofollow"
              className="cursor-target group inline-flex items-center gap-2 border border-black/15 px-6 py-3 font-bold transition-colors hover:bg-black hover:text-white dark:border-white/20 dark:hover:bg-white dark:hover:text-black"
            >
              Contact me
              <FiArrowUpRight size={17} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
