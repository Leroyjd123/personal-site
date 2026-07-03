'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function LoaderLine() {
  const pathname = usePathname()

  useEffect(() => {
    const ll = document.getElementById('ll')
    if (!ll) return

    // Show loader
    ll.style.width = '65%'
    ll.style.opacity = '1'

    // Complete to 100%
    const timeout1 = setTimeout(() => {
      ll.style.width = '100%'
    }, 100)

    // Fade out
    const timeout2 = setTimeout(() => {
      ll.style.opacity = '0'
      const timeout3 = setTimeout(() => {
        ll.style.width = '0'
        ll.style.opacity = '1'
      }, 300)
      return () => clearTimeout(timeout3)
    }, 500)

    return () => {
      clearTimeout(timeout1)
      clearTimeout(timeout2)
    }
  }, [pathname])

  return null
}