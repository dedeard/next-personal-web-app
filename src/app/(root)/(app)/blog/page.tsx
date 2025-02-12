import { getBlogPosts } from '@/utils/get-blog-posts'
import type { Metadata } from 'next'
import PageTitle from '../components/PageTitle'
import BlogPostItem from './components/BlogPostItem'

export const dynamic = 'force-dynamic'

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
            <BlogPostItem post={post} />
          </li>
        ))}
      </ul>
    </>
  )
}
