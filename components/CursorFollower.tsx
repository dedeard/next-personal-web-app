import React, { memo, useEffect, useLayoutEffect, useState } from 'react'

const Cursor = memo(() => {
  const [x, setX] = useState(0)
  const [y, setY] = useState(0)
  const [zoom, setZoom] = useState(false)

  useLayoutEffect(() => {
    window.addEventListener('mousemove', (e) => {
      setX(e.clientX)
      setY(e.clientY)
      // @ts-ignore
      if (e.target?.closest('a') || e.target?.closest('button')) {
        setZoom(true)
      } else {
        setZoom(false)
      }
    })
  })

  return (
    <div
      style={{
        top: y,
        left: x,
      }}
      className={
        (zoom ? 'scale-150' : '') +
        ' pointer-events-none fixed top-1/2 left-1/2 z-[240] hidden h-8 w-8 -translate-x-1/2 -translate-y-1/2 select-none rounded-full ring-2 ring-yellow-600 duration-[0.4s] ease-[cubic-bezier(0.18,0.89,0.32,1.28)] md:block'
      }
    />
  )
})

export default function CursorFollower() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return <></>
  return <Cursor />
}
