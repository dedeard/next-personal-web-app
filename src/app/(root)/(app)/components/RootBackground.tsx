'use client'

import React, { memo } from 'react'
import Image from 'next/image'
import { FiVolume2, FiVolumeX } from 'react-icons/fi'
import background from '@/assets/background.webp'
import { useRootBackground } from '@/contexts/RootBackgroundContext'

const RootBackground: React.FC = () => {
  const { isVideoPlayed, toggleVideo } = useRootBackground()

  return (
    <>
      <button
        aria-label="Audio toggle"
        type="button"
        className="fixed right-0 top-0 z-[120] mr-3 mt-3 leading-none md:mr-5 md:mt-5 lg:mr-10"
        onClick={() => toggleVideo()}
      >
        {isVideoPlayed ? <FiVolume2 size={18} /> : <FiVolumeX size={18} />}
      </button>
      <div className="fixed left-0 top-0 h-full w-full overflow-hidden bg-white dark:bg-black">
        <Image src={background} alt={process.env.NEXT_PUBLIC_HOST + ' backgroud image.'} className={'block h-full w-full object-cover'} />
        {isVideoPlayed && (
          <video src="/media/background.webm" loop autoPlay className={'absolute top-0 z-10 block h-full w-full object-cover'} />
        )}
      </div>
    </>
  )
}

export default memo(RootBackground)
