import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { unstable_setRequestLocale } from 'next-intl/server';
import EarthZoomOutClient from '@/components/earth-zoom-out/EarthZoomOutClient';
import UseCases from '@/components/earth-zoom-out/UseCases';
import { earthZoomOutConfig } from '@/config/earth-zoom-out';

interface PageProps {
  params: { locale: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = params;
  
  if (!['en', 'zh-hans'].includes(locale)) {
    return notFound();
  }

  const isZhHans = locale === 'zh-hans';
  const config = isZhHans ? earthZoomOutConfig.zh : earthZoomOutConfig.en;

  return {
    title: config.title,
    description: config.description,
    keywords: config.keywords,
    openGraph: {
      title: config.title,
      description: config.description,
      type: 'website',
      images: [{
        url: '/og-earth-zoom.jpg',
        width: 1200,
        height: 630,
        alt: config.title,
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title: config.title,
      description: config.description,
      images: ['/og-earth-zoom.jpg'],
    },
    alternates: {
      canonical: locale === 'en' ? `/earth-zoom-out` : `/${locale}/earth-zoom-out`,
      languages: {
        'en': '/earth-zoom-out',
        'zh-Hans': '/zh-hans/earth-zoom-out',
      },
    },
  };
}

export default function EarthZoomOutPage({ params }: PageProps) {
  const { locale } = params;
  
  unstable_setRequestLocale(locale);
  
  if (!['en', 'zh-hans'].includes(locale)) {
    return notFound();
  }

  const isZhHans = locale === 'zh-hans';
  const config = isZhHans ? earthZoomOutConfig.zh : earthZoomOutConfig.en;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": config.schema.name,
    "description": config.schema.description,
    "url": `https://headshots.fun/${locale}/earth-zoom-out`,
    "applicationCategory": "MultimediaApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": config.schema.featureList
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        {/* Hero Section */}
        <section className="relative overflow-hidden pb-4 pt-16">
          {/* Background Effects */}
          <div className="absolute inset-0">
            <div className="absolute left-1/3 top-0 size-96 rounded-full bg-gradient-to-r from-blue-400/20 to-purple-400/20 blur-3xl" />
            <div className="absolute bottom-0 right-1/3 size-80 rounded-full bg-gradient-to-r from-purple-400/15 to-pink-400/15 blur-3xl" />
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-gray-50/50 via-white/30 to-transparent dark:from-gray-900/50 dark:via-gray-800/30" />
          </div>
          
          <div className="relative mx-auto max-w-7xl px-4">
            {/* Breadcrumb Navigation */}
            <nav className="mb-8 flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
              <a href="/" className="transition-colors hover:text-blue-600">{config.breadcrumb.home}</a>
              <span className="mx-1">/</span>
              <span className="font-medium text-gray-900 dark:text-white">
                {config.breadcrumb.current}
              </span>
            </nav>
            
            {/* Page Header */}
            <div className="mb-4 text-center">
              <h1 className="mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-4xl font-bold text-transparent md:text-5xl lg:text-6xl">
                {config.hero.title}
              </h1>
              <p className="mx-auto max-w-4xl text-xl leading-relaxed text-gray-600 dark:text-gray-300">
                {config.hero.subtitle}
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-gray-500">
                {config.hero.features.map((feature, index) => (
                  <span key={index} className="flex items-center">
                    <span className="mr-2">✓</span>
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        

        {/* Image Zoom Animation Tool */}
        <EarthZoomOutClient />

        {/* Use Cases Section */}
        <UseCases locale={locale} />

        {/* Features Section */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
                {config.features.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                {config.features.subtitle}
              </p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {config.features.items.map((feature, index) => (
                <div key={index} className="rounded-2xl border border-gray-200/50 bg-white/80 p-6 backdrop-blur-sm dark:border-gray-600/50 dark:bg-gray-800/80">
                  <div className="mb-4 text-4xl">{feature.icon}</div>
                  <h3 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Usage Instructions */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
                {config.howToUse.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                {config.howToUse.subtitle}
              </p>
            </div>
            
            <div className="mx-auto max-w-4xl">
              <div className="space-y-6">
                {config.howToUse.steps.map((instruction, index) => (
                  <div key={index} className="flex items-start space-x-4 rounded-2xl border border-gray-200/50 bg-white/80 p-6 backdrop-blur-sm dark:border-gray-600/50 dark:bg-gray-800/80">
                    <div className="flex size-8 items-center justify-center rounded-full bg-blue-500 font-bold text-white">
                      {instruction.step}
                    </div>
                    <div className="flex-1">
                      <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                        {instruction.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {instruction.description}
                      </p>
                    </div>
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