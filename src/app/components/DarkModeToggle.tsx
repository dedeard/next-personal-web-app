'use client'

import { useMount } from '@/contexts/MountContext'
import { useTheme } from 'next-themes'
import { FiMoon, FiSun } from 'react-icons/fi'

const DarkModeToggle: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = (props) => {
  const { theme, setTheme } = useTheme()
  const mounted = useMount()

  const dark = theme === 'dark'

  const SunMoon = dark ? FiSun : FiMoon

  return (
    <button type="button" {...props} onClick={() => setTheme(dark ? 'light' : 'dark')}>
      {mounted && <SunMoon size={18} />}
    </button>
  )
}

export default DarkModeToggle
