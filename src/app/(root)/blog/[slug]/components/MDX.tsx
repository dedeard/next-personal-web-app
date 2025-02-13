import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote/rsc'
import React from 'react'
import Code from './Code'
import Image from './Image'
import Link from './Link'
import Table from './Table'

const MDX: React.FC<MDXRemoteProps> = (props) => {
  // @ts-expect-error
  return <MDXRemote {...props} components={{ Image, a: Link, code: Code, Table, ...(props.components || {}) }} />
}

export default MDX
