import 'server-only'

import type { IMetadata, IPost } from '@/types'
import fs from 'fs'
import path from 'path'

const REQUIRED_METADATA_KEYS: (keyof IMetadata)[] = ['title', 'publishedAt', 'summary']

function parseFrontmatter(fileContent: string, source: string) {
  const frontmatterRegex = /---\s*([\s\S]*?)\s*---/
  const match = frontmatterRegex.exec(fileContent)

  if (!match) {
    throw new Error(`Missing frontmatter block in "${source}".`)
  }

  const frontMatterBlock = match[1]
  const content = fileContent.replace(frontmatterRegex, '').trim()
  const frontMatterLines = frontMatterBlock.trim().split('\n')
  const metadata: Partial<IMetadata> = {}

  frontMatterLines.forEach((line) => {
    const [key, ...valueArr] = line.split(': ')
    let value = valueArr.join(': ').trim()
    value = value.replace(/^['"](.*)['"]$/, '$1') // Remove quotes
    metadata[key.trim() as keyof IMetadata] = value
  })

  const missing = REQUIRED_METADATA_KEYS.filter((key) => !metadata[key])
  if (missing.length > 0) {
    throw new Error(`Missing required frontmatter (${missing.join(', ')}) in "${source}".`)
  }

  return { metadata: metadata as IMetadata, content }
}

function getMDXFiles(dir: fs.PathLike) {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === '.mdx')
}

function readMDXFile(filePath: string) {
  const rawContent = fs.readFileSync(filePath, 'utf-8')
  return parseFrontmatter(rawContent, path.basename(filePath))
}

function getMDXData(dir: string): IPost[] {
  const mdxFiles = getMDXFiles(dir)
  return mdxFiles.map((file) => {
    const { metadata, content } = readMDXFile(path.join(dir, file))
    const slug = path.basename(file, path.extname(file))
    return {
      metadata,
      slug,
      content,
    }
  })
}

export function getBlogPosts(): IPost[] {
  return getMDXData(path.join(process.cwd(), 'content'))
}
