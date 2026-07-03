'use client'

import { useEffect, useRef } from 'react'

export default function AuroraCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let raf
    let t = 0

    const orbs = [
      { x: 0.2, y: 0.3, r: 0.45, speed: 0.00018, phase: 0,    color: [180, 120, 255] },
      { x: 0.7, y: 0.6, r: 0.5,  speed: 0.00013, phase: 2.1,  color: [100, 210, 255] },
      { x: 0.5, y: 0.1, r: 0.4,  speed: 0.00022, phase: 4.2,  color: [255, 160, 200] },
      { x: 0.15, y: 0.75, r: 0.35, speed: 0.00016, phase: 1.1, color: [120, 255, 200] },
      { x: 0.85, y: 0.2, r: 0.38, speed: 0.0002, phase: 3.3,  color: [255, 220, 120] },
    ]

    function resize() {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    function draw(ts) {
      t = ts
      const W = canvas.width
      const H = canvas.height

      ctx.clearRect(0, 0, W, H)

      orbs.forEach(orb => {
        const ox = (orb.x + Math.sin(t * orb.speed + orb.phase) * 0.18) * W
        const oy = (orb.y + Math.cos(t * orb.speed * 0.7 + orb.phase) * 0.22) * H
        const radius = orb.r * Math.min(W, H)

        const g = ctx.createRadialGradient(ox, oy, 0, ox, oy, radius)
        const [r, g2, b] = orb.color
        g.addColorStop(0, `rgba(${r},${g2},${b},0.18)`)
        g.addColorStop(0.5, `rgba(${r},${g2},${b},0.07)`)
        g.addColorStop(1, `rgba(${r},${g2},${b},0)`)

        ctx.beginPath()
        ctx.arc(ox, oy, radius, 0, Math.PI * 2)
        ctx.fillStyle = g
        ctx.fill()
      })

      raf = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    raf = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 1,
      }}
    />
  )
}
