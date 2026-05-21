import { FiBookOpen, FiClipboard, FiGlobe, FiHome, FiMail, FiUser } from 'react-icons/fi'

export { absoluteUrl, DEFAULT_OG_IMAGE, HOST, SITE_ALIAS, SITE_DESCRIPTION, SITE_HANDLE, SITE_NAME, SITE_TITLE, SITE_URL } from './site'

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
  WA: 'https://api.whatsapp.com/send?phone=6285343854343&text=%3CChatMe%20%2F%3E',
}

export const RESUME_URL = 'https://drive.google.com/file/d/17EnrWbKObHNKFj4scsZM0R9JOX96uRJ3/view?usp=drive_link'

export const FORMSPREE_KEY = 'xoqyaqqe'

export const FIREBASE_CONFIG = {
  apiKey: 'AIzaSyCVXW6MTdRVtYPTOoV92ruBQ3ZQcF5Ho0g',
  authDomain: 'dede-ard.firebaseapp.com',
  databaseURL: 'https://dede-ard.firebaseio.com',
  projectId: 'dede-ard',
  storageBucket: 'dede-ard.appspot.com',
  messagingSenderId: '120930847292',
  appId: '1:120930847292:web:eb77034f59e9ee37b65139',
  measurementId: 'G-KJRFL3X06T',
}
