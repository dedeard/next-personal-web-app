/**
 * @license
 * Copyright (c) 2021 Winter Core.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

'use client'
import type { CSSProperties, PropsWithChildren } from 'react'
import React, { useState, useRef, useEffect } from 'react'
import { useSpring, useTransition, animated, config, SpringConfig } from '@react-spring/web'

export interface TextTransitionProps {
  className?: string
  delay?: number
  direction?: 'up' | 'down'
  inline?: boolean
  springConfig?: SpringConfig
  style?: CSSProperties
  translateValue?: string
}

const TextTransition: React.FC<PropsWithChildren<TextTransitionProps>> = (props) => {
  const {
    direction = 'up',
    inline = false,
    springConfig = config.default,
    delay = 0,
    className,
    style,
    translateValue: tv = '100%',
    children,
  } = props

  const initialRun = useRef(true)
  const fromTransform = direction === 'down' ? `-${tv}` : tv
  const leaveTransform = direction === 'down' ? tv : `-${tv}`

  const transitions = useTransition([children], {
    enter: { opacity: 1, transform: 'translateY(0%)' },
    from: { opacity: 0, transform: `translateY(${fromTransform})` },
    leave: {
      opacity: 0,
      transform: `translateY(${leaveTransform})`,
      position: 'absolute',
    },
    config: springConfig,
    immediate: initialRun.current,
    delay: !initialRun.current ? delay : undefined,
  })

  const [width, setWidth] = useState<number>(0)
  const currentRef = useRef<HTMLDivElement>(null)
  const heightRef = useRef<number | string>('auto')

  useEffect(() => {
    initialRun.current = false
    const element = currentRef.current

    // If element doesn't exist, then do nothing
    if (!element) return

    const { width, height } = element.getBoundingClientRect()

    setWidth(width)
    heightRef.current = height
  }, [children, setWidth, currentRef])

  const widthTransition = useSpring({
    to: { width },
    config: springConfig,
    immediate: initialRun.current,
    delay: !initialRun.current ? delay : undefined,
  })

  return (
    <animated.div
      className={`text-transition ${className}`}
      style={{
        ...(inline && !initialRun.current ? widthTransition : undefined),
        ...style,
        whiteSpace: inline ? 'nowrap' : 'normal',
        display: inline ? 'inline-flex' : 'flex',
        height: heightRef.current,
      }}
    >
      {transitions((styles, item) => (
        <animated.div style={{ ...styles }} ref={item === children ? currentRef : undefined}>
          {item}
        </animated.div>
      ))}
    </animated.div>
  )
}

export default TextTransition
