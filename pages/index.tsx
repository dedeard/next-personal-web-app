import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { IHomePage } from '@/types'

const HomePage = ({ head, body }: PropsType) => {
  return (
    <>
      <Head>
        <title>{head.title}</title>
        <meta name="description" content={head.description} />
        <link rel="canonical" href={process.env.NEXT_PUBLIC_HOST} />
      </Head>
      <div className="relative flex min-h-full w-full flex-col items-center justify-center">
        <div className="relative flex items-center justify-center py-3">
          <p className="relative flex-1">
            <span className="grid grid-cols-2">
              <span className="block text-center text-sm opacity-90" dangerouslySetInnerHTML={{ __html: body.contents.P1 }} />
            </span>
            <span
              className=" z-10 block text-[calc(1.825rem+6.9vw)] font-bold leading-none"
              dangerouslySetInnerHTML={{ __html: body.contents.P2 }}
            />
            <span className="grid grid-cols-2 justify-items-end">
              <span className="block"></span>
              <span className="block text-sm opacity-90" dangerouslySetInnerHTML={{ __html: body.contents.P3 }} />
            </span>
          </p>
          <div className="absolute -bottom-1/4 mx-auto flex">
            {Object.keys(body.socials).map((key) => (
              <a
                key={key}
                href={body.socials[key]}
                target="_blank"
                rel="nofollow"
                className="mx-2 block p-2 text-sm opacity-80 hover:opacity-95"
              >
                {key}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

type PropsType = IHomePage & {
  title: string
}

export const getServerSideProps: GetServerSideProps<PropsType> = async () => {
  const data: IHomePage = await fetch(process.env.NEXT_PUBLIC_FB_DATABASE_URL + '/home.json').then((res) => res.json())
  return {
    props: {
      ...data,
      title: '',
    },
  }
}

export default HomePage
