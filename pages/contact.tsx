import React, { useEffect } from 'react'
import Head from 'next/head'
import { IContactPage, IDataBackground } from '@/types'
import { GetServerSideProps } from 'next'
import { fakeContactPageProps, fakeGlobalPageProps } from '@/fakeProps'
import ContactForm from '@/components/ContactForm'

const ContactPage = ({ head, body }: PropsType) => {
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
      <div className="flex flex-col lg:flex-row">
        <div className=" mb-4 w-full text-center lg:w-[380px] lg:text-left">
          {Object.keys(body.contents).map((key) => (
            <div key={key} className="mb-8">
              <h5 className="mb-3 text-lg font-bold">{body.contents[key].title}</h5>
              <p className="text-sm leading-5" dangerouslySetInnerHTML={{ __html: body.contents[key].text }} />
            </div>
          ))}
        </div>

        <div className="lg:flex-1">
          <ContactForm formspreeKey={body.formspree_key} />
        </div>
      </div>
    </>
  )
}

type PropsType = IContactPage & {
  background: IDataBackground
  title: string
}

export const getServerSideProps: GetServerSideProps<PropsType> = async (context) => {
  return {
    props: {
      ...fakeContactPageProps,
      background: fakeGlobalPageProps.body.background,
      title: 'Contact',
    },
  }
}

export default ContactPage
