import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import VideoEnhancementClient from '@/components/video-enhancement/VideoEnhancementClient';
import VideoEnhancementSteps from '@/components/video-enhancement/VideoEnhancementSteps';
import VideoEnhancementFeatures from '@/components/video-enhancement/VideoEnhancementFeatures';

interface PageProps {
  params: { locale: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = params;
  
  if (!['en', 'zh-hans'].includes(locale)) {
    return notFound();
  }

  const isZhHans = locale === 'zh-hans';

  const title = isZhHans 
    ? "视频增强 - AI智能提升视频质量和清晰度 | HeadShots.fun"
    : "Video Enhancement - AI-Powered Video Quality & Clarity Improvement | HeadShots.fun";

  const description = isZhHans
    ? "使用AI技术智能增强视频质量，提升清晰度、去除噪点、色彩校正、防抖稳定。支持超分辨率、4K输出等专业功能。"
    : "Enhance video quality with AI technology. Improve clarity, remove noise, color correction, and stabilization. Supports super resolution and 4K output.";

  return {
    title,
    description,
    keywords: isZhHans 
      ? "视频增强,AI视频处理,视频质量提升,超分辨率,视频降噪,色彩校正,视频稳定"
      : "video enhancement,AI video processing,video quality improvement,super resolution,video denoising,color correction,video stabilization",
    openGraph: {
      title,
      description,
      type: 'website',
      images: [{
        url: '/og-video-enhancement.jpg',
        width: 1200,
        height: 630,
        alt: title,
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/og-video-enhancement.jpg'],
    },
    alternates: {
      canonical: `/${locale}/video-enhancement`,
      languages: {
        'en': '/en/video-enhancement',
        'zh-Hans': '/zh-hans/video-enhancement',
      },
    },
  };
}

export default function VideoEnhancementPage({ params }: PageProps) {
  const { locale } = params;
  
  if (!['en', 'zh-hans'].includes(locale)) {
    return notFound();
  }

  const isZhHans = locale === 'zh-hans';

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": isZhHans ? "视频增强工具" : "Video Enhancement Tool",
    "description": isZhHans
      ? "使用AI技术智能增强视频质量，提升清晰度和色彩表现"
      : "AI-powered video enhancement tool for improving video quality, clarity, and color performance",
    "url": `https://headshots.fun/${locale}/video-enhancement`,
    "applicationCategory": "MultimediaApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      isZhHans ? "AI智能增强" : "AI-powered enhancement",
      isZhHans ? "超分辨率" : "Super resolution",
      isZhHans ? "降噪处理" : "Noise reduction",
      isZhHans ? "色彩校正" : "Color correction",
      isZhHans ? "防抖稳定" : "Stabilization"
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10" />
          <div className="relative mx-auto max-w-7xl px-4 text-center">
            <h1 className="mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-4xl font-bold text-transparent md:text-5xl lg:text-6xl">
              {isZhHans ? "AI 视频增强" : "AI Video Enhancement"}
            </h1>
            <p className="mx-auto mb-8 max-w-3xl text-xl text-gray-600 dark:text-gray-300">
              {isZhHans
                ? "使用最先进的AI技术，智能提升视频质量。支持超分辨率、降噪、色彩校正、防抖稳定等专业功能。"
                : "Enhance video quality with cutting-edge AI technology. Support super resolution, denoising, color correction, stabilization and other professional features."
              }
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
              <span className="flex items-center">
                <span className="mr-2">✓</span>
                {isZhHans ? "超分辨率至4K" : "Super resolution to 4K"}
              </span>
              <span className="flex items-center">
                <span className="mr-2">✓</span>
                {isZhHans ? "智能降噪" : "Intelligent denoising"}
              </span>
              <span className="flex items-center">
                <span className="mr-2">✓</span>
                {isZhHans ? "色彩校正" : "Color correction"}
              </span>
              <span className="flex items-center">
                <span className="mr-2">✓</span>
                {isZhHans ? "防抖稳定" : "Stabilization"}
              </span>
            </div>
          </div>
        </section>

        {/* Video Enhancement Tool */}
        <VideoEnhancementClient />

        {/* Steps Section */}
        <VideoEnhancementSteps />

        {/* Features Section */}
        <VideoEnhancementFeatures />

        {/* FAQ Section */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
                {isZhHans ? "常见问题" : "Frequently Asked Questions"}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                {isZhHans ? "关于视频增强的常见问题解答" : "Common questions about video enhancement"}
              </p>
            </div>
            
            <div className="mx-auto max-w-4xl">
              <div className="space-y-6">
                {[
                  {
                    q: isZhHans ? "支持哪些增强功能？" : "What enhancement features are supported?",
                    a: isZhHans 
                      ? "我们支持超分辨率、降噪、色彩校正、防抖稳定、锐化等多种AI增强功能，可根据需要选择启用。"
                      : "We support multiple AI enhancement features including super resolution, denoising, color correction, stabilization, and sharpening. You can enable them as needed."
                  },
                  {
                    q: isZhHans ? "可以提升到多高的分辨率？" : "What resolution can be enhanced to?",
                    a: isZhHans 
                      ? "支持将视频分辨率提升至4K (3840×2160)，同时保持画面质量和细节清晰度。"
                      : "Support enhancing video resolution up to 4K (3840×2160) while maintaining picture quality and detail clarity."
                  },
                  {
                    q: isZhHans ? "处理大文件需要多长时间？" : "How long does it take to process large files?",
                    a: isZhHans 
                      ? "处理时间取决于文件大小和选择的增强选项。一般1GB的视频需要10-20分钟处理时间。"
                      : "Processing time depends on file size and selected enhancement options. A 1GB video typically takes 10-20 minutes to process."
                  },
                  {
                    q: isZhHans ? "增强后的视频质量如何？" : "What's the quality of enhanced videos?",
                    a: isZhHans 
                      ? "使用先进的AI算法确保增强后的视频质量优异，细节丰富，色彩自然，适合专业使用。"
                      : "Advanced AI algorithms ensure excellent enhanced video quality with rich details, natural colors, suitable for professional use."
                  }
                ].map((faq, index) => (
                  <div key={index} className="rounded-2xl border border-gray-200/50 bg-white/80 p-6 backdrop-blur-sm dark:border-gray-600/50 dark:bg-gray-800/80">
                    <h3 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">
                      {faq.q}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}