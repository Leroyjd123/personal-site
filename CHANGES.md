# Changes & Build Log

A record of everything built on this project, organized by area.

---

## Project Setup

- Initialized Next.js 14 project with App Router (`app/` directory)
- Configured `package.json` with name `leroy-dsouza`, version `0.1.0`
- Added dependencies: `framer-motion ^12.38.0`, `gsap ^3.15.0`, `three ^0.184.0`
- Added `.gitignore`
- Configured `next.config.js`:
  - Enabled `compress: true`
  - Disabled production source maps
  - Added `Cache-Control: public, max-age=3600, must-revalidate` headers
  - Configured image optimization with AVIF + WebP support, device sizes `[640, 750, 828, 1080, 1200, 1920, 2048, 3840]`

---

## Styling (styles/globals.css)

- Set up CSS custom properties for light and dark theme color tokens
  - Light: `--bg`, `--text`, `--subtle`, `--accent` (navy), `--accent2` (green / purple / maroon variants)
  - Dark: blue-tinted accent palette
- Defined typography scale using Google Fonts:
  - Cormorant Garamond (serif) for headings
  - DM Sans (sans-serif) for body text
- Styled global layout primitives: `.hero`, `.stagger` (staggered entrance animations)
- Added `.btn-p` (primary) and `.btn-s` (secondary) button variants
- Styled navigation bar with `backdrop-filter: blur()`
- Styled work and project grid layouts
- Styled writing filter bar and `.article-row` list items
- Added `@media` queries for responsive layout

---

## Layout & Root (app/layout.jsx)

- Loaded Cormorant Garamond and DM Sans via `next/font/google`
- Set `<html>` `data-theme` attribute; reads `localStorage` for persisted user preference
- Mounted global components: `Nav`, `CursorGlow`, `JaliCanvas`, `EasterEggs`, `LoaderLine`
- Added `<meta>` defaults for SEO (title, description, OpenGraph)

---

## Pages

### Home (app/page.jsx)
- Hero section with rotating title variants ("Product · Craft")
- Availability indicator ("Open to work" / "Currently at Ordrio")
- CTA buttons linking to `/writing` and `/contact`
- Recent writing section pulling from `getPosts()` (top 3 posts)
- Content driven by `content/home.js`

### About (app/about/page.jsx)
- Bio section with personal philosophy copy
- Info grid: Background, Work Style, Current Interests, Side Projects
- Content driven by `content/about.js`

### Work (app/work/page.jsx)
- Timeline of 4 work experiences:
  - Ordrio Technologies (Product Manager — current)
  - Collegepond (Product Analyst)
  - Northern Trust (Business Analyst)
  - DCT Academy (Content & Community)
- Content driven by `content/work.js`

### Projects (app/projects/page.jsx)
- 4 projects listed:
  - Etch Journal (MERN journaling app, Phase 2 in progress)
  - Monthly AI experiments (public log)
  - Product Teardowns (10+ on LinkedIn)
  - Dhisingara Technologies (stealth — product-led creative collective)
- Content driven by `content/projects.js`

### Writing (app/writing/page.jsx)
- Fetches posts from WordPress via `getPosts()` (server component)
- Passes posts to `WritingFilter` client component
- Falls back to 7 hardcoded placeholder posts if API returns empty
- Displays post list using `ArticleRow`

### Writing Detail (app/writing/[slug]/page.jsx)
- Dynamic route; fetches single post via `getPost(slug)`
- Renders WordPress `content.rendered` HTML via `dangerouslySetInnerHTML`
- Generates `<title>` and OpenGraph metadata dynamically
- Custom `not-found.jsx` for missing slugs

### Contact (app/contact/page.jsx)
- Lists contact links: Email, LinkedIn
- Resume link present but currently disabled/placeholder
- Content driven by `content/contact.js`

### Error & Not Found
- `app/error.jsx` — global React error boundary with reset button
- `app/not-found.jsx` — site-wide 404 page

---

## Components

### Nav (components/Nav.jsx)
- Renders site logo (`id="logo-el"`) and navigation links
- Active route highlighting via `usePathname`
- Light/dark theme toggle button; reads and writes `localStorage`
- Sets `data-theme` on `<html>` element on toggle
- `'use client'`

