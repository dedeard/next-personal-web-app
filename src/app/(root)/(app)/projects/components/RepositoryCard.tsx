'use client'
import { memo } from 'react'
import langColors from '@/constans/langColors'
import LangBar from './LangBar'
import LangTextAnimation from './LangTextAnimation'
import { FiStar } from 'react-icons/fi'
import { IRepository } from '@/types'

const RepositoryCard: React.FC<{ repo: IRepository }> = ({ repo }) => {
  return (
    <div className="relative flex flex-col overflow-hidden bg-white/50 backdrop-blur dark:bg-black/80">
      <div className="flex-1 p-5">
        <a href={repo.html_url}>
          <h2 className="mb-1 items-center text-2xl font-bold capitalize">{repo.name.replaceAll('-', ' ')}</h2>
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
              className="mb-1 mr-1 inline-block border bg-gray-100/50 p-1 text-xs leading-none dark:border-gray-800 dark:bg-gray-900/50"
            >
              {topic}
            </li>
          ))}
        </ul>
        <div className="flex">
          <div className="flex-1">
            <LangTextAnimation items={repo.languages.map(({ name }) => name)} />
          </div>
          <span className="font-sm flex items-center font-bold">
            <span className="mr-1 mt-px block leading-none">{repo.stargazers_count}</span>
            <FiStar width="1em" className="block" />
          </span>
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

export default memo(RepositoryCard)
