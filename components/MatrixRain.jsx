'use client'

import { useEffect, useRef } from 'react'

const KATAKANA = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン'
const TECH     = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>{}[]()!@#$%^&*'
const CHARS    = KATAKANA + TECH

export default function MatrixRain() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const fontSize = 14
    let animId
    let cols
    let drops
    let bright  // tracks "bright head" columns

    const init = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
      cols   = Math.floor(canvas.width / fontSize)
      drops  = Array.from({ length: cols }, () => Math.floor(Math.random() * -100))
      bright = Array(cols).fill(0)
    }
    init()

    const onResize = () => { init() }
    window.addEventListener('resize', onResize)

    const draw = () => {
      // Fade trail — dark semi-transparent overlay
      ctx.fillStyle = 'rgba(4,4,4,0.08)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < cols; i++) {
        const char = CHARS[Math.floor(Math.random() * CHARS.length)]
        const y    = drops[i] * fontSize

        // Bright head character — pure white-green
        ctx.font        = `bold ${fontSize}px 'JetBrains Mono', monospace`
        ctx.fillStyle   = '#e0ffe8'
        ctx.shadowColor = '#00ff41'
        ctx.shadowBlur  = 10
        ctx.fillText(char, i * fontSize, y)

        // Trailing character — medium green
        ctx.font        = `${fontSize}px 'JetBrains Mono', monospace`
        ctx.fillStyle   = `rgba(0,255,65,${0.4 + Math.random() * 0.3})`
        ctx.shadowBlur  = 4
        ctx.fillText(
          CHARS[Math.floor(Math.random() * CHARS.length)],
          i * fontSize,
          y - fontSize
        )

        ctx.shadowBlur = 0

        if (y > canvas.height && Math.random() > 0.97) {
          drops[i] = 0
        }
        drops[i] += 0.5 + Math.random() * 0.3
      }

      animId = requestAnimationFrame(draw)
    }

    animId = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position:      'fixed',
        top:           0,
        left:          0,
        width:         '100%',
        height:        '100%',
        pointerEvents: 'none',
        zIndex:        0,
        opacity:       0.22,
      }}
    />
  )
}
