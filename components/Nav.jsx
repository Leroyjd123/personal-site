'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useState, useEffect, memo } from 'react'
import { useTheme } from '../context/ThemeContext'

const SunIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.6"/>
    <path d="M12 2.5V5M12 19V21.5M4.2 4.2L6 6M18 18L19.8 19.8M2.5 12H5M19 12H21.5M4.2 19.8L6 18M18 6L19.8 4.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
  </svg>
)
const MoonIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a6.8 6.8 0 0 0 10.5 10.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
  </svg>
)
const SystemIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect x="3" y="4.5" width="18" height="12" rx="1" stroke="currentColor" strokeWidth="1.6"/>
    <path d="M8.5 19.5H15.5M12 16.5V19.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
  </svg>
)

const THEME_OPTIONS = [
  { value: 'light',  label: 'Light theme',  Icon: SunIcon },
  { value: 'dark',   label: 'Dark theme',   Icon: MoonIcon },
  { value: 'system', label: 'System theme', Icon: SystemIcon },
]
const NEXT_THEME = { light: 'dark', dark: 'system', system: 'light' }

function NavComponent() {
  const pathname = usePathname()
  const [themePref, setThemePref] = useState('light')
  const { mode, isHacker, isCreative, booting, setMode } = useTheme()

  const applyResolvedTheme = (pref) => {
    const resolved = pref === 'system'
      ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      : pref
    document.documentElement.dataset.theme = resolved
  }

  useEffect(() => {
    const saved = localStorage.getItem('leroy-theme') || 'light'
    setThemePref(saved)
    if (mode === 'normal') applyResolvedTheme(saved)
  }, [mode])

  useEffect(() => {
    if (themePref !== 'system') return
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = () => applyResolvedTheme('system')
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [themePref])

  const selectTheme = (pref) => {
    setThemePref(pref)
    localStorage.setItem('leroy-theme', pref)
    applyResolvedTheme(pref)
  }

  const cycleTheme = () => selectTheme(NEXT_THEME[themePref])

  const getActiveClass = (path) => pathname === path ? 'nl on' : 'nl'

  const navLinks = isHacker
    ? [
        { href: '/',         label: '~/home' },
        { href: '/about',    label: '~/about' },
        { href: '/work',     label: '~/work' },
        { href: '/projects', label: '~/projects' },
        { href: '/writing',  label: '~/tech' },
        { href: '/contact',  label: '~/contact' },
      ]
    : isCreative
    ? [
        { href: '/',         label: 'Home' },
        { href: '/about',    label: 'About' },
        { href: '/writing',  label: 'Writing' },
        { href: '/contact',  label: 'Say hello' },
      ]
    : [
        { href: '/',         label: 'Home' },
        { href: '/about',    label: 'About' },
        { href: '/work',     label: 'Work' },
        { href: '/projects', label: 'Projects' },
        { href: '/writing',  label: 'Writing' },
        { href: '/contact',  label: 'Contact' },
      ]

  return (
    <nav>
      <Link href="/" className="logo" id="logo-el">
        {isHacker
          ? <span className="logo-hacker">{'>'}_leroy.dsouza</span>
          : isCreative
          ? <span className="logo-creative">✦ leroy</span>
          : 'Leroy Dsouza'
        }
      </Link>
      <div className="nav-r">
        {navLinks.map(({ href, label }) => (
          <Link key={href} href={href} className={getActiveClass(href)}>{label}</Link>
        ))}
        {!isHacker && !isCreative && (
          <button
            type="button"
            className="theme-toggle"
            onClick={cycleTheme}
            title={`Theme: ${THEME_OPTIONS.find(o => o.value === themePref)?.label} (click to change)`}
          >
            {(() => {
              const Icon = THEME_OPTIONS.find(o => o.value === themePref)?.Icon || SunIcon
              return <Icon />
            })()}
          </button>
        )}
        <button
          className={`hacker-btn${isHacker || (booting && !isCreative) ? ' active' : ''}`}
          onClick={() => setMode(mode === 'hacker' ? 'normal' : 'hacker')}
          title={isHacker ? 'Exit hacker mode' : 'Enter hacker mode'}
          aria-label="Toggle hacker mode"
        >
          {'>_'}
        </button>
        <button
          className={`creative-btn${isCreative ? ' active' : ''}`}
          onClick={() => setMode(mode === 'creative' ? 'normal' : 'creative')}
          title={isCreative ? 'Exit creative mode' : 'Enter creative mode'}
          aria-label="Toggle creative mode"
        >
          ✦
        </button>
      </div>
    </nav>
  )
}

export default memo(NavComponent)
