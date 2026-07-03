'use client'

import { useTheme } from '../context/ThemeContext'
import { hackerTech } from '../content/hacker'
import { creativeWriting } from '../content/creative'
import WritingFilter from './WritingFilter'

const LEVEL_COLOR = {
  DAILY:    'hk-badge-daily',
  EXPERT:   'hk-badge-expert',
  SHIPPED:  'hk-badge-shipped',
  LEARNING: 'hk-badge-learning',
  LEGACY:   'hk-badge-legacy',
}

export default function WritingOrTech({ posts }) {
  const { isHacker, isCreative } = useTheme()

  if (isHacker) {
    const h = hackerTech
    return (
      <div className="hk-sec hk-tech-page">
        <div className="hk-kicker">{h.kicker}</div>
        <h2 className="hk-sh hk-glow">{h.headline}</h2>
        <p className="hk-tech-intro">{h.intro}</p>
        <div className="hk-legend">
          <span className="hk-badge-daily">DAILY</span>
          <span className="hk-badge-expert">EXPERT</span>
          <span className="hk-badge-shipped">SHIPPED</span>
          <span className="hk-badge-learning">LEARNING</span>
          <span className="hk-badge-legacy">LEGACY</span>
        </div>
        <div className="hk-tech-cats">
          {h.categories.map((cat, i) => (
            <div key={i} className="hk-tech-cat" style={{ '--cat-i': i }}>
              <div className="hk-tech-cat-header">
                <span className="hk-tech-cat-icon">{cat.icon}</span>
                <span className="hk-tech-cat-name">{cat.name}</span>
                <span className="hk-tech-cat-count">{cat.items.length} modules</span>
              </div>
              <div className="hk-tech-items">
                {cat.items.map((item, j) => (
                  <div key={j} className="hk-tech-item" style={{ '--item-i': j }}>
                    <span className="hk-tech-item-name">{item.name}</span>
                    <span className={`hk-tech-level ${LEVEL_COLOR[item.level] || ''}`}>{item.level}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (isCreative) {
    const c = creativeWriting
    return (
      <div className="cr-sec stagger">
        <div className="cr-kicker">{c.kicker}</div>
        <h2 className="cr-sh">{c.headline}</h2>
        <p className="cr-body">{c.intro}</p>
        <WritingFilter posts={posts} creativeMode />
      </div>
    )
  }

  return (
    <div className="sec stagger">
      <div className="sk">Writing</div>
      <h2 className="sh">Words, when<br />they&apos;re <em>worth it</em>.</h2>
      <p className="body-text writing-intro">
        Essays, teardowns, and the occasional thing I can&apos;t categorise.
        Professional writing synced from WordPress — creative work going back to 2016.
      </p>
      <WritingFilter posts={posts} />
    </div>
  )
}
