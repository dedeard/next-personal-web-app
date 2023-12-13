import React, { createContext, useContext, useState, useEffect } from 'react'

interface CursorFollowerContextProp {
  start: boolean
  scaling: boolean
  click: boolean
  circle: { x: number; y: number }
}

const CursorFollowerContext = createContext<CursorFollowerContextProp>({
  start: false,
  scaling: false,
  click: false,
  circle: { x: 0, y: 0 },
})

export const CursorFollowerProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [start, setStart] = useState(false)
  const [scaling, setScaling] = useState(false)
  const [click, setClick] = useState(false)
  const [circle, setCircle] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const mousemove = (e: MouseEvent) => {
      setStart(true)
      setCircle({ x: e.clientX, y: e.clientY })
      // @ts-expect-error
      setScaling(e.target?.closest('a') || e.target?.closest('button') ? true : false)
    }

    const onClick = () => {
      if (!click) {
        setClick(true)
        setTimeout(() => {
          setClick(false)
        }, 100)
      }
    }

    window.addEventListener('mousemove', mousemove)
    window.addEventListener('click', onClick)
    return () => {
      window.removeEventListener('mousemove', mousemove)
      window.removeEventListener('click', onClick)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <CursorFollowerContext.Provider
      value={{
        start,
        scaling,
        click,
        circle,
      }}
    >
      {children}
    </CursorFollowerContext.Provider>
  )
}

export const useCursorFollower = () => useContext(CursorFollowerContext)
