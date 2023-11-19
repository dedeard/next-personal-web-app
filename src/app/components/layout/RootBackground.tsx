import { memo, useState } from 'react'
import Image from 'next/image'
import PageTitleAnimation from '../animations/PageTitleAnimation'
import { Volume2Icon, VolumeXIcon } from '../icons/Feather'
import background from '@/media/background.webp'

const RootBackground = memo(() => {
  const [videoPlayed, setVideoPlayed] = useState(false)
  return (
    <>
      <button
        aria-label="Audio toggle"
        type="button"
        className="fixed right-0 top-0 z-[120] mr-3 mt-3 leading-none md:mr-5 md:mt-5 lg:mr-10"
        onClick={() => setVideoPlayed(!videoPlayed)}
      >
        {videoPlayed ? <Volume2Icon width={18} height={18} /> : <VolumeXIcon width={18} height={18} />}
      </button>
      <PageTitleAnimation />
      <div className="fixed left-0 top-0 -z-50 h-full w-full overflow-hidden bg-white dark:bg-black">
        <Image src={background} alt={process.env.NEXT_PUBLIC_HOST + ' backgroud image.'} className={'block h-full w-full object-cover'} />
        {videoPlayed && (
          <video src="/media/background.webm" loop autoPlay className={'absolute top-0 z-10 block h-full w-full object-cover'} />
        )}
      </div>
    </>
  )
})

RootBackground.displayName = 'RootBackground'

export default RootBackground
