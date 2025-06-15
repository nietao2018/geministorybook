import { MetadataRoute } from 'next'
import { allPosts, allPages } from 'contentlayer/generated'
import { siteConfig } from '@/config/site'
import { marketingConfig } from '@/config/marketing'
import { BLOG_CATEGORIES } from '@/config/blog'
import { locales } from '@/config/i18n-metadata'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url

  // 基础路由
  const baseRoutes = [
    '',
    '/about',
    '/terms',
    '/privacy',
    '/login',
    '/register',
    '/payment-status',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastmod: new Date().toISOString(),
    priority: route === '' ? 1 : 0.8,
  }))

  // 营销导航路由
  const marketingRoutes = marketingConfig.mainNav.map((item) => ({
    url: `${baseUrl}${item.href}`,
    lastmod: new Date().toISOString(),
    priority: 0.8,
  }))

  // 博客文章路由
  const blogRoutes = allPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slugAsParams}`,
    lastmod: post.date ? new Date(post.date).toISOString() : new Date().toISOString(),
    priority: 0.6,
  }))

  // 博客分类路由
  const categoryRoutes = BLOG_CATEGORIES.map((category) => ({
    url: `${baseUrl}/blog/category/${category.slug}`,
    lastmod: new Date().toISOString(),
    priority: 0.7,
  }))

  // 生成器工具路由
  const generatorRoutes = [
    '/image-restoration',
    '/remove-bg',
    '/product-anyshoot',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastmod: new Date().toISOString(),
    priority: 0.8,
  }))

  // 内容页面路由（排除已经在其他路由中的页面）
  const existingRoutes = new Set([
    ...baseRoutes.map(route => route.url),
    ...marketingRoutes.map(route => route.url),
    ...blogRoutes.map(route => route.url),
    ...categoryRoutes.map(route => route.url),
    ...generatorRoutes.map(route => route.url),
  ])

  const pageRoutes = allPages
    .filter(page => !existingRoutes.has(`${baseUrl}/${page.slugAsParams}`))
    .map((page) => ({
      url: `${baseUrl}/${page.slugAsParams}`,
      lastmod: new Date().toISOString(),
      priority: 0.8,
    }))

  // 为每个语言生成路由
  const localizedRoutes = [
    ...baseRoutes,
    ...marketingRoutes,
    ...blogRoutes,
    ...categoryRoutes,
    ...generatorRoutes,
    ...pageRoutes,
  ].flatMap(route => 
    locales.map(locale => ({
      ...route,
      url: locale === 'en' ? route.url : `${baseUrl}/${locale}${route.url.replace(baseUrl, '')}`,
    }))
  )

  return localizedRoutes
} 