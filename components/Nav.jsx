'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useState, useEffect, memo } from 'react'
import { useTheme } from '../context/ThemeContext'

function NavComponent() {
  const pathname = usePathname()
  const [lightTheme, setLightTheme] = useState('light')
  const { mode, isHacker, isCreative, booting, setMode } = useTheme()

  useEffect(() => {
    const savedTheme = localStorage.getItem('leroy-theme') || 'light'
    setLightTheme(savedTheme)
    if (mode === 'normal') {
      document.documentElement.dataset.theme = savedTheme
    }
  }, [mode])

  const toggleTheme = () => {
    const newTheme = lightTheme === 'light' ? 'dark' : 'light'
    setLightTheme(newTheme)
    localStorage.setItem('leroy-theme', newTheme)
    document.documentElement.dataset.theme = newTheme
  }

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
      <div className="logo" id="logo-el">
        {isHacker
          ? <span className="logo-hacker">{'>'}_leroy.dsouza</span>
          : isCreative
          ? <span className="logo-creative">✦ leroy</span>
          : 'Leroy Dsouza'
        }
      </div>
      <div className="nav-r">
        {navLinks.map(({ href, label }) => (
          <Link key={href} href={href} className={getActiveClass(href)}>{label}</Link>
        ))}
        {!isHacker && !isCreative && (
          <button
            className="theme-btn"
            onClick={toggleTheme}
            id="thbtn"
            title="Toggle light/dark"
          >
            {lightTheme === 'light' ? '☽' : '☀'}
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
