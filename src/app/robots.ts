import { MetadataRoute } from 'next'
import { HOST } from '@/constans/common'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${HOST}/sitemap.xml`,
  }
}
