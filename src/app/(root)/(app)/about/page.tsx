import { RESUME_URL } from '@/constants/common'
import { SKILL_GROUPS } from '@/constants/skills'
import type { Metadata } from 'next'
import Link from 'next/link'
import { FiArrowUpRight, FiDownload, FiMapPin } from 'react-icons/fi'
import PageTitle from '../components/PageTitle'
import TiltImage from './components/TiltImage'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Learn more about Dede Ariansya, a full-stack web developer based in Makassar, Indonesia, building AI-powered platforms, SaaS products, and serverless systems.',
  openGraph: {
    title: 'About Dede Ariansya',
    description:
      'Learn more about Dede Ariansya, a full-stack web developer based in Makassar, Indonesia, building AI-powered platforms, SaaS products, and serverless systems.',
    url: '/about',
  },
  alternates: {
    canonical: '/about',
  },
}

const experiences = [
  {
    role: 'Founder & Full Stack Developer',
    company: 'Cirsqu (startup)',
    period: 'Jan 2023 – Present',
    points: [
      'Built Cirsqu, a multi-tenant SaaS applicant tracking system made of four connected apps: a NestJS microservices backend, a recruiter dashboard, a candidate career site, and an interview scheduling app.',
      'Designed the backend as a NestJS monorepo of 14 domain services (jobs, applications, candidates, interviews, workspaces, notifications, analytics and more) on MongoDB, deployed as AWS Lambdas with CDK, using S3 for uploads and SES, SQS and SNS for email and notifications.',
      'Implemented authentication with two Amazon Cognito user pools (workspace members and candidates) and Lambda authorizers, with every member request scoped to its workspace.',
      'Built the recruiter dashboard with Vite, React, TanStack Query and Tailwind for managing jobs, the hiring pipeline, candidates, interviews and teams.',
      'Built the public candidate career site with Next.js, offering per-workspace career pages, job search and online applications.',
      'Built an interview scheduling app with TanStack Start where candidates confirm, decline or reschedule time slots through a magic link, without signing in.',
    ],
  },
  {
    role: 'Freelance Frontend Developer',
    company: 'assethub.io',
    period: 'Apr 2026 – Jul 2026',
    points: [
      'Built the frontend of an AI-powered 3D asset creation platform using Next.js 16, React 19, TypeScript, and Tailwind CSS in a Turborepo monorepo.',
      'Developed a node-based visual workflow editor with tldraw, letting users compose AI pipelines for image generation, image-to-mesh, texturing, and more.',
      'Implemented interactive 3D asset preview and texture editors using React Three Fiber, Three.js, and WebGPU.',
      'Built real-time generation progress and job tracking by integrating Supabase Realtime and Trigger.dev for long-running GPU jobs.',
      'Integrated multiple AI providers for mesh and image generation (RunPod, OpenRouter), with provider fallback for improved reliability.',
      'Managed complex client-side state with Zustand following a feature-based architecture.',
    ],
  },
  {
    role: 'Frontend Developer',
    company: 'chi.app',
    period: 'Mar 2025 – Feb 2026',
    points: [
      'Spearheaded the development of a dynamic and responsive user interface for the Swarm project using Next.js, React, and Tailwind CSS.',
      'Developed the backend infrastructure using NestJS and PostgreSQL to create a robust and scalable API.',
      'Integrated Supabase for secure user authentication and data management.',
      'Implemented a real-time, streaming AI chat interface for seamless interaction with AI agents.',
      'Engineered robust and reusable components for managing AI agents, tools, and companies, incorporating features like filtering, sorting, and pagination.',
      'Developed and integrated a visual workflow editor using Reaflow, enabling users to create and manage complex agent workflows.',
    ],
  },
  {
    role: 'Full Stack Web Developer',
    company: 'Jobseeker.company',
    period: 'Jan 2024 – Mar 2025',
    points: [
      'Developed a single-page application (SPA) HRMS dashboard using React Router DOM, providing core HR features like employee management, payroll, and attendance tracking.',
      'Built a customizable career site for enterprise clients using Next.js, fully integrated with the HRMS for seamless job posting and recruitment management.',
      'Designed and implemented serverless back-end services with Lambda, SNS, SQS, and S3 to manage tasks like PDF, image, and video processing, ensuring efficient asynchronous workflows and real-time notifications.',
      'Utilized Java Spring, Node.js (TypeScript), and MongoDB for scalable data management and API development within a microservices architecture.',
      'Delivered tailored solutions for enterprise clients, allowing full customization of the HRMS platform and career site based on their needs.',
    ],
  },
  {
    role: 'Full Stack Web Developer',
    company: 'Ajarbelajar',
    period: 'Mar 2020 – Sep 2020',
    points: [
      'Efficiently developed a REST API using Laravel framework, ensuring seamless integration and optimal performance.',
      'Designed and implemented front-end using Nuxt.js, delivering an engaging user experience through efficient code and innovative design.',
      'Crafted an admin dashboard utilizing AdminLTE framework, enhancing user management and data visualization with responsive design and interactive elements.',
      'Deployed the REST API on AWS EC2, ensuring seamless connectivity and efficient functionality for users.',
      'Used Google Cloud Storage to store videos.',
    ],
  },
]

