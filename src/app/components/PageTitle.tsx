import React from 'react'

const PageTitle: React.FC<{ title: string }> = ({ title }) => (
  <h1
    className="relative my-[1em] text-[calc(1.825rem+6.9vw)] font-bold after:absolute after:left-0 after:top-0 after:z-10 after:block after:text-[1.4em] after:tracking-tighter after:opacity-5 after:content-[attr(data-text)] md:after:text-[1.5em]"
    data-text={title}
  >
    {title}
  </h1>
)

export default PageTitle
