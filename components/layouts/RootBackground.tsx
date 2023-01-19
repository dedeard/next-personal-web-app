import { memo, useState } from 'react'
import PageTitleAnimation from '../animations/PageTitleAnimation'
import { Volume2Icon, VolumeXIcon } from '../icons/Feather'

const RootBackground = memo(() => {
  const [videoPlayed, setVideoPlayed] = useState(false)
  return (
    <>
      <button
        onClick={() => setVideoPlayed(!videoPlayed)}
        className="fixed top-16 right-0 z-[120] mr-3 mt-3 leading-none md:top-0 md:mt-5 md:mr-5 lg:mr-10 "
      >
        {videoPlayed ? <Volume2Icon width={18} height={18} /> : <VolumeXIcon width={18} height={18} />}
      </button>
      <PageTitleAnimation />
      <div className="fixed left-0 top-0 -z-50 h-full w-full overflow-hidden bg-white dark:bg-black">
        <img
          src="/media/background.webp"
          alt={process.env.NEXT_PUBLIC_HOST + ' backgroud image.'}
          className={'block h-full w-full object-cover'}
        />
        {videoPlayed && (
          <video src="/media/background.webm" loop autoPlay className={'absolute top-0 z-10 block h-full w-full object-cover'} />
        )}
      </div>
    </>
  )
})

export default RootBackground
