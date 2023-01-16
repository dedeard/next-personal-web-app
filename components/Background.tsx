import { memo, useState } from 'react'
import TextTransition, { presets } from 'react-text-transition'
import { Volume2Icon, VolumeXIcon } from './Icons'

const Background = ({ image, video, title }: { image?: string; video?: string; title?: string }) => {
  const [videoPlayed, setVideoPlayed] = useState<boolean>(false)
  return (
    <>
      {video && (
        <button
          onClick={() => setVideoPlayed(!videoPlayed)}
          className="fixed top-16 right-0 z-[150] mr-3 mt-3 leading-none md:top-0 md:mt-5 md:mr-5 lg:mr-10 "
        >
          {videoPlayed ? <Volume2Icon width={18} height={18} /> : <VolumeXIcon width={18} height={18} />}
        </button>
      )}
      <span className="fixed top-16 block select-none px-3 text-[calc(2rem+6.9vw)] md:left-16 md:top-0 md:px-5 lg:px-10 ">
        <span className="block text-[1.5em] font-bold md:text-[1.6em]">
          <TextTransition springConfig={presets.wobbly} inline delay={400}>
            {title}
          </TextTransition>
          .
        </span>
      </span>
      <div className="fixed left-0 top-0 -z-50 h-full w-full overflow-hidden bg-white dark:bg-black">
        {image && (
          <img src={image} alt={process.env.NEXT_PUBLIC_HOST + ' backgroud image.'} className={'block h-full w-full object-cover'} />
        )}
        {videoPlayed && video && <video src={video} loop autoPlay className={'absolute top-0 z-10 block h-full w-full object-cover'} />}
      </div>
    </>
  )
}

export default memo(Background)
