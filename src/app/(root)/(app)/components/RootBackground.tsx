'use client'

import Image from 'next/image'
import React, { memo } from 'react'
import { FiVolume2, FiVolumeX } from 'react-icons/fi'

import background from '@/assets/background.webp'
import { useRootBackground } from '@/contexts/RootBackgroundContext'

import AudioDistortionBackground from './AudioDistortionBackground'

const RootBackground: React.FC = () => {
  const { effectIndex, isVideoPlayed, toggle } = useRootBackground()

  return (
    <>
      <button
        aria-label={isVideoPlayed ? 'Disable audio-reactive background' : 'Enable audio-reactive background'}
        type="button"
        className="cursor-target fixed right-0 top-0 z-120 mr-1 mt-1 p-2 leading-none md:mr-3 md:mt-3 lg:mr-8"
        onClick={() => toggle()}
      >
        <span className="relative inline-flex items-center justify-center">
          <span className={isVideoPlayed ? 'relative inline-flex' : 'animate-attention-icon relative inline-flex origin-center'}>
            {isVideoPlayed ? <FiVolume2 size={18} /> : <FiVolumeX size={18} />}
          </span>
          {isVideoPlayed && (
            <span
              aria-hidden
              className="absolute -bottom-1 -right-1 flex h-3 w-3 items-center justify-center rounded-full bg-current text-[8px] font-bold leading-none"
            >
              <span className="text-white dark:text-black">{effectIndex}</span>
            </span>
          )}
        </span>
      </button>
      <div aria-hidden="true" className="fixed left-0 top-0 h-full w-full overflow-hidden bg-white dark:bg-black">
        <Image src={background} alt="" className={'block h-full w-full object-cover'} />
        <AudioDistortionBackground effectIndex={effectIndex} imageSrc={background.src} />
      </div>
    </>
  )
}

export default memo(RootBackground)
