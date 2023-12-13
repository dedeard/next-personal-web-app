import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getBlogPosts } from '@/utils/get-blog-posts'
import { HOST } from '@/constans/common'
import formatDate from '@/utils/format-date'
import MDX from './components/MDX'

export const revalidate = 3600

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getBlogPosts().find((post) => post.slug === params.slug)
  if (!post) return {}
  return {
    title: post.metadata.title,
    description: post.metadata.summary,
    authors: {
      name: 'Dede Ariansya',
    },
    openGraph: {
      title: post.metadata.title,
      description: post.metadata.summary,
      url: `/blog/${post.slug}`,
      images: `/og?title=${post.metadata.title}`,
    },
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
  }
}

export default async function BlogDetailPage({ params }: { params: { slug: string } }) {
  let post = getBlogPosts().find((post) => post.slug === params.slug)
  if (!post) {
    return notFound()
  }

  return (
    <main className="relative z-10 flex-1 bg-neutral-50 p-3 pt-10 dark:bg-neutral-950/30 md:px-5 md:pb-10 lg:px-10">
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
            image: `${HOST}/og?title=${post.metadata.title}`,
            url: `${HOST}/blog/${post.slug}`,
            author: {
              '@type': 'Person',
              name: 'Dede Ariansya',
            },
          }),
        }}
      />
      <h1 className="max-w-[650px] text-3xl font-bold tracking-tighter md:text-4xl xl:text-5xl">{post.metadata.title}</h1>
      <div className="mb-8 mt-2 flex max-w-[650px] items-center justify-between text-sm">
        <p className="text-sm opacity-60">{formatDate(post.metadata.publishedAt)}</p>
      </div>
      <article className="prose max-w-[650px] dark:prose-invert">
        <MDX source={post.content} />
      </article>
    </main>
  )
}
