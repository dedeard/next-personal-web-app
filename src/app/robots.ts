import { HOST } from '@/constans/common'

export default function robots() {
  return {
    rules: [{ userAgent: '*' }],
    sitemap: `${HOST}/sitemap.xml`,
    host: HOST,
  }
}
