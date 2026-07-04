import Link from 'next/link'
import { getPost } from '../../../lib/wordpress'
import { notFound } from 'next/navigation'

export async function generateMetadata({ params }) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) return { title: 'Not Found' }
  const clean = post.excerpt
    ? post.excerpt.replace(/<[^>]+>/g, '').trim().slice(0, 155)
    : `${post.title} — an essay by Leroy Dsouza.`
  return {
    title: post.title,
    description: clean,
    openGraph: {
      title: `${post.title} · Leroy Dsouza`,
      description: clean,
      url: `https://leroydsa.com/writing/${slug}`,
      type: 'article',
      publishedTime: post.dateISO,
      authors: ['Leroy Dsouza'],
      ...(post.featuredImage && { images: [{ url: post.featuredImage }] }),
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: clean,
      ...(post.featuredImage && { images: [post.featuredImage] }),
    },
    alternates: { canonical: `https://leroydsa.com/writing/${slug}` },
  }
}

export default async function ArticlePage({ params }) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) notFound()

  return (
    <div className="sec">
      <Link href="/writing" className="btn-s" style={{ fontSize: '10px', marginBottom: '24px' }}>
        ← Back to writing
      </Link>
      <div style={{ marginTop: '32px' }}>
        <h1 className="sh">{post.title}</h1>
        <div style={{ fontSize: '11px', color: 'var(--text3)', marginBottom: '32px', letterSpacing: '0.05em' }}>
          {post.date}
        </div>
        {post.featuredImage && (
          <img
            src={post.featuredImage}
            alt=""
            style={{ maxWidth: '640px', width: '100%', height: 'auto', borderRadius: '4px', marginBottom: '32px' }}
          />
        )}
        <div
          className="body-text article-content"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
    </div>
  )
}
