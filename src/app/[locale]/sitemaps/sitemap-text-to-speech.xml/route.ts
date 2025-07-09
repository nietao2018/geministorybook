import { sitemapManager, generateSitemapResponse, getContentModificationDate } from '@/lib/sitemap-utils'
import { config } from '@/components/text-to-speech/config'

export async function GET() {
  const urls = [
    // 主要工具页面 - 高优先级
    ...sitemapManager.generateMultilingualUrls('/text-to-speech', {
      contentType: 'config',
      pageType: 'tool',
      customDate: getContentModificationDate('text-to-speech'),
      priority: 0.9,
      changefreq: 'monthly'
    }),

    // 所有用例页面 - 中等优先级，基于config配置
    ...config.mainNav.flatMap(item => {
      const slugPath = item.path.replace(/^\//, '');
      return sitemapManager.generateMultilingualUrls(`/text-to-speech/${slugPath}`, {
        contentType: 'config',
        pageType: 'config',
        customDate: getContentModificationDate('text-to-speech'),
        priority: 0.8,
        changefreq: 'monthly'
      });
    })
  ];

  const xml = sitemapManager.generateSitemapXML(urls);
  return generateSitemapResponse(xml);
}