const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_HOST || 'https://deard.dev'

export const SITE_URL = (rawSiteUrl.startsWith('http') ? rawSiteUrl : `https://${rawSiteUrl}`).replace(/\/$/, '')
export const SITE_NAME = 'Dede Ariansya'
export const SITE_ALIAS = 'Dede Ard'
export const SITE_HANDLE = 'dedeard'
export const SITE_TITLE = `${SITE_NAME} (${SITE_ALIAS})`
export const SITE_DESCRIPTION =
  'Dede Ariansya, also known as Dede Ard, is a full-stack web developer building web products end to end, from AI-powered platforms with visual workflow editors and 3D previews to serverless SaaS on AWS.'
export const DEFAULT_OG_IMAGE = '/media/poster.jpg'

export function absoluteUrl(path = '/') {
  if (path.startsWith('http')) return path
  return `${SITE_URL}${path.startsWith('/') ? '' : '/'}${path}`
}
