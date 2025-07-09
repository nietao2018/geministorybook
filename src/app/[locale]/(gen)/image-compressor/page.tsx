import { unstable_setRequestLocale } from 'next-intl/server';
import { Metadata } from 'next';
import ImageCompressorClient from '../../../../components/image-compressor/ImageCompressorClient';
import Features from '@/components/sections/features';
import Testimonials from '@/components/sections/testimonials';
import CTA from '@/components/sections/CTA';
import ImageCompressorSteps from '@/components/image-compressor/ImageCompressorSteps';
import ImageCompressorFeature from '@/components/image-compressor/ImageCompressorFeature';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale;
  
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://converters.pro';
  
  if (locale === 'zh-hans') {
    return {
      title: 'AI图片压缩工具 - 免费在线图片压缩 | Converters.pro',
      description: '使用先进的AI技术智能压缩图片，在保持画质的同时大幅减小文件大小。支持JPG、PNG、WebP等格式，免费在线使用，无需下载软件。',
      keywords: [
        'AI图片压缩',
        '在线图片压缩',
        '图片压缩工具',
        '图片优化',
        '文件大小减小',
        '智能压缩',
        '免费图片压缩',
        '图片压缩软件',
        '图片编辑',
        '图片处理'
      ].join(', '),
      openGraph: {
        title: 'AI图片压缩工具 - 免费在线图片压缩',
        description: '使用先进的AI技术智能压缩图片，在保持画质的同时大幅减小文件大小。',
        url: `${baseUrl}/zh-hans/image-compressor`,
        siteName: 'Converters.pro',
        images: [
          {
            url: `${baseUrl}/_static/image-compressor/og-image.jpg`,
            width: 1200,
            height: 630,
            alt: 'AI图片压缩工具预览',
          },
        ],
        locale: 'zh_CN',
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: 'AI图片压缩工具 - 免费在线图片压缩',
        description: '使用先进的AI技术智能压缩图片，在保持画质的同时大幅减小文件大小。',
        images: [`${baseUrl}/_static/image-compressor/og-image.jpg`],
      },
      alternates: {
        canonical: `${baseUrl}/zh-hans/image-compressor`,
        languages: {
          'en': `${baseUrl}/en/image-compressor`,
          'zh-hans': `${baseUrl}/zh-hans/image-compressor`,
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
    title: 'AI Image Compressor - Free Online Image Compression Tool | Converters.pro',
    description: 'Compress images with advanced AI technology while maintaining quality. Reduce file sizes significantly for JPG, PNG, WebP formats. Free online tool, no download required.',
    keywords: [
      'AI image compressor',
      'online image compression',
      'image compression tool',
      'image optimizer',
      'reduce file size',
      'smart compression',
      'free image compressor',
      'image compression software',
      'image editing',
      'image processing'
    ].join(', '),
    openGraph: {
      title: 'AI Image Compressor - Free Online Image Compression Tool',
      description: 'Compress images with advanced AI technology while maintaining quality. Reduce file sizes significantly for JPG, PNG, WebP formats.',
      url: `${baseUrl}/en/image-compressor`,
      siteName: 'Converters.pro',
      images: [
        {
          url: `${baseUrl}/_static/image-compressor/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: 'AI Image Compressor Preview',
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'AI Image Compressor - Free Online Image Compression Tool',
      description: 'Compress images with advanced AI technology while maintaining quality. Reduce file sizes significantly for JPG, PNG, WebP formats.',
      images: [`${baseUrl}/_static/image-compressor/og-image.jpg`],
    },
    alternates: {
      canonical: `${baseUrl}/image-compressor`,
      languages: {
        'en': `${baseUrl}/image-compressor`,
        'zh-hans': `${baseUrl}/zh-hans/image-compressor`,
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

export default function ImageCompressorPage({ params }: { params: { locale: string } }) {
  // 在服务器组件中设置语言环境
  unstable_setRequestLocale(params.locale);

  // 结构化数据
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": params.locale === 'zh-hans' ? "AI图片压缩工具" : "AI Image Compressor",
    "description": params.locale === 'zh-hans' 
      ? "使用先进的AI技术智能压缩图片，在保持画质的同时大幅减小文件大小。"
      : "Compress images with advanced AI technology while maintaining quality. Reduce file sizes significantly for JPG, PNG, WebP formats.",
    "url": `${process.env.NEXT_PUBLIC_APP_URL || 'https://converters.pro'}/${params.locale}/image-compressor`,
    "applicationCategory": "ImageEditingApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      params.locale === 'zh-hans' ? "AI智能压缩" : "AI-powered compression",
      params.locale === 'zh-hans' ? "保持画质" : "Quality preservation",
      params.locale === 'zh-hans' ? "多种格式支持" : "Multiple format support",
      params.locale === 'zh-hans' ? "实时预览" : "Real-time preview",
      params.locale === 'zh-hans' ? "一键下载" : "One-click download",
      params.locale === 'zh-hans' ? "无需注册" : "No registration required"
    ],
    "screenshot": `${process.env.NEXT_PUBLIC_APP_URL || 'https://converters.pro'}/_static/image-compressor/og-image.jpg`,
    "author": {
      "@type": "Organization",
      "name": "Converters.pro"
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
                {params.locale === 'zh-hans' ? '图片压缩' : 'Image Compressor'}
              </span>
            </nav>
            
            {/* Page Header */}
            <div className="mb-4 text-center">
              <h1 className="mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-4xl font-bold text-transparent md:text-5xl lg:text-6xl">
                {params.locale === 'zh-hans' ? 'AI图片压缩工具' : 'AI Image Compressor'}
              </h1>
              <p className="mx-auto max-w-4xl text-xl leading-relaxed text-gray-600 dark:text-gray-300">
                {params.locale === 'zh-hans' 
                  ? '使用先进的AI技术智能压缩图片，在保持画质的同时大幅减小文件大小。支持JPG、PNG、WebP等格式，快速优化您的图片。'
                  : 'Compress images with advanced AI technology while maintaining quality. Reduce file sizes significantly for JPG, PNG, WebP formats. Optimize your images quickly and efficiently.'
                }
              </p>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <ImageCompressorClient />
        <ImageCompressorSteps />
        <ImageCompressorFeature />
        <Features />
        <Testimonials />
        <CTA />
      </div>
    </>
  );
}