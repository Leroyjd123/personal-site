export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
    ],
    sitemap: 'https://leroydsa.com/sitemap.xml',
    host: 'https://leroydsa.com',
  }
}
