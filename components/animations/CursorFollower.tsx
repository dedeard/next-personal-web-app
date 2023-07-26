import { useEffect, useState } from 'react'
import { useMousePosition } from '@/util/mouse'

const CursorFollower = () => {
  const { x, y, moved } = useMousePosition()
  const [zoom, setZoom] = useState(false)
  const [click, setClick] = useState(false)

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      // @ts-ignore
      setZoom(e.target?.closest('a') || e.target?.closest('button') ? true : false)
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
      {moved && (
        <span
          style={{ top: y, left: x }}
          className={
            (zoom ? 'scale-150 ' : '') +
            (click ? 'bg-yellow-600' : '') +
            ' pointer-events-none fixed left-1/2 top-1/2 z-[140] hidden h-8 w-8 -translate-x-1/2 -translate-y-1/2 select-none rounded-full ring-2 ring-yellow-600   duration-[0.4s] ease-[cubic-bezier(0.18,0.89,0.32,1.28)] md:block'
          }
        />
      )}
    </>
  )
}

export default CursorFollower
