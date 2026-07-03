import Link from 'next/link'

export default function ArticleRow({ post }) {
  return (
    <Link href={`/writing/${post.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div className="art-row" data-t={post.type}>
        <div>
          <span className="art-title">{post.title}</span>
          <span className="art-tag">{post.tag}</span>
        </div>
        <div className="art-meta">{post.date}</div>
      </div>
    </Link>
  )
}