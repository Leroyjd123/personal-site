import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="sec" style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div className="sk">404</div>
      <h2 className="sh">Page not<br />found.</h2>
      <p className="body-text" style={{ marginBottom: '32px' }}>
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link href="/" className="btn-s">← Back home</Link>
    </div>
  )
}
