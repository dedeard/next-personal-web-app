import React from 'react'
import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote/rsc'
import Image from './Image'
import Link from './Link'
import Code from './Code'
import Table from './Table'

const MDX: React.FC<MDXRemoteProps> = (props) => {
  return <MDXRemote {...props} components={{ Image, A: Link, Code: Code, Table, ...(props.components || {}) }} />
}

export default MDX
