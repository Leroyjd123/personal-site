'use client'

import { aboutContent } from '../../content/about'
import { hackerAbout } from '../../content/hacker'
import { creativeAbout } from '../../content/creative'
import { siteConfig } from '../../content/config'
import { useTheme } from '../../context/ThemeContext'
import DecryptedText from '../../components/effects/DecryptedText'

export default function About() {
  const { isHacker, isCreative } = useTheme()

  if (isHacker) {
    const h = hackerAbout
    return (
      <div className="hk-sec stagger">
        <div className="hk-kicker">{h.kicker}</div>
        <h2 className="hk-sh hk-glow">{h.headline}</h2>
        <div className="hk-sh" style={{ fontSize: 'clamp(14px,2vw,18px)', marginTop: '-18px', marginBottom: '32px' }}>
          <span className="hk-accent">// {h.headlineEm}</span>
        </div>

        <div className="hk-bio">
          {h.bio.map((line, i) => (
            <span key={i} className={`hk-bio-line${line === '' ? ' hk-bio-blank' : ''}`}>
              {line}
            </span>
          ))}
        </div>

        <div className="hk-terminal-block">
          <div className="hk-terminal-titlebar">
            <span className="hk-terminal-dot" />
            <span className="hk-terminal-dot" />
            <span className="hk-terminal-dot" />
            <span className="hk-terminal-title">leroy@ljd: ~</span>
          </div>
          <div className="hk-terminal-body">
            {h.terminal.map((t, i) => (
              <div key={i} className="hk-terminal-row">
                <span className="hk-terminal-prompt">leroy@ljd:~$</span>
                <span className="hk-terminal-cmd"> {t.cmd}</span>
                <div className="hk-terminal-out">{t.out}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="hk-skills-grid">
          {h.skills.map((group, i) => (
            <div key={i} className="hk-skill-group">
              <div className="hk-skill-category">{group.category}</div>
              <div className="hk-skill-items">
                {group.items.map((item, j) => (
                  <span key={j} className="hk-skill-tag">{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (isCreative) {
    const c = creativeAbout
    return (
      <div className="cr-sec stagger">
        <div className="cr-kicker">{c.kicker}</div>
        <h2 className="cr-sh">{c.headline}</h2>
        <div className="cr-sh-sub">{c.subheadline}</div>
        <p className="cr-body">{c.intro}</p>

        <div className="cr-about-sections">
          {c.sections.map((s, i) => (
            <div key={i} className="cr-about-card">
              <div className="cr-about-icon">{s.icon}</div>
              <div className="cr-about-label">{s.label}</div>
              <div className="cr-about-body">{s.body}</div>
            </div>
          ))}
        </div>

        <div className="cr-divider">
          <span className="cr-divider-sym">✦</span>
          <span className="cr-divider-text">things you should probably know</span>
          <span className="cr-divider-sym">✦</span>
        </div>

        <ul className="cr-fun-facts">
          {c.funFacts.map((fact, i) => (
            <li key={i} className="cr-fun-fact">
              <span className="cr-fact-dot">·</span>
              <span>{fact}</span>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  return (
    <div className="sec stagger">
      <div className="sk">{aboutContent.kicker}</div>
      <h2 className="sh">
        Curious by nature.<br />
        <em>
          <DecryptedText
            text="Deliberate"
            animateOn="hover"
            speed={40}
            maxIterations={12}
            characters="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
            className="decrypted-revealed"
            encryptedClassName="decrypted-encrypted"
          />
        </em>{' '}by practice.
      </h2>

      <div className="body-text about-body">
        {aboutContent.bio.split('\n\n').map((para, i, arr) => (
          <span key={i}>
            {para}
            {i < arr.length - 1 && <><br /><br /></>}
          </span>
        ))}
      </div>

      <div className="about-approach">
        <div className="about-section-label">How I work</div>
        <div className="about-approach-grid">
          {aboutContent.approach.map((item, i) => (
            <div key={i} className="about-approach-card">
              <div className="about-approach-num">{item.num}</div>
              <div className="about-approach-label">{item.label}</div>
              <div className="about-approach-body">{item.body}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="about-values">
        <div className="about-section-label">What I believe</div>
        <div className="about-values-grid">
          {aboutContent.values.map((v, i) => (
            <div key={i} className="about-value-card">
              <div className="about-value-icon">{v.icon}</div>
              <div className="about-value-label">{v.label}</div>
              <div className="about-value-body">{v.body}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="about-grid">
        <div className="about-section-label">At a glance</div>
        <div className="about-grid-inner">
          {aboutContent.grid.map((item, i) => (
            <div key={i} className="ag-cell">
              <div className="ag-label">{item.label}</div>
              <div className="ag-body">{item.content}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="about-certs">
        <div className="about-section-label">Certifications</div>
        <div className="about-certs-list">
          {aboutContent.certifications.map((c, i) => (
            <div key={i} className="about-cert-row">
              <span className="about-cert-name">{c.name}</span>
              <span className="about-cert-issuer">{c.issuer}</span>
            </div>
          ))}
        </div>
      </div>

      <a href={siteConfig.resumeUrl} target="_blank" rel="noopener noreferrer" className="btn-s" style={{ fontSize: '11px' }}>↓ Resume</a>
    </div>
  )
}
