import { siteConfig } from '@/config/site'

export async function GET() {
  const baseUrl = siteConfig.url || 'http://localhost:3000'
  const sitemaps = [
    '/sitemaps/sitemap-remove-bg.xml',
    '/sitemaps/sitemap-try-on-clothing.xml',
    '/sitemaps/sitemap-image-restoration.xml',
    '/sitemaps/sitemap-photo-real-style.xml',
    '/sitemaps/sitemap-try-on-clothing.xml',

    // 其他 sitemap 路径可继续添加
  ]
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  ${sitemaps.map(
    path => `\n    <sitemap>\n      <loc>${baseUrl}${path}</loc>\n      <lastmod>${new Date().toISOString()}</lastmod>\n    </sitemap>\n    `
  ).join('')}\n</sitemapindex>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
} 