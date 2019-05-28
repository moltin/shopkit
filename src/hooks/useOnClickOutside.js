import { useEffect } from 'react'

export default function useOnClickOutside(ref, handler, open) {
  const clickEvent = 'ontouchstart' in window ? 'touchstart' : 'mousedown'

  useEffect(() => {
    const listener = event => {
      if (ref.current.contains(event.target)) return

      handler(event)
    }

    if (open) {
      document.addEventListener(clickEvent, listener)
    } else {
      document.removeEventListener(clickEvent, listener)
    }

    return () => {
      document.removeEventListener(clickEvent, listener)
    }
  }, [ref, handler, open])
}
