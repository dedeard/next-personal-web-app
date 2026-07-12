import 'server-only'

import { IRepository } from '@/types'
import timeFromNow from '@/utils/time-from-now'

type GitHubApiRepo = {
  id: number
  node_id: string
  name: string
  full_name: string
  description: string | null
  html_url: string
  stargazers_url: string
  forks_url: string
  homepage: string | null
  license: IRepository['license']
  stargazers_count: number
  watchers_count: number
  forks_count: number
  topics: string[]
  languages_url: string
  created_at: string
  updated_at: string
  pushed_at: string
}

type GitHubApiCommit = {
  commit?: { committer?: { date?: string } }
}

const username = process.env.GH_USERNAME || 'dedeard'
const apiKey = process.env.GH_API_KEY

const repositoriesUrl = `https://api.github.com/users/${username}/repos?sort=updated&visibility=public&affiliation=owner`

const fetchOptions: RequestInit = {
  method: 'GET',
  headers: {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    ...(apiKey ? { Authorization: 'Bearer ' + apiKey } : {}),
  },
  next: { revalidate: 60 * 60 * 24 },
}

const getProjects = async (): Promise<IRepository[]> => {
  let repositories: GitHubApiRepo[] = []

  try {
    const response = await fetch(repositoriesUrl, fetchOptions)
    if (!response.ok) return []
    repositories = (await response.json()) as GitHubApiRepo[]
  } catch {
    return []
  }

  repositories = repositories.filter((repo) => repo.description && repo.languages_url)

  const promises = repositories.map(async (repo) => {
    const [languagesRes, commitsRes] = await Promise.allSettled([
      fetch(repo.languages_url, fetchOptions),
      fetch(`https://api.github.com/repos/${repo.full_name}/commits?per_page=1`, fetchOptions),
    ])

    const languagesResponse = languagesRes.status === 'fulfilled' && languagesRes.value.ok ? languagesRes.value : null
    const commitsResponse = commitsRes.status === 'fulfilled' && commitsRes.value.ok ? commitsRes.value : null

    const languagesData = languagesResponse ? ((await languagesResponse.json()) as { [key: string]: number }) : {}
    const totalSize = Object.values(languagesData).reduce((acc, size) => acc + size, 0)
    const languages = Object.entries(languagesData).map(([name, size]) => ({
      name,
      size: totalSize ? (size / totalSize) * 100 : 0,
    }))

    const commitsData = commitsResponse ? ((await commitsResponse.json()) as GitHubApiCommit[]) : []
    const lastCommit = commitsData[0]
    const lastCommitDate = lastCommit?.commit?.committer?.date

    const repository: IRepository = {
      id: repo.id,
      node_id: repo.node_id,
      name: repo.name,
      full_name: repo.full_name,
      description: repo.description ?? '',
      html_url: repo.html_url,
      stargazers_url: repo.stargazers_url,
      forks_url: repo.forks_url,
      homepage: repo.homepage ?? undefined,
      license: repo.license,
      stargazers_count: repo.stargazers_count,
      watchers_count: repo.watchers_count,
      forks_count: repo.forks_count,
      topics: repo.topics,
      languages: languages,
      created_at: repo.created_at,
      updated_at: repo.updated_at,
      pushed_at: repo.pushed_at,
      last_commit_date: lastCommitDate,
      last_commit_relative: lastCommitDate ? timeFromNow(lastCommitDate) : 'N/A',
    }

    return repository
  })

  const allProjects = await Promise.all(promises)

  allProjects.sort((a, b) => {
    if (!a.last_commit_date) return 1
    if (!b.last_commit_date) return -1
    return new Date(b.last_commit_date).getTime() - new Date(a.last_commit_date).getTime()
  })

  return allProjects
}

export default getProjects
