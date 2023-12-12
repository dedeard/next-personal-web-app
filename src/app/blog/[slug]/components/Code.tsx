import React from 'react'
import { highlight } from 'sugar-high'

interface CodeProps {
  children: string
  [key: string]: any
}

const Code: React.FC<CodeProps> = ({ children, ...props }) => {
  const codeHTML = highlight(children)
  return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />
}

export default Code
