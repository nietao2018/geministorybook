'use client';

import React from "react";
import Link from "next/link";
import { useParams } from 'next/navigation';

const features = [
  {
    title: {
      en: "Image Compressor",
      zh: "图片压缩"
    },
    path: "/image-compressor",
  },
  {
    title: {
      en: "Background Remover",
      zh: "背景移除"
    },
    path: "/remove-bg",
  },
  {
    title: {
      en: "Image Resizer",
      zh: "图片调整大小"
    },
    path: "/image-resize",
  },
  {
    title: {
      en: "Image Restoration",
      zh: "图片修复"
    },
    path: "/image-restoration",
  },
];

export default function KontextKomposerFeature() {
  const params = useParams();
  const locale = params.locale as string;
  const isZh = locale === 'zh-hans';

  return (
    <section aria-labelledby="features-section-title" className="w-full py-12">
      <h2
        id="features-section-title"
        className="mb-12 bg-gradient-to-r from-indigo-500 via-cyan-500 to-blue-500 bg-clip-text text-center text-4xl font-extrabold tracking-wider text-transparent drop-shadow-lg"
      >
        {isZh ? '探索更多AI图片工具' : 'Discover More AI Image Tools'}
      </h2>
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature, idx) => (
          <Link
            key={idx}
            href={`/${locale}${feature.path}`}
            className="group relative rounded-3xl bg-gradient-to-br from-indigo-300 via-cyan-200 to-blue-200 p-[2px] shadow-lg transition-transform hover:-translate-y-2 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:from-indigo-900 dark:via-zinc-800 dark:to-blue-900"
          >
            <div className="flex size-full select-none items-center justify-center rounded-3xl bg-white px-3 py-10 text-center transition-colors duration-200 group-hover:bg-indigo-50 dark:bg-zinc-900 dark:group-hover:bg-zinc-800">
              <span className="line-clamp-2 text-base font-semibold leading-snug tracking-wide text-gray-900 dark:text-gray-100 md:text-lg">
                {isZh ? feature.title.zh : feature.title.en}
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* FLUX.1 Kontext Komposer Unique Selling Points */}
      <div className="mx-auto mt-16 max-w-4xl px-4">
        <div className="rounded-3xl bg-gradient-to-r from-indigo-50 via-cyan-50 to-blue-50 p-8 dark:from-indigo-950 dark:via-cyan-950 dark:to-blue-950">
          <h3 className="mb-6 text-center text-2xl font-bold text-gray-900 dark:text-white">
            {isZh ? '为什么选择 FLUX.1 Kontext Komposer？' : 'Why Choose FLUX.1 Kontext Komposer?'}
          </h3>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 text-white">
                <svg className="size-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h4 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                {isZh ? '革命性AI技术' : 'Revolutionary AI Technology'}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {isZh ? 'FLUX.1技术，理解图片语境，智能编辑' : 'FLUX.1 technology understands image context for intelligent editing'}
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
                <svg className="size-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h4 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                {isZh ? '角色一致性保证' : 'Character Consistency'}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {isZh ? '保持人物特征，确保编辑结果自然' : 'Maintains character features for natural editing results'}
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
                <svg className="size-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 4v10a2 2 0 002 2h6a2 2 0 002-2V8M7 8h10M9 12h6m-6 4h6" />
                </svg>
              </div>
              <h4 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                {isZh ? '自然语言控制' : 'Natural Language Control'}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {isZh ? '无需复杂工具，用自然语言描述即可' : 'No complex tools needed - just natural language descriptions'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}