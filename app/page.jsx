'use client'

import Link from 'next/link'
import { homeContent } from '../content/home'
import { hackerHome } from '../content/hacker'
import { creativeHome } from '../content/creative'
import { useTheme } from '../context/ThemeContext'
import RotatingText from '../components/effects/RotatingText'
import ShinyText from '../components/effects/ShinyText'

export default function Home() {
  const { isHacker, isCreative } = useTheme()

  if (isHacker) {
    const h = hackerHome
    return (
      <>
        <div className="hero stagger hk-hero">
          <div className="hk-prompt">{h.hero.greeting} <span className="hk-cursor">█</span></div>
          <h1 className="hk-h1">
            <span className="hk-h1-line">{h.hero.title}</span>
            <span className="hk-h1-line">{h.hero.titleSub}</span>
            <span className="hk-h1-line hk-accent">{h.hero.titleEm}</span>
          </h1>
          <p className="hk-desc" style={{ marginBottom: '32px' }}>{h.hero.description}</p>
          <div className="cta-row">
            {h.hero.cta.map((btn, i) => (
              <Link key={i} href={btn.href} className={btn.primary ? 'hk-btn-p' : 'hk-btn-s'}>
                {btn.label}
              </Link>
            ))}
          </div>
          <div className="hk-avail">
            <span className="hk-avail-dot" />
            <span>{h.availability}</span>
          </div>
        </div>

        <div className="hk-stack-strip stagger">
          {h.stack.map((s, i) => (
            <div key={i} className="hk-stack-item">
              <span className="hk-stack-type">{s.type}</span>
              <span className="hk-stack-label">{s.label}</span>
            </div>
          ))}
        </div>

        <div className="hk-divider">
          <span className="hk-divider-text">// metrics.json</span>
        </div>

        <div className="hk-stats stagger">
          {h.stats.map((s, i) => (
            <div key={i} className="hk-stat">
              <div className="hk-stat-value">{s.value}</div>
              <div className="hk-stat-label">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="hk-divider">
          <span className="hk-divider-text">// activity.log</span>
        </div>

        <div className="hk-log stagger">
          {h.log.map((entry, i) => (
            <div key={i} className={`hk-log-row hk-log-${entry.type.toLowerCase()}`}>
              <span className="hk-log-time">{entry.time}</span>
              <span className="hk-log-badge">{entry.type}</span>
              <span className="hk-log-msg">{entry.msg}</span>
            </div>
          ))}
        </div>
      </>
    )
  }

  if (isCreative) {
    const c = creativeHome
    return (
      <>
        <div className="cr-hero stagger">
          <div className="cr-kicker">{c.kicker}</div>
          <h1 className="cr-h1">
            {c.headline}<br />
            <em className="cr-h1-em">{c.headlineSub}</em>
          </h1>
          <p className="cr-subtext">{c.subtext}</p>
          <div className="cta-row">
            {c.cta.map((btn, i) => (
              <Link key={i} href={btn.href} className={btn.primary ? 'cr-btn-p' : 'cr-btn-s'}>
                {btn.label}
              </Link>
            ))}
          </div>
          <div className="cr-avail">{c.availability}</div>
        </div>

        <div className="cr-floating-words stagger" aria-hidden="true">
          {c.floatingWords.map((w, i) => (
            <span key={i} className="cr-floating-word" style={{ '--wi': i }}>{w}</span>
          ))}
        </div>

        <div className="cr-stats stagger">
          {c.stats.map((s, i) => (
            <div key={i} className="cr-stat">
              <div className="cr-stat-value">{s.value}</div>
              <div className="cr-stat-label">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="cr-divider">
          <span className="cr-divider-sym">✦</span>
          <span className="cr-divider-text">recently from the desk</span>
          <span className="cr-divider-sym">✦</span>
        </div>

        <div className="cr-writing stagger">
          {c.recentWriting.map((post, i) => (
            <div key={i} className="cr-post-row" style={{ '--post-color': post.color }}>
              <div className="cr-post-inner">
                <span className="cr-post-title">{post.title}</span>
                <span className="cr-post-tag">{post.tag}</span>
              </div>
              <span className="cr-post-date">{post.date}</span>
            </div>
          ))}
          <div className="cr-post-row" style={{ border: 'none', paddingTop: '20px' }}>
            <Link href="/writing" className="cr-btn-s" style={{ fontSize: '10px' }}>All writing →</Link>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <div className="hero stagger">
        <div className="hero-kicker">
          <ShinyText
            text={homeContent.hero.kicker}
            color="var(--text3)"
            shineColor="var(--accent)"
            speed={4}
            spread={100}
          />
        </div>
        <h1 className="hero-h">
          I build things.<br />
          I write things.<br />
          Both with{' '}
          <em style={{ display: 'inline-flex', alignItems: 'baseline', gap: '0.18em' }}>
            <RotatingText
              texts={['intention.', 'purpose.', 'care.', 'craft.']}
              mainClassName="hero-rotating"
              elementLevelClassName="hero-rotating-char"
              rotationInterval={2800}
              staggerDuration={0.025}
              staggerFrom="first"
              splitBy="characters"
              transition={{ type: 'spring', damping: 28, stiffness: 320 }}
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '-110%', opacity: 0 }}
            />
          </em>
        </h1>
        <p className="hero-p">{homeContent.hero.description}</p>
        <div className="cta-row">
          {homeContent.hero.cta.map((btn, i) => (
            <Link key={i} href={btn.href} className={btn.primary ? 'btn-p' : 'btn-s'}>
              {btn.label}
            </Link>
          ))}
        </div>
        <div className="avail">
          {homeContent.availability}
        </div>
      </div>

      <div className="hero-stats stagger">
        {homeContent.stats.map((s, i) => (
          <div key={i} className="hero-stat">
            <div className="hero-stat-value">{s.value}</div>
            <div className="hero-stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="motif-div">
        <div className="motif-line"></div>
        <div className="motif-sym">✦</div>
        <div className="motif-line"></div>
      </div>

      <div className="home-writing stagger">
        <div className="sec-kicker">{homeContent.recentWriting.title}</div>
        {homeContent.recentWriting.posts.map((post, i) => (
          <div key={i} className="art-row">
            <div>
              <span className="art-title">{post.title}</span>
              <span className="art-tag">{post.tag}</span>
            </div>
            <div className="art-meta">{post.date}</div>
          </div>
        ))}
        <div className="art-row" style={{ border: 'none', paddingTop: '20px' }}>
          <Link href="/writing" className="btn-s" style={{ fontSize: '10px' }}>All writing →</Link>
        </div>
      </div>
    </>
  )
}
