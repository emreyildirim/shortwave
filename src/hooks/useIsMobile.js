import { useEffect, useState } from 'react'

// True when the viewport is narrow enough that the decoder tree won't fit —
// we switch to the tree-less, key-centric mobile console below this width.
const MOBILE_MAX = 768

export function useIsMobile(maxWidth = MOBILE_MAX) {
  const query = `(max-width: ${maxWidth}px)`
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false
    return window.matchMedia(query).matches
  })

  useEffect(() => {
    if (!window.matchMedia) return
    const mq = window.matchMedia(query)
    const onChange = (e) => setIsMobile(e.matches)
    mq.addEventListener('change', onChange)
    setIsMobile(mq.matches)
    return () => mq.removeEventListener('change', onChange)
  }, [query])

  return isMobile
}
