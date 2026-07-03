'use client'

import { projectsContent } from '../../content/projects'
import { hackerProjects } from '../../content/hacker'
import { useTheme } from '../../context/ThemeContext'

function ProjectDescription({ text, easterEgg }) {
  if (!easterEgg) return text
  const parts = text.split(easterEgg.trigger)
  if (parts.length < 2) return text
  return (
    <>
      {parts[0]}
      <span className="proj-egg" title={easterEgg.tooltip}>{easterEgg.trigger}</span>
      {parts[1]}
    </>
  )
}

export default function Projects() {
  const { isHacker } = useTheme()

  if (isHacker) {
    const h = hackerProjects
    return (
      <div className="hk-sec stagger">
        <div className="hk-kicker">{h.kicker}</div>
        <h2 className="hk-sh hk-glow">{h.headline}</h2>

        <div className="hk-proj-grid">
          {h.projects.map((p, i) => (
            <div key={i} className="hk-proj-card">
              <div className="hk-proj-header">
                <span className="hk-proj-num">{p.num}</span>
                <span className={`hk-proj-status hk-proj-${p.status.toLowerCase().replace('_', '-')}`}>{p.status}</span>
              </div>
              <div className="hk-proj-title">{p.title}</div>
              <div className="hk-proj-desc">{p.description}</div>
              {p.tags && (
                <div className="hk-proj-tags">
                  {p.tags.map((tag, j) => (
                    <span key={j} className="hk-tag">{tag}</span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="sec stagger">
        <div className="sk">{projectsContent.kicker}</div>
        <h2 className="sh">
          Things I'm<br /><em>making</em>.
        </h2>
        <p className="body-text proj-intro">{projectsContent.intro}</p>
        {projectsContent.projects.map((p, i) => (
          <div key={i} className="proj-item">
            <div className="proj-meta-col">
              <div className="proj-num">{p.num}</div>
              <div className={`proj-status proj-status-${p.status.type}`}>{p.status.label}</div>
            </div>
            <div className="proj-body-col">
              <div className="proj-title">{p.title}</div>
              <div className="proj-tagline">{p.tagline}</div>
              <div className="proj-desc"><ProjectDescription text={p.description} easterEgg={p.easterEgg} /></div>
              {p.link && (
                <a href={p.link} target="_blank" rel="noopener noreferrer" className="proj-link">
                  View on LinkedIn →
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
