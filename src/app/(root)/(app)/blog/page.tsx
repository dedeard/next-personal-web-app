import { getBlogPosts } from '@/utils/get-blog-posts'
import type { Metadata } from 'next'
import PageTitle from '../components/PageTitle'
import BlogPostItem from './components/BlogPostItem'

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Articles by Dede Ariansya about full-stack web development, AI prompting, cloud architecture, and practical software engineering.',
  openGraph: {
    title: 'Blog by Dede Ariansya',
    description:
      'Articles by Dede Ariansya about full-stack web development, AI prompting, cloud architecture, and practical software engineering.',
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
      <ul className="grid grid-cols-1 divide-y divide-black/10 md:mb-5 dark:divide-white/10">
        {blogs.map((post, index) => (
          <li key={post.slug}>
            <BlogPostItem index={index} post={post} />
          </li>
        ))}
      </ul>
    </>
  )
}
