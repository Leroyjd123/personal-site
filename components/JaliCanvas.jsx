'use client'

import { useRef, useEffect, memo } from 'react'

function JaliCanvasComponent() {
  const canvasRef = useRef(null)
  const tRef = useRef(0)
  const rafRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const setCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const drawJali = () => {
      const W = canvas.width
      const H = canvas.height
      const t = tRef.current

      ctx.clearRect(0, 0, W, H)
      const dark = document.documentElement.dataset.theme === 'dark'
      ctx.strokeStyle = dark ? 'rgba(180,160,120,0.055)' : 'rgba(26,39,68,0.042)'
      ctx.lineWidth = 0.65

      const cell = 60
      const cols = Math.ceil(W / cell) + 2
      const rows = Math.ceil(H / cell) + 2
      const breathe = Math.sin(t * 0.0003) * 1.8

      ctx.save()
      ctx.translate(-cell + breathe * 0.4, -cell)
      for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) drawCell(ctx, c * cell, r * cell, cell)
      ctx.restore()

      // finer offset layer
      ctx.save()
      ctx.translate(-cell * 0.5 + breathe * 0.2, -cell * 0.5)
      ctx.globalAlpha = 0.5
      for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) drawStar(ctx, c * cell, r * cell, cell)
      ctx.restore()
      ctx.globalAlpha = 1
    }

    const drawCell = (ctx, x, y, s) => {
      const h = s / 2, q = s / 4, e = s / 8
      // outer frame
      ctx.beginPath()
      ctx.rect(x + 1, y + 1, s - 2, s - 2)
      ctx.stroke()
      // full diagonals
      ctx.beginPath()
      ctx.moveTo(x, y)
      ctx.lineTo(x + s, y + s)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(x + s, y)
      ctx.lineTo(x, y + s)
      ctx.stroke()
      // rotated inner square — jali lattice form
      ctx.beginPath()
      ctx.moveTo(x + h, y + q)
      ctx.lineTo(x + s - q, y + h)
      ctx.lineTo(x + h, y + s - q)
      ctx.lineTo(x + q, y + h)
      ctx.closePath()
      ctx.stroke()
      // midpoint connecting lines
      ctx.beginPath()
      ctx.moveTo(x, y + h)
      ctx.lineTo(x + s, y + h)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(x + h, y)
      ctx.lineTo(x + h, y + s)
      ctx.stroke()
      // petal arcs — jharokha cusps
      ctx.beginPath()
      ctx.arc(x + h, y, e, 0, Math.PI, false)
      ctx.stroke()
      ctx.beginPath()
      ctx.arc(x + h, y + s, e, Math.PI, 0, false)
      ctx.stroke()
      ctx.beginPath()
      ctx.arc(x, y + h, e, Math.PI * 1.5, Math.PI * 0.5, false)
      ctx.stroke()
      ctx.beginPath()
      ctx.arc(x + s, y + h, e, Math.PI * 0.5, Math.PI * 1.5, false)
      ctx.stroke()
      // corner quarter-arcs
      ctx.beginPath()
      ctx.arc(x, y, q, 0, Math.PI * 0.5)
      ctx.stroke()
      ctx.beginPath()
      ctx.arc(x + s, y, q, Math.PI * 0.5, Math.PI)
      ctx.stroke()
      ctx.beginPath()
      ctx.arc(x + s, y + s, q, Math.PI, Math.PI * 1.5)
      ctx.stroke()
      ctx.beginPath()
      ctx.arc(x, y + s, q, Math.PI * 1.5, Math.PI * 2)
      ctx.stroke()
      // inner circle
      ctx.beginPath()
      ctx.arc(x + h, y + h, e * 0.6, 0, Math.PI * 2)
      ctx.stroke()
      // trefoil petals at midpoints
      const pr = e * 0.5
      ;[[x + q, y + q], [x + s - q, y + q], [x + s - q, y + s - q], [x + q, y + s - q]].forEach(([cx, cy]) => {
        ctx.beginPath()
        ctx.arc(cx, cy, pr, 0, Math.PI * 2)
        ctx.stroke()
      })
    }

    const drawStar = (ctx, x, y, s) => {
      // 8-pointed Ashokan star — Indic geometric
      const h = s / 2, r1 = h * 0.38, r2 = h * 0.20
      ctx.save()
      ctx.translate(x + h, y + h)
      ctx.beginPath()
      for (let i = 0; i < 16; i++) {
        const angle = (i / 16) * Math.PI * 2 - Math.PI / 2
        const r = i % 2 === 0 ? r1 : r2
        if (i === 0) ctx.moveTo(Math.cos(angle) * r, Math.sin(angle) * r)
        else ctx.lineTo(Math.cos(angle) * r, Math.sin(angle) * r)
      }
      ctx.closePath()
      ctx.stroke()
      // inner decorative ring
      ctx.beginPath()
      ctx.arc(0, 0, r2 * 0.8, 0, Math.PI * 2)
      ctx.stroke()
      ctx.restore()
    }

    const animate = () => {
      tRef.current++
      drawJali()
      rafRef.current = requestAnimationFrame(animate)
    }

    setCanvasSize()
    animate()

    const handleResize = () => setCanvasSize()
    window.addEventListener('resize', handleResize)

    const observer = new MutationObserver(() => drawJali())
    observer.observe(document.documentElement, { attributes: true })

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', handleResize)
      observer.disconnect()
    }
  }, [])

  return <canvas ref={canvasRef} id="jali-canvas" />
}

export default memo(JaliCanvasComponent)