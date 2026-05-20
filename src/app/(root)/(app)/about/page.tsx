import dedeard from '@/assets/dedeard.jpg'
import { RESUME_URL } from '@/constans/common'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import PageTitle from '../components/PageTitle'

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

export default function AboutPage() {
  return (
    <>
      <PageTitle title="About" />
      <div className="md:flex">
        <div className="mb-5 md:w-56">
          <Image src={dedeard} alt="Foto dede ariansya" className="block w-full" placeholder="blur" />
        </div>
        <div className="md:flex-1 md:pl-6">
          <h2 className="mb-2 text-xl font-bold">I’m Dede Ariansya</h2>
          <div className="mb-6">
            <p className="mb-1">
              Pixel-perfect prompter and full-stack web developer based in Makassar, Indonesia. <br />I build polished interfaces, practical
              backends, and AI-assisted workflows while keeping code easy to read and understand.
            </p>
          </div>
          <h2 className="mb-2 text-xl font-bold">Saya Dede Ariansya</h2>
          <div className="mb-6">
            <p className="mb-1">
              Pixel-perfect prompter dan full-stack web developer berbasis di Makassar, Indonesia.
              <br />
              Saya membangun interface yang rapi, backend yang praktis, dan workflow berbantuan AI sambil tetap menjaga kode mudah dibaca.
            </p>
          </div>
          <h2 className="mb-2 text-xl font-bold">Skills from my GitHub work</h2>
          <div className="mb-6">
            <p className="mb-1">
              Frontend: Next.js, React, TypeScript, Tailwind CSS, MDX, Vite, Alpine.js.
              <br />
              Backend: Node.js, NestJS, Express.js, Laravel, Firebase, MongoDB, MySQL.
              <br />
              Cloud & workflow: AWS Lambda, API Gateway, serverless HTTP, Docker, SEO metadata, AI prompting, and content systems.
            </p>
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
