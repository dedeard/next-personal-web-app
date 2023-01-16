import React, { memo, useEffect, useLayoutEffect, useState } from 'react'

const Cursor = () => {
  const [x, setX] = useState(0)
  const [y, setY] = useState(0)
  const [zoom, setZoom] = useState(false)
  const [click, setClick] = useState(false)
  const [start, setStart] = useState(false)

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      setX(e.clientX)
      setY(e.clientY)
      setStart(true)
      // @ts-ignore
      if (e.target?.closest('a') || e.target?.closest('button')) {
        setZoom(true)
      } else {
        setZoom(false)
      }
    }
    const onClick = () => {
      if (!click) {
        setClick(true)
        setTimeout(() => {
          setClick(false)
        }, 50)
      }
    }
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('click', onClick)
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('click', onClick)
    }
  }, [])

  return (
    <>
      {start && (
        <span
          style={{
            top: y,
            left: x,
          }}
          className={
            (zoom ? 'scale-150 ' : '') +
            (click ? 'bg-yellow-600' : '') +
            ' pointer-events-none fixed top-1/2 left-1/2 z-[240] hidden h-8 w-8 -translate-x-1/2 -translate-y-1/2 select-none rounded-full ring-2 ring-yellow-600   duration-[0.4s] ease-[cubic-bezier(0.18,0.89,0.32,1.28)] md:block'
          }
        />
      )}
    </>
  )
}

const CursorFollower = () => {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])
  if (!mounted) return <></>
  return <Cursor />
}

export default memo(CursorFollower)
