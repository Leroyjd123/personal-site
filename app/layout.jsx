import '../styles/tailwind.css'
import '../styles/globals.css'
import { Cormorant_Garamond, DM_Sans, JetBrains_Mono } from 'next/font/google'
import ClientProviders from '../components/ClientProviders'
import { BASE_URL, SITE_TITLE, SITE_DESCRIPTION, personJsonLd } from '../lib/seo'

const serif = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
})

const sans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-sans',
  display: 'swap',
})

const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: SITE_TITLE,
    template: '%s · Leroy Dsouza',
  },
  description: SITE_DESCRIPTION,
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
    <html lang="en" suppressHydrationWarning className={`${serif.variable} ${sans.variable} ${mono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
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
