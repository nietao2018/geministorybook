'use client';

import React from "react";
import { useParams } from 'next/navigation';

const stepData = [
  {
    title: {
      en: "Upload Image",
      zh: "上传图片"
    },
    description: {
      en: "Upload your image and describe what you want to change using natural language.",
      zh: "上传您的图片并用自然语言描述您想要的改变。"
    },
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?auto=format&fit=crop&w=400&q=80",
  },
  {
    title: {
      en: "FLUX.1 AI Processing",
      zh: "FLUX.1 AI处理"
    },
    description: {
      en: "Revolutionary FLUX.1 Kontext Komposer intelligently edits with context-aware technology and character consistency.",
      zh: "革命性的FLUX.1 Kontext Komposer运用上下文感知技术和角色一致性智能编辑。"
    },
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=400&q=80",
  },
  {
    title: {
      en: "Download Result",
      zh: "下载结果"
    },
    description: {
      en: "Get your professionally edited image with perfect character consistency and multimodal composition.",
      zh: "获得具有完美角色一致性和多模态合成的专业编辑图片。"
    },
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80",
  },
];

export default function KontextKomposerSteps() {
  const params = useParams();
  const locale = params.locale as string;
  const isZh = locale === 'zh-hans';

  return (
    <section className="px-4 py-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
            {isZh ? '如何工作' : 'How It Works'}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
            {isZh 
              ? '只需3个简单步骤即可进行AI智能图片编辑。上下文感知、角色一致性、专业效果。'
              : 'AI-powered image editing in just 3 simple steps. Context-aware, character consistent, professional results.'
            }
          </p>
        </div>
        
        <div className="relative">
          {/* Step Progress Line */}
          <div className="absolute left-1/2 top-20 hidden h-0.5 w-full max-w-4xl -translate-x-1/2 bg-gradient-to-r from-indigo-200 via-cyan-200 to-indigo-200 dark:from-indigo-800 dark:via-cyan-800 dark:to-indigo-800 md:block" />
          
          {/* Step Content Cards */}
          <div className="relative z-10 grid grid-cols-1 gap-8 md:grid-cols-3">
            {stepData.map((stepItem, idx) => (
              <article
                key={stepItem.title.en}
                className="group flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-2"
                aria-label={stepItem.title.en}
              >
                {/* Step Number Circle */}
                <div className="relative mb-6">
                  <div className="flex size-16 items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 text-xl font-bold text-white shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl">
                    {idx + 1}
                  </div>
                  {/* Connecting line for mobile */}
                  {idx < stepData.length - 1 && (
                    <div className="absolute left-1/2 top-full h-8 w-0.5 -translate-x-1/2 bg-gradient-to-b from-indigo-200 to-cyan-200 dark:from-indigo-700 dark:to-cyan-700 md:hidden" />
                  )}
                </div>
                
                {/* Step Content */}
                <div className="w-full rounded-2xl border border-gray-200/50 bg-white/80 p-8 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl dark:border-gray-600/50 dark:bg-gray-800/80">
                  {/* Step Image */}
                  <div className="relative mb-6">
                    <div className="mx-auto size-24 overflow-hidden rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 shadow-md dark:from-gray-700 dark:to-gray-800">
                      <img
                        src={stepItem.image}
                        alt={stepItem.title.en.replace(/Step \d+ /, '') + ' example photo'}
                        className="size-full object-cover transition-transform duration-300 group-hover:scale-110"
                        loading="lazy"
                      />
                    </div>
                  </div>
                  
                  {/* Step Title */}
                  <h3 className="mb-3 text-xl font-bold text-gray-800 dark:text-gray-200">
                    {isZh ? stepItem.title.zh : stepItem.title.en}
                  </h3>
                  
                  {/* Step Description */}
                  <p className="leading-relaxed text-gray-600 dark:text-gray-400">
                    {isZh ? stepItem.description.zh : stepItem.description.en}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* FLUX.1 Technology Highlight */}
        <div className="mt-16 rounded-3xl bg-gradient-to-r from-indigo-500/10 via-cyan-500/10 to-indigo-500/10 p-8 text-center">
          <div className="mx-auto max-w-3xl">
            <div className="mb-4">
              <span className="inline-block rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 px-6 py-2 text-sm font-bold text-white">
                {isZh ? 'FLUX.1 技术驱动' : 'Powered by FLUX.1'}
              </span>
            </div>
            <h3 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
              {isZh ? '革命性的图片编辑技术' : 'Revolutionary Image Editing Technology'}
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              {isZh 
                ? 'FLUX.1 Kontext Komposer 采用最先进的AI技术，理解图片上下文，保持角色一致性，实现多模态智能合成。无需复杂工具，只需自然语言描述，即可获得专业级编辑效果。'
                : 'FLUX.1 Kontext Komposer uses cutting-edge AI technology to understand image context, maintain character consistency, and achieve multimodal intelligent composition. No complex tools needed - just natural language descriptions for professional-grade editing results.'
              }
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}