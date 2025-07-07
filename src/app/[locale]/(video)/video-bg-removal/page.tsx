import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { unstable_setRequestLocale } from 'next-intl/server';
import VideoBgRemovalClient from '@/components/video-bg-removal/VideoBgRemovalClient';
import VideoBgRemovalSteps from '@/components/video-bg-removal/VideoBgRemovalSteps';
import VideoBgRemovalFeatures from '@/components/video-bg-removal/VideoBgRemovalFeatures';

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
    ? "视频背景移除 - AI智能去除视频背景 | HeadShots.fun"
    : "Video Background Removal - AI-Powered Video Background Remover | HeadShots.fun";

  const description = isZhHans
    ? "使用AI技术智能移除视频背景，支持MP4、MOV、AVI、WebM格式。适用于采访、产品展示、教育培训等场景，保持高质量输出。"
    : "Intelligently remove video backgrounds using AI technology. Supports MP4, MOV, AVI, WebM formats. Perfect for interviews, product demos, educational content with high-quality output.";

  return {
    title,
    description,
    keywords: isZhHans 
      ? "视频背景移除,AI去背景,视频处理,背景替换,视频编辑,在线视频工具"
      : "video background removal,AI background remover,video processing,background replacement,video editing,online video tools",
    openGraph: {
      title,
      description,
      type: 'website',
      images: [{
        url: '/og-video-bg-removal.jpg',
        width: 1200,
        height: 630,
        alt: title,
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/og-video-bg-removal.jpg'],
    },
    alternates: {
      canonical: `/${locale}/video-bg-removal`,
      languages: {
        'en': '/en/video-bg-removal',
        'zh-Hans': '/zh-hans/video-bg-removal',
      },
    },
  };
}

export default function VideoBgRemovalPage({ params }: PageProps) {
  const { locale } = params;
  
  unstable_setRequestLocale(locale);
  
  if (!['en', 'zh-hans'].includes(locale)) {
    return notFound();
  }

  const isZhHans = locale === 'zh-hans';

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": isZhHans ? "视频背景移除工具" : "Video Background Removal Tool",
    "description": isZhHans
      ? "使用AI技术智能移除视频背景，支持多种格式，保持高质量输出"
      : "AI-powered video background removal tool supporting multiple formats with high-quality output",
    "url": `https://headshots.fun/${locale}/video-bg-removal`,
    "applicationCategory": "MultimediaApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      isZhHans ? "AI智能背景移除" : "AI-powered background removal",
      isZhHans ? "多格式支持" : "Multiple format support",
      isZhHans ? "高质量输出" : "High-quality output",
      isZhHans ? "实时预览" : "Real-time preview"
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
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" />
          <div className="relative mx-auto max-w-7xl px-4 text-center">
            <h1 className="mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-4xl font-bold text-transparent md:text-5xl lg:text-6xl">
              {isZhHans ? "AI 视频背景移除" : "AI Video Background Removal"}
            </h1>
            <p className="mx-auto mb-8 max-w-3xl text-xl text-gray-600 dark:text-gray-300">
              {isZhHans
                ? "使用最先进的AI技术，智能识别并移除视频背景。支持多种格式，保持原始质量，适用于各种专业场景。"
                : "Remove video backgrounds with advanced AI technology. Supports multiple formats, maintains original quality, perfect for professional use cases."
              }
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
              <span className="flex items-center">
                <span className="mr-2">✓</span>
                {isZhHans ? "支持 MP4、MOV、AVI、WebM" : "Supports MP4, MOV, AVI, WebM"}
              </span>
              <span className="flex items-center">
                <span className="mr-2">✓</span>
                {isZhHans ? "保持原始分辨率" : "Maintains original resolution"}
              </span>
              <span className="flex items-center">
                <span className="mr-2">✓</span>
                {isZhHans ? "批量处理" : "Batch processing"}
              </span>
              <span className="flex items-center">
                <span className="mr-2">✓</span>
                {isZhHans ? "免费使用" : "Free to use"}
              </span>
            </div>
          </div>
        </section>

        {/* Video Background Removal Tool */}
        <VideoBgRemovalClient />

        {/* Steps Section */}
        <VideoBgRemovalSteps />

        {/* Features Section */}
        <VideoBgRemovalFeatures />

        {/* FAQ Section */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
                {isZhHans ? "常见问题" : "Frequently Asked Questions"}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                {isZhHans ? "关于视频背景移除的常见问题解答" : "Common questions about video background removal"}
              </p>
            </div>
            
            <div className="mx-auto max-w-4xl">
              <div className="space-y-6">
                {[
                  {
                    q: isZhHans ? "支持哪些视频格式？" : "What video formats are supported?",
                    a: isZhHans 
                      ? "我们支持 MP4、MOV、AVI、WebM 等主流视频格式，文件大小限制为 500MB。"
                      : "We support popular video formats including MP4, MOV, AVI, WebM with a file size limit of 500MB."
                  },
                  {
                    q: isZhHans ? "处理时间需要多长？" : "How long does processing take?",
                    a: isZhHans 
                      ? "处理时间取决于视频长度和分辨率，一般 1-2 分钟的视频需要 5-10 分钟处理时间。"
                      : "Processing time depends on video length and resolution. A 1-2 minute video typically takes 5-10 minutes to process."
                  },
                  {
                    q: isZhHans ? "可以选择背景类型吗？" : "Can I choose the background type?",
                    a: isZhHans 
                      ? "是的，您可以选择透明背景、纯色背景或上传自定义图片作为新背景。"
                      : "Yes, you can choose transparent background, solid color background, or upload a custom image as the new background."
                  },
                  {
                    q: isZhHans ? "处理后的视频质量如何？" : "What's the quality of processed videos?",
                    a: isZhHans 
                      ? "我们使用先进的AI技术确保输出质量，保持原始分辨率和帧率，边缘处理自然流畅。"
                      : "We use advanced AI technology to ensure high output quality, maintaining original resolution and frame rate with natural edge processing."
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