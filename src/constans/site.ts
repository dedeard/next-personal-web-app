const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_HOST || 'https://dedeard.my.id'

export const SITE_URL = (rawSiteUrl.startsWith('http') ? rawSiteUrl : `https://${rawSiteUrl}`).replace(/\/$/, '')
export const HOST = SITE_URL
export const SITE_NAME = 'Dede Ariansya'
export const SITE_ALIAS = 'Dede Ard'
export const SITE_HANDLE = 'dedeard'
export const SITE_TITLE = `${SITE_NAME} (${SITE_ALIAS})`
export const SITE_DESCRIPTION =
  'Dede Ariansya, also known as Dede Ard, is a pixel-perfect prompter and full-stack web developer building polished interfaces, practical backends, serverless systems, and AI-assisted workflows.'
export const DEFAULT_OG_IMAGE = '/media/poster.jpg'

export function absoluteUrl(path = '/') {
  if (path.startsWith('http')) return path
  return `${SITE_URL}${path.startsWith('/') ? '' : '/'}${path}`
}
