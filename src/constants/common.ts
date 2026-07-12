import { FiBookOpen, FiClipboard, FiGlobe, FiHome, FiMail, FiUser } from 'react-icons/fi'

export { absoluteUrl, DEFAULT_OG_IMAGE, SITE_ALIAS, SITE_DESCRIPTION, SITE_HANDLE, SITE_NAME, SITE_TITLE, SITE_URL } from './site'

export const NAV_ITEMS = [
  { path: '/', label: 'Home', Icon: FiHome },
  { path: '/about', label: 'About', Icon: FiUser },
  { path: '/blog', label: 'Blog', Icon: FiGlobe },
  { path: '/projects', label: 'Projects', Icon: FiClipboard },
  { path: '/contact', label: 'Contact', Icon: FiMail },
  { path: '/guestbook', label: 'Guestbook', Icon: FiBookOpen },
]

export const PAGE_TITLES = {
  '/': '._',
  '/about': 'About',
  '/blog': 'Blog',
  '/projects': 'Projects',
  '/contact': 'Contact',
  '/guestbook': 'G-book',
}

export const SOCIALS = {
  GH: 'https://github.com/dedeard',
  IG: 'https://www.instagram.com/dcode.js',
  IN: 'https://www.linkedin.com/in/dedeard/',
  WA: 'https://api.whatsapp.com/send?phone=6281343912883&text=%3CChatMe%20%2F%3E',
}

export const RESUME_URL = 'https://drive.google.com/file/d/17EnrWbKObHNKFj4scsZM0R9JOX96uRJ3/view?usp=drive_link'

export const FORMSPREE_KEY = process.env.NEXT_PUBLIC_FORMSPREE_KEY || ''
