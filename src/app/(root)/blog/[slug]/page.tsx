import { SITE_NAME, absoluteUrl } from '@/constans/site'
import formatDate from '@/utils/format-date'
import { getBlogPosts } from '@/utils/get-blog-posts'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import MDX from './components/MDX'

export const revalidate = 3600

export function generateStaticParams() {
  return getBlogPosts().map((post) => ({
    slug: post.slug,
  }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getBlogPosts().find((post) => post.slug === params.slug)
  if (!post) return {}
  const imageUrl = `/og?title=${encodeURIComponent(post.metadata.title)}`
  return {
    title: post.metadata.title,
    description: post.metadata.summary,
    authors: {
      name: SITE_NAME,
      url: absoluteUrl('/about'),
    },
    openGraph: {
      type: 'article',
      title: post.metadata.title,
      description: post.metadata.summary,
      url: `/blog/${post.slug}`,
      publishedTime: post.metadata.publishedAt,
      authors: [SITE_NAME],
      images: [
        {
          url: imageUrl,
          width: 1920,
          height: 1080,
          alt: post.metadata.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.metadata.title,
      description: post.metadata.summary,
      images: [imageUrl],
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
            image: absoluteUrl(`/og?title=${encodeURIComponent(post.metadata.title)}`),
            url: absoluteUrl(`/blog/${post.slug}`),
            mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
            inLanguage: 'en',
            author: {
              '@type': 'Person',
              name: SITE_NAME,
              url: absoluteUrl('/about'),
            },
            publisher: {
              '@type': 'Person',
              name: SITE_NAME,
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
