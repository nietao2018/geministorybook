import { sitemapManager, generateSitemapResponse, getContentModificationDate } from '@/lib/sitemap-utils'

export async function GET() {
  const urls = [
    // Voice Enhancement main pages
    ...sitemapManager.generateMultilingualUrls('/voice-enhancement', {
      contentType: 'dynamic',
      pageType: 'tool',
      customDate: getContentModificationDate('voice-enhancement')
    }),
  ]
  
  const xml = sitemapManager.generateSitemapXML(urls)
  return generateSitemapResponse(xml)
}