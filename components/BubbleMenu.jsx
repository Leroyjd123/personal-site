'use client'

import { useState, useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import Link from 'next/link'
import './BubbleMenu.css'

const NAV_ITEMS = [
  { label: 'Home',     href: '/' },
  { label: 'About',    href: '/about' },
  { label: 'Work',     href: '/work' },
  { label: 'Projects', href: '/projects' },
  { label: 'Writing',  href: '/writing' },
  { label: 'Contact',  href: '/contact' },
]

export default function BubbleMenu({
  animationEase = 'back.out(1.4)',
  animationDuration = 0.45,
  staggerDelay = 0.07,
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showOverlay, setShowOverlay] = useState(false)

  const overlayRef = useRef(null)
  const bubblesRef = useRef([])
  const labelRefs = useRef([])

  const handleToggle = () => {
    const nextState = !isMenuOpen
    if (nextState) setShowOverlay(true)
    setIsMenuOpen(nextState)
  }

  const handleLinkClick = () => {
    setIsMenuOpen(false)
  }

  useEffect(() => {
    const overlay = overlayRef.current
    const bubbles = bubblesRef.current.filter(Boolean)
    const labels = labelRefs.current.filter(Boolean)

    if (!overlay || !bubbles.length) return

    if (isMenuOpen) {
      gsap.set(overlay, { display: 'flex' })
      gsap.killTweensOf([...bubbles, ...labels])
      gsap.set(bubbles, { scale: 0, transformOrigin: '50% 50%' })
      gsap.set(labels, { y: 20, autoAlpha: 0 })

      bubbles.forEach((bubble, i) => {
        const delay = i * staggerDelay + gsap.utils.random(-0.03, 0.03)
        const tl = gsap.timeline({ delay })
        tl.to(bubble, { scale: 1, duration: animationDuration, ease: animationEase })
        if (labels[i]) {
          tl.to(labels[i], {
            y: 0, autoAlpha: 1,
            duration: animationDuration * 0.8,
            ease: 'power3.out'
          }, `-=${animationDuration * 0.85}`)
        }
      })
    } else if (showOverlay) {
      gsap.killTweensOf([...bubbles, ...labels])
      gsap.to(labels, { y: 20, autoAlpha: 0, duration: 0.18, ease: 'power3.in' })
      gsap.to(bubbles, {
        scale: 0, duration: 0.18, ease: 'power3.in',
        onComplete: () => {
          gsap.set(overlay, { display: 'none' })
          setShowOverlay(false)
        }
      })
    }
  }, [isMenuOpen, showOverlay, animationEase, animationDuration, staggerDelay])

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isMenuOpen])

  const menuBg = 'var(--bg2)'
  const menuColor = 'var(--text)'

  return (
    <>
      <nav className="bubble-menu fixed" aria-label="Mobile navigation">
        <Link href="/" className="bubble logo-bubble" style={{ background: menuBg, color: menuColor }}>
          <span className="logo-content">LJD</span>
        </Link>

        <button
          type="button"
          className={`bubble toggle-bubble menu-btn ${isMenuOpen ? 'open' : ''}`}
          onClick={handleToggle}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-pressed={isMenuOpen}
        >
          <span className="menu-line" style={{ background: menuColor }} />
          <span className="menu-line" style={{ background: menuColor }} />
        </button>
      </nav>

      {showOverlay && (
        <div
          ref={overlayRef}
          className="bubble-menu-items fixed"
          aria-hidden={!isMenuOpen}
        >
          <ul className="pill-list" role="menu" aria-label="Navigation links">
            {NAV_ITEMS.map((item, idx) => (
              <li key={idx} role="none" className="pill-col">
                <Link
                  role="menuitem"
                  href={item.href}
                  className="pill-link"
                  onClick={handleLinkClick}
                  ref={el => { if (el) bubblesRef.current[idx] = el }}
                >
                  <span
                    className="pill-label"
                    ref={el => { if (el) labelRefs.current[idx] = el }}
                  >
                    {item.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  )
}
