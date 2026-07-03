import '../styles/tailwind.css'
import '../styles/globals.css'
import ClientProviders from '../components/ClientProviders'

const BASE_URL = 'https://leroydsa.com'

export const metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Leroy Dsouza — Product Manager & Writer',
    template: '%s · Leroy Dsouza',
  },
  description: 'Product manager, writer, and maker based on the Karnataka coast. Leading product at Ordrio. Writing essays, teardowns, and creative work since 2016.',
  keywords: ['product manager', 'Udupi', 'Karnataka', 'writer', 'Leroy Dsouza', 'Ordrio', 'product management', 'SaaS'],
  authors: [{ name: 'Leroy Dsouza', url: BASE_URL }],
  creator: 'Leroy Dsouza',
  publisher: 'Leroy Dsouza',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: BASE_URL,
    siteName: 'Leroy Dsouza',
    title: 'Leroy Dsouza — Product Manager & Writer',
    description: 'Product manager, writer, and maker based on the Karnataka coast.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Leroy Dsouza — Product Manager & Writer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Leroy Dsouza — Product Manager & Writer',
    description: 'Product manager, writer, and maker based on the Karnataka coast.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: BASE_URL,
  },
  manifest: '/site.webmanifest',
  verification: {
    google: '',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#faf9f7' },
    { media: '(prefers-color-scheme: dark)', color: '#0d0d0d' },
  ],
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&family=JetBrains+Mono:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Leroy Dsouza',
              url: BASE_URL,
              jobTitle: 'Product Manager',
              worksFor: { '@type': 'Organization', name: 'Ordrio Technologies' },
              address: { '@type': 'PostalAddress', addressLocality: 'Udupi', addressRegion: 'Karnataka', addressCountry: 'IN' },
              sameAs: [
                'https://linkedin.com/in/leroydsa',
              ],
              description: 'Product manager, writer, and maker based on the Karnataka coast.',
            }),
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('leroy-theme');if(t)document.documentElement.dataset.theme=t;var m=localStorage.getItem('leroy-mode')||'normal';document.documentElement.dataset.mode=m;document.documentElement.dataset.hacker=m==='hacker'?'true':'false';}catch(e){}})()`,
          }}
        />
      </head>
      <body>
        <div className="loader-line" id="ll"></div>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  )
}
