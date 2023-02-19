import { IRepository } from '@/types'
import type { NextApiRequest, NextApiResponse } from 'next'

const username = process.env.GH_USERNAME || 'dedeard'
const repositoriesUrl = `https://api.github.com/users/${username}/repos?sort=updated&visibility=public&affiliation=owner`

const fetchOptions = {
  method: 'GET',
  headers: {
    Accept: 'application/vnd.github+json',
    Authorization: 'Bearer' + process.env.GH_API_KEY,
    'X-GitHub-Api-Version': '2022-11-28',
  },
}

export default async function handler(_: NextApiRequest, res: NextApiResponse) {
  const repositories = (await fetch(repositoriesUrl, fetchOptions).then((res) => res.json() as Promise<any[]>)).filter(
    (r) => r.languages_url && r.description
  )

  const promises = repositories.map(async (repo) => {
    const data = await fetch(repo.languages_url, fetchOptions).then((res) => res.json() as Promise<{ [key: string]: number }>)

    const names = Object.keys(data)
    const languages: { name: string; size: number }[] = []
    let total: number = 0
    for (let name of names) total += data[name]
    for (let name of names) {
      languages.push({
        name,
        size: (data[name] / total) * 100,
      })
    }

    const repository: IRepository = {
      id: repo.id,
      node_id: repo.node_id,
      name: repo.name,
      full_name: repo.full_name,
      description: repo.description,
      html_url: repo.html_url,
      homepage: repo.homepage,
      license: repo.license,
      stargazers_count: repo.stargazers_count,
      watchers_count: repo.watchers_count,
      created_at: repo.created_at,
      updated_at: repo.updated_at,
      pushed_at: repo.pushed_at,
      topics: repo.topics,
      languages: languages,
    }

    return repository
  })

  const data = await Promise.all(promises)
  res.setHeader('cache-control', `public, max-age=${60 * 5}, must-revalidate`)
  res.status(200).json(data)
}
