'use client'

import { useRef, useEffect, memo } from 'react'

function CursorGlowComponent() {
  const glowRef = useRef(null)
  let mx = 0, my = 0, cx = 0, cy = 0

  useEffect(() => {
    const glow = glowRef.current
    if (!glow) return

    // Hide on touch devices
    if ('ontouchstart' in window) {
      glow.style.display = 'none'
      return
    }

    let rafId = null

    const handleMouseMove = (e) => {
      mx = e.clientX
      my = e.clientY
    }

    const smoothGlow = () => {
      cx += (mx - cx) * 0.08
      cy += (my - cy) * 0.08
      glow.style.left = cx + 'px'
      glow.style.top = cy + 'px'
      rafId = requestAnimationFrame(smoothGlow)
    }

    document.addEventListener('mousemove', handleMouseMove)
    smoothGlow()

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  return <div ref={glowRef} className="cursor-glow" id="cg" />
}

export default memo(CursorGlowComponent)