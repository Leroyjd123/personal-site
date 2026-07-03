'use client'

import { useState, useMemo } from 'react'
import ArticleRow from './ArticleRow'

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

  return (
    <>
      <div className="filter-row" id="fbrow">
        <label htmlFor="type-filter" className="filter-label">Filter by type</label>
        <select
          id="type-filter"
          className="filter-select"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All ({posts.length})</option>
          {types.map(({ type, label }) => (
            <option key={type} value={type}>
              {label} ({posts.filter(p => p.type === type).length})
            </option>
          ))}
        </select>
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
