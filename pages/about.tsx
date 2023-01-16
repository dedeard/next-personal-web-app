import { useEffect } from 'react'
import Head from 'next/head'
import { useImage } from '../contexts/ImageContext'
import Link from 'next/link'
import Empty from '../components/Empty'
import { GetServerSideProps } from 'next'
import { IAboutPage, IDataBackground } from '../types'
import { fakeAboutPageProps, fakeGlobalPageProps } from '@/fakeProps'

const AboutPage = ({ head, body }: PropsType) => {
  const imagectx = useImage()
  useEffect(() => {
    imagectx.set([body.image.url])
  }, [body])

  return (
    <>
      <Head>
        <title>{head.title}</title>
        <meta name="description" content={head.description} />
      </Head>

      <h1 className="page-title">
        {body.title}
        <span>{body.title}</span>
      </h1>
      <div className="md:flex">
        <div className="mb-5 md:w-56">
          <Link href={'/about?img=' + body.image.url}>
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
  background: IDataBackground
  title: string
}

export const getServerSideProps: GetServerSideProps<PropsType> = async (context) => {
  return {
    props: {
      ...fakeAboutPageProps,
      background: fakeGlobalPageProps.body.background,
      title: 'About',
    },
  }
}

export default AboutPage
