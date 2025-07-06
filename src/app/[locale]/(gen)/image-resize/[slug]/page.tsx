import { unstable_setRequestLocale } from 'next-intl/server';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ImageResizeClient from '../../../../../components/image-resize/ImageResizeClient';
import ImageResizeSteps from '@/components/image-resize/ImageResizeSteps';
import Features from '@/components/sections/features';
import Testimonials from '@/components/sections/testimonials';
import CTA from '@/components/sections/CTA';
import { config } from '@/components/image-resize/config';

interface PageProps {
  params: {
    locale: string;
    slug: string;
  };
}

// Generate metadata for each use case
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = params;
  const useCase = config.mainNav.find(item => item.path === slug);
  
  if (!useCase) {
    return {
      title: 'Page Not Found',
      description: 'The requested page could not be found.',
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://converters.pro';
  const pagePath = `/${locale}/image-resize/${slug}`;
  
  return {
    title: useCase.metaData.title,
    description: useCase.metaData.description,
    keywords: useCase.metaData.keywords,
    openGraph: {
      title: useCase.metaData.title,
      description: useCase.metaData.description,
      url: `${baseUrl}${pagePath}`,
      siteName: 'HeadShots.fun',
      images: [
        {
          url: useCase.src,
          width: 1200,
          height: 630,
          alt: useCase.title,
        },
      ],
      locale: locale === 'zh-hans' ? 'zh_CN' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: useCase.metaData.title,
      description: useCase.metaData.description,
      images: [useCase.src],
    },
    alternates: {
      canonical: `${baseUrl}${pagePath}`,
      languages: {
        'en': `${baseUrl}/en/image-resize/${slug}`,
        'zh-hans': `${baseUrl}/zh-hans/image-resize/${slug}`,
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

export default function ImageResizeUseCasePage({ params }: PageProps) {
  const { locale, slug } = params;
  unstable_setRequestLocale(locale);
  
  const useCase = config.mainNav.find(item => item.path === slug);
  
  if (!useCase) {
    notFound();
  }

  const isZhHans = locale === 'zh-hans';

  // Structured data for the specific use case
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": useCase.title,
    "description": useCase.metaData.description,
    "url": `${process.env.NEXT_PUBLIC_APP_URL || 'https://headshots.fun'}/${locale}/image-resize/${slug}`,
    "applicationCategory": "ImageEditingApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      isZhHans ? "AI智能图片调整" : "AI-powered image resizing",
      isZhHans ? "专业尺寸预设" : "Professional size presets",
      isZhHans ? "保持最佳画质" : "Maintain optimal quality",
      isZhHans ? "实时预览" : "Real-time preview",
      isZhHans ? "一键下载" : "One-click download"
    ],
    "screenshot": useCase.src,
    "author": {
      "@type": "Organization",
      "name": "HeadShots.fun"
    },
    "mainEntity": {
      "@type": "FAQPage",
      "mainEntity": useCase.faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
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
              <a href="/image-resize" className="transition-colors hover:text-blue-600">
                {isZhHans ? '图片调整' : 'Image Resize'}
              </a>
              <span className="mx-1">/</span>
              <span className="font-medium text-gray-900 dark:text-white">
                {useCase.featureTitle}
              </span>
            </nav>
            
            {/* Page Header */}
            <div className="mb-4 text-center">
              <h1 className="mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-4xl font-bold text-transparent md:text-5xl lg:text-6xl">
                {useCase.title}
              </h1>
              <p className="mx-auto max-w-4xl text-xl leading-relaxed text-gray-600 dark:text-gray-300">
                {useCase.subTitle}
              </p>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <ImageResizeClient />
        
        {/* Use Case Specific Steps */}
        <section className="relative overflow-hidden py-16">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/30 to-transparent dark:via-gray-800/30" />
          
          <div className="relative mx-auto max-w-7xl px-4">
            <div className="mb-16 text-center">
              <h2 className="mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-3xl font-bold text-transparent md:text-4xl lg:text-5xl">
                {isZhHans ? '专业步骤指南' : 'Professional Step Guide'}
              </h2>
              <p className="mx-auto max-w-3xl text-xl text-gray-600 dark:text-gray-300">
                {isZhHans 
                  ? '按照以下步骤，轻松完成专业级的图片尺寸调整'
                  : 'Follow these steps to easily achieve professional-grade image resizing'
                }
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {useCase.steps.map((step, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-3xl border border-gray-200/50 bg-white/80 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl dark:border-gray-600/50 dark:bg-gray-800/80"
                >
                  {/* Step number */}
                  <div className="absolute -right-4 -top-4 size-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-center text-lg font-bold text-white shadow-lg">
                    <span className="flex size-full items-center justify-center">
                      {index + 1}
                    </span>
                  </div>
                  
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  
                  <div className="relative">
                    {/* Content */}
                    <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                      {step.title}
                    </h3>
                    <p className="leading-relaxed text-gray-600 dark:text-gray-300">
                      {step.subTitle}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16">
          <div className="mx-auto max-w-4xl px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
                {isZhHans ? '常见问题' : 'Frequently Asked Questions'}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                {isZhHans ? '关于图片调整的常见问题解答' : 'Common questions about image resizing'}
              </p>
            </div>

            <div className="space-y-6">
              {useCase.faqs.map((faq, index) => (
                <div
                  key={index}
                  className="rounded-3xl border border-gray-200/50 bg-white/80 p-6 backdrop-blur-sm dark:border-gray-600/50 dark:bg-gray-800/80"
                >
                  <h3 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        <ImageResizeSteps />
        <Features />
        <Testimonials />
        <CTA />
      </div>
    </>
  );
}