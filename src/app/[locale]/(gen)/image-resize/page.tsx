import { unstable_setRequestLocale } from 'next-intl/server';
import { Metadata } from 'next';
import ImageResizeClient from '../../../../components/image-resize/ImageResizeClient';
import ImageResizeSteps from '@/components/image-resize/ImageResizeSteps';
import ImageResizeFeature from '@/components/image-resize/ImageResizeFeature';
import Features from '@/components/sections/features';
import Testimonials from '@/components/sections/testimonials';
import CTA from '@/components/sections/CTA';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale;
  
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://converters.pro';
  
  if (locale === 'zh-hans') {
    return {
      title: 'AI图片尺寸调整工具 - 在线智能图片大小调整 | Converters.pro',
      description: '使用AI技术智能调整图片尺寸，支持多种比例和格式。快速调整网页、社交媒体和设计所需的图片大小，保持最佳画质。',
      keywords: [
        'AI图片调整',
        '在线图片调整',
        '图片尺寸修改',
        '图片大小调整',
        '智能裁剪',
        '图片格式转换',
        '免费图片工具',
        'AI图片处理',
        '图片编辑',
        '尺寸调整'
      ].join(', '),
      openGraph: {
        title: 'AI图片尺寸调整工具 - 在线智能图片大小调整',
        description: '使用AI技术智能调整图片尺寸，支持多种比例和格式。快速调整网页、社交媒体和设计所需的图片大小。',
        url: `${baseUrl}/zh-hans/image-resize`,
        siteName: 'HeadShots.fun',
        images: [
          {
            url: `${baseUrl}/_static/image-resize/og-image.jpg`,
            width: 1200,
            height: 630,
            alt: 'AI图片尺寸调整工具预览',
          },
        ],
        locale: 'zh_CN',
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: 'AI图片尺寸调整工具 - 在线智能图片大小调整',
        description: '使用AI技术智能调整图片尺寸，支持多种比例和格式。快速调整网页、社交媒体和设计所需的图片大小。',
        images: [`${baseUrl}/_static/image-resize/og-image.jpg`],
      },
      alternates: {
        canonical: `${baseUrl}/zh-hans/image-resize`,
        languages: {
          'en': `${baseUrl}/en/image-resize`,
          'zh-hans': `${baseUrl}/zh-hans/image-resize`,
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
    title: 'AI Image Resize Tool - Online Smart Image Resizer | Converters.pro',
    description: 'Intelligently resize images with AI technology. Support multiple ratios and formats. Quickly adjust image sizes for web, social media, and design with optimal quality.',
    keywords: [
      'AI image resize',
      'online image resizer',
      'image size adjustment',
      'smart image cropping',
      'image format converter',
      'free image tools',
      'AI image processing',
      'image editing',
      'resize tool',
      'image dimensions'
    ].join(', '),
    openGraph: {
      title: 'AI Image Resize Tool - Online Smart Image Resizer',
      description: 'Intelligently resize images with AI technology. Support multiple ratios and formats for web, social media, and design.',
      url: `${baseUrl}/en/image-resize`,
      siteName: 'HeadShots.fun',
      images: [
        {
          url: `${baseUrl}/_static/image-resize/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: 'AI Image Resize Tool Preview',
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'AI Image Resize Tool - Online Smart Image Resizer',
      description: 'Intelligently resize images with AI technology. Support multiple ratios and formats for web, social media, and design.',
      images: [`${baseUrl}/_static/image-resize/og-image.jpg`],
    },
    alternates: {
      canonical: `${baseUrl}/image-resize`,
      languages: {
        'en': `${baseUrl}/image-resize`,
        'zh-hans': `${baseUrl}/zh-hans/image-resize`,
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

export default function ImageResizePage({ params }: { params: { locale: string } }) {
  unstable_setRequestLocale(params.locale);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": params.locale === 'zh-hans' ? "AI图片尺寸调整工具" : "AI Image Resize Tool",
    "description": params.locale === 'zh-hans' 
      ? "使用AI技术智能调整图片尺寸，支持多种比例和格式。快速调整网页、社交媒体和设计所需的图片大小。"
      : "Intelligently resize images with AI technology. Support multiple ratios and formats for web, social media, and design.",
    "url": `${process.env.NEXT_PUBLIC_APP_URL || 'https://conveters.pro'}/${params.locale}/image-resize`,
    "applicationCategory": "ImageEditingApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      params.locale === 'zh-hans' ? "AI智能图片调整" : "AI-powered image resizing",
      params.locale === 'zh-hans' ? "多种尺寸比例" : "Multiple aspect ratios",
      params.locale === 'zh-hans' ? "保持最佳画质" : "Maintain optimal quality",
      params.locale === 'zh-hans' ? "实时预览" : "Real-time preview",
      params.locale === 'zh-hans' ? "一键下载" : "One-click download"
    ],
    "screenshot": `${process.env.NEXT_PUBLIC_APP_URL || 'https://conveters.pro'}/_static/image-resize/og-image.jpg`,
    "author": {
      "@type": "Organization",
      "name": "Converters.pro"
    }
  };

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
                {params.locale === 'zh-hans' ? '图片调整' : 'Image Resize'}
              </span>
            </nav>
            
            {/* Page Header */}
            <div className="mb-4 text-center">
              <h1 className="mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-4xl font-bold text-transparent md:text-5xl lg:text-6xl">
                {params.locale === 'zh-hans' ? 'AI图片尺寸调整工具' : 'AI Image Resize Tool'}
              </h1>
              <p className="mx-auto max-w-4xl text-xl leading-relaxed text-gray-600 dark:text-gray-300">
                {params.locale === 'zh-hans' 
                  ? '使用AI技术智能调整图片尺寸，支持多种比例和格式。快速调整网页、社交媒体和设计所需的图片大小，保持最佳画质。'
                  : 'Intelligently resize images with AI technology. Support multiple ratios and formats. Quickly adjust image sizes for web, social media, and design with optimal quality.'
                }
              </p>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <ImageResizeClient />
        <ImageResizeSteps />
        <ImageResizeFeature />
        <Features />
        <Testimonials />
        <CTA />
      </div>
    </>
  );
}