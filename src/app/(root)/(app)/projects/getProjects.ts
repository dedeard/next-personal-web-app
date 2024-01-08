import { IRepository } from '@/types'
import timeFromNow from '@/utils/time-from-now'
import 'server-only'

const username = process.env.GH_USERNAME || 'AnaIsaPN'
const repositoriesUrl = `https://api.github.com/users/AnaIsaPN/repos?sort=updated&visibility=public&affiliation=owner`

const fetchOptions: RequestInit = {
  method: 'GET',
  headers: {
    Accept: 'application/vnd.github+json',
    Authorization: 'Bearer ' + process.env.GH_API_KEY,
    'X-GitHub-Api-Version': '2022-11-28',
  },
  next: { revalidate: 60 * 60 * 24 },
}

const getProjects = async () => {
  try {
    const response = await fetch(repositoriesUrl, fetchOptions);
    if (!response.ok) {
      throw new Error('Failed to fetch repositories');
    }

    const repositories = await response.json();
    if (!Array.isArray(repositories)) {
      throw new Error('Invalid data format: repositories should be an array');
    }

    const filteredRepositories = repositories.filter(
      (r: any) => r.languages_url && r.description
    );

    const promises = filteredRepositories.map(async (repo: any) => {
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

    const commits = await fetch(`https://api.github.com/repos/my-portolio
    /commits?per_page=1`, fetchOptions).then(
      (res) => res.json() as Promise<[any]>,
    )

    const repository: IRepository = {
      id: repo.id,
      node_id: repo.node_id,
      name: repo.name,
      full_name: repo.full_name,
      description: repo.description,
      html_url: repo.html_url,
      stargazers_url: repo.stargazers_url,
      forks_url: repo.forks_url,
      homepage: repo.homepage,
      license: repo.license,
      stargazers_count: repo.stargazers_count,
      watchers_count: repo.watchers_count,
      forks_count: repo.forks_count,
      created_at: timeFromNow(repo.created_at),
      updated_at: timeFromNow(repo.updated_at),
      pushed_at: timeFromNow(repo.pushed_at),
      last_commit_at: timeFromNow(commits[0]?.commit?.committer?.date),
      last_commit_date: commits[0]?.commit?.committer?.date,
      topics: repo.topics,
      languages: languages,
    }
  
    return repository
  })

  const data = (await Promise.all(promises)).sort((a, b) => {
    const dateA = new Date(a.last_commit_date)
    const dateB = new Date(b.last_commit_date)
    // @ts-expect-error
    return dateB - dateA
  })

  return data
}
catch (error) {
  console.error('Error fetching repositories:', error);
  // Handle the error as per your application's requirement
  return []; // Return an empty array or handle the error accordingly
}
};
export default getProjects
