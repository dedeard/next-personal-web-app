import React from 'react'
import Head from 'next/head'
import ContactForm from '@/components/forms/ContactForm'
import { CONTACT_PAGE } from '@/constans/pages'
import { SOCIALS } from '@/constans/common'

const ContactPage = () => {
  return (
    <>
      <Head>
        <title>{CONTACT_PAGE.title}</title>
        <meta name="description" content={CONTACT_PAGE.description} />
        <meta name="og:title" content={CONTACT_PAGE.title} />
        <meta name="og:description" content={CONTACT_PAGE.description} />
        <meta name="og:url" content={process.env.NEXT_PUBLIC_HOST + CONTACT_PAGE.path} />
        <meta name="twitter:title" content={CONTACT_PAGE.title} />
        <meta name="twitter:description" content={CONTACT_PAGE.description} />
        <link rel="canonical" href={process.env.NEXT_PUBLIC_HOST + CONTACT_PAGE.path} />
      </Head>

      <h1 className="page-title" data-text={CONTACT_PAGE.h1}>
        {CONTACT_PAGE.h1}
      </h1>
      <div className="flex flex-col lg:flex-row">
        <div className="mb-4 w-full text-center lg:w-[480px] lg:text-left">
          <div className="mb-8">
            <h2 className="mb-3 text-lg font-bold">STREET ADDRESS</h2>
            <p className="text-sm leading-5">
              Royal Sentraland BTP Cluster Sunderland E05/01. <br />
              Maros, Sulawesi Selatan.
            </p>
          </div>
          <div className="mb-8">
            <h2 className="mb-3 text-lg font-bold">EMAIL ADDRESS</h2>
            <p className="text-sm leading-5">
              <a href="mailto:me@dedeard.my.id" rel="noopener" className="hover:text-yellow-600">
                me@dedeard.my.id
              </a>
              <br />
              <a href="mailto:dedeariansya1@gmail.com" rel="noopener" className="hover:text-yellow-600">
                dedeariansya1@gmail.com
              </a>
            </p>
          </div>
          <div className="mb-8">
            <h2 className="mb-3 text-lg font-bold">MOBILE PHONE</h2>
            <p className="text-sm leading-5">
              <span>Call: </span>
              <a href="tel:+6281343912883" target="_blank" rel="noopener" className="hover:text-yellow-600">
                +62 813-4391-2883
              </a>
              <br />
              <span>WhatsApp: </span>
              <a href={SOCIALS.WA} target="_blank" rel="noopener" className="hover:text-yellow-600">
                +62 813-4391-2883
              </a>
            </p>
          </div>
        </div>
        <div className="lg:flex-1">
          <ContactForm formspreeKey={CONTACT_PAGE.body.formspree_key} />
        </div>
      </div>
    </>
  )
}

export default ContactPage
