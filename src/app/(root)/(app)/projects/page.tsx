import type { Metadata } from 'next'
import PageTitle from '../components/PageTitle'
import RepositoryCard from './components/RepositoryCard'
import getProjects from './getProjects'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Projects - Dede Ariansya',
  openGraph: {
    title: 'Projects - Dede Ariansya',
    url: '/projects',
  },
  alternates: {
    canonical: '/projects',
  },
}

export default async function ProjectsPage() {
  let repositories = await getProjects()
  return (
    <>
      <PageTitle title="Projects" />
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {repositories.map((repo, i) => (
          <RepositoryCard key={i} repo={repo} />
        ))}
      </div>
    </>
  )
}
