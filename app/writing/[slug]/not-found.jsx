import Link from 'next/link'

export default function NotFound() {
  return (
    <>
      <div className="sec">
        <div className="sk">404</div>
        <h2 className="sh">Article not<br />found.</h2>
        <p className="body-text" style={{ marginBottom: '32px' }}>
          The article you're looking for doesn't exist or has been removed.
        </p>
        <Link href="/writing" className="btn-s">← Back to writing</Link>
      </div>
    </>
  )
}
