import { unstable_setRequestLocale } from 'next-intl/server';
import { Metadata } from 'next';
import VoiceEnhancementClient from '../../../../components/voice-enhancement/VoiceEnhancementClient';
import VoiceEnhancementSteps from '@/components/voice-enhancement/VoiceEnhancementSteps';
import VoiceEnhancementFeature from '@/components/voice-enhancement/VoiceEnhancementFeature';
import Features from '@/components/sections/features';
import Testimonials from '@/components/sections/testimonials';
import CTA from '@/components/sections/CTA';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale;
  
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://converters.pro';
  
  if (locale === 'zh-hans') {
    return {
      title: 'AI语音增强工具 - 在线音频质量提升 | Converters.pro',
      description: '使用AI技术提升音频质量，去除背景噪音，增强语音清晰度。支持播客、会议、语音备忘等多种音频类型。',
      keywords: [
        'AI语音增强',
        '音频降噪',
        '语音清晰化',
        '音质提升',
        '播客音频处理',
        '会议录音优化',
        '语音备忘增强',
        '在线音频编辑',
        '音频AI处理',
        '专业音频工具'
      ].join(', '),
      openGraph: {
        title: 'AI语音增强工具 - 在线音频质量提升',
        description: '使用AI技术提升音频质量，去除背景噪音，增强语音清晰度。支持播客、会议、语音备忘等多种音频类型。',
        url: `${baseUrl}/zh-hans/voice-enhancement`,
        siteName: 'Converters.pro',
        images: [
          {
            url: `${baseUrl}/_static/voice-enhancement/og-image.jpg`,
            width: 1200,
            height: 630,
            alt: 'AI语音增强工具预览',
          },
        ],
        locale: 'zh_CN',
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: 'AI语音增强工具 - 在线音频质量提升',
        description: '使用AI技术提升音频质量，去除背景噪音，增强语音清晰度。支持播客、会议、语音备忘等多种音频类型。',
        images: [`${baseUrl}/_static/voice-enhancement/og-image.jpg`],
      },
      alternates: {
        canonical: `${baseUrl}/zh-hans/voice-enhancement`,
        languages: {
          'en': `${baseUrl}/en/voice-enhancement`,
          'zh-hans': `${baseUrl}/zh-hans/voice-enhancement`,
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

  return {
    title: 'AI Voice Enhancement Tool - Online Audio Quality Improvement | Converters.pro',
    description: 'Enhance audio quality with AI technology. Remove background noise, improve voice clarity for podcasts, meetings, voice memos and more.',
    keywords: [
      'AI voice enhancement',
      'audio noise reduction',
      'voice clarity improvement',
      'audio quality enhancement',
      'podcast audio processing',
      'meeting recording optimization',
      'voice memo enhancement',
      'online audio editing',
      'AI audio processing',
      'professional audio tools'
    ].join(', '),
    openGraph: {
      title: 'AI Voice Enhancement Tool - Online Audio Quality Improvement',
      description: 'Enhance audio quality with AI technology. Remove background noise, improve voice clarity for podcasts, meetings, voice memos and more.',
      url: `${baseUrl}/en/voice-enhancement`,
      siteName: 'Converters.pro',
      images: [
        {
          url: `${baseUrl}/_static/voice-enhancement/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: 'AI Voice Enhancement Tool Preview',
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'AI Voice Enhancement Tool - Online Audio Quality Improvement',
      description: 'Enhance audio quality with AI technology. Remove background noise, improve voice clarity for podcasts, meetings, voice memos and more.',
      images: [`${baseUrl}/_static/voice-enhancement/og-image.jpg`],
    },
    alternates: {
      canonical: `${baseUrl}/voice-enhancement`,
      languages: {
        'en': `${baseUrl}/voice-enhancement`,
        'zh-hans': `${baseUrl}/zh-hans/voice-enhancement`,
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

export default function VoiceEnhancementPage({ params }: { params: { locale: string } }) {
  unstable_setRequestLocale(params.locale);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": params.locale === 'zh-hans' ? "AI语音增强工具" : "AI Voice Enhancement Tool",
    "description": params.locale === 'zh-hans' 
      ? "使用AI技术提升音频质量，去除背景噪音，增强语音清晰度。支持播客、会议、语音备忘等多种音频类型。"
      : "Enhance audio quality with AI technology. Remove background noise, improve voice clarity for podcasts, meetings, voice memos and more.",
    "url": `${process.env.NEXT_PUBLIC_APP_URL || 'https://converters.pro'}/${params.locale}/voice-enhancement`,
    "applicationCategory": "AudioEditingApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      params.locale === 'zh-hans' ? "AI智能降噪" : "AI-powered noise reduction",
      params.locale === 'zh-hans' ? "语音清晰度增强" : "Voice clarity enhancement",
      params.locale === 'zh-hans' ? "音量标准化" : "Volume normalization",
      params.locale === 'zh-hans' ? "专业音质输出" : "Professional audio output",
      params.locale === 'zh-hans' ? "多格式支持" : "Multiple format support"
    ],
    "screenshot": `${process.env.NEXT_PUBLIC_APP_URL || 'https://converters.pro'}/_static/voice-enhancement/og-image.jpg`,
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
        <div className="relative overflow-hidden pb-4 pt-16">
          <div className="absolute inset-0">
            <div className="absolute left-1/3 top-0 size-96 rounded-full bg-gradient-to-r from-blue-400/20 to-purple-400/20 blur-3xl" />
            <div className="absolute bottom-0 right-1/3 size-80 rounded-full bg-gradient-to-r from-purple-400/15 to-pink-400/15 blur-3xl" />
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-blue-50/50 via-white/30 to-transparent dark:from-gray-900/50 dark:via-gray-800/30" />
          </div>
          
          <div className="relative mx-auto max-w-7xl px-4">
            <nav className="mb-8 flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
              <a href="/" className="transition-colors hover:text-blue-600">Home</a>
              <span className="mx-1">/</span>
              <span className="font-medium text-gray-900 dark:text-white">
                {params.locale === 'zh-hans' ? '语音增强' : 'Voice Enhancement'}
              </span>
            </nav>
            
            <div className="mb-4 text-center">
              <h1 className="mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-4xl font-bold text-transparent md:text-5xl lg:text-6xl">
                {params.locale === 'zh-hans' ? 'AI语音增强工具' : 'AI Voice Enhancement Tool'}
              </h1>
              <p className="mx-auto max-w-4xl text-xl leading-relaxed text-gray-600 dark:text-gray-300">
                {params.locale === 'zh-hans' 
                  ? '使用先进的AI技术提升音频质量，去除背景噪音，增强语音清晰度。支持播客、会议录音、语音备忘等多种音频处理需求。'
                  : 'Enhance audio quality with advanced AI technology. Remove background noise, improve voice clarity for podcasts, meeting recordings, voice memos and more.'
                }
              </p>
            </div>
          </div>
        </div>
        
        <VoiceEnhancementClient />
        <VoiceEnhancementSteps />
        <VoiceEnhancementFeature />
        <Features />
        <Testimonials />
        <CTA />
      </div>
    </>
  );
}