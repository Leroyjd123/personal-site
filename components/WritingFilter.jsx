'use client'

import { useState, useMemo } from 'react'
import ArticleRow from './ArticleRow'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'

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
        <span className="filter-label">Filter by type</span>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="!h-auto w-[190px] rounded-[2px] border-[0.5px] border-[var(--border)] bg-[var(--card)] px-3 py-[6px] text-[12px] font-normal text-[var(--text)] font-[DM_Sans,sans-serif] shadow-none focus-visible:ring-0 focus-visible:border-[var(--text3)] data-[state=open]:border-[var(--text3)]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="rounded-[2px] border-[0.5px] border-[var(--border)] bg-[var(--card)] text-[var(--text)] shadow-[0_4px_16px_rgba(0,0,0,0.08)] ring-0">
            <SelectItem value="all" className="rounded-[1px] text-[12px] data-[highlighted]:bg-[var(--bg2)] data-[highlighted]:text-[var(--text)]">
              All ({posts.length})
            </SelectItem>
            {types.map(({ type, label }) => (
              <SelectItem
                key={type}
                value={type}
                className="rounded-[1px] text-[12px] data-[highlighted]:bg-[var(--bg2)] data-[highlighted]:text-[var(--text)]"
              >
                {label} ({posts.filter(p => p.type === type).length})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
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
