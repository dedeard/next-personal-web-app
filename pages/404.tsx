import Head from 'next/head'

export default function Error404() {
  return (
    <>
      <Head>
        <title>404 - Page Not Found</title>
      </Head>
      <div className="flex min-h-full">
        <h1 className="m-auto text-center">
          <span className="block text-9xl font-bold">404</span>
          <span className="block text-xl uppercase tracking-widest">Page Not Found</span>
        </h1>
      </div>
    </>
  )
}
