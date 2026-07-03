'use client'

import { useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import './CardNav.css'

// Inline arrow icon — no react-icons dependency needed
const ArrowIcon = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="nav-card-link-icon" aria-hidden="true">
    <path d="M2 8L8 2M8 2H3M8 2V7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

export default function CardNav({ label = 'Jump to', items = [], ease = 'power3.out' }) {
  const [isOpen, setIsOpen] = useState(false)
  const navRef = useRef(null)
  const cardsRef = useRef([])
  const tlRef = useRef(null)

  const calcHeight = () => {
    const navEl = navRef.current
    if (!navEl) return 200
    const isMobile = window.matchMedia('(max-width: 640px)').matches
    const rows = isMobile ? items.length : 1
    // 48px top bar + card rows (each ~120px on mobile, single row on desktop)
    return 48 + rows * 130 + 16
  }

  const buildTimeline = () => {
    const navEl = navRef.current
    if (!navEl) return null
    gsap.set(navEl, { height: 48, overflow: 'hidden' })
    gsap.set(cardsRef.current.filter(Boolean), { y: 18, opacity: 0 })
    const tl = gsap.timeline({ paused: true })
    tl.to(navEl, { height: calcHeight, duration: 0.38, ease })
    tl.to(cardsRef.current.filter(Boolean), { y: 0, opacity: 1, duration: 0.35, ease, stagger: 0.07 }, '-=0.1')
    return tl
  }

  useLayoutEffect(() => {
    const tl = buildTimeline()
    tlRef.current = tl
    return () => { tl?.kill(); tlRef.current = null }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ease, items.length])

  useLayoutEffect(() => {
    const onResize = () => {
      if (!tlRef.current) return
      tlRef.current.kill()
      const tl = buildTimeline()
      tlRef.current = tl
      if (isOpen) tl?.progress(1)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen])

  const toggle = () => {
    const tl = tlRef.current
    if (!tl) return
    if (!isOpen) {
      setIsOpen(true)
      tl.play(0)
    } else {
      tl.eventCallback('onReverseComplete', () => setIsOpen(false))
      tl.reverse()
    }
  }

  return (
    <div className="card-nav-wrapper">
      <div ref={navRef} className={`card-nav${isOpen ? ' open' : ''}`}>
        <div className="card-nav-top">
          <span className="card-nav-label">{label}</span>
          <button
            className={`card-nav-hamburger${isOpen ? ' open' : ''}`}
            onClick={toggle}
            aria-label={isOpen ? 'Close navigation' : 'Open navigation'}
            aria-expanded={isOpen}
          >
            <span className="hamburger-ln" />
            <span className="hamburger-ln" />
          </button>
        </div>

        <div className="card-nav-content" aria-hidden={!isOpen}>
          {items.slice(0, 3).map((item, idx) => (
            <div
              key={idx}
              className="nav-card"
              ref={el => { if (el) cardsRef.current[idx] = el }}
            >
              <div className="nav-card-label">{item.label}</div>
              <div className="nav-card-links">
                {item.links?.map((link, i) => (
                  <button
                    key={i}
                    className="nav-card-link"
                    onClick={link.onClick}
                    aria-label={link.ariaLabel || link.label}
                    tabIndex={isOpen ? 0 : -1}
                  >
                    <ArrowIcon />
                    {link.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
