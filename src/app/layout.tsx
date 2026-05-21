import noise from '@/assets/noise.gif'
import { DEFAULT_OG_IMAGE, SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL } from '@/constans/site'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import type { Metadata } from 'next'
import localFont from 'next/font/local'
import Providers from './Providers'
import CursorFollower from './components/CursorFollower'
import './globals.css'

const lato = localFont({
  src: '../../public/fonts/Lato-Bold.ttf',
  weight: '700',
  display: 'swap',
  fallback: ['Arial', 'sans-serif'],
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_TITLE}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  keywords: [
    'Dede Ariansya',
    'Dede Ard',
    'dedeard',
    'Pixel Perfect Prompter',
    'Full Stack Web Developer',
    'Makassar developer',
    'Next.js',
    'React',
    'TypeScript',
    'NestJS',
    'Laravel',
    'Tailwind CSS',
    'Serverless',
    'AI tooling',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} portfolio`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: [
      {
        url: '/favicon.ico',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/favicon-white.ico',
        media: '(prefers-color-scheme: dark)',
      },
    ],
  },
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={'h-full w-full ' + lato.className}>
      <body className="flex min-h-full w-full bg-white text-black antialiased selection:bg-yellow-600 dark:bg-black dark:text-white">
        <i
          aria-hidden="true"
          className="pointer-events-none fixed bottom-0 left-0 right-0 top-0 z-[150] hidden h-full w-full opacity-5 md:block"
          style={{ backgroundImage: `url(${noise.src})` }}
        />
        <Providers>
          <CursorFollower />
          {children}
        </Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
