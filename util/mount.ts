import { useEffect, useState } from 'react'

export function useMount(): boolean {
  const [mount, setMount] = useState(false)
  useEffect(() => setMount(true), [])

  return mount
}
