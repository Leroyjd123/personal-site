'use client'

import { useEffect, useState, useRef } from 'react'
import { useHacker } from '../context/HackerContext'
import './HackerBoot.css'

const BOOT_LINES = [
  '> init leroy.ljd...',
  '> loading: [ai] [product] [systems] [craft]',
  '> ai_tools: cursor + claude — active',
  '> 5× team output — verified',
  '> hacker_mode: ENABLED',
]

export default function HackerBoot() {
  const { booting } = useHacker()
  const [lines, setLines] = useState([])
  const [phase, setPhase] = useState('idle') // idle | glitch | terminal | done

  useEffect(() => {
    if (!booting) {
      setLines([])
      setPhase('idle')
      return
    }

    setPhase('glitch')
    setLines([])

    // glitch for 400ms then show terminal
    const t1 = setTimeout(() => {
      setPhase('terminal')
      let i = 0
      const iv = setInterval(() => {
        if (i < BOOT_LINES.length) {
          setLines(prev => [...prev, BOOT_LINES[i]])
          i++
        } else {
          clearInterval(iv)
        }
      }, 300)
    }, 400)

    return () => clearTimeout(t1)
  }, [booting])

  if (phase === 'idle') return null

  return (
    <div className={`hacker-boot hacker-boot--${phase}`}>
      {phase === 'glitch' && (
        <div className="hacker-glitch-bars">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="hacker-glitch-bar" style={{ '--i': i }} />
          ))}
        </div>
      )}
      {phase === 'terminal' && (
        <div className="hacker-boot-inner">
          <div className="hacker-boot-header">
            <span className="hacker-boot-title">LEROY_LJD.SYS</span>
            <span className="hacker-boot-sub">v2.6 · UDUPI KERNEL</span>
          </div>
          <div className="hacker-boot-lines">
            {lines.map((line, i) => (
              <div key={i} className="hacker-boot-line">{line}</div>
            ))}
            {booting && <div className="hacker-boot-cursor">█</div>}
          </div>
        </div>
      )}
    </div>
  )
}
