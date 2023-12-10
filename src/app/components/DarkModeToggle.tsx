'use client'

import { useMount } from '@/contexts/MountContext'
import { useTheme } from '@/contexts/ThemeContext'
import { FiMoon, FiSun } from 'react-icons/fi'

const DarkModeToggle: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = (props) => {
  const { dark, toggle } = useTheme()
  const mounted = useMount()

  const SunMoon = dark ? FiSun : FiMoon

  return (
    <button type="button" {...props} onClick={toggle}>
      {mounted && <SunMoon size={18} />}
    </button>
  )
}

export default DarkModeToggle
