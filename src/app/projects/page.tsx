import { PROJECTS_PAGE } from '@/constans/pages'
import getProjects from './getProjects'
import RepositoryCard from './components/RepositoryCard'

export const dynamic = 'force-dynamic'

export const revalidate = 3600

export default async function ProjectsPage() {
  let repositories = await getProjects()
  return (
    <>
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
