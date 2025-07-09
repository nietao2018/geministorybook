import { siteConfig } from '@/config/site';

export interface SitemapUrl {
  url: string;
  lastmod: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

export interface SitemapConfig {
  baseUrl: string;
  locales: string[];
  defaultChangefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  defaultPriority: number;
}

export class SitemapManager {
  private config: SitemapConfig;
  private static buildTime: string;
  private static lastDeployment: string;

  constructor(config?: Partial<SitemapConfig>) {
    this.config = {
      baseUrl: siteConfig.url || 'http://localhost:3000',
      locales: ['en', 'zh-hans'],
      defaultChangefreq: 'weekly',
      defaultPriority: 0.8,
      ...config
    };

    // 获取构建时间（只在启动时计算一次）
    if (!SitemapManager.buildTime) {
      SitemapManager.buildTime = new Date().toISOString();
    }

    // 获取部署时间（基于环境变量或构建时间）
    if (!SitemapManager.lastDeployment) {
      SitemapManager.lastDeployment = process.env.VERCEL_DEPLOYMENT_DATE || 
                                      process.env.BUILD_DATE || 
                                      SitemapManager.buildTime;
    }
  }

  /**
   * 获取不同类型内容的lastmod时间
   */
  getLastModified(contentType: 'static' | 'dynamic' | 'config' | 'build', customDate?: string): string {
    switch (contentType) {
      case 'static':
        // 静态页面使用构建时间
        return SitemapManager.buildTime;
      
      case 'dynamic':
        // 动态内容使用传入的自定义时间，或构建时间
        return customDate || SitemapManager.buildTime;
      
      case 'config':
        // 配置驱动的页面使用构建时间（配置变更需要重新构建）
        return SitemapManager.buildTime;
      
      case 'build':
        // 构建相关的资源使用构建时间
        return SitemapManager.buildTime;
      
      default:
        return SitemapManager.buildTime;
    }
  }

  /**
   * 根据内容类型获取changefreq
   */
  getChangeFreq(contentType: 'landing' | 'tool' | 'config' | 'blog' | 'static'): 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never' {
    switch (contentType) {
      case 'landing':
        return 'weekly';  // 首页等主要页面
      case 'tool':
        return 'monthly'; // 工具页面
      case 'config':
        return 'monthly'; // 配置驱动的页面
      case 'blog':
        return 'weekly';  // 博客内容
      case 'static':
        return 'yearly';  // 静态页面如隐私政策
      default:
        return this.config.defaultChangefreq;
    }
  }

  /**
   * 根据内容类型获取priority
   */
  getPriority(contentType: 'landing' | 'tool' | 'config' | 'blog' | 'static'): number {
    switch (contentType) {
      case 'landing':
        return 1.0;  // 首页最高优先级
      case 'tool':
        return 0.9;  // 工具页面高优先级
      case 'config':
        return 0.8;  // 配置页面中等优先级
      case 'blog':
        return 0.7;  // 博客内容
      case 'static':
        return 0.5;  // 静态页面低优先级
      default:
        return this.config.defaultPriority;
    }
  }

  /**
   * 生成URL条目
   */
  generateUrlEntry(path: string, options: {
    contentType?: 'static' | 'dynamic' | 'config' | 'build';
    pageType?: 'landing' | 'tool' | 'config' | 'blog' | 'static';
    customDate?: string;
    priority?: number;
    changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  } = {}): SitemapUrl {
    const {
      contentType = 'static',
      pageType = 'static',
      customDate,
      priority,
      changefreq
    } = options;

    return {
      url: `${this.config.baseUrl}${path}`,
      lastmod: this.getLastModified(contentType, customDate),
      changefreq: changefreq || this.getChangeFreq(pageType),
      priority: priority !== undefined ? priority : this.getPriority(pageType)
    };
  }

  /**
   * 生成多语言URL
   */
  generateMultilingualUrls(basePath: string, options: {
    contentType?: 'static' | 'dynamic' | 'config' | 'build';
    pageType?: 'landing' | 'tool' | 'config' | 'blog' | 'static';
    customDate?: string;
    priority?: number;
    changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  } = {}): SitemapUrl[] {
    const urls: SitemapUrl[] = [];
    
    for (const locale of this.config.locales) {
      const path = locale === 'en' ? basePath : `/${locale}${basePath}`;
      urls.push(this.generateUrlEntry(path, options));
    }
    
    return urls;
  }

  /**
   * 生成sitemap XML
   */
  generateSitemapXML(urls: SitemapUrl[]): string {
    const urlEntries = urls.map(url => {
      const entries = [
        `    <loc>${url.url}</loc>`,
        `    <lastmod>${url.lastmod}</lastmod>`
      ];

      if (url.changefreq) {
        entries.push(`    <changefreq>${url.changefreq}</changefreq>`);
      }

      if (url.priority !== undefined) {
        entries.push(`    <priority>${url.priority.toFixed(1)}</priority>`);
      }

      return [
        `  <url>`,
        ...entries,
        `  </url>`
      ].join('\n');
    });

    return [
      `<?xml version="1.0" encoding="UTF-8"?>`,
      `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
      ...urlEntries,
      `</urlset>`
    ].join('\n');
  }

  /**
   * 生成sitemap索引XML
   */
  generateSitemapIndexXML(sitemapPaths: string[]): string {
    const sitemapEntries = sitemapPaths.map(path => {
      return [
        `  <sitemap>`,
        `    <loc>${this.config.baseUrl}${path}</loc>`,
        `    <lastmod>${this.getLastModified('build')}</lastmod>`,
        `  </sitemap>`
      ].join('\n');
    });

    return [
      `<?xml version="1.0" encoding="UTF-8"?>`,
      `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
      ...sitemapEntries,
      `</sitemapindex>`
    ].join('\n');
  }
}

/**
 * 全局sitemap管理器实例
 */
export const sitemapManager = new SitemapManager();

/**
 * 生成响应头
 */
export function generateSitemapResponse(xml: string): Response {
  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600', // 1小时缓存
    },
  });
}

/**
 * 内容修改时间配置
 * 这里可以配置各种内容类型的实际修改时间
 */
export const contentModificationDates = {
  // 工具页面最后更新时间
  'remove-bg': '2025-07-03T10:00:00Z',
  'image-restoration': '2025-07-03T09:00:00Z',
  'photo-real-style': '2025-07-03T14:00:00Z',
  'try-on-clothing': '2025-07-03T11:00:00Z',
  'image-resize': '2025-07-06T15:30:00Z',
  'voice-enhancement': '2025-07-06T16:00:00Z',
  'text-to-speech': '2025-07-09T18:00:00Z',
  'audio-transcription': '2025-07-06T16:15:00Z',
  'video-bg-removal': '2025-07-06T16:30:00Z',
  'video-enhancement': '2025-07-06T16:45:00Z',
  'earth-zoom-out': '2025-07-07T15:00:00Z',
  
  // 可以根据实际情况添加更多配置
  // 'blog-post-slug': '2024-01-20T10:00:00Z',
} as const;

/**
 * 获取内容的真实修改时间
 */
export function getContentModificationDate(contentKey: keyof typeof contentModificationDates): string {
  return contentModificationDates[contentKey] || sitemapManager.getLastModified('build');
}