### JaliCanvas (components/JaliCanvas.jsx)
- Full-viewport `<canvas>` mounted as a fixed background layer
- Procedurally draws a Jali (Islamic geometric lattice) pattern across the viewport:
  - Primary layer: `drawCell()` — outer frame, full diagonals, rotated inner square, midpoint lines, petal arcs (jharokha cusps), corner quarter-arcs, inner circle, trefoil corner circles
  - Secondary layer (50% alpha, half-cell offset): `drawStar()` — 8-pointed Ashokan star with inner ring
- Breathing animation: `Math.sin(t * 0.0003) * 1.8` offset applied each frame via `requestAnimationFrame`
- Responds to theme changes via `MutationObserver` on `<html data-theme>`
  - Light: `rgba(26,39,68,0.042)` stroke
  - Dark: `rgba(180,160,120,0.055)` stroke
- Handles window resize to keep canvas full-viewport
- Exported as `memo(JaliCanvasComponent)` to prevent unnecessary re-renders
- `'use client'`

### CursorGlow (components/CursorGlow.jsx)
- Tracks `mousemove` and updates a CSS custom property (`--glow-x`, `--glow-y`)
- Renders a fixed `<div>` with a radial gradient centered on the cursor
- Hidden on touch/mobile devices
- `'use client'`

### WritingFilter (components/WritingFilter.jsx)
- Receives full post list as props
- Maintains active filter state: All / Essays / Teardowns / Creative
- Filters posts client-side; no network request on filter change
- Renders filter buttons and filtered `ArticleRow` list
- `'use client'`

### ArticleRow (components/ArticleRow.jsx)
- Thin wrapper: renders a `<Link>` to `/writing/[slug]`
- Displays post title, date, and category tags

### LoaderLine (components/LoaderLine.jsx)
- Listens to Next.js App Router navigation events
- Animates a thin progress bar across the top of the viewport on route changes
- `'use client'`

### EasterEggs (components/EasterEggs.jsx)
- Mounts three hidden interactions, all cleaned up on unmount:
  1. **Konami code** (`↑↑↓↓←→←→BA`) — logs a styled message in Kannada to the browser console: `"ನೀವು ಕಂಡುಹಿಡಿದಿರಿ — You found it."`
  2. **Logo × 7** — clicking `#logo-el` 7 times within 1.6s intervals flashes `--accent` to maroon (`#7a1535`) for 4 seconds
  3. **Idle 45s** — no keyboard or mouse activity for 45 seconds flashes `--accent` to purple (`#6b3fa0`) for 4 seconds
- Renders `null` (no visible DOM output)
- `'use client'`

---

## Content Layer (content/)

- **config.js** — site name, author, social links (LinkedIn, email, GitHub), WordPress blog URL
- **home.js** — hero headline variants, subtitle, CTA labels, availability status
- **about.js** — bio paragraphs, grid blocks (background, work style, interests, side projects)
- **work.js** — array of work experiences: company, role, dates, bullet points
- **projects.js** — array of projects: name, description, status, links
- **contact.js** — contact method list: label, href, display text

---

## WordPress Integration (lib/wordpress.js)

- **`getCategories()`** (internal) — fetches all categories from `ljdblog.wordpress.com`, cached 24 hours
- **`getPosts()`** — fetches 20 most recent posts (`_fields=id,title,excerpt,date,slug,categories`), cached 1 hour; maps category names to `essay | teardown | creative`
- **`getPost(slug)`** — fetches single post by slug including full `content`, cached 1 hour
- **`mapCategory(name)`** — normalizes WordPress category names: contains "essay" → `essay`, contains "teardown" → `teardown`, else → `creative`
- All functions have try/catch; errors return `[]` or `null` to allow graceful fallback

---

## Error Handling & Fallbacks

- Writing page falls back to 7 hardcoded placeholder posts if `getPosts()` returns empty
- Global `error.jsx` catches React render errors with a reset CTA
- `not-found.jsx` at both root and `/writing/[slug]` level
- WordPress fetch functions swallow errors silently (console log only) to avoid breaking SSR
