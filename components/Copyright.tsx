import { memo } from 'react'

const Copyright = () => {
  return <p className="fixed bottom-0 right-0 z-[150] select-none p-3 text-xs md:p-5 lg:px-10">&copy; DEDEARD {new Date().getFullYear()}</p>
}

export default memo(Copyright)
