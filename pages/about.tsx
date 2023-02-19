import Head from 'next/head'
import Link from 'next/link'
import { ABOUT_PAGE } from '@/constans/pages'

const AboutPage = () => {
  return (
    <>
      <Head>
        <title>{ABOUT_PAGE.title}</title>
        <meta name="description" content={ABOUT_PAGE.description} />
        <meta name="og:title" content={ABOUT_PAGE.title} />
        <meta name="og:description" content={ABOUT_PAGE.description} />
        <link rel="canonical" href={process.env.NEXT_PUBLIC_HOST + ABOUT_PAGE.path} />
      </Head>
      <h1 className="page-title" data-text={ABOUT_PAGE.h1}>
        {ABOUT_PAGE.h1}
      </h1>
      <div className="md:flex">
        <div className="mb-5 md:w-56">
          <img src={ABOUT_PAGE.body.image.url} alt={ABOUT_PAGE.body.image.alt} className="block w-full" />
        </div>
        <div className="md:flex-1 md:pl-6">
          <h5 className="mb-2 text-xl font-bold">I’m Dede Ardiansya</h5>
          <div className="mb-6">
            <p className="mb-1">
              Junior Web developer based in Makassar, Indonesia. <br />I try my best to make the code I write easy to read and understand.
            </p>
          </div>
          <h5 className="mb-2 text-xl font-bold">Saya Dede Ardiansya</h5>
          <div className="mb-6">
            <p className="mb-1">
              Pengembang web junior yang berbasis di Makassar, Indonesia.
              <br />
              Saya mencoba yang terbaik untuk membuat kode yang saya tulis mudah untuk dibaca dan dipahami.
            </p>
          </div>
          <h5 className="mb-2 text-xl font-bold">Tech i love</h5>
          <div className="mb-6">
            <p className="mb-1">TypeScript, Express.js, Laravel, Tailwind, Bootstrap, Vue and React.</p>
          </div>
          {ABOUT_PAGE.body.resume_url && (
            <a
              download
              target="_blank"
              rel="nofollow"
              href={ABOUT_PAGE.body.resume_url}
              className="mr-3 inline-block bg-white px-5 py-3 hover:bg-black hover:text-white dark:bg-black dark:hover:bg-white dark:hover:text-black"
            >
              Resume
            </a>
          )}
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

export default AboutPage
