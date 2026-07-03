# Leroy Dsouza — Personal Website

Portfolio, writing archive, and digital identity for Leroy Dsouza — Product Manager, writer, and maker based on the Karnataka coast.

Built with Next.js 16 (App Router + Turbopack), vanilla CSS, and animation libraries chosen for what they do, not what they're called.

---

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | JavaScript / JSX |
| Styling | Vanilla CSS with CSS custom properties |
| Animations | Framer Motion, GSAP, Three.js |
| Content | Static JS content files + WordPress REST API |
| Deployment | Vercel / Node.js compatible |

---

## Project Structure

```
├── app/
│   ├── layout.jsx              # Root layout — fonts, global meta, ClientProviders
│   ├── page.jsx                # Home — hero, rotating text, stats, recent writing
│   ├── about/page.jsx          # About — bio, approach, values, certifications
│   ├── work/page.jsx           # Work history — Ordrio, Collegepond, Northern Trust
│   ├── projects/page.jsx       # Projects — bento card grid
│   ├── contact/page.jsx        # Contact — links, circular text, variable proximity
│   ├── writing/
│   │   ├── page.jsx            # Writing list with filter (fetched from WordPress)
│   │   └── [slug]/page.jsx     # Individual article with rendered WordPress content
│   ├── error.jsx               # Error boundary
│   └── not-found.jsx           # 404 page
├── components/
│   ├── ClientProviders.jsx     # 'use client' boundary — wraps Nav, BubbleMenu, canvas, providers
│   ├── Nav.jsx                 # Desktop nav — theme toggle, hacker mode toggle
│   ├── BubbleMenu.jsx          # Mobile bubble nav (GSAP, dynamic import)
│   ├── JaliCanvas.jsx          # Procedural Jali lattice background (Three.js, dynamic import)
│   ├── CardNav.jsx             # GSAP card menu for Writing (dynamic import)
│   ├── MagicBento.jsx          # GSAP interactive bento grid for Projects (dynamic import)
│   ├── CursorGlow.jsx          # Mouse-tracking radial glow (desktop only)
│   ├── WritingFilter.jsx       # Client-side category filter for writing list
│   ├── ArticleRow.jsx          # Writing list row component
│   ├── EasterEggs.jsx          # Konami code, logo click, idle timer
│   ├── HackerBoot.jsx          # Boot sequence animation overlay for hacker mode
│   └── effects/
│       ├── RotatingText.jsx    # Character-by-character rotating text (Framer Motion)
│       ├── ShinyText.jsx       # Shimmer text effect (Framer Motion)
│       ├── DecryptedText.jsx   # Scramble-reveal on hover (Framer Motion)
│       ├── CircularText.jsx    # Spinning circular label (Framer Motion)
│       ├── VariableProximity.jsx # Mouse-proximity variable font weight (Framer Motion)
│       ├── GradualBlur.jsx     # Scroll-driven gradual blur
│       ├── MagnetLines.jsx     # Magnetic line interaction
│       └── StarBorder.jsx      # Animated star border effect
├── content/
│   ├── config.js               # Site-wide config (name, URL, email, socials)
│   ├── home.js                 # Home page copy — hero, stats, recent writing
│   ├── about.js                # About — bio, approach, values, grid, certifications
│   ├── work.js                 # Work experience data
│   ├── projects.js             # Projects data
│   ├── contact.js              # Contact links and ideal fit items
│   └── hacker.js               # All hacker mode content for every page
├── context/
│   └── HackerContext.jsx       # React context — isHacker state, toggleHacker, boot sequence
├── lib/
│   └── wordpress.js            # WordPress.com REST API client (with 1h cache + fallback)
├── styles/
│   └── globals.css             # All styles — tokens, themes, pages, hacker mode
└── next.config.js              # Compression, image config, security headers, caching
```

---

## Pages

| Route | Description |
|---|---|
| `/` | Hero with animated title, availability status, recent writing |
| `/about` | Bio, approach cards, values, at-a-glance grid, certifications |
| `/work` | Work history with multi-paragraph descriptions and highlights |
| `/projects` | Interactive bento grid of projects |
| `/writing` | Blog list from WordPress, filterable by Essays / Teardowns / Creative |
| `/writing/[slug]` | Individual article rendered from WordPress content |
| `/contact` | Contact links with variable proximity heading and circular text |

---

## Features

- **Light / Dark theme** — toggle in nav, persisted in `localStorage`
- **Hacker Mode** — `>_` toggle in nav transforms the entire site into a terminal/AI aesthetic with separate content (`content/hacker.js`). Persisted in `localStorage`. Activates with a typed boot sequence overlay.
- **Jali Canvas** — procedural Islamic lattice pattern rendered on `<canvas>` with a breathing animation
- **Cursor Glow** — smooth radial gradient that follows the cursor (desktop only)
- **Writing Filter** — filter posts by Essays, Teardowns, or Creative without a page reload
- **CardNav** — GSAP-powered card hover menu for the writing page
- **MagicBento** — GSAP spotlight + magnetism bento grid for projects
- **WordPress integration** — posts pulled from `ljdblog.wordpress.com` via the public REST API, cached 1h, falls back to placeholder posts
- **Variable Proximity** — font weight responds to cursor proximity on the contact heading
- **Animated effects** — RotatingText, ShinyText, DecryptedText, CircularText, GradualBlur
- **Easter eggs** — three hidden interactions

### Easter Eggs

| Trigger | Effect |
|---|---|
| Konami code (↑↑↓↓←→←→BA) | Prints a message in Kannada to the console |
| Click the logo 7 times | Flashes the accent to maroon |
| Sit idle for 45 seconds | Flashes the accent to purple |

---

## Getting Started

```bash
# Install dependencies
npm install

# Run development server (Turbopack)
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

The dev server runs on `http://localhost:3000`.

---

## Content Updates

**Page copy** lives in `content/`. Edit the relevant JS file — changes reflect on the next request in dev, or next deploy in prod.

**Hacker mode content** is in `content/hacker.js` — separate objects for each page.

**Blog posts** are managed in WordPress at `ljdblog.wordpress.com`. No redeploy needed — fetched at request time with a 1-hour ISR cache.

---

## Architecture Notes

- **RSC boundary**: `app/layout.jsx` is a Server Component. All interactive code lives inside `ClientProviders.jsx`, which is the `'use client'` boundary.
- **Dynamic imports**: GSAP-dependent components (`BubbleMenu`, `JaliCanvas`, `CardNav`, `MagicBento`) are loaded via `next/dynamic` with `{ ssr: false }` to prevent them from entering the RSC module graph, which was the root cause of a persistent `TypeError: Cannot read properties of undefined (reading 'call')` webpack crash in Next.js 14.
- **No TypeScript** — plain JSX throughout.
- **No CSS framework** — all styles in `styles/globals.css` using CSS custom properties for theming and hacker mode.

---

## Design

- **Headings**: Cormorant Garamond (300–500, italic variants)
- **Body**: DM Sans (300–500, optical size 9–40)
- **Code/Hacker**: JetBrains Mono (300–500)
- **Tokens**: CSS custom properties per theme — `[data-theme=dark]` and `[data-hacker=true]` override the default light palette
- **Accents**: Navy, Green, Purple, Maroon (light) · Blue (dark) · Green terminal (hacker)
