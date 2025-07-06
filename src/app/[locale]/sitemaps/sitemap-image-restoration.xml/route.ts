import { sitemapManager, generateSitemapResponse, getContentModificationDate } from '@/lib/sitemap-utils'

export async function GET() {
  const urls = [
    // 主要工具页面 - 高优先级
    ...sitemapManager.generateMultilingualUrls('/image-restoration', {
      contentType: 'static',
      pageType: 'tool',
      customDate: getContentModificationDate('image-restoration'),
      priority: 0.9,
      changefreq: 'monthly'
    })
    // 如有动态 slug 可在此添加
  ];

  const xml = sitemapManager.generateSitemapXML(urls);
  return generateSitemapResponse(xml);
} 