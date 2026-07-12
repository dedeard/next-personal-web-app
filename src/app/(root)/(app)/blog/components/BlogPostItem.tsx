'use client'

import type { IPost } from '@/types'
import formatDate from '@/utils/format-date'
import readingTime from '@/utils/reading-time'
import Link from 'next/link'
import React from 'react'
import { FiArrowUpRight } from 'react-icons/fi'

const BlogPostItem: React.FC<{ post: IPost; index?: number }> = ({ post, index = 0 }) => {
  return (
    <Link
      href={'/blog/' + post.slug}
      style={{ animationDelay: `${0.06 * index + 0.1}s` }}
      className="cursor-target animate-fade-in-up group relative flex flex-col gap-2 bg-white/40 px-4 py-6 backdrop-blur-sm transition-colors duration-300 hover:bg-white/70 md:px-6 dark:bg-black/50 dark:hover:bg-black/80"
    >
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-lg font-bold leading-snug transition-transform duration-300 group-hover:translate-x-1 md:text-xl">
          {post.metadata.title}
        </h3>
        <FiArrowUpRight
          size={20}
          className="mt-1 shrink-0 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
        />
      </div>

      {post.metadata.summary && (
        <p className="line-clamp-2 max-w-2xl text-sm leading-6 text-black/55 dark:text-white/55">{post.metadata.summary}</p>
      )}

      <div className="mt-1 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-black/40 dark:text-white/40">
        <span>{formatDate(post.metadata.publishedAt)}</span>
        <span aria-hidden className="h-1 w-1 rounded-full bg-current opacity-50" />
        <span>{readingTime(post.content)} min read</span>
      </div>
    </Link>
  )
}

export default BlogPostItem
