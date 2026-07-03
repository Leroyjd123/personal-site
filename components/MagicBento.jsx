'use client'

import { useRef, useEffect, useCallback, useState } from 'react'
import { gsap } from 'gsap'
import './MagicBento.css'

const MOBILE_BREAKPOINT = 768
const DEFAULT_GLOW_COLOR = '26, 39, 68'
const DEFAULT_SPOTLIGHT_RADIUS = 280
const DEFAULT_PARTICLE_COUNT = 8

// ─── Particle helpers ───────────────────────────────────────────────
const createParticle = (x, y, color) => {
  const el = document.createElement('div')
  el.style.cssText = `
    position:absolute;width:3px;height:3px;border-radius:50%;
    background:rgba(${color},0.9);box-shadow:0 0 5px rgba(${color},0.5);
    pointer-events:none;z-index:100;left:${x}px;top:${y}px;
  `
  return el
}

const spotlightValues = r => ({ proximity: r * 0.5, fadeDistance: r * 0.75 })

const setGlowProps = (card, mx, my, glow, radius) => {
  const r = card.getBoundingClientRect()
  card.style.setProperty('--glow-x', `${((mx - r.left) / r.width) * 100}%`)
  card.style.setProperty('--glow-y', `${((my - r.top) / r.height) * 100}%`)
  card.style.setProperty('--glow-intensity', String(glow))
  card.style.setProperty('--glow-radius', `${radius}px`)
}

// ─── ParticleCard ────────────────────────────────────────────────────
function ParticleCard({
  children, className = '', style,
  disableAnimations, particleCount, glowColor,
  enableTilt, clickEffect, enableMagnetism
}) {
  const ref = useRef(null)
  const particlesRef = useRef([])
  const timeoutsRef = useRef([])
  const hoveredRef = useRef(false)
  const memoParticles = useRef([])
  const initRef = useRef(false)
  const magnetRef = useRef(null)

  const initParticles = useCallback(() => {
    if (initRef.current || !ref.current) return
    const { width, height } = ref.current.getBoundingClientRect()
    memoParticles.current = Array.from({ length: particleCount }, () =>
      createParticle(Math.random() * width, Math.random() * height, glowColor)
    )
    initRef.current = true
  }, [particleCount, glowColor])

  const clearParticles = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout)
    timeoutsRef.current = []
    magnetRef.current?.kill()
    particlesRef.current.forEach(p => {
      gsap.to(p, {
        scale: 0, opacity: 0, duration: 0.25, ease: 'back.in(1.7)',
        onComplete: () => p.parentNode?.removeChild(p)
      })
    })
    particlesRef.current = []
  }, [])

  const animateParticles = useCallback(() => {
    if (!ref.current || !hoveredRef.current) return
    if (!initRef.current) initParticles()

    memoParticles.current.forEach((particle, i) => {
      const id = setTimeout(() => {
        if (!hoveredRef.current || !ref.current) return
        const clone = particle.cloneNode(true)
        ref.current.appendChild(clone)
        particlesRef.current.push(clone)
        gsap.fromTo(clone, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.28, ease: 'back.out(1.7)' })
        gsap.to(clone, { x: (Math.random() - 0.5) * 80, y: (Math.random() - 0.5) * 80, rotation: Math.random() * 360, duration: 2 + Math.random() * 2, ease: 'none', repeat: -1, yoyo: true })
        gsap.to(clone, { opacity: 0.25, duration: 1.4, ease: 'power2.inOut', repeat: -1, yoyo: true })
      }, i * 90)
      timeoutsRef.current.push(id)
    })
  }, [initParticles])

  useEffect(() => {
    if (disableAnimations || !ref.current) return
    const el = ref.current

    const onEnter = () => {
      hoveredRef.current = true
      animateParticles()
      if (enableTilt) gsap.to(el, { rotateX: 4, rotateY: 4, duration: 0.3, ease: 'power2.out', transformPerspective: 1000 })
    }
    const onLeave = () => {
      hoveredRef.current = false
      clearParticles()
      if (enableTilt) gsap.to(el, { rotateX: 0, rotateY: 0, duration: 0.3, ease: 'power2.out' })
      if (enableMagnetism) gsap.to(el, { x: 0, y: 0, duration: 0.3, ease: 'power2.out' })
    }
    const onMove = e => {
      if (!enableTilt && !enableMagnetism) return
      const r = el.getBoundingClientRect()
      const x = e.clientX - r.left, y = e.clientY - r.top
      const cx = r.width / 2, cy = r.height / 2
      if (enableTilt) gsap.to(el, { rotateX: ((y - cy) / cy) * -8, rotateY: ((x - cx) / cx) * 8, duration: 0.1, ease: 'power2.out', transformPerspective: 1000 })
      if (enableMagnetism) { magnetRef.current = gsap.to(el, { x: (x - cx) * 0.04, y: (y - cy) * 0.04, duration: 0.3, ease: 'power2.out' }) }
    }
    const onClick = e => {
      if (!clickEffect) return
      const r = el.getBoundingClientRect()
      const x = e.clientX - r.left, y = e.clientY - r.top
      const d = Math.max(Math.hypot(x, y), Math.hypot(x - r.width, y), Math.hypot(x, y - r.height), Math.hypot(x - r.width, y - r.height))
      const ripple = document.createElement('div')
      ripple.style.cssText = `position:absolute;width:${d * 2}px;height:${d * 2}px;border-radius:50%;background:radial-gradient(circle,rgba(${glowColor},0.3) 0%,rgba(${glowColor},0.1) 35%,transparent 70%);left:${x - d}px;top:${y - d}px;pointer-events:none;z-index:1000;`
      el.appendChild(ripple)
      gsap.fromTo(ripple, { scale: 0, opacity: 1 }, { scale: 1, opacity: 0, duration: 0.75, ease: 'power2.out', onComplete: () => ripple.remove() })
    }

    el.addEventListener('mouseenter', onEnter)
    el.addEventListener('mouseleave', onLeave)
    el.addEventListener('mousemove', onMove)
    el.addEventListener('click', onClick)
    return () => {
      hoveredRef.current = false
      el.removeEventListener('mouseenter', onEnter)
      el.removeEventListener('mouseleave', onLeave)
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('click', onClick)
      clearParticles()
    }
  }, [animateParticles, clearParticles, disableAnimations, enableTilt, enableMagnetism, clickEffect, glowColor])

  return (
    <div ref={ref} className={className} style={{ ...style, position: 'relative', overflow: 'hidden' }}>
      {children}
    </div>
  )
}

