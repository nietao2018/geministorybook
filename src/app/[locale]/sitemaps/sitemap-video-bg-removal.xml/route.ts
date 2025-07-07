import { sitemapManager, generateSitemapResponse, getContentModificationDate } from '@/lib/sitemap-utils'

export async function GET() {
  const urls = [
    // Video Background Removal main pages
    ...sitemapManager.generateMultilingualUrls('/video-bg-removal', {
      contentType: 'dynamic',
      pageType: 'tool',
      customDate: getContentModificationDate('video-bg-removal')
    }),
  ]
  
  const xml = sitemapManager.generateSitemapXML(urls)
  return generateSitemapResponse(xml)
}