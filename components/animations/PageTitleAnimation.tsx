import { useMounted } from '@/contexts/MountContext'
import { useRouter } from 'next/router'
import { memo, useEffect, useState } from 'react'
import TextTransition, { presets } from 'react-text-transition'

const PageTitleAnimation = memo(() => {
  const [title, setTitle] = useState('')
  const { pathname } = useRouter()
  const mounted = useMounted()

  useEffect(() => {
    switch (pathname) {
      case '/':
        setTitle('._')
        break
      case '/about':
        setTitle('About')
        break
      case '/gallery':
        setTitle('Gallery')
        break
      case '/contact':
        setTitle('Contact')
        break
      default:
        setTitle('404')
        break
    }
  }, [pathname, mounted])

  return (
    <>
      {mounted && (
        <span className="fixed top-16 -z-40 block select-none px-3 text-[calc(2rem+6.9vw)] md:left-16 md:top-0 md:px-5 lg:px-10 ">
          <span className="block text-[1.5em] font-bold md:text-[1.6em]">
            <TextTransition springConfig={presets.wobbly} inline delay={400}>
              <span data-text={title} className="after:content-[attr(data-text)]" />
            </TextTransition>
            <span data-text="." className="after:content-[attr(data-text)]" />
          </span>
        </span>
      )}
    </>
  )
})

export default PageTitleAnimation
