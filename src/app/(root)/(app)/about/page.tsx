import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import dedeard from '@/assets/dedeard.jpg'
import { RESUME_URL } from '@/constans/common'
import PageTitle from '../components/PageTitle'

export const metadata: Metadata = {
  title: 'About - Ana Isa Nogueira',
  openGraph: {
    title: 'About - Ana Isa Nogueira',
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
          <h2 className="mb-2 text-xl font-bold">I’m Ana Isa Nogueira</h2>
          <div className="mb-6">
            <p className="mb-1">
              Full Stack Web Developer based in Sintra, Portugal. <br /> Passionate about animal care and equipped with diverse experience in sales, customer service, and administrative roles. Committed to continuous learning, expanded skills in languages, data analysis, graphic editing, and communication techniques. Currently expanding expertise in Web Design & Development using HTML5, CSS, JavaScript, React, Next.js, and MongoDB. Proficient in creating unique designs with a background in painting and photography. Embraces a personalized and innovative approach in problem-solving and client interaction.
            </p>
          </div>
          <h2 className="mb-2 text-xl font-bold">Education:</h2>
          <div className="mb-6">
            <p className="mb-4">
              Web Design & Development <br />
              Languages & Humanities <br />
              Veterinary Assistant
            </p>
            <h2 className="mb-2 text-lg font-bold">Experience:</h2>
            <p className="mb-4">
              Customer Support <br />
              Order Management <br />
              Administrative Tasks <br />
              Social Media/Website Management <br />
              Sales & Customer Service <br />
              Stock Management <br />
              Retail Store Operations
            </p>
            <h2 className="mb-2 text-lg font-bold">Skills:</h2>
            <p className="mb-4">
              Translation <br />
              Photography <br />
              Painting <br />
              Image Editing <br />
              Web Design <br />
              Website Creation <br />
              Microsoft Office <br />
              Copywriting
            </p>
            <h2 className="mb-2 text-lg font-bold">Languages:</h2>
            <p>
              Portuguese (Native) <br />
              English (Intermediate) <br />
              Spanish (Proficient)
            </p>
          </div>
          <h2 className="mb-2 text-xl font-bold">Tech i love</h2>
          <div className="mb-6">
            <p className="mb-1">TypeScript, Express.js, Tailwind, HTML5, CSS, JavaScript, React, Next.js, and MongoDB.</p>
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
