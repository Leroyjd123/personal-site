'use client'

// ScrambledText requires gsap/SplitText + gsap/ScrambleTextPlugin (GSAP Club, paid).
// Stubbed out — component renders children as-is without animation.
const ScrambledText = ({ className = '', style = {}, children }) => (
  <div className={`text-block ${className}`} style={style}>
    <p>{children}</p>
  </div>
)

export default ScrambledText
