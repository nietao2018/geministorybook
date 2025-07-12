import { sitemapManager, generateSitemapResponse, getContentModificationDate } from '@/lib/sitemap-utils'

export async function GET() {
  const urls = [
    // 主要工具页面 - 高优先级
    ...sitemapManager.generateMultilingualUrls('/kontext-komposer', {
      contentType: 'config',
      pageType: 'tool',
      customDate: getContentModificationDate('kontext-komposer'),
      priority: 0.9,
      changefreq: 'monthly'
    }),
  ];

  const xml = sitemapManager.generateSitemapXML(urls);
  return generateSitemapResponse(xml);
}