const openSource = [
  {
    name: 'next-personal-web-app',
    url: 'https://github.com/dedeard/next-personal-web-app',
    description: 'Next.js and Tailwind CSS portfolio website template, hand-coded before AI tools, 62 stars on GitHub.',
  },
  {
    name: 'microservices-using-express',
    url: 'https://github.com/dedeard/microservices-using-express',
    description:
      'Microservices example with Express, MongoDB, Redis, Docker and React in TypeScript, hand-coded before AI tools, 19 stars.',
  },
  {
    name: 'social-app-backend',
    url: 'https://github.com/dedeard/social-app-backend',
    description: 'NestJS REST API with JWT authentication, MySQL, Docker, CI/CD and background job processing, hand-coded before AI tools.',
  },
]

const sectionClass = 'animate-fade-in-up mt-8 border-t border-black/10 pt-6 dark:border-white/10'
const headingClass = 'mb-4 text-sm font-bold uppercase tracking-[0.18em] text-black/50 dark:text-white/50'

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
            I also go by <span className="font-bold text-black dark:text-white">Dede Ard</span> — a full-stack web developer building web
            products end to end, most recently AI-powered platforms with real-time job tracking, visual workflow editors and 3D previews.
            Strongest in React, Next.js, TypeScript and NestJS, with serverless AWS and microservices experience on the backend.
          </p>

          <div className={sectionClass} style={{ animationDelay: '0.3s' }}>
            <h2 className="mb-2 flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-black/50 dark:text-white/50">
              <span className="rounded border border-black/15 px-1.5 py-0.5 text-[10px] dark:border-white/20">ID</span>
              Tentang Saya
            </h2>
            <p className="max-w-2xl leading-7 text-black/70 dark:text-white/70">
              Full-stack web developer berbasis di Makassar, Indonesia, yang membangun produk web dari awal sampai akhir, terakhir platform
              berbasis AI dengan real-time job tracking, visual workflow editor, dan preview 3D. Paling kuat di React, Next.js, TypeScript,
              dan NestJS, dengan pengalaman serverless AWS dan microservices di sisi backend.
            </p>
          </div>

          <div className={sectionClass} style={{ animationDelay: '0.35s' }}>
            <h2 className={headingClass}>Skills</h2>
            <div className="space-y-4">
              {SKILL_GROUPS.map(({ label, items }) => (
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

          <div className={sectionClass} style={{ animationDelay: '0.4s' }}>
            <h2 className={headingClass}>Experience</h2>
            <div className="space-y-8">
              {experiences.map(({ role, company, period, points }) => (
                <div key={company}>
                  <div className="sm:flex sm:items-baseline sm:justify-between sm:gap-4">
                    <h3 className="font-bold">
                      {role} <span className="font-normal text-black/60 dark:text-white/60">· {company}</span>
                    </h3>
                    <span className="block shrink-0 text-xs font-bold uppercase tracking-wider text-black/40 dark:text-white/40">
                      {period}
                    </span>
                  </div>
                  <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-6 text-black/70 marker:text-black/30 dark:text-white/70 dark:marker:text-white/30">
                    {points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className={sectionClass} style={{ animationDelay: '0.45s' }}>
            <h2 className={headingClass}>Open Source</h2>
            <ul className="space-y-3">
              {openSource.map(({ name, url, description }) => (
                <li key={name} className="text-sm leading-6 text-black/70 dark:text-white/70">
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener"
                    className="cursor-target group inline-flex items-center gap-1 font-bold text-black transition-colors hover:text-black/60 dark:text-white dark:hover:text-white/60"
                  >
                    {name}
                    <FiArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                  <span className="block">{description}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={`${sectionClass} sm:flex sm:gap-10`} style={{ animationDelay: '0.5s' }}>
            <div className="sm:flex-1">
              <h2 className={headingClass}>Education</h2>
              <p className="font-bold">Bachelor of Science in Informatics Engineering</p>
              <p className="text-sm leading-6 text-black/70 dark:text-white/70">Dipa University, Indonesia</p>
              <p className="mt-1 text-xs font-bold uppercase tracking-wider text-black/40 dark:text-white/40">Mar 2017 – Mar 2023</p>
            </div>
            <div className="mt-8 sm:mt-0 sm:w-48 sm:shrink-0">
              <h2 className={headingClass}>Languages</h2>
              <p className="text-sm leading-6 text-black/70 dark:text-white/70">
                English (Professional)
                <br />
                Indonesian (Native)
              </p>
            </div>
          </div>

          <div className="animate-fade-in-up mt-10 flex flex-wrap gap-3" style={{ animationDelay: '0.55s' }}>
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
