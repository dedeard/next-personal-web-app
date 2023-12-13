import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import dedeard from '@/assets/dedeard.jpg'
import { RESUME_URL } from '@/constans/common'
import PageTitle from '../components/PageTitle'

export const metadata: Metadata = {
  title: 'About - Dede Ariansya',
  openGraph: {
    title: 'About - Dede Ariansya',
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
          <h2 className="mb-2 text-xl font-bold">I’m Dede Ardiansya</h2>
          <div className="mb-6">
            <p className="mb-1">
              Full Stack Web Developer based in Makassar, Indonesia. <br />I try my best to make the code I write easy to read and
              understand.
            </p>
          </div>
          <h2 className="mb-2 text-xl font-bold">Saya Dede Ardiansya</h2>
          <div className="mb-6">
            <p className="mb-1">
              Full Stack Web Developer berbasis di Makassar, Indonesia.
              <br />
              Saya mencoba yang terbaik untuk membuat kode yang saya tulis mudah untuk dibaca dan dipahami.
            </p>
          </div>
          <h2 className="mb-2 text-xl font-bold">Tech i love</h2>
          <div className="mb-6">
            <p className="mb-1">TypeScript, Express.js, Laravel, Tailwind, Bootstrap, Vue and React.</p>
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
