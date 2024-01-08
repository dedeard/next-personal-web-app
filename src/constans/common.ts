import { FiHome, FiGlobe, FiClipboard, FiMail, FiUser } from 'react-icons/fi'

export const HOST = process.env.NEXT_PUBLIC_HOST || 'http://localhost:3000'

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
  GH: 'https://github.com/AnaIsaPN',
  IG: 'https://www.instagram.com/artbyartisa/',
  WA: 'https://wa.me/+351939528317',
}

export const RESUME_URL = 'https://drive.google.com/file/d/1sYecEzBqfz6NbPoZoQxk3qlJhsMxcT0V/view?usp=sharing'

export const FORMSPREE_KEY = 'xoqyaqqe'
