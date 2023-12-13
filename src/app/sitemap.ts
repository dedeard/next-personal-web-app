import { HOST } from '@/constans/common'
import { getBlogPosts } from '@/utils/get-blog-posts'

export default async function sitemap() {
  let blogs = getBlogPosts().map((post) => ({
    url: `${HOST}/blog/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }))

  let routes = ['', '/about', '/blog', '/projects', '/contact'].map((route) => ({
    url: `${HOST}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  return [...routes, ...blogs]
}
