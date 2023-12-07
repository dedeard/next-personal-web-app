import { memo } from 'react'

const NoiseFilter: React.FC = () => (
  <i
    aria-hidden="true"
    className="pointer-events-none fixed bottom-0 left-0 right-0 top-0 z-[150] hidden h-full w-full opacity-5 md:block"
    style={{ backgroundImage: "url('/media/noise.gif')" }}
  />
)

export default memo(NoiseFilter)
