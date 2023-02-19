import React from 'react'
import Head from 'next/head'
import { GetServerSideProps } from 'next'
import { IRepository } from '@/types'
import langColors from '@/constans/langColors'
import LangBar from '@/components/animations/LangBar'
import LangTextAnimation from '@/components/animations/LangTextAnimation'
import { StarIcon } from '@/components/icons/Feather'
import { PROJECTS_PAGE } from '@/constans/pages'

const RepositoryCard = ({ repo }: { repo: IRepository }) => {
  return (
    <div className="relative flex flex-col overflow-hidden bg-white/50 dark:bg-black/80">
      <div className="flex-1 p-5">
        <a href={repo.html_url}>
          <h3 className="mb-1 items-center text-2xl font-bold capitalize">{repo.name.replaceAll('-', ' ')}</h3>
        </a>
        <div className="block h-10 text-xs font-bold">
          <span className="opacity-80">{'Updated ' + repo.last_commit_at}.</span>
          <br />
          {repo.homepage && (
            <a href={repo.homepage} rel="noopener" className="hover:text-yellow-600">
              {new URL(repo.homepage).host}
            </a>
          )}
        </div>
        <p className="opacity-80 md:line-clamp-3">{repo.description}</p>
      </div>
      <div className="mb-2 px-5">
        <ul className="mb-2 block truncate">
          {repo.topics.map((topic) => (
            <li
              key={topic}
              className="mr-1 mb-1 inline-block border bg-gray-100/50 p-1 text-xs leading-none dark:border-gray-800 dark:bg-gray-900/50"
            >
              {topic}
            </li>
          ))}
        </ul>
        <div className="flex">
          <div className="flex-1">
            <LangTextAnimation items={repo.languages.map(({ name }) => name)} />
          </div>
          <a href={repo.stargazers_url} rel="noopener" className="font-sm flex items-center font-bold hover:text-yellow-600">
            <span className="mr-1 mt-px block leading-none">{repo.stargazers_count}</span>
            <StarIcon width="1em" className="block" />
          </a>
        </div>
      </div>
      <div className="flex h-2 w-full bg-white dark:bg-black">
        {repo.languages.map((el) => (
          <LangBar key={el.name} className="h-full bg-black dark:bg-white" size={el.size} color={langColors[el.name]} />
        ))}
      </div>
    </div>
  )
}

const ContactPage = ({ repositories }: { repositories: IRepository[] }) => {
  return (
    <>
      <Head>
        <title>{PROJECTS_PAGE.title}</title>
        <meta name="description" content={PROJECTS_PAGE.description} />
        <meta name="og:title" content={PROJECTS_PAGE.title} />
        <meta name="og:description" content={PROJECTS_PAGE.description} />
        <link rel="canonical" href={process.env.NEXT_PUBLIC_HOST + PROJECTS_PAGE.path} />
      </Head>
      <h1 className="page-title" data-text={PROJECTS_PAGE.h1}>
        {PROJECTS_PAGE.h1}
      </h1>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {repositories.map((repo, i) => (
          <RepositoryCard key={i} repo={repo} />
        ))}
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps<{ repositories: IRepository[] }> = async () => {
  const repositories = await fetch(process.env.NEXT_PUBLIC_HOST + '/api/repositories').then((res) => res.json())
  return {
    props: {
      repositories,
    },
  }
}

export default ContactPage
