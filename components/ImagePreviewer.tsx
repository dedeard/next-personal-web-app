import { memo, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

const ImageList = ({ image }: { image: string }) => {
  const [open, setOpen] = useState(false)
  const [backdropOpacity, setBackdropOpacity] = useState(0.0)
  const [rect, setRect] = useState<{ x: number; y: number; w: number; h: number }>({ x: 0, y: 0, w: 0, h: 0 })
  const { query, push, pathname } = useRouter()

  useEffect(() => {
    if (query.img === image) {
      const target = document.getElementById(image)
      if (target) {
        const loadImage = async (url: string) => {
          return new Promise((resolve, reject) => {
            const img = new Image()
            img.src = url
            img.onload = resolve
            img.onerror = resolve
          })
        }
        loadImage(image).then(() => {
          const { x, y, width, height } = target.getBoundingClientRect()
          setRect({ x, y, w: width, h: height })
          setOpen(true)
          setTimeout(() => {
            setBackdropOpacity(0.9)
            setRect({ x: 0, y: 0, w: window.innerWidth, h: window.innerHeight })
          }, 5)
        })
      }
    } else if (open) {
      const target = document.getElementById(image)
      if (target) {
        const { x, y, width, height } = target.getBoundingClientRect()
        setRect({ x, y, w: width, h: height })
        setBackdropOpacity(0.0)
        setTimeout(() => {
          setOpen(false)
        }, 500)
      }
    }
  }, [query, image])

  useEffect(() => {
    const resize = () => {
      if (open) {
        setRect({ x: 0, y: 0, w: window.innerWidth, h: window.innerHeight })
      }
    }
    window.addEventListener('resize', resize)
    return () => {
      window.removeEventListener('resize', resize)
    }
  }, [open])

  return (
    <>
      {open && (
        <>
          <div
            onClick={() => push(pathname, pathname, { shallow: true })}
            className="fixed z-[140] bg-contain bg-center bg-no-repeat transition-all duration-500"
            style={{
              width: rect.w,
              height: rect.h,
              top: rect.y,
              left: rect.x,
              backgroundImage: `url('${image}')`,
            }}
          ></div>
          <div
            className="fixed top-0 left-0 z-[130] h-full w-full bg-white transition-all duration-500 dark:bg-black"
            style={{
              opacity: backdropOpacity,
            }}
          ></div>
        </>
      )}
    </>
  )
}

const ImagePreviewer = ({ images }: { images: string[] }) => {
  return (
    <>
      {images.map((img, i) => (
        <ImageList key={i} image={img} />
      ))}
    </>
  )
}

export default memo(ImagePreviewer)
