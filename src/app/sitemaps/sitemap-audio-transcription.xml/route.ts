import { sitemapManager, generateSitemapResponse, getContentModificationDate } from '@/lib/sitemap-utils'

export async function GET() {
  const urls = [
    // Audio Transcription main pages
    ...sitemapManager.generateMultilingualUrls('/audio-transcription', {
      contentType: 'dynamic',
      pageType: 'tool',
      customDate: getContentModificationDate('audio-transcription')
    }),
  ]
  
  const xml = sitemapManager.generateSitemapXML(urls)
  return generateSitemapResponse(xml)
}