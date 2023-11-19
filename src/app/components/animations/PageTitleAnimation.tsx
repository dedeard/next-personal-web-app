import { memo, useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { useMount } from '@/hooks/mount'
import * as pages from '@/constans/pages'
import { config } from '@react-spring/web'
import TextTransition from './TextTransition'

const PageTitleAnimation = () => {
  const [title, setTitle] = useState('')
  const pathname = usePathname()
  const mounted = useMount()

  const pagesTitles = {
    [pages.HOME_PAGE.path]: pages.HOME_PAGE.h1,
    [pages.ABOUT_PAGE.path]: pages.ABOUT_PAGE.h1,
    [pages.PROJECTS_PAGE.path]: pages.PROJECTS_PAGE.h1,
    [pages.CONTACT_PAGE.path]: pages.CONTACT_PAGE.h1,
  }

  useEffect(() => {
    const titleToSet = pagesTitles[pathname] || '404'
    setTitle(titleToSet)
  }, [pathname, mounted])

  return (
    <>
      {mounted && (
        <span className="fixed top-0 -z-40 block select-none px-3 text-[calc(2rem+6.9vw)] md:left-16 md:px-5 lg:px-10 ">
          <span className="block text-[1.5em] font-bold md:text-[1.6em]">
            <TextTransition springConfig={config.wobbly} inline delay={400}>
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
