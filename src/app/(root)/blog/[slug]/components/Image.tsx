import NextImage from 'next/image'
import React from 'react'

type ImageProps = {
  alt: string
  src: string
}

const Image: React.FC<ImageProps> = (props) => {
  return <NextImage {...props} />
}

export default Image
