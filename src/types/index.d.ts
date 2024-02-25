import type { Timestamp } from 'firebase/firestore'

export interface IRepository {
  id: number
  node_id: string
  name: string
  full_name: string
  description: string
  html_url: string
  stargazers_url: string
  forks_url: string
  homepage?: string
  stargazers_count: number
  watchers_count: number
  forks_count: number
  created_at: string
  updated_at: string
  pushed_at: string
  last_commit_at: string
  last_commit_date: Date
  languages: { name: string; size: number }[]
  topics: string[]
  license?: { key: string; name: string; spdx_id: string; url: string; node_id: string }
}

export interface IMetadata {
  title: string
  publishedAt: string
  summary: string
}

export interface IPost {
  metadata: IMetadata
  slug: string
  content: string
}

export interface IGuestbookMessage {
  _id: string
  name: string
  message: string
  createdAt?: Timestamp
}
