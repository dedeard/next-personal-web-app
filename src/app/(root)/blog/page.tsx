import type { Metadata } from 'next'
import PageTitle from '../components/PageTitle'
import { getBlogPosts } from '@/utils/blog'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Blog - Dede Ariansya',
  openGraph: {
    title: 'Blog - Dede Ariansya',
    url: '/blog',
  },
  alternates: {
    canonical: '/blog',
  },
}

export default async function BlogPage() {
  const blogs = getBlogPosts().sort((a, b) => {
    if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) {
      return -1
    }
    return 1
  })

  return (
    <>
      <PageTitle title="Blog" />
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <ul>
          {blogs.map((post) => (
            <li key={post.slug}>
              <Link href={'/blog/' + post.slug} className="my-3 block border">
                <h3>{post.metadata.title}</h3>
                <p>{post.metadata.summary}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
