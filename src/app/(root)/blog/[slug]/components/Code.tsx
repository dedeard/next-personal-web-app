import React from 'react'
import { highlight } from 'sugar-high'

interface CodeProps extends React.HTMLAttributes<HTMLElement> {
  children: string
}

const Code: React.FC<CodeProps> = ({ children, ...props }) => {
  const codeHTML = highlight(children)
  return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />
}

export default Code
