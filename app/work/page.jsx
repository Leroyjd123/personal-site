'use client'

import { workContent } from '../../content/work'
import { hackerWork } from '../../content/hacker'
import { useTheme } from '../../context/ThemeContext'

export default function Work() {
  const { isHacker } = useTheme()

  if (isHacker) {
    const h = hackerWork
    return (
      <div className="hk-sec stagger">
        <div className="hk-kicker">{h.kicker}</div>
        <h2 className="hk-sh hk-glow">{h.headline}</h2>

        {h.experiences.map((exp, i) => (
          <div key={i} className="hk-exp-item">
            <div className="hk-exp-meta">
              <div className="hk-exp-period">{exp.period}</div>
              <div className={`hk-exp-status hk-status-${exp.status.toLowerCase()}`}>{exp.status}</div>
            </div>
            <div className="hk-exp-body">
              <div className="hk-exp-co">{exp.company}</div>
              <div className="hk-exp-role">{exp.role}</div>
              {exp.highlights && (
                <ul className="hk-exp-highlights">
                  {exp.highlights.map((hl, j) => (
                    <li key={j} className="hk-exp-highlight">
                      <span className="hk-highlight-arrow">{'>'}</span>
                      <span>{hl.replace(/^>\s*/, '')}</span>
                    </li>
                  ))}
                </ul>
              )}
              {exp.tags && (
                <div className="hk-exp-tags">
                  {exp.tags.map((tag, j) => (
                    <span key={j} className="hk-tag">{tag}</span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="sec stagger">
      <div className="sk">{workContent.kicker}</div>
      <h2 className="sh">A few places<br />I've made things.</h2>
      <p className="body-text work-intro">{workContent.intro}</p>

      {workContent.experiences.map((exp, i) => (
        <div key={i} className="exp-item">
          <div className="exp-meta-col">
            <div className="exp-period">{exp.period}</div>
          </div>
          <div className="exp-body-col">
            <div className="exp-co">{exp.company}</div>
            <div className="exp-role">{exp.role}</div>
            <div className="exp-desc">
              {exp.description.split('\n\n').map((para, j, arr) => (
                <span key={j}>
                  {para}
                  {j < arr.length - 1 && <><br /><br /></>}
                </span>
              ))}
            </div>
            {exp.highlights && (
              <ul className="exp-highlights">
                {exp.highlights.map((h, j) => (
                  <li key={j} className="exp-highlight-item">{h}</li>
                ))}
              </ul>
            )}
            {exp.tags && (
              <div className="exp-tags">
                {exp.tags.map((tag, j) => (
                  <div key={j} className="exp-tag">{tag}</div>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
