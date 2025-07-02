import { siteConfig } from '@/config/site'

const locales = ['en', 'zh-hans']
const slugs = [] // 如有动态 slug 可补充

export async function GET() {
  const baseUrl = siteConfig.url || 'http://localhost:3000'
  const urls: string[] = []
  for (const locale of locales) {
    locale === 'en' ? urls.push(`/try-on-clothing`) : urls.push(`/${locale}/try-on-clothing`)
    for (const slug of slugs) {
      locale === 'en' ? urls.push(`/try-on-clothing/${slug}`) : urls.push(`/${locale}/try-on-clothing/${slug}`)
    }
  }
  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls.map(
      path => [
        `  <url>`,
        `    <loc>${baseUrl}${path}</loc>`,
        `    <lastmod>${new Date().toISOString()}</lastmod>`,
        `  </url>`
      ].join('\n')
    ).join('\n\n') +
    `\n</urlset>`
  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
} 