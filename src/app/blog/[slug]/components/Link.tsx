import React from 'react'
import NextLink from 'next/link'

interface LinkProps {
  href: string
  children: React.ReactNode
}

const Link: React.FC<LinkProps> = ({ href, children, ...props }) => {
  if (href.startsWith('/')) {
    return (
      <NextLink href={href} {...props}>
        {children}
      </NextLink>
    )
  }

  if (href.startsWith('#')) {
    return <a {...props}>{children}</a>
  }

  return (
    <a target="_blank" rel="noopener noreferrer" href={href} {...props}>
      {children}
    </a>
  )
}

export default Link
