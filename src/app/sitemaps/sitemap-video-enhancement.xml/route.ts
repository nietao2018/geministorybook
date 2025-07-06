import { sitemapManager, generateSitemapResponse, getContentModificationDate } from '@/lib/sitemap-utils'

export async function GET() {
  const urls = [
    // Video Enhancement main pages
    ...sitemapManager.generateMultilingualUrls('/video-enhancement', {
      contentType: 'config',
      pageType: 'tool',
      customDate: getContentModificationDate('video-enhancement')
    }),
  ]
  
  const xml = sitemapManager.generateSitemapXML(urls)
  return generateSitemapResponse(xml)
}