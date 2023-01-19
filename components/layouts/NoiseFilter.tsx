import { memo } from 'react'

const NoiseFilter = memo(() => (
  <div
    className="pointer-events-none fixed top-0 left-0 right-0 bottom-0 z-[150] hidden h-full w-full opacity-5 md:block"
    style={{ backgroundImage: "url('/media/noise.gif')" }}
  />
))

export default NoiseFilter
