import dedeard from '@/assets/dedeard.jpg'
import { RESUME_URL } from '@/constans/common'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import PageTitle from '../components/PageTitle'

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

const skills = [
  { label: 'Programming Languages', items: 'JavaScript, TypeScript, PHP, Java' },
  {
    label: 'Frontend Technologies',
    items: 'React, Next.js, Vue/Nuxt.js, Tailwind CSS, Zustand, Styled Components, Turborepo, webpack',
  },
  {
    label: 'AI & 3D',
    items: 'tldraw, Reaflow, React Three Fiber, Three.js, WebGPU, streaming AI chat, multi-provider AI integration (RunPod, OpenRouter)',
  },
  { label: 'Backend Technologies', items: 'Node.js, Express.js, NestJS, Laravel, Spring, Firebase, Supabase' },
  { label: 'DevOps & Cloud Platforms', items: 'AWS (Lambda, SNS, SQS, S3, EC2), Google Cloud, Serverless' },
  { label: 'Databases', items: 'PostgreSQL, MySQL, MongoDB' },
  { label: 'Tools', items: 'Git, Docker' },
]

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

export default function AboutPage() {
  return (
    <>
      <PageTitle title="About" />
      <div className="md:flex">
        <div className="mb-5 md:w-56">
          <Image src={dedeard} alt="Dede Ariansya, also known as Dede Ard" className="block w-full" placeholder="blur" />
        </div>
        <div className="md:flex-1 md:pl-6">
          <h2 className="mb-2 text-xl font-bold">I’m Dede Ariansya</h2>
          <div className="mb-6">
            <p className="mb-1">
              I also go by Dede Ard. I’m a full-stack web developer based in Makassar, Indonesia, with experience building web products end
              to end, most recently AI-powered platforms with real-time job tracking, visual workflow editors and 3D previews. <br />
              Strongest in React, Next.js, TypeScript and NestJS, with serverless AWS and microservices experience on the backend.
            </p>
          </div>
          <h2 className="mb-2 text-xl font-bold">Saya Dede Ariansya</h2>
          <div className="mb-6">
            <p className="mb-1">
              Full-stack web developer berbasis di Makassar, Indonesia, yang membangun produk web dari awal sampai akhir, terakhir platform
              berbasis AI dengan real-time job tracking, visual workflow editor, dan preview 3D.
              <br />
              Paling kuat di React, Next.js, TypeScript, dan NestJS, dengan pengalaman serverless AWS dan microservices di sisi backend.
            </p>
          </div>
          <h2 className="mb-2 text-xl font-bold">Skills</h2>
          <div className="mb-6">
            <ul className="list-disc pl-5 leading-7">
              {skills.map(({ label, items }) => (
                <li key={label}>
                  <span className="font-bold">{label}</span>: {items}
                </li>
              ))}
            </ul>
          </div>
          <h2 className="mb-2 text-xl font-bold">Experience</h2>
          <div className="mb-6">
            {experiences.map(({ role, company, period, points }) => (
              <div key={company} className="mb-5">
                <h3 className="font-bold">
                  {role} · {company}
                </h3>
                <p className="mb-1 text-sm opacity-70">{period}</p>
                <ul className="list-disc pl-5 text-sm leading-6 opacity-90">
                  {points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <h2 className="mb-2 text-xl font-bold">Open Source</h2>
          <div className="mb-6">
            <ul className="list-disc pl-5 text-sm leading-6 opacity-90">
              {openSource.map(({ name, url, description }) => (
                <li key={name}>
                  <a href={url} target="_blank" rel="noopener" className="font-bold hover:text-yellow-600">
                    {name}
                  </a>
                  : {description}
                </li>
              ))}
            </ul>
          </div>
          <h2 className="mb-2 text-xl font-bold">Education</h2>
          <div className="mb-6">
            <p className="mb-1">
              Bachelor of Science in Informatics Engineering, Dipa University
              <br />
              <span className="text-sm opacity-70">Mar 2017 – Mar 2023</span>
            </p>
          </div>
          <h2 className="mb-2 text-xl font-bold">Languages</h2>
          <div className="mb-6">
            <p className="mb-1">English (Professional), Indonesian (Native)</p>
          </div>
          <a
            download
            target="_blank"
            rel="nofollow"
            href={RESUME_URL}
            className="mr-3 inline-block bg-white px-5 py-3 hover:bg-black hover:text-white dark:bg-black dark:hover:bg-white dark:hover:text-black"
          >
            Resume
          </a>
          <Link
            href="/contact"
            rel="nofollow"
            className="inline-block bg-white px-5 py-3 hover:bg-black hover:text-white dark:bg-black dark:hover:bg-white dark:hover:text-black"
          >
            Contact me
          </Link>
        </div>
      </div>
    </>
  )
}
