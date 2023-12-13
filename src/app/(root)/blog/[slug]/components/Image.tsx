import React from 'react'
import NextImage from 'next/image'

type ImageProps = {
  alt: string
  src: string
}

const Image: React.FC<ImageProps> = (props) => {
  return <NextImage {...props} />
}

export default Image
