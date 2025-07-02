import { siteConfig } from '@/config/site'
import { config } from '@/components/remove-bg/config'

// 根据实际支持的语言调整
const locales = ['en', 'zh-hans']

export async function GET() {
  const baseUrl = siteConfig.url || 'http://localhost:3000'
  const slugs = config.mainNav.map(item => item.path.replace(/^\//, ''))

  // 主页和所有动态页
  const urls: string[] = []
  for (const locale of locales) {
    locale === 'en' ? urls.push(`/remove-bg`) : urls.push(`/${locale}/remove-bg`)
    for (const slug of slugs) {
      locale === 'en' ? urls.push(`/remove-bg/${slug}`) : urls.push(`/${locale}/remove-bg/${slug}`)
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
    ).join('\n\n') + // 每个 <url> 之间空一行
    `\n</urlset>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
} 