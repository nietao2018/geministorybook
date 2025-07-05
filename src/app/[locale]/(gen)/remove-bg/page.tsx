import { unstable_setRequestLocale } from 'next-intl/server';
import { Metadata } from 'next';
import ImageUploaderClient from '../../../../components/remove-bg/ImageUploaderClient';
import HeroLanding from '@/components/sections/hero-landing';
import PreviewLanding from '@/components/sections/preview-landing';
import RemoveBgSteps from '@/components/remove-bg/RemoveBgSteps';
import BentoGrid from '@/components/sections/bentogrid';
import InfoLanding from '@/components/sections/info-landing';
import Features from '@/components/sections/features';
import Testimonials from '@/components/sections/testimonials';
import CTA from '@/components/sections/CTA';
import RemoveBGFeature from '@/components/remove-bg/RemoveBGFeature';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale;
  
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://converters.pro';
  
  if (locale === 'zh-hans') {
    return {
      title: 'AI背景移除工具 - 免费在线去除图片背景 | Converters.pro',
      description: '使用先进的AI技术，一键移除图片背景。支持人像、产品、动物等各种图片类型。免费在线使用，无需下载软件，快速获得透明背景图片。',
      keywords: [
        'AI背景移除',
        '在线去背景',
        '图片背景去除',
        '透明背景',
        '人像抠图',
        '产品图处理',
        '免费背景移除',
        'AI抠图工具',
        '图片编辑',
        '背景删除'
      ].join(', '),
      openGraph: {
        title: 'AI背景移除工具 - 免费在线去除图片背景',
        description: '使用先进的AI技术，一键移除图片背景。支持人像、产品、动物等各种图片类型。',
        url: `${baseUrl}/zh-hans/remove-bg`,
        siteName: 'HeadShots.fun',
        images: [
          {
            url: `${baseUrl}/_static/removebg/og-image.jpg`,
            width: 1200,
            height: 630,
            alt: 'AI背景移除工具预览',
          },
        ],
        locale: 'zh_CN',
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: 'AI背景移除工具 - 免费在线去除图片背景',
        description: '使用先进的AI技术，一键移除图片背景。支持人像、产品、动物等各种图片类型。',
        images: [`${baseUrl}/_static/removebg/og-image.jpg`],
      },
      alternates: {
        canonical: `${baseUrl}/zh-hans/remove-bg`,
        languages: {
          'en': `${baseUrl}/en/remove-bg`,
          'zh-hans': `${baseUrl}/zh-hans/remove-bg`,
        },
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      },
    };
  }

  // English metadata
  return {
    title: 'AI Background Remover - Free Online Background Removal Tool | Converters.pro',
    description: 'Remove image backgrounds instantly with advanced AI technology. Supports portraits, products, animals, and more. Free online tool, no download required. Get transparent background images in seconds.',
    keywords: [
      'AI background remover',
      'online background removal',
      'remove image background',
      'transparent background',
      'portrait background removal',
      'product image processing',
      'free background remover',
      'AI image editing',
      'background removal tool',
      'image background delete'
    ].join(', '),
    openGraph: {
      title: 'AI Background Remover - Free Online Background Removal Tool',
      description: 'Remove image backgrounds instantly with advanced AI technology. Supports portraits, products, animals, and more.',
      url: `${baseUrl}/en/remove-bg`,
      siteName: 'HeadShots.fun',
      images: [
        {
          url: `${baseUrl}/_static/removebg/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: 'AI Background Remover Preview',
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'AI Background Remover - Free Online Background Removal Tool',
      description: 'Remove image backgrounds instantly with advanced AI technology. Supports portraits, products, animals, and more.',
      images: [`${baseUrl}/_static/removebg/og-image.jpg`],
    },
    alternates: {
      canonical: `${baseUrl}/remove-bg`,
      languages: {
        'en': `${baseUrl}/remove-bg`,
        'zh-hans': `${baseUrl}/zh-hans/remove-bg`,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default function RemoveBgPage({ params }: { params: { locale: string } }) {
  // 在服务器组件中设置语言环境
  unstable_setRequestLocale(params.locale);

  // 结构化数据
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": params.locale === 'zh-hans' ? "AI背景移除工具" : "AI Background Remover",
    "description": params.locale === 'zh-hans' 
      ? "使用先进的AI技术，一键移除图片背景。支持人像、产品、动物等各种图片类型。"
      : "Remove image backgrounds instantly with advanced AI technology. Supports portraits, products, animals, and more.",
    "url": `${process.env.NEXT_PUBLIC_APP_URL || 'https://headshots.fun'}/${params.locale}/remove-bg`,
    "applicationCategory": "ImageEditingApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      params.locale === 'zh-hans' ? "AI智能背景移除" : "AI-powered background removal",
      params.locale === 'zh-hans' ? "支持多种图片格式" : "Multiple image format support",
      params.locale === 'zh-hans' ? "实时预览" : "Real-time preview",
      params.locale === 'zh-hans' ? "一键下载" : "One-click download",
      params.locale === 'zh-hans' ? "无需注册" : "No registration required"
    ],
    "screenshot": `${process.env.NEXT_PUBLIC_APP_URL || 'https://headshots.fun'}/_static/removebg/og-image.jpg`,
    "author": {
      "@type": "Organization",
      "name": "HeadShots.fun"
    }
  };

  // 渲染客户端组件
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        {/* Hero Section */}
        <div className="relative overflow-hidden pb-4 pt-16">
          {/* Background Effects */}
          <div className="absolute inset-0">
            <div className="absolute left-1/3 top-0 size-96 rounded-full bg-gradient-to-r from-blue-400/20 to-purple-400/20 blur-3xl" />
            <div className="absolute bottom-0 right-1/3 size-80 rounded-full bg-gradient-to-r from-purple-400/15 to-pink-400/15 blur-3xl" />
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-blue-50/50 via-white/30 to-transparent dark:from-gray-900/50 dark:via-gray-800/30" />
          </div>
          
          <div className="relative mx-auto max-w-7xl px-4">
            {/* Breadcrumb Navigation */}
            <nav className="mb-8 flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
              <a href="/" className="transition-colors hover:text-blue-600">Home</a>
              <span className="mx-1">/</span>
              <span className="font-medium text-gray-900 dark:text-white">
                {params.locale === 'zh-hans' ? '背景移除' : 'Remove Background'}
              </span>
            </nav>
            
            {/* Page Header */}
            <div className="mb-4 text-center">
              <h1 className="mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-4xl font-bold text-transparent md:text-5xl lg:text-6xl">
                {params.locale === 'zh-hans' ? 'AI背景移除工具' : 'AI Background Remover'}
              </h1>
              <p className="mx-auto max-w-4xl text-xl leading-relaxed text-gray-600 dark:text-gray-300">
                {params.locale === 'zh-hans' 
                  ? '使用先进的AI技术，一键移除图片背景。支持人像、产品、动物等各种图片类型，快速获得透明背景图片。'
                  : 'Remove image backgrounds instantly with advanced AI technology. Supports portraits, products, animals, and more. Get transparent background images in seconds.'
                }
              </p>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <ImageUploaderClient />
        <RemoveBgSteps />
        <RemoveBGFeature />
        <Features />
        <Testimonials />
        <CTA />
      </div>
    </>
  );
}
