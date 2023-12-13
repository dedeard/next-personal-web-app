'use client'

import { memo, useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { useMount } from '@/contexts/MountContext'
import { config } from '@react-spring/web'
import { PAGE_TITLES } from '@/constans/common'
import TextTransition from '@/app/components/TextTransition'

const PageTitleAnimation: React.FC = () => {
  const [title, setTitle] = useState('')
  const pathname = usePathname()
  const mounted = useMount()

  useEffect(() => {
    // @ts-expect-error
    setTitle(PAGE_TITLES[pathname] || '')
  }, [pathname, mounted])

  return (
    <>
      {mounted && (
        <span className="fixed top-0 block select-none px-3 text-[calc(2rem+6.9vw)] md:left-16 md:px-5 lg:px-10 ">
          <span className="block text-[1.5em] font-bold md:text-[1.6em]">
            <TextTransition springConfig={config.wobbly} inline>
              <span data-text={title} className="after:content-[attr(data-text)]" />
            </TextTransition>
            <span data-text="." className="after:content-[attr(data-text)]" />
          </span>
        </span>
      )}
    </>
  )
}

export default memo(PageTitleAnimation)
