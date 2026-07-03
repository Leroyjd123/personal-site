'use client'

import { useState, useMemo } from 'react'
import dynamic from 'next/dynamic'
import ArticleRow from './ArticleRow'

const CardNav = dynamic(() => import('./CardNav'), { ssr: false })

export default function WritingFilter({ posts = [] }) {
  const [filter, setFilter] = useState('all')

  const filteredPosts = useMemo(() => {
    if (!posts || posts.length === 0) return []
    return filter === 'all' ? posts : posts.filter(post => post.type === filter)
  }, [posts, filter])

  const essayCount    = posts.filter(p => p.type === 'essay').length
  const teardownCount = posts.filter(p => p.type === 'teardown').length
  const creativeCount = posts.filter(p => p.type === 'creative').length

  const cardNavItems = [
    {
      label: 'Essays',
      links: [
        { label: `All essays (${essayCount})`,    ariaLabel: 'Show essays',    onClick: () => setFilter('essay') },
        { label: 'Show all',                       ariaLabel: 'Show all posts', onClick: () => setFilter('all') },
      ]
    },
    {
      label: 'Teardowns',
      links: [
        { label: `All teardowns (${teardownCount})`, ariaLabel: 'Show teardowns',   onClick: () => setFilter('teardown') },
        { label: 'Show all',                          ariaLabel: 'Show all posts',   onClick: () => setFilter('all') },
      ]
    },
    {
      label: 'Creative',
      links: [
        { label: `All creative (${creativeCount})`, ariaLabel: 'Show creative work', onClick: () => setFilter('creative') },
        { label: 'Show all',                         ariaLabel: 'Show all posts',     onClick: () => setFilter('all') },
      ]
    },
  ]

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
        <button
          className={`fb ${filter === 'essay' ? 'on' : ''}`}
          onClick={() => setFilter('essay')}
        >
          Essays
        </button>
        <button
          className={`fb ${filter === 'teardown' ? 'on' : ''}`}
          onClick={() => setFilter('teardown')}
        >
          Teardowns
        </button>
        <button
          className={`fb ${filter === 'creative' ? 'on' : ''}`}
          onClick={() => setFilter('creative')}
        >
          Creative
        </button>
      </div>

      <div id="wlist">
        {filteredPosts && filteredPosts.length > 0 ? (
          filteredPosts.map((post, index) => (
            <ArticleRow key={`${post.slug}-${index}`} post={post} />
          ))
        ) : (
          <div style={{ padding: '20px', color: 'var(--text3)', fontSize: '12px' }}>
            No {filter !== 'all' ? filter : ''} posts found.
          </div>
        )}
      </div>
    </>
  )
}
