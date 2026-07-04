// Central SEO configuration. Every page builds its metadata through
// `pageMetadata()` so titles, canonical URLs, and Open Graph data stay
// consistent and only need changing in one place.
import { siteConfig } from '../content/config'

export const BASE_URL = siteConfig.baseUrl

export const SITE_TITLE = 'Leroy Dsouza — Product Manager & Writer'
export const SITE_DESCRIPTION =
  'Product manager, writer, and maker based on the Karnataka coast. Leading product at Ordrio. Writing essays, teardowns, and creative work since 2016.'

/**
 * Build a Next.js metadata object for a static page.
 * @param {object} opts
 * @param {string} opts.title       Page title (template appends "· Leroy Dsouza")
 * @param {string} opts.description Meta description
 * @param {string} opts.path        Route path starting with "/", "" for home
 */
export function pageMetadata({ title, description, path = '' }) {
  const url = `${BASE_URL}${path}`
  return {
    title,
    description,
    openGraph: {
      title: title ? `${title} · ${siteConfig.name}` : SITE_TITLE,
      description,
      url,
    },
    alternates: { canonical: url },
  }
}

export const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: siteConfig.name,
  url: BASE_URL,
  email: `mailto:${siteConfig.email}`,
  jobTitle: 'Product Manager',
  worksFor: { '@type': 'Organization', name: 'Ordrio Technologies' },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Udupi',
    addressRegion: 'Karnataka',
    addressCountry: 'IN',
  },
  sameAs: [siteConfig.linkedin, 'https://ljdblog.wordpress.com'],
  description: 'Product manager, writer, and maker based on the Karnataka coast.',
}
