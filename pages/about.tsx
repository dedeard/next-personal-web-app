import { useEffect } from 'react'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Empty from '@/components/Empty'
import { useImage } from '@/contexts/ImageContext'
import { IAboutPage } from '@/types'

const AboutPage = ({ head, body }: PropsType) => {
  const { setImages } = useImage()

  useEffect(() => {
    setImages([body.image.url])
  }, [])

  return (
    <>
      <Head>
        <title>{head.title}</title>
        <meta name="description" content={head.description} />
        <link rel="canonical" href={process.env.NEXT_PUBLIC_HOST + '/about'} />
      </Head>

      <h1 className="page-title">
        {body.title}
        <span>{body.title}</span>
      </h1>
      <div className="md:flex">
        <div className="mb-5 md:w-56">
          <Link href={'/about?img=' + body.image.url} shallow rel="nofollow">
            <img id={body.image.url} src={body.image.sm_url} alt={body.image.alt} className="block w-full" />
          </Link>
        </div>
        <div className="md:flex-1 md:pl-6">
          {Object.keys(body.contents).map((key) => (
            <Empty key={key}>
              <h5 className="mb-2 text-xl font-bold">{body.contents[key].title}</h5>
              <div className="mb-6">
                <p className="mb-1" dangerouslySetInnerHTML={{ __html: body.contents[key].text }} />
              </div>
            </Empty>
          ))}
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

type PropsType = IAboutPage & {
  title: string
}

export const getServerSideProps: GetServerSideProps<PropsType> = async () => {
  const data: IAboutPage = await fetch(process.env.NEXT_PUBLIC_FB_DATABASE_URL + '/about.json').then((res) => res.json())
  return {
    props: {
      ...data,
      title: data?.body?.title || '',
    },
  }
}

export default AboutPage
