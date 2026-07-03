'use client'

import { useRef } from 'react'
import { contactContent } from '../../content/contact'
import { hackerContact } from '../../content/hacker'
import { creativeContact } from '../../content/creative'
import { useTheme } from '../../context/ThemeContext'
import CircularText from '../../components/effects/CircularText'
import VariableProximity from '../../components/effects/VariableProximity'

export default function Contact() {
  const { isHacker, isCreative } = useTheme()
  const headingRef = useRef(null)

  if (isHacker) {
    const h = hackerContact
    return (
      <div className="hk-sec stagger">
        <div className="hk-kicker">{h.kicker}</div>
        <h2 className="hk-sh">{h.headline}</h2>
        <div className="hk-contact-prompt">{h.prompt}</div>

        <div className="hk-links">
          {h.links.map((link, i) => (
            <a
              key={i}
              href={link.href}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noopener noreferrer' : undefined}
              className="hk-link-row"
              style={{ pointerEvents: link.disabled ? 'none' : 'auto', opacity: link.disabled ? 0.4 : 1 }}
            >
              <span className="hk-link-prompt">{'>'}</span>
              <span className="hk-link-label">{link.label}</span>
              <span className="hk-link-value">{link.value}</span>
              {!link.disabled && <span className="hk-link-arrow">↗</span>}
            </a>
          ))}
        </div>
      </div>
    )
  }

  if (isCreative) {
    const c = creativeContact
    return (
      <div className="cr-sec stagger">
        <div className="cr-kicker">{c.kicker}</div>
        <h2 className="cr-sh">{c.headline}</h2>
        <div className="cr-sh-sub">{c.subheadline}</div>
        <p className="cr-body">{c.intro}</p>

        <div className="cr-connect-grid">
          {c.idealConnect.map((item, i) => (
            <div key={i} className="cr-connect-item">
              <span className="cr-connect-icon">{item.icon}</span>
              <span className="cr-connect-text">{item.text}</span>
            </div>
          ))}
        </div>

        <div className="cr-contact-links">
          {c.links.map((link, i) => (
            <a
              key={i}
              href={link.href}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noopener noreferrer' : undefined}
              className="cr-link-row"
              style={{ pointerEvents: link.disabled ? 'none' : 'auto', opacity: link.disabled ? 0.5 : 1 }}
            >
              <div className="cr-link-inner">
                <span className="cr-link-label">{link.label}</span>
                <span className="cr-link-value">{link.value}</span>
              </div>
              {!link.disabled && <span className="cr-link-arrow">↗</span>}
            </a>
          ))}
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="sec stagger">
        <div className="sk">{contactContent.kicker}</div>
        <div className="avail-banner">
          <span className="avail-dot"></span> {contactContent.availability}
        </div>

        <div className="contact-heading-row" ref={headingRef}>
          <h2 className="sh contact-sh">
            <VariableProximity
              label="If it feels like a good fit."
              containerRef={headingRef}
              radius={120}
              falloff="gaussian"
              fromFontVariationSettings="'wght' 300"
              toFontVariationSettings="'wght' 500"
              className="contact-vp"
            />
          </h2>
          <div className="contact-circular" aria-hidden="true">
            <CircularText
              text="Let's · talk · product · and · craft · "
              spinDuration={22}
              onHover="slowDown"
              className="contact-circular-inner"
            />
          </div>
        </div>

        <p className="body-text contact-p">{contactContent.description}</p>

        <div className="contact-fit-grid">
          {contactContent.idealFit.map((item, i) => (
            <div key={i} className="contact-fit-item">
              <span className="contact-fit-icon">{item.icon}</span>
              <span className="contact-fit-text">{item.text}</span>
            </div>
          ))}
        </div>

        <div className="contact-links-section">
          {contactContent.links.map((link, i) => (
            <a
              key={i}
              href={link.href}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noopener noreferrer' : undefined}
              className="cl"
              style={{
                textDecoration: 'none',
                color: 'inherit',
                pointerEvents: link.disabled ? 'none' : 'auto',
                opacity: link.disabled ? 0.4 : 1
              }}
            >
              <div className="cl-inner">
                <span className="cl-label">{link.label}</span>
                {link.sublabel && <span className="cl-sublabel">{link.sublabel}</span>}
              </div>
              <span className="cl-arrow">↗</span>
            </a>
          ))}
        </div>
      </div>
    </>
  )
}
