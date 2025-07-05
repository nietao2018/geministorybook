import { config } from '@/components/remove-bg/config';
import RemoveBGFeature from '@/components/remove-bg/RemoveBGFeature';
import { notFound } from 'next/navigation';
import Link from "next/link";

export default function RemoveBgDynamicPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  // 兼容path前无/和有/的情况
  const pageConfig = config.mainNav.find(item => item.path.replace(/^\//, '') === slug);

  if (!pageConfig) return notFound();

  const meta = (pageConfig.metaData || {}) as Record<string, string>;
  const slugLabel = decodeURIComponent(slug || '').replace(/-/g, ' ');

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 min-h-screen">
      {/* Breadcrumb Navigation */}
      <nav className="mx-auto flex max-w-7xl items-center space-x-2 px-4 pt-8 text-sm text-gray-500 dark:text-gray-400">
        <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
        <span className="mx-1">/</span>
        <Link href="/remove-bg" className="hover:text-blue-600 transition-colors">Background Remover</Link>
        <span className="mx-1">/</span>
        <span className="font-medium text-gray-900 dark:text-white">{slugLabel}</span>
      </nav>
      
      <main className="mx-auto max-w-7xl px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            {pageConfig.title}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
            {pageConfig.subTitle}
          </p>
          
          <Link
            href="/remove-bg"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:from-blue-600 hover:to-purple-600"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Try Background Remove Now
          </Link>
        </div>

        {/* Demo Video Section */}
        {pageConfig.src && (
          <div className="mb-20">
            <div className="mx-auto max-w-5xl">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-white/80 backdrop-blur-sm border border-gray-200/50 dark:bg-gray-800/80 dark:border-gray-600/50">
                <div className="aspect-video">
                  <video 
                    src={pageConfig.src} 
                    className="w-full h-full object-cover" 
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
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Follow these simple steps to remove backgrounds from your images
            </p>
          </div>
          
          <div className="space-y-20">
            {pageConfig.steps.map((step, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div
                  key={idx}
                  className={`flex flex-col lg:flex-row items-center gap-12 ${!isEven ? 'lg:flex-row-reverse' : ''}`}
                >
                  {/* Image Section */}
                  <div className="flex-1 relative">
                    <div className="relative">
                      {/* Step Number */}
                      <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg z-10">
                        {idx + 1}
                      </div>
                      
                      {/* Image Container */}
                      <div className="bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-3xl p-8 shadow-lg dark:bg-gray-800/80 dark:border-gray-600/50">
                        {step.src ? (
                          <img
                            src={step.src}
                            alt={step.title}
                            className="w-full h-80 object-cover rounded-2xl"
                          />
                        ) : (
                          <div className="w-full h-80 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center text-gray-400 dark:from-gray-700 dark:to-gray-800">
                            <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Content Section */}
                  <div className="flex-1 text-center lg:text-left">
                    <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                      {step.title}
                    </h3>
                    <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
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
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Get answers to common questions about our background removal tool
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-6">
            {pageConfig?.faqs?.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 dark:bg-gray-800/80 dark:border-gray-600/50"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                      Q
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {faq.question}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
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

export async function generateMetadata({ params }: { params: { slug: string, locale?: string } }) {
  const { slug, locale } = params;
  const pageConfig = config.mainNav.find(item => item.path.replace(/^\//, '') === slug);
  if (!pageConfig || !pageConfig.metaData) return {};
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://headshots.fun';
  const canonical = `${baseUrl}${locale !='en' ? `/${locale}` : ''}/remove-bg/${slug}`;
  return {
    title: pageConfig.metaData.title,
    description: pageConfig.metaData.description,
    keywords: pageConfig.metaData.keywords,
    alternates: {
      canonical,
    },
  };
}
