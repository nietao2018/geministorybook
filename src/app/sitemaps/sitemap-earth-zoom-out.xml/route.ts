import { sitemapManager, generateSitemapResponse, getContentModificationDate } from '@/lib/sitemap-utils'

export async function GET() {
  const urls = [
    // Earth Zoom Out main pages
    ...sitemapManager.generateMultilingualUrls('/earth-zoom-out', {
      contentType: 'config',
      pageType: 'tool',
      customDate: getContentModificationDate('earth-zoom-out')
    }),
  ]
  
  const xml = sitemapManager.generateSitemapXML(urls)
  return generateSitemapResponse(xml)
}