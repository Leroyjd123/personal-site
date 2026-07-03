'use client'

import { projectsContent } from '../../content/projects'
import { hackerProjects } from '../../content/hacker'
import { useTheme } from '../../context/ThemeContext'
import dynamic from 'next/dynamic'

const MagicBento = dynamic(() => import('../../components/MagicBento'), { ssr: false })

const bentoCards = projectsContent.projects.map(p => ({
  num: p.num,
  label: p.title,
  title: p.title,
  description: p.description,
  status: p.status,
}))

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
        <MagicBento
          cards={bentoCards}
          enableStars={true}
          enableSpotlight={true}
          enableBorderGlow={true}
          enableTilt={false}
          enableMagnetism={true}
          clickEffect={true}
          spotlightRadius={260}
          particleCount={6}
        />
      </div>
    </>
  )
}
