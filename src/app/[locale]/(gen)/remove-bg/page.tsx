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
  
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://headshots.fun';
  
  if (locale === 'zh-hans') {
    return {
      title: 'AI背景移除工具 - 免费在线去除图片背景 | HeadShots.fun',
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
    title: 'AI Background Remover - Free Online Background Removal Tool | HeadShots.fun',
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
  return <>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
    <h1 className="mx-auto my-20 flex max-w-[1200px] items-center justify-center text-center text-4xl font-bold text-gray-800 dark:text-white">
      Upload an image to remove the background
    </h1>
    <ImageUploaderClient />
    {/* <Powered /> */}
    <RemoveBgSteps />
    <RemoveBGFeature />
    <Features />
    <Testimonials />
    <CTA />
  </>;
}
