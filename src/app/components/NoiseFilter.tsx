import React, { useEffect, useRef, useState } from 'react'

const NoiseFilter: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [frameSize, setFrameSize] = useState(() => {
    return {
      width: 0,
      height: 0,
    }
  })

  useEffect(() => {
    const onResize = () => {
      setFrameSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }
    onResize()
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [])

  useEffect(() => {
    const c = canvasRef.current
    if (!c) return

    const w = c.width
    const h = c.height

    if (!w || !h) return

    const ocanvas = document.createElement('canvas')
    ocanvas.width = w << 1
    ocanvas.height = h << 1

    const octx = ocanvas.getContext('2d', { alpha: false }) as CanvasRenderingContext2D
    const idata = octx.createImageData(ocanvas.width, ocanvas.height)
    const buffer32 = new Uint32Array(idata.data.buffer)

    const noise = (ctx: CanvasRenderingContext2D) => {
      let len = buffer32.length - 1
      while (len--) buffer32[len] = Math.random() < 0.5 ? 0 : -1 >> 0
      ctx.putImageData(idata, 0, 0)
    }

    // render noise once, to the offscreen-canvas
    noise(octx)

    // main loop draw the offscreen canvas to random offsets
    const ctx = c.getContext('2d', { alpha: false }) as CanvasRenderingContext2D

    let loop: number
    const step = () => {
      const x = (w * Math.random()) | 0 // force integer values for position
      const y = (h * Math.random()) | 0

      ctx.drawImage(ocanvas, -x, -y) // draw static noise (pun intended)
      loop = requestAnimationFrame(step)
    }
    loop = requestAnimationFrame(step)

    return () => cancelAnimationFrame(loop)
  }, [frameSize.height, frameSize.width])

  return (
    <canvas
      ref={canvasRef}
      {...frameSize}
      className="pointer-events-none fixed bottom-0 left-0 right-0 top-0 z-[150] hidden h-full w-full opacity-5 md:block"
    />
  )
}

export default NoiseFilter
