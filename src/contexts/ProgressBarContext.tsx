/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, createContext, useContext, useCallback } from 'react'
import { usePathname, useRouter as useNextRouter } from 'next/navigation'
import { AppRouterInstance, NavigateOptions } from 'next/dist/shared/lib/app-router-context.shared-runtime'

interface ProgressBarContextProps extends AppRouterInstance {
  back(disableProgress?: boolean): void
  push(href: string, options?: NavigateOptions, disableProgress?: boolean): void
}

const ProgressBarContext = createContext<ProgressBarContextProps>({
  back() {},
  forward() {},
  refresh() {},
  push() {},
  replace() {},
  prefetch() {},
})

export const ProgressBarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [timeout, setNodeTimeout] = useState<NodeJS.Timeout | null>(null)
  const [width, setWidth] = useState(0)

  const pathname = usePathname()
  const router = useNextRouter()

  const isSameURL = (target: URL, current: URL) => {
    const cleanTarget = target.protocol + '//' + target.host + target.pathname + target.search
    const cleanCurrent = current.protocol + '//' + current.host + current.pathname + current.search

    return cleanTarget === cleanCurrent
  }

  const start = () => {
    if (timeout) {
      clearInterval(timeout)
      setNodeTimeout(null)
    }
    setWidth(5)
    setNodeTimeout(
      setInterval(() => {
        setWidth((prevWidth) => {
          if (prevWidth < 55) {
            return prevWidth + 5
          } else if (prevWidth < 80) {
            return prevWidth + 2.5
          } else if (prevWidth < 95) {
            return prevWidth + 1
          }
          return prevWidth
        })
      }, 300),
    )
  }

  useEffect(() => {
    if (timeout) {
      clearInterval(timeout)
      setNodeTimeout(null)
    }
    setWidth(100)
    setTimeout(() => {
      setWidth(0)
    }, 300)
  }, [pathname])

  useEffect(() => {
    const handleAnchorClick = (event: MouseEvent) => {
      const anchorElement = event.currentTarget as HTMLAnchorElement

      if (anchorElement.target === '_blank') return

      if (event.metaKey || event.ctrlKey) return

      const targetUrl = new URL(anchorElement.href)
      const currentUrl = new URL(location.href)

      if (isSameURL(targetUrl, currentUrl)) return
      if (targetUrl?.href === currentUrl?.href) return

      start()
    }

    const handleMutation: MutationCallback = () => {
      const anchorElements = document.querySelectorAll('a')
      const validAnchorELes = Array.from(anchorElements).filter((anchor) => anchor.href && anchor.target !== '_blank')
      validAnchorELes.forEach((anchor) => anchor.addEventListener('click', handleAnchorClick))
    }

    const mutationObserver = new MutationObserver(handleMutation)
    mutationObserver.observe(document, { childList: true, subtree: true })

    return () => {
      const anchorElements = document.querySelectorAll('a')
      anchorElements.forEach((anchor) => anchor.removeEventListener('click', handleAnchorClick))
      mutationObserver.disconnect()
    }
  }, [])

  const push = useCallback(
    (href: string, options?: NavigateOptions, disableProgress?: boolean) => {
      if (disableProgress) return router.push(href, options)

      const currentUrl = new URL(pathname, location.href)
      const targetUrl = new URL(href, location.href)

      if (isSameURL(targetUrl, currentUrl) || href === pathname) return router.push(href, options)

      start()

      return router.push(href, options)
    },
    [pathname],
  )

  const back = useCallback((disableProgress?: boolean) => {
    if (disableProgress) return router.back()
    start()
    return router.back()
  }, [])

  return (
    <ProgressBarContext.Provider value={{ ...router, push, back }}>
      {width ? (
        <i className="fixed left-0 top-0 z-[9999] block h-[2px] w-full">
          <i className="block h-full bg-yellow-600 transition-all duration-300 ease-in-out" style={{ width: `${width}%` }} />
        </i>
      ) : null}
      {children}
    </ProgressBarContext.Provider>
  )
}

export const useRouter = () => useContext(ProgressBarContext)
