import { sitemapManager, generateSitemapResponse } from '@/lib/sitemap-utils'

export async function GET() {
  const sitemapPaths = [
    '/sitemaps/sitemap-remove-bg.xml',
    '/sitemaps/sitemap-image-resize.xml',
    '/sitemaps/sitemap-image-restoration.xml',
    '/sitemaps/sitemap-photo-real-style.xml',
    '/sitemaps/sitemap-try-on-clothing.xml',
    '/sitemaps/sitemap-product-anyshoot.xml',
    // 可以根据需要添加更多sitemap
  ]
  
  const xml = sitemapManager.generateSitemapIndexXML(sitemapPaths)
  return generateSitemapResponse(xml)
} 