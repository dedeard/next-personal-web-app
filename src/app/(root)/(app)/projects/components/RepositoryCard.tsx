'use client'
import langColors from '@/constants/langColors'
import { IRepository } from '@/types'
import { memo } from 'react'
import { FiArrowUpRight, FiGlobe, FiStar } from 'react-icons/fi'
import LangBar from './LangBar'
import LangTextAnimation from './LangTextAnimation'

const RepositoryCard: React.FC<{ repo: IRepository; index?: number }> = ({ repo, index = 0 }) => {
  return (
    <div
      style={{ animationDelay: `${0.06 * index + 0.1}s` }}
      className="cursor-target animate-fade-in-up group relative flex flex-col overflow-hidden border border-black/10 bg-white/50 backdrop-blur-sm transition-colors duration-300 hover:bg-white/70 dark:border-white/10 dark:bg-black/60 dark:hover:bg-black/80"
    >
      <div className="flex flex-1 flex-col p-5">
        <a href={repo.html_url} target="_blank" rel="noopener" className="flex items-start justify-between gap-3">
          <h2 className="text-xl font-bold capitalize leading-tight transition-transform duration-300 group-hover:translate-x-0.5 md:text-2xl">
            {repo.name.replaceAll('-', ' ')}
          </h2>
          <FiArrowUpRight
            size={20}
            className="mt-1 shrink-0 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
          />
        </a>

        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-bold text-black/50 dark:text-white/50">
          <span>Updated {repo.last_commit_relative}</span>
          {repo.homepage && (
            <a
              href={repo.homepage}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-1 transition-colors hover:text-black dark:hover:text-white"
            >
              <FiGlobe size={12} />
              {new URL(repo.homepage).host}
            </a>
          )}
        </div>

        <p className="mt-3 text-sm leading-6 text-black/70 md:line-clamp-3 dark:text-white/70">{repo.description}</p>

        {repo.topics.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-1.5">
            {repo.topics.slice(0, 6).map((topic) => (
              <li
                key={topic}
                className="rounded-full border border-black/10 bg-black/3 px-2.5 py-0.5 text-[11px] font-medium text-black/70 dark:border-white/15 dark:bg-white/5 dark:text-white/70"
              >
                {topic}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="flex items-center justify-between px-5 pb-3 pt-2">
        <LangTextAnimation items={repo.languages.map(({ name }) => name)} />
        <span className="flex items-center gap-1 text-sm font-bold">
          <span className="leading-none">{repo.stargazers_count}</span>
          <FiStar size={14} />
        </span>
      </div>

      <div className="flex h-1.5 w-full bg-black/5 dark:bg-white/10">
        {repo.languages.map((el) => (
          <LangBar key={el.name} className="h-full bg-black dark:bg-white" size={el.size} color={langColors[el.name]} />
        ))}
      </div>
    </div>
  )
}

export default memo(RepositoryCard)
