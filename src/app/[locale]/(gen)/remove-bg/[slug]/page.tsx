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
    <>
      <nav className="mx-auto mb-8 flex max-w-6xl items-center space-x-2 px-4 text-base text-gray-400 dark:text-gray-400">
        <Link href="/" className="hover:underline">Home</Link>
        <span className="mx-1">/</span>
        <Link href="/remove-bg" className="hover:underline">Background Remover</Link>
        <span className="mx-1">/</span>
        <span className="font-bold text-gray-900 dark:text-white">{slugLabel}</span>
      </nav>
      <main className="mx-auto max-w-5xl px-4 py-10">
        <div className="mx-auto mb-12 max-w-2xl">
          <h1 className="mb-6 bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 bg-clip-text text-center text-4xl font-extrabold tracking-wider text-transparent drop-shadow-lg md:text-5xl">
            {pageConfig.title}
          </h1>
          <p className="mb-0 text-center text-xl font-medium leading-relaxed text-gray-500 dark:text-gray-300 md:text-2xl">
            {pageConfig.subTitle}
          </p>
        </div>

        <a
          href="/remove-bg"
          className="mx-auto mb-12 mt-8 block w-fit min-w-[180px] rounded-3xl bg-[#ff4d4d] px-4 py-3 text-center text-base font-extrabold text-white shadow-lg transition-colors duration-200 hover:bg-[#e63b3b] focus:outline-none focus:ring-2 focus:ring-[#ff4d4d] dark:bg-[#ff4d4d] dark:hover:bg-[#e63b3b]"
        >
          Try Background Remove Now
        </a>

        {pageConfig.src && (
          <div className="mx-auto mb-12 flex min-h-[540px] w-full items-center justify-center rounded-3xl border border-gray-200 bg-gradient-to-r from-pink-200 via-blue-100 to-purple-200 p-2 shadow-xl dark:border-gray-700 dark:from-[#2a2323] dark:via-[#232a2a] dark:to-[#2a234d] md:w-[900px] md:p-8">
            <video src={pageConfig.src} className="max-h-full max-w-full rounded-2xl object-contain" controls autoPlay loop muted />
          </div>
        )}

        <div className="space-y-4">
          {pageConfig.steps.map((step, idx) => {
            // 定义图片区域不同的背景色
            const imgBgColors = [
              'bg-[#ff4d4d] dark:bg-[#2a2323]',
              'bg-[#4d9fff] dark:bg-[#232a2a]',
              'bg-[#7dff4d] dark:bg-[#232a23]',
              'bg-[#b44dff] dark:bg-[#2a234d]'
            ];
            const imgBg = imgBgColors[idx % imgBgColors.length];
            return (
              <div
                key={idx}
                className={`flex flex-col items-center gap-12 rounded-3xl py-12 shadow-lg md:flex-row ${idx % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
              >
                {/* 图片区 */}
                <div className={`flex min-h-[340px] w-full items-center justify-center rounded-3xl p-4 shadow-lg md:w-[520px] md:p-8 ${imgBg}`}>
                  {step.src ? (
                    <img
                      src={step.src}
                      alt={step.title}
                      className="max-h-[320px] max-w-full rounded-xl object-contain"
                    />
                  ) : (
                    <div className="flex h-[260px] w-full max-w-[400px] items-center justify-center rounded-xl bg-gray-100 text-gray-400">
                      No Image
                    </div>
                  )}
                </div>
                {/* 文案区 */}
                <div className="flex flex-1 flex-col justify-center">
                  <h2 className="mb-6 text-4xl font-extrabold leading-tight text-gray-900 dark:text-white">
                    {step.title}
                  </h2>
                  <h3 className="mb-4 text-lg font-medium leading-relaxed text-gray-700 dark:text-gray-200">
                    {step.subTitle}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>

        <RemoveBGFeature />
        <div className="mx-auto mt-16 max-w-4xl">
          <h2 className="mb-10 bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 bg-clip-text text-center text-4xl font-extrabold text-transparent dark:from-purple-300 dark:via-blue-300 dark:to-pink-300">
            Background Remover FAQs
          </h2>
          <div className="space-y-6">
            {pageConfig?.faqs?.map((faq, idx) => (
              <div
                key={idx}
                className="flex items-start rounded-2xl border border-gray-100 bg-gradient-to-r from-blue-50 via-pink-50 to-yellow-50 p-6 shadow-lg dark:border-zinc-700 dark:from-zinc-800 dark:via-zinc-900 dark:to-zinc-800"
              >
                <div className="mr-4 shrink-0">
                  <span className="inline-block rounded-lg bg-white p-2 shadow dark:bg-zinc-900">
                    <svg width="32" height="32" fill="none" viewBox="0 0 32 32">
                      <rect width="32" height="32" rx="8" fill="#F3F4F6" className="dark:fill-zinc-800" />
                      <text x="16" y="21" textAnchor="middle" fontSize="18" fill="#9CA3AF">?</text>
                    </svg>
                  </span>
                </div>
                <div>
                  <div className="mb-1 text-lg font-bold text-gray-900 dark:text-gray-200">{faq.question}</div>
                  <div className="text-gray-600 dark:text-gray-400">{faq.answer}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
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
