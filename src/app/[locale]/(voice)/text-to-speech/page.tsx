import { unstable_setRequestLocale } from 'next-intl/server';
import { Metadata } from 'next';
import TextToSpeechClient from '../../../../components/text-to-speech/TextToSpeechClient';
import TextToSpeechSteps from '@/components/text-to-speech/TextToSpeechSteps';
import TextToSpeechFeature from '@/components/text-to-speech/TextToSpeechFeature';
import Features from '@/components/sections/features';
import Testimonials from '@/components/sections/testimonials';
import CTA from '@/components/sections/CTA';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale;
  
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://converters.pro';
  
  if (locale === 'zh-hans') {
    return {
      title: 'AI文本转语音工具 - 免费在线文字转语音 | Converters.pro',
      description: '使用先进的AI技术，将文本转换为自然流畅的语音。支持多种语言和声音选择，免费在线使用，无需下载软件，快速生成高质量音频。',
      keywords: [
        'AI文本转语音',
        '在线文字转语音',
        'TTS工具',
        '语音合成',
        '文本朗读',
        '语音生成',
        '免费TTS',
        'AI配音',
        '多语言语音',
        '自然语音'
      ].join(', '),
      openGraph: {
        title: 'AI文本转语音工具 - 免费在线文字转语音',
        description: '使用先进的AI技术，将文本转换为自然流畅的语音。支持多种语言和声音选择。',
        url: `${baseUrl}/zh-hans/text-to-speech`,
        siteName: 'HeadShots.fun',
        images: [
          {
            url: `${baseUrl}/_static/tts/og-image.jpg`,
            width: 1200,
            height: 630,
            alt: 'AI文本转语音工具预览',
          },
        ],
        locale: 'zh_CN',
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: 'AI文本转语音工具 - 免费在线文字转语音',
        description: '使用先进的AI技术，将文本转换为自然流畅的语音。支持多种语言和声音选择。',
        images: [`${baseUrl}/_static/tts/og-image.jpg`],
      },
      alternates: {
        canonical: `${baseUrl}/zh-hans/text-to-speech`,
        languages: {
          'en': `${baseUrl}/en/text-to-speech`,
          'zh-hans': `${baseUrl}/zh-hans/text-to-speech`,
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
    title: 'AI Text to Speech - Free Online Text to Voice Converter | Converters.pro',
    description: 'Convert text to natural, lifelike speech with advanced AI technology. Support multiple languages and voice options. Free online tool, no download required. Generate high-quality audio instantly.',
    keywords: [
      'AI text to speech',
      'online text to voice',
      'TTS tool',
      'speech synthesis',
      'text reader',
      'voice generator',
      'free TTS',
      'AI voice over',
      'multilingual speech',
      'natural voice'
    ].join(', '),
    openGraph: {
      title: 'AI Text to Speech - Free Online Text to Voice Converter',
      description: 'Convert text to natural, lifelike speech with advanced AI technology. Support multiple languages and voice options.',
      url: `${baseUrl}/en/text-to-speech`,
      siteName: 'HeadShots.fun',
      images: [
        {
          url: `${baseUrl}/_static/tts/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: 'AI Text to Speech Tool Preview',
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'AI Text to Speech - Free Online Text to Voice Converter',
      description: 'Convert text to natural, lifelike speech with advanced AI technology. Support multiple languages and voice options.',
      images: [`${baseUrl}/_static/tts/og-image.jpg`],
    },
    alternates: {
      canonical: `${baseUrl}/text-to-speech`,
      languages: {
        'en': `${baseUrl}/text-to-speech`,
        'zh-hans': `${baseUrl}/zh-hans/text-to-speech`,
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

export default function TextToSpeechPage({ params }: { params: { locale: string } }) {
  // 在服务器组件中设置语言环境
  unstable_setRequestLocale(params.locale);

  // 结构化数据
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": params.locale === 'zh-hans' ? "AI文本转语音工具" : "AI Text to Speech",
    "description": params.locale === 'zh-hans' 
      ? "使用先进的AI技术，将文本转换为自然流畅的语音。支持多种语言和声音选择。"
      : "Convert text to natural, lifelike speech with advanced AI technology. Support multiple languages and voice options.",
    "url": `${process.env.NEXT_PUBLIC_APP_URL || 'https://headshots.fun'}/${params.locale}/text-to-speech`,
    "applicationCategory": "AudioEditingApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      params.locale === 'zh-hans' ? "AI智能语音合成" : "AI-powered speech synthesis",
      params.locale === 'zh-hans' ? "支持多种语言" : "Multiple language support",
      params.locale === 'zh-hans' ? "多种声音选择" : "Various voice options",
      params.locale === 'zh-hans' ? "实时预览" : "Real-time preview",
      params.locale === 'zh-hans' ? "一键下载" : "One-click download",
      params.locale === 'zh-hans' ? "无需注册" : "No registration required"
    ],
    "screenshot": `${process.env.NEXT_PUBLIC_APP_URL || 'https://headshots.fun'}/_static/tts/og-image.jpg`,
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
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        {/* Hero Section */}
        <div className="relative overflow-hidden pb-4 pt-16">
          {/* Background Effects */}
          <div className="absolute inset-0">
            <div className="absolute left-1/3 top-0 size-96 rounded-full bg-gradient-to-r from-green-400/20 to-blue-400/20 blur-3xl" />
            <div className="absolute bottom-0 right-1/3 size-80 rounded-full bg-gradient-to-r from-blue-400/15 to-purple-400/15 blur-3xl" />
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-green-50/50 via-white/30 to-transparent dark:from-gray-900/50 dark:via-gray-800/30" />
          </div>
          
          <div className="relative mx-auto max-w-7xl px-4">
            {/* Breadcrumb Navigation */}
            <nav className="mb-8 flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
              <a href="/" className="transition-colors hover:text-green-600">Home</a>
              <span className="mx-1">/</span>
              <span className="font-medium text-gray-900 dark:text-white">
                {params.locale === 'zh-hans' ? '文本转语音' : 'Text to Speech'}
              </span>
            </nav>
            
            {/* Page Header */}
            <div className="mb-4 text-center">
              <h1 className="mb-6 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-4xl font-bold text-transparent md:text-5xl lg:text-6xl">
                {params.locale === 'zh-hans' ? 'AI文本转语音工具' : 'AI Text to Speech'}
              </h1>
              <p className="mx-auto max-w-4xl text-xl leading-relaxed text-gray-600 dark:text-gray-300">
                {params.locale === 'zh-hans' 
                  ? '使用先进的AI技术，将文本转换为自然流畅的语音。支持多种语言和声音选择，快速生成高质量音频文件。'
                  : 'Convert text to natural, lifelike speech with advanced AI technology. Support multiple languages and voice options. Generate high-quality audio files instantly.'
                }
              </p>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <TextToSpeechClient />
        <TextToSpeechSteps />
        <TextToSpeechFeature />
        <Features />
        <Testimonials />
        <CTA />
      </div>
    </>
  );
}