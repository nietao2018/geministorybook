import { getConfig } from '@/components/remove-bg/config';
import RemoveBGFeature from '@/components/remove-bg/RemoveBGFeature';
import { notFound } from 'next/navigation';
import { unstable_setRequestLocale } from 'next-intl/server';
import Link from "next/link";

export default function RemoveBgDynamicPage({ params }: { params: { slug: string; locale: string } }) {
  const { slug, locale } = params;
  
  unstable_setRequestLocale(locale);
  
  if (!['en', 'zh-hans'].includes(locale)) {
    return notFound();
  }
  
  const isZhHans = locale === 'zh-hans';
  const config = getConfig(locale);
  // 兼容path前无/和有/的情况
  const pageConfig = config.mainNav.find(item => item.path.replace(/^\//, '') === slug);

  if (!pageConfig) return notFound();

  const meta = (pageConfig.metaData || {}) as Record<string, string>;
  const slugLabel = decodeURIComponent(slug || '').replace(/-/g, ' ');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Breadcrumb Navigation */}
      <nav className="mx-auto flex max-w-7xl items-center space-x-2 px-4 pt-8 text-sm text-gray-500 dark:text-gray-400">
        <Link href={`/${locale}`} className="transition-colors hover:text-blue-600">
          {isZhHans ? '首页' : 'Home'}
        </Link>
        <span className="mx-1">/</span>
        <Link href={`/${locale}/remove-bg`} className="transition-colors hover:text-blue-600">
          {isZhHans ? '背景移除' : 'Background Remover'}
        </Link>
        <span className="mx-1">/</span>
        <span className="font-medium text-gray-900 dark:text-white">{slugLabel}</span>
      </nav>
      
      <main className="mx-auto max-w-7xl px-4 py-12">
        {/* Hero Section */}
        <div className="mb-16 text-center">
          <h1 className="mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-4xl font-bold text-transparent md:text-5xl lg:text-6xl">
            {pageConfig.title}
          </h1>
          <p className="mx-auto mb-8 max-w-3xl text-xl leading-relaxed text-gray-600 dark:text-gray-300">
            {pageConfig.subTitle}
          </p>
          
          <Link
            href={`/${locale}/remove-bg`}
            className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:from-blue-600 hover:to-purple-600 hover:shadow-xl"
          >
            <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            {isZhHans ? '立即试用背景移除' : 'Try Background Remove Now'}
          </Link>
        </div>

        {/* Demo Video Section */}
        {pageConfig.src && (
          <div className="mb-20">
            <div className="mx-auto max-w-5xl">
              <div className="relative overflow-hidden rounded-3xl border border-gray-200/50 bg-white/80 shadow-2xl backdrop-blur-sm dark:border-gray-600/50 dark:bg-gray-800/80">
                <div className="aspect-video">
                  <video 
                    src={pageConfig.src} 
                    className="size-full object-cover" 
                    controls 
                    autoPlay 
                    loop 
                    muted 
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Steps Section */}
        <div className="mb-20">
          <div className="mb-16 text-center">
            <h2 className="mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
              {isZhHans ? '使用方法' : 'How It Works'}
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
              {isZhHans ? '按照以下简单步骤移除图片背景' : 'Follow these simple steps to remove backgrounds from your images'}
            </p>
          </div>
          
          <div className="space-y-20">
            {pageConfig.steps.map((step, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div
                  key={idx}
                  className={`flex flex-col items-center gap-12 lg:flex-row ${!isEven ? 'lg:flex-row-reverse' : ''}`}
                >
                  {/* Image Section */}
                  <div className="relative flex-1">
                    <div className="relative">
                      {/* Step Number */}
                      <div className="absolute -left-4 -top-4 z-10 flex size-12 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-lg font-bold text-white shadow-lg">
                        {idx + 1}
                      </div>
                      
                      {/* Image Container */}
                      <div className="rounded-3xl border border-gray-200/50 bg-white/80 p-8 shadow-lg backdrop-blur-sm dark:border-gray-600/50 dark:bg-gray-800/80">
                        {step.src ? (
                          <img
                            src={step.src}
                            alt={step.title}
                            className="h-80 w-full rounded-2xl object-cover"
                          />
                        ) : (
                          <div className="flex h-80 w-full items-center justify-center rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 text-gray-400 dark:from-gray-700 dark:to-gray-800">
                            <svg className="size-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Content Section */}
                  <div className="flex-1 text-center lg:text-left">
                    <h3 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
                      {step.title}
                    </h3>
                    <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-300">
                      {step.subTitle}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <RemoveBGFeature />
        
        {/* FAQ Section */}
        <div className="mt-20">
          <div className="mb-12 text-center">
            <h2 className="mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
              {isZhHans ? '常见问题' : 'Frequently Asked Questions'}
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
              {isZhHans ? '关于我们背景移除工具的常见问题解答' : 'Get answers to common questions about our background removal tool'}
            </p>
          </div>
          
          <div className="mx-auto max-w-4xl space-y-6">
            {pageConfig?.faqs?.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-gray-200/50 bg-white/80 p-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl dark:border-gray-600/50 dark:bg-gray-800/80"
              >
                <div className="flex items-start gap-4">
                  <div className="shrink-0">
                    <div className="flex size-10 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-500 font-bold text-white">
                      Q
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                      {faq.question}
                    </h3>
                    <p className="leading-relaxed text-gray-600 dark:text-gray-300">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export async function generateMetadata({ params }: { params: { slug: string; locale: string } }) {
  const { slug, locale } = params;
  const config = getConfig(locale);
  const pageConfig = config.mainNav.find(item => item.path.replace(/^\//, '') === slug);
  if (!pageConfig || !pageConfig.metaData) return {};
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://headshots.fun';
  const canonical = `${baseUrl}/${locale}/remove-bg/${slug}`;
  
  // Now using multilingual config
  const title = pageConfig.metaData.title;
  const description = pageConfig.metaData.description;
  return {
    title,
    description,
    keywords: pageConfig.metaData.keywords,
    alternates: {
      canonical,
      languages: {
        'en': `${baseUrl}/en/remove-bg/${slug}`,
        'zh-Hans': `${baseUrl}/zh-hans/remove-bg/${slug}`,
      },
    },
  };
}
