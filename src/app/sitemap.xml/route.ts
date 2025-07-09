import { sitemapManager, generateSitemapResponse } from '@/lib/sitemap-utils'

export async function GET() {
  const sitemapPaths = [
    '/sitemaps/sitemap-remove-bg.xml',
    '/sitemaps/sitemap-image-resize.xml',
    '/sitemaps/sitemap-image-compressor.xml',
    '/sitemaps/sitemap-image-restoration.xml',
    '/sitemaps/sitemap-photo-real-style.xml',
    '/sitemaps/sitemap-try-on-clothing.xml',
    '/sitemaps/sitemap-product-anyshoot.xml',
    '/sitemaps/sitemap-voice-enhancement.xml',
    '/sitemaps/sitemap-text-to-speech.xml',
    '/sitemaps/sitemap-audio-transcription.xml',
    '/sitemaps/sitemap-video-bg-removal.xml',
    '/sitemaps/sitemap-video-enhancement.xml',
    '/sitemaps/sitemap-earth-zoom-out.xml',
    // 可以根据需要添加更多sitemap
  ]
  
  const xml = sitemapManager.generateSitemapIndexXML(sitemapPaths)
  return generateSitemapResponse(xml)
} 