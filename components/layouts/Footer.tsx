import { memo } from 'react'

const Footer = memo(() => (
  <footer className="fixed bottom-0 right-0 z-[100] select-none p-3 text-xs md:p-5 lg:px-10">
    <p>© {new Date().getFullYear()} DedeArd. All rights reserved.</p>
  </footer>
))

export default Footer
