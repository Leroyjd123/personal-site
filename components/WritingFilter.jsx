'use client'

import { useState, useMemo } from 'react'
import dynamic from 'next/dynamic'
import ArticleRow from './ArticleRow'

const CardNav = dynamic(() => import('./CardNav'), { ssr: false })

export default function WritingFilter({ posts = [] }) {
  const [filter, setFilter] = useState('all')

  const types = useMemo(() => {
    const seen = new Map()
    posts.forEach(post => {
      if (post.type && !seen.has(post.type)) seen.set(post.type, post.tag || post.type)
    })
    return Array.from(seen, ([type, label]) => ({ type, label }))
  }, [posts])

  const filteredPosts = useMemo(() => {
    if (!posts || posts.length === 0) return []
    return filter === 'all' ? posts : posts.filter(post => post.type === filter)
  }, [posts, filter])

  const cardNavItems = types.slice(0, 3).map(({ type, label }) => ({
    label,
    links: [
      { label: `All ${label.toLowerCase()} (${posts.filter(p => p.type === type).length})`, ariaLabel: `Show ${label}`, onClick: () => setFilter(type) },
      { label: 'Show all', ariaLabel: 'Show all posts', onClick: () => setFilter('all') },
    ]
  }))

  return (
    <>
      <CardNav label="Browse by type" items={cardNavItems} />

      <div className="filter-row" id="fbrow">
        <button
          className={`fb ${filter === 'all' ? 'on' : ''}`}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        {types.map(({ type, label }) => (
          <button
            key={type}
            className={`fb ${filter === type ? 'on' : ''}`}
            onClick={() => setFilter(type)}
          >
            {label}
          </button>
        ))}
      </div>

      <div id="wlist">
        {filteredPosts && filteredPosts.length > 0 ? (
          filteredPosts.map((post, index) => (
            <ArticleRow key={`${post.slug}-${index}`} post={post} />
          ))
        ) : (
          <div style={{ padding: '20px', color: 'var(--text3)', fontSize: '12px' }}>
            No posts found.
          </div>
        )}
      </div>
    </>
  )
}
