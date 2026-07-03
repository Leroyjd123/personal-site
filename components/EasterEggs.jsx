'use client'

import { useEffect } from 'react'

export default function EasterEggs() {
  useEffect(() => {
    // Easter Egg 1 — Konami code
    const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]
    let konamiPos = 0

    const handleKonami = (e) => {
      konamiPos = e.keyCode === konamiCode[konamiPos] ? konamiPos + 1 : 0
      if (konamiPos === konamiCode.length) {
        console.log(
          '%c✦ ನೀವು ಕಂಡುಹಿಡಿದಿರಿ — You found it.\n   Elegant Wisdom · Dhisingara Technologies\n\n   "The pattern was always there. You just had to look."',
          'color:#8ba5d8;font-size:15px;font-style:italic;line-height:1.8;'
        )
        konamiPos = 0
      }
    }

    // Easter Egg 2 — Logo × 7
    let logoClicks = 0
    let logoTimeout
    const handleLogoClick = () => {
      logoClicks++
      clearTimeout(logoTimeout)
      if (logoClicks === 7) {
        document.documentElement.style.setProperty('--accent', '#7a1535')
        document.documentElement.style.setProperty('--accent2', '#4a1028')
        setTimeout(() => {
          document.documentElement.style.removeProperty('--accent')
          document.documentElement.style.removeProperty('--accent2')
        }, 4000)
        logoClicks = 0
      } else {
        logoTimeout = setTimeout(() => (logoClicks = 0), 1600)
      }
    }

    // Easter Egg 3 — Idle 45s
    let idleTimer
    const resetIdle = () => {
      clearTimeout(idleTimer)
      idleTimer = setTimeout(() => {
        document.documentElement.style.setProperty('--accent', '#6b3fa0')
        setTimeout(
          () => document.documentElement.style.removeProperty('--accent'),
          4000
        )
      }, 45000)
    }

    // Attach logo click listener to actual logo element
    const logoEl = document.getElementById('logo-el')
    if (logoEl) {
      logoEl.addEventListener('click', handleLogoClick)
    }

    document.addEventListener('keydown', handleKonami)
    document.addEventListener('keydown', resetIdle)
    document.addEventListener('mousemove', resetIdle)

    resetIdle()

    return () => {
      document.removeEventListener('keydown', handleKonami)
      document.removeEventListener('keydown', resetIdle)
      document.removeEventListener('mousemove', resetIdle)
      if (logoEl) {
        logoEl.removeEventListener('click', handleLogoClick)
      }
      clearTimeout(logoTimeout)
      clearTimeout(idleTimer)
    }
  }, [])

  return null
}