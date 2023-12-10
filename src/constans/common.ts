import { FiHome, FiGlobe, FiClipboard, FiMail, FiUser } from 'react-icons/fi'

export const NAV_ITEMS = [
  { path: '/', label: 'Home', Icon: FiHome },
  { path: '/about', label: 'About', Icon: FiUser },
  { path: '/blog', label: 'Blog', Icon: FiGlobe },
  { path: '/projects', label: 'Projects', Icon: FiClipboard },
  { path: '/contact', label: 'Contact', Icon: FiMail },
]

export const PAGE_TITLES = {
  '/': '._',
  '/about': 'About',
  '/blog': 'Blog',
  '/projects': 'Projects',
  '/contact': 'Contact',
}

export const SOCIALS = {
  GH: 'https://github.com/dedeard',
  IG: 'https://www.instagram.com/dedeard.js',
  WA: 'https://api.whatsapp.com/send?phone=6281343912883&text=%3CChatMe%20%2F%3E',
}