// ─── GlobalSpotlight ─────────────────────────────────────────────────
function GlobalSpotlight({ gridRef, disableAnimations, enabled, spotlightRadius, glowColor }) {
  const spotRef = useRef(null)

  useEffect(() => {
    if (disableAnimations || !gridRef?.current || !enabled) return

    const spot = document.createElement('div')
    spot.style.cssText = `position:fixed;width:600px;height:600px;border-radius:50%;pointer-events:none;background:radial-gradient(circle,rgba(${glowColor},0.12) 0%,rgba(${glowColor},0.05) 20%,rgba(${glowColor},0.02) 40%,transparent 65%);z-index:200;opacity:0;transform:translate(-50%,-50%);mix-blend-mode:multiply;`
    document.body.appendChild(spot)
    spotRef.current = spot

    const onMove = e => {
      if (!spotRef.current || !gridRef.current) return
      const section = gridRef.current.closest('.bento-section')
      const rect = section?.getBoundingClientRect()
      const inside = rect && e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom

      const cards = gridRef.current.querySelectorAll('.magic-bento-card')

      if (!inside) {
        gsap.to(spotRef.current, { opacity: 0, duration: 0.3 })
        cards.forEach(c => c.style.setProperty('--glow-intensity', '0'))
        return
      }

      const { proximity, fadeDistance } = spotlightValues(spotlightRadius)
      let minDist = Infinity

      cards.forEach(card => {
        const r = card.getBoundingClientRect()
        const cx = r.left + r.width / 2, cy = r.top + r.height / 2
        const dist = Math.max(0, Math.hypot(e.clientX - cx, e.clientY - cy) - Math.max(r.width, r.height) / 2)
        minDist = Math.min(minDist, dist)
        const gi = dist <= proximity ? 1 : dist <= fadeDistance ? (fadeDistance - dist) / (fadeDistance - proximity) : 0
        setGlowProps(card, e.clientX, e.clientY, gi, spotlightRadius)
      })

      gsap.to(spotRef.current, { left: e.clientX, top: e.clientY, duration: 0.1 })
      const targetOpacity = minDist <= proximity ? 0.7 : minDist <= fadeDistance ? ((fadeDistance - minDist) / (fadeDistance - proximity)) * 0.7 : 0
      gsap.to(spotRef.current, { opacity: targetOpacity, duration: targetOpacity > 0 ? 0.2 : 0.4 })
    }

    const onLeave = () => {
      gridRef.current?.querySelectorAll('.magic-bento-card').forEach(c => c.style.setProperty('--glow-intensity', '0'))
      if (spotRef.current) gsap.to(spotRef.current, { opacity: 0, duration: 0.3 })
    }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeave)
    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      spotRef.current?.parentNode?.removeChild(spotRef.current)
    }
  }, [gridRef, disableAnimations, enabled, spotlightRadius, glowColor])

  return null
}

// ─── MagicBento ──────────────────────────────────────────────────────
export default function MagicBento({
  cards,
  enableStars = true,
  enableSpotlight = true,
  enableBorderGlow = true,
  disableAnimations = false,
  spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
  particleCount = DEFAULT_PARTICLE_COUNT,
  enableTilt = false,
  glowColor = DEFAULT_GLOW_COLOR,
  clickEffect = true,
  enableMagnetism = true,
}) {
  const gridRef = useRef(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const shouldDisable = disableAnimations || isMobile

  const cardClass = [
    'magic-bento-card',
    enableBorderGlow ? 'magic-bento-card--border-glow' : ''
  ].filter(Boolean).join(' ')

  const cardContent = (card) => (
    <>
      <div className="magic-bento-card__header">
        <div className="magic-bento-card__num">{card.num}</div>
        <div className="magic-bento-card__label">{card.label}</div>
      </div>
      <div className="magic-bento-card__content">
        <h3 className="magic-bento-card__title">{card.title}</h3>
        <p className="magic-bento-card__description">{card.description}</p>
        <div className="magic-bento-card__status">{card.status}</div>
      </div>
    </>
  )

  return (
    <>
      {enableSpotlight && (
        <GlobalSpotlight
          gridRef={gridRef}
          disableAnimations={shouldDisable}
          enabled={enableSpotlight}
          spotlightRadius={spotlightRadius}
          glowColor={glowColor}
        />
      )}
      <div className="bento-grid bento-section" ref={gridRef}>
        {cards.map((card, i) =>
          enableStars ? (
            <ParticleCard
              key={i}
              className={cardClass}
              disableAnimations={shouldDisable}
              particleCount={particleCount}
              glowColor={glowColor}
              enableTilt={enableTilt}
              clickEffect={clickEffect}
              enableMagnetism={enableMagnetism}
            >
              {cardContent(card)}
            </ParticleCard>
          ) : (
            <div key={i} className={cardClass}>
              {cardContent(card)}
            </div>
          )
        )}
      </div>
    </>
  )
}
