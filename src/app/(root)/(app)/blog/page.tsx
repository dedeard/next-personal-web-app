import type { Metadata } from 'next'
import Link from 'next/link'
import { getBlogPosts } from '@/utils/get-blog-posts'
import formatDate from '@/utils/format-date'
import PageTitle from '../components/PageTitle'

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
      <ul className="grid grid-cols-1 gap-3 md:mb-5">
        {blogs.map((post) => (
          <li key={post.slug}>
            <Link href={'/blog/' + post.slug} className="block bg-white/50 px-3 py-5 backdrop-blur dark:bg-black/80 md:px-5">
              <h3 className="text-lg md:text-xl">{post.metadata.title}</h3>
              <p className="text-sm opacity-60 dark:text-neutral-400">{formatDate(post.metadata.publishedAt)}</p>
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}
