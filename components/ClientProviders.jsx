'use client'

import dynamic from 'next/dynamic'
import { ThemeProvider } from '../context/ThemeContext'
import { useTheme } from '../context/ThemeContext'
import Nav from './Nav'
import CursorGlow from './CursorGlow'
import EasterEggs from './EasterEggs'
import HackerBoot from './HackerBoot'

const BubbleMenu = dynamic(() => import('./BubbleMenu'), { ssr: false })
const JaliCanvas = dynamic(() => import('./JaliCanvas'), { ssr: false })
const MatrixRain = dynamic(() => import('./MatrixRain'), { ssr: false })
const AuroraCanvas = dynamic(() => import('./AuroraCanvas'), { ssr: false })

function Background() {
  const { mode } = useTheme()
  if (mode === 'hacker') return <MatrixRain />
  if (mode === 'creative') return <AuroraCanvas />
  return <JaliCanvas />
}

function FooterText() {
  const { mode } = useTheme()
  if (mode === 'creative') return (
    <>
      <span>© 2026 Leroy Dsouza</span>
      <span>Udupi, Karnataka · Made with wonder ✨</span>
    </>
  )
  if (mode === 'hacker') return (
    <>
      <span style={{ color: 'var(--hk-text3)', fontFamily: 'var(--font-mono)' }}>© 2026 leroy@ljd</span>
      <span style={{ color: 'var(--hk-text3)', fontFamily: 'var(--font-mono)' }}>build · automate · ship</span>
    </>
  )
  return (
    <>
      <span>© 2026 Leroy Dsouza</span>
      <span>Udupi, Karnataka · Made with intention</span>
    </>
  )
}

export default function ClientProviders({ children }) {
  return (
    <ThemeProvider>
      <CursorGlow />
      <Background />
      <div className="desktop-nav"><Nav /></div>
      <div className="mobile-nav"><BubbleMenu /></div>
      <main>{children}</main>
      <footer>
        <FooterText />
      </footer>
      <EasterEggs />
      <HackerBoot />
    </ThemeProvider>
  )
}
