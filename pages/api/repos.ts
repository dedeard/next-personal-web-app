import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(_: NextApiRequest, res: NextApiResponse) {
  let repos = await fetch(`https://api.github.com/users/${process.env.GH_USERNAME || 'dedeard'}/repos`, {
    method: 'GET',
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: 'Bearer' + process.env.GH_API_KEY,
      'X-GitHub-Api-Version': '2022-11-28',
    },
  }).then((res) => res.json())
  res.setHeader('cache-control', `public, max-age=${60 * 60}, must-revalidate`)
  res.status(200).json(repos)
}
