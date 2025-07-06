import { unstable_setRequestLocale } from 'next-intl/server';
import { Metadata } from 'next';
import AudioTranscriptionClient from '../../../../components/audio-transcription/AudioTranscriptionClient';
import AudioTranscriptionSteps from '@/components/audio-transcription/AudioTranscriptionSteps';
import Features from '@/components/sections/features';
import Testimonials from '@/components/sections/testimonials';
import CTA from '@/components/sections/CTA';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale;
  
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://converters.pro';
  
  if (locale === 'zh-hans') {
    return {
      title: 'AI音频转录工具 - 在线语音转文字 | Converters.pro',
      description: '使用AI技术将音频转换为文字，支持多语言识别、时间戳、说话人分离。适用于会议、播客、讲座等音频内容转录。',
      keywords: [
        'AI音频转录',
        '语音转文字',
        '音频转文本',
        '会议转录',
        '播客转录',
        '多语言识别',
        '时间戳转录',
        '说话人分离',
        '在线转录工具',
        'AI语音识别'
      ].join(', '),
      openGraph: {
        title: 'AI音频转录工具 - 在线语音转文字',
        description: '使用AI技术将音频转换为文字，支持多语言识别、时间戳、说话人分离。适用于会议、播客、讲座等音频内容转录。',
        url: `${baseUrl}/zh-hans/audio-transcription`,
        siteName: 'Converters.pro',
        images: [
          {
            url: `${baseUrl}/_static/audio-transcription/og-image.jpg`,
            width: 1200,
            height: 630,
            alt: 'AI音频转录工具预览',
          },
        ],
        locale: 'zh_CN',
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: 'AI音频转录工具 - 在线语音转文字',
        description: '使用AI技术将音频转换为文字，支持多语言识别、时间戳、说话人分离。适用于会议、播客、讲座等音频内容转录。',
        images: [`${baseUrl}/_static/audio-transcription/og-image.jpg`],
      },
      alternates: {
        canonical: `${baseUrl}/zh-hans/audio-transcription`,
        languages: {
          'en': `${baseUrl}/en/audio-transcription`,
          'zh-hans': `${baseUrl}/zh-hans/audio-transcription`,
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
    title: 'AI Audio Transcription Tool - Online Speech to Text | Converters.pro',
    description: 'Convert audio to text with AI technology. Support multi-language recognition, timestamps, speaker diarization for meetings, podcasts, lectures and more.',
    keywords: [
      'AI audio transcription',
      'speech to text',
      'audio to text conversion',
      'meeting transcription',
      'podcast transcription',
      'multi-language recognition',
      'timestamp transcription',
      'speaker diarization',
      'online transcription tool',
      'AI speech recognition'
    ].join(', '),
    openGraph: {
      title: 'AI Audio Transcription Tool - Online Speech to Text',
      description: 'Convert audio to text with AI technology. Support multi-language recognition, timestamps, speaker diarization for meetings, podcasts, lectures and more.',
      url: `${baseUrl}/en/audio-transcription`,
      siteName: 'Converters.pro',
      images: [
        {
          url: `${baseUrl}/_static/audio-transcription/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: 'AI Audio Transcription Tool Preview',
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'AI Audio Transcription Tool - Online Speech to Text',
      description: 'Convert audio to text with AI technology. Support multi-language recognition, timestamps, speaker diarization for meetings, podcasts, lectures and more.',
      images: [`${baseUrl}/_static/audio-transcription/og-image.jpg`],
    },
    alternates: {
      canonical: `${baseUrl}/audio-transcription`,
      languages: {
        'en': `${baseUrl}/audio-transcription`,
        'zh-hans': `${baseUrl}/zh-hans/audio-transcription`,
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

export default function AudioTranscriptionPage({ params }: { params: { locale: string } }) {
  unstable_setRequestLocale(params.locale);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": params.locale === 'zh-hans' ? "AI音频转录工具" : "AI Audio Transcription Tool",
    "description": params.locale === 'zh-hans' 
      ? "使用AI技术将音频转换为文字，支持多语言识别、时间戳、说话人分离。适用于会议、播客、讲座等音频内容转录。"
      : "Convert audio to text with AI technology. Support multi-language recognition, timestamps, speaker diarization for meetings, podcasts, lectures and more.",
    "url": `${process.env.NEXT_PUBLIC_APP_URL || 'https://converters.pro'}/${params.locale}/audio-transcription`,
    "applicationCategory": "AudioEditingApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      params.locale === 'zh-hans' ? "AI语音识别" : "AI speech recognition",
      params.locale === 'zh-hans' ? "多语言支持" : "Multi-language support",
      params.locale === 'zh-hans' ? "时间戳标记" : "Timestamp marking",
      params.locale === 'zh-hans' ? "说话人分离" : "Speaker diarization",
      params.locale === 'zh-hans' ? "多格式导出" : "Multiple export formats"
    ],
    "screenshot": `${process.env.NEXT_PUBLIC_APP_URL || 'https://converters.pro'}/_static/audio-transcription/og-image.jpg`,
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
                {params.locale === 'zh-hans' ? '音频转录' : 'Audio Transcription'}
              </span>
            </nav>
            
            <div className="mb-4 text-center">
              <h1 className="mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-4xl font-bold text-transparent md:text-5xl lg:text-6xl">
                {params.locale === 'zh-hans' ? 'AI音频转录工具' : 'AI Audio Transcription Tool'}
              </h1>
              <p className="mx-auto max-w-4xl text-xl leading-relaxed text-gray-600 dark:text-gray-300">
                {params.locale === 'zh-hans' 
                  ? '使用先进的AI技术将音频转换为准确的文字。支持多语言识别、时间戳标记、说话人分离，适用于会议、播客、讲座等各种音频内容。'
                  : 'Convert audio to accurate text with advanced AI technology. Support multi-language recognition, timestamp marking, speaker diarization for meetings, podcasts, lectures and more.'
                }
              </p>
            </div>
          </div>
        </div>
        
        <AudioTranscriptionClient />
        <AudioTranscriptionSteps />
        <Features />
        <Testimonials />
        <CTA />
      </div>
    </>
  );
}