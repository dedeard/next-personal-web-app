import type { Metadata } from 'next'
import { getBlogPosts } from '@/utils/blog'
import MDX from './components/MDX'
import { notFound } from 'next/navigation'

export const revalidate = 3600

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

function formatDate(date: string) {
  let currentDate = new Date()
  let targetDate = new Date(date)

  let yearsAgo = currentDate.getFullYear() - targetDate.getFullYear()
  let monthsAgo = currentDate.getMonth() - targetDate.getMonth()
  let daysAgo = currentDate.getDate() - targetDate.getDate()

  let formattedDate = ''

  if (yearsAgo > 0) {
    formattedDate = `${yearsAgo}y ago`
  } else if (monthsAgo > 0) {
    formattedDate = `${monthsAgo}mo ago`
  } else if (daysAgo > 0) {
    formattedDate = `${daysAgo}d ago`
  } else {
    formattedDate = 'Today'
  }

  let fullDate = targetDate.toLocaleString('en-us', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  return `${fullDate} (${formattedDate})`
}

export default async function BlogDetailPage({ params }: { params: { slug: string } }) {
  let post = getBlogPosts().find((post) => post.slug === params.slug)
  if (!post) {
    return notFound()
  }

  return (
    <div>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.publishedAt,
            description: post.metadata.summary,
            image: post.metadata.image
              ? `https://dedeard.my.id${post.metadata.image}`
              : `https://dedeard.my.id/og?title=${post.metadata.title}`,
            url: `https://dedeard.my.id/blog/${post.slug}`,
            author: {
              '@type': 'Person',
              name: 'Dede Ardiansya',
            },
          }),
        }}
      />
      <h1 className="title max-w-[650px] text-2xl font-medium tracking-tighter">{post.metadata.title}</h1>
      <div className="mb-8 mt-2 flex max-w-[650px] items-center justify-between text-sm">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">{formatDate(post.metadata.publishedAt)}</p>
      </div>
      <article className="prose prose-neutral dark:prose-invert">
        <MDX source={post.content} />
      </article>
    </div>
  )
}
