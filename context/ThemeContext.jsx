'use client'

import { createContext, useContext, useState, useEffect } from 'react'

// mode: 'normal' | 'hacker' | 'creative'
const ThemeContext = createContext({
  mode: 'normal',
  isHacker: false,
  isCreative: false,
  booting: false,
  setMode: () => {},
})

export function ThemeProvider({ children }) {
  const [mode, setModeState] = useState('normal')
  const [booting, setBooting] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('leroy-mode') || 'normal'
    applyMode(saved)
    setModeState(saved)
  }, [])

  function applyMode(m) {
    document.documentElement.dataset.mode = m
    // legacy compat
    document.documentElement.dataset.hacker = m === 'hacker' ? 'true' : 'false'
  }

  const setMode = (next) => {
    if (next === mode) return
    if (next === 'hacker') {
      setBooting(true)
      applyMode('hacker')
      localStorage.setItem('leroy-mode', 'hacker')
      setTimeout(() => {
        setModeState('hacker')
        setBooting(false)
      }, 2800)
    } else {
      setModeState(next)
      setBooting(false)
      applyMode(next)
      localStorage.setItem('leroy-mode', next)
    }
  }

  return (
    <ThemeContext.Provider value={{
      mode,
      isHacker: mode === 'hacker',
      isCreative: mode === 'creative',
      booting,
      setMode,
      // legacy compat
      toggleHacker: () => setMode(mode === 'hacker' ? 'normal' : 'hacker'),
    }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
// legacy alias so existing useHacker() calls still work
export const useHacker = () => {
  const ctx = useContext(ThemeContext)
  return { isHacker: ctx.isHacker, booting: ctx.booting, toggleHacker: ctx.toggleHacker }
}
