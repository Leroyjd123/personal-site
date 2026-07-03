# Content Management

This folder contains all the editable content for the website. Separate from component logic, making it easy to update without touching code.

## File Structure

- **config.js** - Site configuration (name, email, LinkedIn, etc.)
- **home.js** - Landing page content (hero, CTA, recent writing preview)
- **about.js** - About page (bio, grid items)
- **work.js** - Work experience and timeline
- **projects.js** - Projects showcase
- **contact.js** - Contact page content and links

## How to Edit

### Example: Update your bio in about.js

```javascript
export const aboutContent = {
  bio: 'Your new bio text here...',
  // Rest of content
}
```

### Example: Add a new work experience in work.js

```javascript
export const workContent = {
  experiences: [
    // ... existing entries
    {
      period: '2025 — now',
      company: 'New Company',
      role: 'Your Role',
      description: 'Description of work',
      tags: ['Tag1', 'Tag2']
    }
  ]
}
```

### Example: Update contact links in contact.js

```javascript
export const contactContent = {
  links: [
    {
      label: 'Email',
      href: 'mailto:your-email@example.com',
      external: false
    }
    // Add more links
  ]
}
```

## Special Features

### Easter Eggs
Easter eggs are embedded in content. Find `.egg` class triggers:

**about.js:**
- "community and service" → tooltip
- "Dhisingara Technologies" → tooltip

**projects.js:**
- "Elegant Wisdom" → tooltip

### Dynamic Lists
All lists (work experiences, projects, grid items) are mapped from content files. Add/remove items directly in the JS file.

### CSS Classes
Content uses standard CSS classes from `styles/globals.css`:
- `.body-text` - Standard paragraph text
- `.art-row` - Article/item rows
- `.exp-item` - Experience item
- `.proj-card` - Project card
- `.ag-cell` - Grid cell (About)

## Deployment

After editing content:
1. Save the file
2. Next.js will hot-reload automatically during development
3. Build with `npm run build` before deploying

No components need to be modified unless you're changing structure.
