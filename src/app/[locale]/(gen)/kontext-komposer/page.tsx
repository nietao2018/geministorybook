import { unstable_setRequestLocale } from 'next-intl/server';
import { Metadata } from 'next';
import KontextKomposerClient from '../../../../components/kontext-komposer/KontextKomposerClient';
import KontextKomposerSteps from '@/components/kontext-komposer/KontextKomposerSteps';
import KontextKomposerFeature from '@/components/kontext-komposer/KontextKomposerFeature';
import Features from '@/components/sections/features';
import Testimonials from '@/components/sections/testimonials';
import CTA from '@/components/sections/CTA';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale;
  
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://converters.pro';
  
  if (locale === 'zh-hans') {
    return {
      title: 'FLUX.1 Kontext Komposer - AI智能图片编辑工具 | Converters.pro',
      description: '革命性的FLUX.1 Kontext Komposer智能图片编辑工具。无需复杂工具，只需告诉AI想要的改变。上下文感知编辑，角色一致性，多模态合成。',
      keywords: [
        'FLUX.1',
        'Kontext Komposer',
        'AI图片编辑',
        '智能图片处理',
        '上下文感知',
        '角色一致性',
        '多模态合成',
        'AI图片生成',
        '图片编辑工具',
        '智能修图'
      ].join(', '),
      openGraph: {
        title: 'FLUX.1 Kontext Komposer - AI智能图片编辑工具',
        description: '革命性的FLUX.1 Kontext Komposer智能图片编辑工具。无需复杂工具，只需告诉AI想要的改变。',
        url: `${baseUrl}/zh-hans/kontext-komposer`,
        siteName: 'HeadShots.fun',
        images: [
          {
            url: `${baseUrl}/_static/kontext-komposer/og-image.jpg`,
            width: 1200,
            height: 630,
            alt: 'FLUX.1 Kontext Komposer AI智能图片编辑工具预览',
          },
        ],
        locale: 'zh_CN',
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: 'FLUX.1 Kontext Komposer - AI智能图片编辑工具',
        description: '革命性的FLUX.1 Kontext Komposer智能图片编辑工具。无需复杂工具，只需告诉AI想要的改变。',
        images: [`${baseUrl}/_static/kontext-komposer/og-image.jpg`],
      },
      alternates: {
        canonical: `${baseUrl}/zh-hans/kontext-komposer`,
        languages: {
          'en': `${baseUrl}/en/kontext-komposer`,
          'zh-hans': `${baseUrl}/zh-hans/kontext-komposer`,
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
    title: 'FLUX.1 Kontext Komposer - AI Intelligent Image Editing Tool | Converters.pro',
    description: 'Revolutionary FLUX.1 Kontext Komposer for intelligent image editing. Simply tell our AI what to change - no complex tools needed. Context-aware editing, character consistency, and multimodal composition.',
    keywords: [
      'FLUX.1',
      'Kontext Komposer',
      'AI image editing',
      'intelligent image processing',
      'context-aware editing',
      'character consistency',
      'multimodal composition',
      'AI image generation',
      'image editing tool',
      'smart photo editing'
    ].join(', '),
    openGraph: {
      title: 'FLUX.1 Kontext Komposer - AI Intelligent Image Editing Tool',
      description: 'Revolutionary FLUX.1 Kontext Komposer for intelligent image editing. Simply tell our AI what to change - no complex tools needed.',
      url: `${baseUrl}/en/kontext-komposer`,
      siteName: 'HeadShots.fun',
      images: [
        {
          url: `${baseUrl}/_static/kontext-komposer/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: 'FLUX.1 Kontext Komposer AI Image Editing Tool Preview',
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'FLUX.1 Kontext Komposer - AI Intelligent Image Editing Tool',
      description: 'Revolutionary FLUX.1 Kontext Komposer for intelligent image editing. Simply tell our AI what to change - no complex tools needed.',
      images: [`${baseUrl}/_static/kontext-komposer/og-image.jpg`],
    },
    alternates: {
      canonical: `${baseUrl}/kontext-komposer`,
      languages: {
        'en': `${baseUrl}/kontext-komposer`,
        'zh-hans': `${baseUrl}/zh-hans/kontext-komposer`,
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

export default function KontextKomposerPage({ params }: { params: { locale: string } }) {
  unstable_setRequestLocale(params.locale);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": params.locale === 'zh-hans' ? "FLUX.1 Kontext Komposer AI智能图片编辑工具" : "FLUX.1 Kontext Komposer AI Image Editing Tool",
    "description": params.locale === 'zh-hans' 
      ? "革命性的FLUX.1 Kontext Komposer智能图片编辑工具。无需复杂工具，只需告诉AI想要的改变。上下文感知编辑，角色一致性，多模态合成。"
      : "Revolutionary FLUX.1 Kontext Komposer for intelligent image editing. Simply tell our AI what to change - no complex tools needed. Context-aware editing, character consistency, and multimodal composition.",
    "url": `${process.env.NEXT_PUBLIC_APP_URL || 'https://conveters.pro'}/${params.locale}/kontext-komposer`,
    "applicationCategory": "ImageEditingApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      params.locale === 'zh-hans' ? "FLUX.1 AI技术" : "FLUX.1 AI technology",
      params.locale === 'zh-hans' ? "上下文感知编辑" : "Context-aware editing",
      params.locale === 'zh-hans' ? "角色一致性保持" : "Character consistency",
      params.locale === 'zh-hans' ? "多模态合成" : "Multimodal composition",
      params.locale === 'zh-hans' ? "智能提示处理" : "Intelligent prompt processing"
    ],
    "screenshot": `${process.env.NEXT_PUBLIC_APP_URL || 'https://conveters.pro'}/_static/kontext-komposer/og-image.jpg`,
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
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        {/* Hero Section */}
        <div className="relative overflow-hidden pb-4 pt-16">
          {/* Background Effects */}
          <div className="absolute inset-0">
            <div className="absolute left-1/3 top-0 size-96 rounded-full bg-gradient-to-r from-purple-400/20 to-pink-400/20 blur-3xl" />
            <div className="absolute bottom-0 right-1/3 size-80 rounded-full bg-gradient-to-r from-pink-400/15 to-violet-400/15 blur-3xl" />
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-purple-50/50 via-white/30 to-transparent dark:from-gray-900/50 dark:via-gray-800/30" />
          </div>
          
          <div className="relative mx-auto max-w-7xl px-4">
            {/* Breadcrumb Navigation */}
            <nav className="mb-8 flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
              <a href="/" className="transition-colors hover:text-purple-600">Home</a>
              <span className="mx-1">/</span>
              <span className="font-medium text-gray-900 dark:text-white">
                {params.locale === 'zh-hans' ? 'Kontext Komposer' : 'Kontext Komposer'}
              </span>
            </nav>
            
            {/* Page Header */}
            <div className="mb-4 text-center">
              <div className="mb-4">
                <span className="inline-flex items-center rounded-full bg-gradient-to-r from-purple-100 to-pink-100 px-3 py-1 text-sm font-medium text-purple-700">
                  ⚡ FLUX.1 Powered
                </span>
              </div>
              <h1 className="mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-4xl font-bold text-transparent md:text-5xl lg:text-6xl">
                {params.locale === 'zh-hans' ? 'Kontext Komposer' : 'Kontext Komposer'}
              </h1>
              <p className="mx-auto max-w-4xl text-xl leading-relaxed text-gray-600 dark:text-gray-300">
                {params.locale === 'zh-hans' 
                  ? '革命性的FLUX.1 Kontext Komposer智能图片编辑工具。无需复杂工具，只需告诉AI想要的改变。上下文感知编辑，角色一致性，多模态合成。'
                  : 'Revolutionary FLUX.1 Kontext Komposer for intelligent image editing. Simply tell our AI what to change - no complex tools needed. Context-aware editing, character consistency, and multimodal composition.'
                }
              </p>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <KontextKomposerClient />
        <KontextKomposerSteps />
        <KontextKomposerFeature />
        <Features />
        <Testimonials />
        <CTA />
      </div>
    </>
  );
}