'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error('Error:', error)
  }, [error])

  return (
    <div className="sec" style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div className="sk">Error</div>
      <h2 className="sh">Something went<br /><em>wrong</em>.</h2>
      <p className="body-text" style={{ marginBottom: '32px' }}>
        An unexpected error occurred. We're working on fixing it.
      </p>
      <div style={{ display: 'flex', gap: '12px' }}>
        <button className="btn-p" onClick={() => reset()}>Try again</button>
        <Link href="/" className="btn-s">← Back home</Link>
      </div>
    </div>
  )
}
